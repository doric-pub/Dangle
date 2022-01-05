import {
  Panel,
  Group,
  vlayout,
  layoutConfig,
  Gravity,
  navbar,
  gestureContainer,
  GestureContainer,
  Color,
  loge,
} from "doric";
import { dangleView, DangleWebGLRenderingContext, vsync } from "dangle";

import * as THREE from "three";
import { TextureLoader } from "./dangle/TextureLoader";
import { TDSLoader } from "./jsm/loaders/TDSLoader";
import { TrackballControls } from "./jsm/controls/TrackballControls";

@Entry
class webgl_loader_3ds extends Panel {
  private gestureView?: GestureContainer;

  onShow() {
    navbar(context).setTitle("webgl_loader_3ds");
  }
  build(rootView: Group) {
    vlayout([
      (this.gestureView = gestureContainer([], {
        layoutConfig: layoutConfig().just(),
        width: 300,
        height: 300,
        backgroundColor: Color.BLACK,
      })),
    ])
      .apply({
        layoutConfig: layoutConfig().fit().configAlignment(Gravity.Center),
        space: 20,
        gravity: Gravity.Center,
      })
      .in(rootView);

    let self = this;
    this.gestureView.addChild(
      dangleView({
        onReady: (gl: DangleWebGLRenderingContext) => {
          const width = gl.drawingBufferWidth;
          const height = gl.drawingBufferHeight;

          const inputCanvas = {
            width: width,
            height: height,
            style: {},
            addEventListener: ((
              name: string,
              fn: (event: {
                pageX: number;
                pageY: number;
                pointerType: string;
                pointerId: number;
              }) => void
            ) => {
              if (name == "pointerdown") {
                self.gestureView!!.onTouchDown = ({ x, y }) => {
                  fn({
                    pageX: x * Environment.screenScale,
                    pageY: y * Environment.screenScale,
                    pointerType: "touch",
                    pointerId: 0,
                  });
                };
              } else if (name == "pointerup") {
                self.gestureView!!.onTouchUp = ({ x, y }) => {
                  fn({
                    pageX: x * Environment.screenScale,
                    pageY: y * Environment.screenScale,
                    pointerType: "touch",
                    pointerId: 0,
                  });
                };
              } else if (name == "pointermove") {
                self.gestureView!!.onTouchMove = ({ x, y }) => {
                  fn({
                    pageX: x * Environment.screenScale,
                    pageY: y * Environment.screenScale,
                    pointerType: "touch",
                    pointerId: 0,
                  });
                };
              } else if (name == "pointercancel") {
                self.gestureView!!.onTouchCancel = ({ x, y }) => {
                  fn({
                    pageX: x * Environment.screenScale,
                    pageY: y * Environment.screenScale,
                    pointerType: "touch",
                    pointerId: 0,
                  });
                };
              }
            }) as any,
            removeEventListener: (() => {}) as any,
            setPointerCapture: (() => {}) as any,
            releasePointerCapture: (() => {}) as any,
            clientHeight: height,
            getContext: (() => {
              return gl;
            }) as any,
            getBoundingClientRect: (() => {
              return {
                left: 0,
                top: 0,
                width: width,
                height: height,
              };
            }) as any,
          } as HTMLCanvasElement;

          let window = {
            innerWidth: width,
            innerHeight: height,
            devicePixelRatio: 1,
            addEventListener: (() => {}) as any,
          };

          const requestAnimationFrame = vsync(context).requestAnimationFrame;

          //#region code to impl

          let controls;
          let camera, scene, renderer;

          init();
          animate();

          function init() {
            camera = new THREE.PerspectiveCamera(
              60,
              window.innerWidth / window.innerHeight,
              0.1,
              10
            );
            camera.position.z = 2;

            scene = new THREE.Scene();
            scene.add(new THREE.HemisphereLight());

            const directionalLight = new THREE.DirectionalLight(0xffeedd);
            directionalLight.position.set(0, 0, 2);
            scene.add(directionalLight);

            //3ds files dont store normal maps
            //@ts-ignore
            const normal = new TextureLoader().load(
              "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/3ds/portalgun/textures/normal.jpg"
            );

            //@ts-ignore
            const loader = new TDSLoader();
            loader.setResourcePath(
              "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/3ds/portalgun/textures/"
            );
            //@ts-ignore
            loader.load(
              "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/3ds/portalgun/portalgun.3ds",
              function (object) {
                object.traverse(function (child) {
                  if (child.isMesh) {
                    child.material.specular.setScalar(0.1);
                    child.material.normalMap = normal;
                  }
                });

                scene.add(object);
              },
              function () {},
              function (error) {
                loge(error.stack);
              }
            );

            renderer = new THREE.WebGLRenderer({ canvas: inputCanvas });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.outputEncoding = THREE.sRGBEncoding;

            controls = new TrackballControls(camera, renderer.domElement);

            window.addEventListener("resize", resize);
          }

          function resize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);
          }

          function animate() {
            controls.update();
            renderer.render(scene, camera);

            requestAnimationFrame(animate);

            gl.endFrame();
          }

          //#endregion
        },
      }).apply({
        layoutConfig: layoutConfig().just(),
        width: 300,
        height: 300,
      })
    );
  }
}
