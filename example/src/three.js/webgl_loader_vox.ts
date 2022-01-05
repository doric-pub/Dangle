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
import { VOXLoader, VOXMesh } from "./jsm/loaders/VOXLoader";

@Entry
class webgl_loader_vox extends Panel {
  private gestureView?: GestureContainer;

  onShow() {
    navbar(context).setTitle("webgl_loader_vox");
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

          let camera, controls, scene, renderer;

          init();
          animate();

          function init() {
            camera = new THREE.PerspectiveCamera(
              50,
              window.innerWidth / window.innerHeight,
              0.01,
              10
            );
            camera.position.set(0.175, 0.075, 0.175);

            scene = new THREE.Scene();
            scene.add(camera);

            // light

            const hemiLight = new THREE.HemisphereLight(0x888888, 0x444444, 1);
            scene.add(hemiLight);

            const dirLight = new THREE.DirectionalLight(0xffffff, 0.75);
            dirLight.position.set(1.5, 3, 2.5);
            scene.add(dirLight);

            const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
            dirLight2.position.set(-1.5, -3, -2.5);
            scene.add(dirLight2);

            const loader = new VOXLoader();
            //@ts-ignore
            loader.load(
              "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/vox/monu10.vox",
              function (chunks) {
                for (let i = 0; i < chunks.length; i++) {
                  const chunk = chunks[i];

                  // displayPalette( chunk.palette );

                  const mesh = new VOXMesh(chunk);
                  mesh.scale.setScalar(0.0015);
                  scene.add(mesh);
                }
              }
            );

            // renderer

            renderer = new THREE.WebGLRenderer({ canvas: inputCanvas });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);

            // controls

            controls = new OrbitControls(camera, renderer.domElement);
            controls.minDistance = 0.1;
            controls.maxDistance = 0.5;

            //

            window.addEventListener("resize", onWindowResize);
          }

          /*
            function displayPalette( palette ) {
              const canvas = document.createElement( 'canvas' );
              canvas.width = 8;
              canvas.height = 32;
              canvas.style.position = 'absolute';
              canvas.style.top = '0';
              canvas.style.width = '100px';
              canvas.style.imageRendering = 'pixelated';
              document.body.appendChild( canvas );
              const context = canvas.getContext( '2d' );
              for ( let c = 0; c < 256; c ++ ) {
                const x = c % 8;
                const y = Math.floor( c / 8 );
                const hex = palette[ c + 1 ];
                const r = hex >> 0 & 0xff;
                const g = hex >> 8 & 0xff;
                const b = hex >> 16 & 0xff;
                context.fillStyle = `rgba(${r},${g},${b},1)`;
                context.fillRect( x, 31 - y, 1, 1 );
              }
            }
          */

          function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);
          }

          function animate() {
            requestAnimationFrame(animate);

            controls.update();

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
