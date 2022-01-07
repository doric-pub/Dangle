import {
  Panel,
  Group,
  vlayout,
  layoutConfig,
  Gravity,
  navbar,
  stack,
  loge,
  resourceLoader,
  AssetsResource,
} from "doric";
import { dangleView, DangleWebGLRenderingContext, vsync } from "dangle";

import * as THREE from "three";
import { OBJLoader } from "./jsm/loaders/OBJLoader";

@Entry
class zeekr_001 extends Panel {
  onShow() {
    navbar(context).setTitle("zeekr_001");
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

              let requestAnimationFrame = vsync(context).requestAnimationFrame;

              //#region code to impl
              const scene = new THREE.Scene();

              const camera = new THREE.PerspectiveCamera(
                50,
                window.innerWidth / window.innerHeight,
                0.01,
                3000
              );
              camera.position.set(-1223.735, 825.791, 1223.659);
              camera.lookAt(scene.position);

              const renderer = new THREE.WebGLRenderer({
                antialias: true,
                canvas: inputCanvas,
              });
              renderer.setPixelRatio(window.devicePixelRatio);
              renderer.setSize(window.innerWidth, window.innerHeight);

              {
                const light = new THREE.HemisphereLight(
                  0x777777,
                  0x151515,
                  0.89
                );
                light.position.set(0, 1, 0);
                scene.add(light);
              }

              {
                const light = new THREE.DirectionalLight(0xffffff, 1.12);
                light.position.set(35.303, 7.243, 7);
                scene.add(light);
              }

              {
                const light = new THREE.DirectionalLight(0xffffff, 1.32);
                light.position.set(-0.637, 0.511, -1.785);
                scene.add(light);
              }

              {
                const light = new THREE.DirectionalLight(0xffffff, 1.3);
                light.position.set(-0.637, 0.511, 1.8);
                scene.add(light);
              }

              //@ts-ignore
              const loader = new OBJLoader();

              for (let index = 0; index <= 66; index++) {
                var position = index.toString();
                if (index < 10) {
                  position = "0" + index.toString();
                }
                const resource = new AssetsResource(
                  "threejs/zeekr_001/models/car-" + position + ".obj"
                );
                resourceLoader(context)
                  .load(resource)
                  .then((arrayBuffer) => {
                    const array = new Uint8Array(arrayBuffer);
                    let text = "";
                    for (let index = 0; index < array.length; index++) {
                      text += String.fromCharCode(array[index]);
                    }
                    const object = loader.parse(text);

                    scene.add(object);
                    loge("loadModel");
                  })
                  .catch(() => {
                    loge("catch");
                  });
              }

              function animate() {
                requestAnimationFrame(animate);

                renderer.render(scene, camera);
                gl.endFrame();
              }

              animate();

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
