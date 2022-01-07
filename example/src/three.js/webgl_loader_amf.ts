import {
  Panel,
  Group,
  vlayout,
  layoutConfig,
  Gravity,
  navbar,
  GestureContainer,
  gestureContainer,
  Color,
  loge,
} from "doric";
import { dangleView, DangleWebGLRenderingContext } from "dangle";

import * as THREE from "three";
import { OrbitControls } from "./jsm/controls/OrbitControls";
import { AMFLoader } from "./jsm/loaders/AMFLoader";

@Entry
class webgl_loader_amf extends Panel {
  private gestureView?: GestureContainer;

  onShow() {
    navbar(context).setTitle("webgl_loader_amf");
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
                  fn({
                    pageX: x * Environment.screenScale,
                    pageY: y * Environment.screenScale,
                    pointerType: "touch",
                  });
                };
              } else if (name == "pointerup") {
                self.gestureView!!.onTouchUp = ({ x, y }) => {
                  fn({
                    pageX: x * Environment.screenScale,
                    pageY: y * Environment.screenScale,
                    pointerType: "touch",
                  });
                };
              } else if (name == "pointermove") {
                self.gestureView!!.onTouchMove = ({ x, y }) => {
                  fn({
                    pageX: x * Environment.screenScale,
                    pageY: y * Environment.screenScale,
                    pointerType: "touch",
                  });
                };
              } else if (name == "pointercancel") {
                self.gestureView!!.onTouchCancel = ({ x, y }) => {
                  fn({
                    pageX: x * Environment.screenScale,
                    pageY: y * Environment.screenScale,
                    pointerType: "touch",
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
          } as HTMLCanvasElement;
          let window = {
            innerWidth: width,
            innerHeight: height,
            devicePixelRatio: 1,
            addEventListener: (() => {}) as any,
          };

          //#region code to impl

          let camera, scene, renderer;

          init();

          function init() {
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0x999999);

            scene.add(new THREE.AmbientLight(0x999999));

            camera = new THREE.PerspectiveCamera(
              35,
              window.innerWidth / window.innerHeight,
              1,
              500
            );

            // Z is up for objects intended to be 3D printed.

            camera.up.set(0, 0, 1);
            camera.position.set(0, -9, 6);

            camera.add(new THREE.PointLight(0xffffff, 0.8));

            scene.add(camera);

            const grid = new THREE.GridHelper(50, 50, 0xffffff, 0x555555);
            grid.rotateOnAxis(new THREE.Vector3(1, 0, 0), 90 * (Math.PI / 180));
            scene.add(grid);

            renderer = new THREE.WebGLRenderer({
              antialias: true,
              canvas: inputCanvas,
            });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            // document.body.appendChild( renderer.domElement );

            //@ts-ignore
            const loader = new AMFLoader();
            //@ts-ignore
            loader.load(
              "threejs/rook.amf",
              function (amfobject) {
                scene.add(amfobject);
                render();
              },
              function () {},
              function (error) {
                loge(error);
              }
            );

            const controls = new OrbitControls(camera, renderer.domElement);
            controls.addEventListener("change", render);
            //@ts-ignore
            controls.target.set(0, 1.2, 2);
            //@ts-ignore
            controls.update();

            window.addEventListener("resize", onWindowResize);
          }

          function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);

            render();
          }

          function render() {
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
