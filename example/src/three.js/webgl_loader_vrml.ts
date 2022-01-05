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
} from "doric";
import { dangleView, DangleWebGLRenderingContext, vsync } from "dangle";

import * as THREE from "three";
import { OrbitControls } from "./jsm/controls/OrbitControls";
import { VRMLLoader } from "./jsm/loaders/VRMLLoader";

@Entry
class webgl_loader_vrml extends Panel {
  private gestureView?: GestureContainer;

  onShow() {
    navbar(context).setTitle("webgl_loader_vrml");
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
              }) => void
            ) => {
              if (name == "pointerdown") {
                self.gestureView!!.onTouchDown = ({ x, y }) => {
                  fn({ pageX: x, pageY: y, pointerType: "touch" });
                };
              } else if (name == "pointerup") {
                self.gestureView!!.onTouchUp = ({ x, y }) => {
                  fn({ pageX: x, pageY: y, pointerType: "touch" });
                };
              } else if (name == "pointermove") {
                self.gestureView!!.onTouchMove = ({ x, y }) => {
                  fn({ pageX: x, pageY: y, pointerType: "touch" });
                };
              } else if (name == "pointercancel") {
                self.gestureView!!.onTouchCancel = ({ x, y }) => {
                  fn({ pageX: x, pageY: y, pointerType: "touch" });
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
          } as HTMLCanvasElement;

          let window = {
            innerWidth: width,
            innerHeight: height,
            devicePixelRatio: 1,
            addEventListener: (() => {}) as any,
          };

          const requestAnimationFrame = vsync(context).requestAnimationFrame;

          //#region code to impl

          let camera, scene, renderer, controls, loader;

          const params = {
            asset: "house",
          };

          const assets = [
            "creaseAngle",
            "crystal",
            "house",
            "elevationGrid1",
            "elevationGrid2",
            "extrusion1",
            "extrusion2",
            "extrusion3",
            "lines",
            "meshWithLines",
            "meshWithTexture",
            "pixelTexture",
            "points",
          ];

          let vrmlScene;

          init();
          animate();

          function init() {
            camera = new THREE.PerspectiveCamera(
              60,
              window.innerWidth / window.innerHeight,
              0.1,
              1e10
            );
            camera.position.set(-10, 5, 10);

            scene = new THREE.Scene();
            scene.add(camera);

            // light

            const hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
            scene.add(hemiLight);

            const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
            dirLight.position.set(200, 200, 200);
            scene.add(dirLight);

            //@ts-ignore
            loader = new VRMLLoader();
            loadAsset(params.asset);

            // renderer

            renderer = new THREE.WebGLRenderer({ canvas: inputCanvas });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);

            // controls

            controls = new OrbitControls(camera, renderer.domElement);
            controls.minDistance = 1;
            controls.maxDistance = 200;
            controls.enableDamping = true;

            //

            window.addEventListener("resize", onWindowResize);

            //

            // const gui = new GUI();
            // gui.add(params, "asset", assets).onChange(function (value) {
            //   if (vrmlScene) {
            //     vrmlScene.traverse(function (object) {
            //       if (object.material) object.material.dispose();
            //       if (object.material && object.material.map)
            //         object.material.map.dispose();
            //       if (object.geometry) object.geometry.dispose();
            //     });

            //     scene.remove(vrmlScene);
            //   }

            //   loadAsset(value);
            // });
          }

          function loadAsset(asset) {
            loader.load(
              "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/vrml/" +
                asset +
                ".wrl",
              function (object) {
                vrmlScene = object;
                scene.add(object);
                controls.reset();
              }
            );
          }

          function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);
          }

          function animate() {
            requestAnimationFrame(animate);

            controls.update(); // to support damping

            renderer.render(scene, camera);

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
