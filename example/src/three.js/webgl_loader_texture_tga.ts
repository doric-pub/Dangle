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
import { TGALoader } from "./jsm/loaders/TGALoader";

@Entry
class webgl_loader_texture_tga extends Panel {
  private gestureView?: GestureContainer;

  onShow() {
    navbar(context).setTitle("webgl_loader_texture_tga");
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

          let camera, scene, renderer, stats;

          init();
          animate();

          function init() {
            camera = new THREE.PerspectiveCamera(
              45,
              window.innerWidth / window.innerHeight,
              0.1,
              1000
            );
            camera.position.set(0, 50, 250);

            scene = new THREE.Scene();

            //

            //@ts-ignore
            const loader = new TGALoader();
            const geometry = new THREE.BoxGeometry(50, 50, 50);

            // add box 1 - grey8 texture

            //@ts-ignore
            const texture1 = loader.load(
              "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/crate_grey8.tga"
            );
            const material1 = new THREE.MeshPhongMaterial({
              color: 0xffffff,
              map: texture1,
            });

            const mesh1 = new THREE.Mesh(geometry, material1);
            mesh1.position.x = -50;

            scene.add(mesh1);

            // add box 2 - tga texture

            //@ts-ignore
            const texture2 = loader.load(
              "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/crate_color8.tga"
            );
            const material2 = new THREE.MeshPhongMaterial({
              color: 0xffffff,
              map: texture2,
            });

            const mesh2 = new THREE.Mesh(geometry, material2);
            mesh2.position.x = 50;

            scene.add(mesh2);

            //

            const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
            scene.add(ambientLight);

            const light = new THREE.DirectionalLight(0xffffff, 1);
            light.position.set(1, 1, 1);
            scene.add(light);

            //

            renderer = new THREE.WebGLRenderer({
              antialias: true,
              canvas: inputCanvas,
            });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);

            //

            const controls = new OrbitControls(camera, renderer.domElement);
            //@ts-ignore
            controls.enableZoom = false;

            //

            window.addEventListener("resize", onWindowResize);
          }

          function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);
          }

          function animate() {
            requestAnimationFrame(animate);

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
