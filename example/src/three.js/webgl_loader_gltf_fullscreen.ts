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
import { GLTFLoader } from "./jsm/loaders/GLTFLoader";
import { RGBELoader } from "./jsm/loaders/RGBELoader";

@Entry
class webgl_loader_gltf_fullscreen extends Panel {
  private gestureView?: GestureContainer;

  onShow() {
    navbar(context).setTitle("webgl_loader_gltf_fullscreen");
  }
  build(rootView: Group) {
    vlayout([
      (this.gestureView = gestureContainer([], {
        layoutConfig: layoutConfig().just(),
        width: Environment.screenWidth,
        height: Environment.screenHeight,
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
          let requestAnimationFrame = vsync(context).requestAnimationFrame;

          //#region code to impl

          let camera, scene, renderer;

          init();
          render();

          function init() {
            camera = new THREE.PerspectiveCamera(
              45,
              window.innerWidth / window.innerHeight,
              0.25,
              500
            );
            camera.position.set(5, 4, 0);

            scene = new THREE.Scene();

            //@ts-ignore
            new RGBELoader()
              //@ts-ignore
              .load(
                "threejs/Joost_Vanhoutte-Experiment_0001_4k.hdr",
                function (texture) {
                  texture.mapping = THREE.EquirectangularRefractionMapping;

                  scene.background = texture;
                  scene.environment = texture;

                  render();

                  // model

                  //@ts-ignore
                  const loader = new GLTFLoader();
                  //@ts-ignore
                  loader.load("threejs/hall/hall.gltf", function (gltf) {
                    const model = gltf.scene;
                    scene.add(model);

                    render();
                  });
                }
              );

            renderer = new THREE.WebGLRenderer({
              antialias: true,
              canvas: inputCanvas,
            });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1;
            renderer.outputEncoding = THREE.sRGBEncoding;

            {
              const color = 0xb0dfff;
              const intensity = 0.5;
              const light = new THREE.DirectionalLight(color, intensity);
              light.position.set(12.168, 7.03, 5.3117);
              light.rotation.set(-0.05, 1.117, 0.651);
              light.scale.set(4, 4, 4);
              scene.add(light);

              const lightHelper = new THREE.DirectionalLightHelper(light);
              // scene.add(lightHelper);
            }

            {
              const color = 0xb66aff;
              const intensity = 0.2;
              const light = new THREE.DirectionalLight(color, intensity);
              light.position.set(11.092, 3.5213, -4.9768);
              light.rotation.set(0, 1.349, -0.55);
              light.scale.set(4, 4, 4);
              scene.add(light);

              const lightHelper = new THREE.DirectionalLightHelper(light);
              // scene.add(lightHelper);
            }

            const controls = new OrbitControls(
              camera,
              renderer.domElement
            ) as any;
            controls.addEventListener("change", render); // use if there is no animation loop
            controls.target.set(4.9, 3.9, 0);
            controls.update();

            window.addEventListener("resize", onWindowResize);
          }

          function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);

            render();
          }

          //

          function render() {
            renderer.render(scene, camera);

            gl.endFrame();
          }

          //#endregion
        },
      }).apply({
        layoutConfig: layoutConfig().just(),
        width: Environment.screenWidth,
        height: Environment.screenHeight,
      })
    );
  }
}
