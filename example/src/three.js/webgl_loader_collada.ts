import {
  Panel,
  Group,
  vlayout,
  layoutConfig,
  Gravity,
  navbar,
  stack,
  loge,
} from "doric";
import { dangleView, DangleWebGLRenderingContext, vsync } from "dangle";

import * as THREE from "three";
import { ColladaLoader } from "./jsm/loaders/ColladaLoader";

@Entry
class webgl_loader_collada extends Panel {
  onShow() {
    navbar(context).setTitle("webgl_loader_collada");
  }
  build(rootView: Group) {
    vlayout([
      stack(
        [
          dangleView({
            onReady: async (gl: DangleWebGLRenderingContext) => {
              const width = gl.drawingBufferWidth;
              const height = gl.drawingBufferHeight;

              const inputCanvas = {
                width: width,
                height: height,
                style: {},
                addEventListener: (() => {}) as any,
                removeEventListener: (() => {}) as any,
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

              const requestAnimationFrame =
                vsync(context).requestAnimationFrame;

              //#region code to impl

              let container, stats, clock;
              let camera, scene, renderer, elf;

              init();
              animate();

              function init() {
                // container = document.getElementById("container");

                camera = new THREE.PerspectiveCamera(
                  45,
                  window.innerWidth / window.innerHeight,
                  0.1,
                  2000
                );
                camera.position.set(8, 10, 8);
                camera.lookAt(0, 3, 0);

                scene = new THREE.Scene();

                clock = new THREE.Clock();

                // loading manager

                const loadingManager = new THREE.LoadingManager(function () {
                  scene.add(elf);
                });

                // collada

                const loader = new ColladaLoader(loadingManager);
                loader.setPath("threejs/elf/");
                loader.load(
                  "elf.dae",
                  function (collada) {
                    elf = collada.scene;
                  },
                  function () {},
                  function (error) {
                    loge(error.stack);
                  }
                );

                //

                const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
                scene.add(ambientLight);

                const directionalLight = new THREE.DirectionalLight(
                  0xffffff,
                  0.8
                );
                directionalLight.position.set(1, 1, 0).normalize();
                scene.add(directionalLight);

                //

                renderer = new THREE.WebGLRenderer({ canvas: inputCanvas });
                renderer.outputEncoding = THREE.sRGBEncoding;
                renderer.setPixelRatio(window.devicePixelRatio);
                renderer.setSize(window.innerWidth, window.innerHeight);
                // container.appendChild(renderer.domElement);

                //

                // stats = new Stats();
                // container.appendChild(stats.dom);

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
                // stats.update();

                gl.endFrame();
              }

              function render() {
                const delta = clock.getDelta();

                if (elf !== undefined) {
                  elf.rotation.z += delta * 0.5;
                }

                renderer.render(scene, camera);
              }

              //#endregion
            },
          }).apply({
            layoutConfig: layoutConfig().just(),
            width: 300,
            height: 300,
          }),
        ],
        {
          layoutConfig: layoutConfig().just(),
          width: 300,
          height: 300,
        }
      ),
    ])
      .apply({
        layoutConfig: layoutConfig().fit().configAlignment(Gravity.Center),
        space: 20,
        gravity: Gravity.Center,
      })
      .in(rootView);
  }
}
