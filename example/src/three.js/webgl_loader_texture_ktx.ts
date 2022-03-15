import {
  Panel,
  Group,
  vlayout,
  layoutConfig,
  Gravity,
  navbar,
  stack,
  Color,
} from "doric";
import { dangleView, DangleWebGLRenderingContext, vsync } from "dangle";

import * as THREE from "three";
import { KTXLoader } from "./jsm/loaders/KTXLoader";

@Entry
class webgl_loader_texture_ktx extends Panel {
  onShow() {
    navbar(context).setTitle("webgl_loader_texture_ktx");
  }
  build(rootView: Group) {
    vlayout([
      stack(
        [
          dangleView({
            onReady: (gl: DangleWebGLRenderingContext) => {
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

              let camera, scene, renderer;
              const meshes: any[] = [];

              init();
              animate();

              function init() {
                renderer = new THREE.WebGLRenderer({
                  antialias: true,
                  canvas: inputCanvas,
                });
                renderer.setPixelRatio(window.devicePixelRatio);
                renderer.setSize(window.innerWidth, window.innerHeight);

                const formats = {
                  astc: renderer.extensions.has(
                    "WEBGL_compressed_texture_astc"
                  ),
                  etc1: renderer.extensions.has(
                    "WEBGL_compressed_texture_etc1"
                  ),
                  s3tc: renderer.extensions.has(
                    "WEBGL_compressed_texture_s3tc"
                  ),
                  pvrtc: renderer.extensions.has(
                    "WEBGL_compressed_texture_pvrtc"
                  ),
                };

                camera = new THREE.PerspectiveCamera(
                  50,
                  window.innerWidth / window.innerHeight,
                  1,
                  2000
                );
                camera.position.z = 1000;

                scene = new THREE.Scene();

                const geometry = new THREE.BoxGeometry(200, 200, 200);
                let material1, material2;

                // TODO: add cubemap support
                //@ts-ignore
                const loader = new KTXLoader();

                if (formats.pvrtc) {
                  material1 = new THREE.MeshBasicMaterial({
                    //@ts-ignore
                    map: loader.load("threejs/disturb_PVR2bpp.ktx"),
                  });
                  material2 = new THREE.MeshBasicMaterial({
                    //@ts-ignore
                    map: loader.load("threejs/lensflare_PVR4bpp.ktx"),
                    depthTest: false,
                    transparent: true,
                    side: THREE.DoubleSide,
                  });

                  meshes.push(new THREE.Mesh(geometry, material1));
                  meshes.push(new THREE.Mesh(geometry, material2));
                }

                if (formats.s3tc) {
                  material1 = new THREE.MeshBasicMaterial({
                    //@ts-ignore
                    map: loader.load("threejs/disturb_BC1.ktx"),
                  });
                  material2 = new THREE.MeshBasicMaterial({
                    //@ts-ignore
                    map: loader.load("threejs/lensflare_BC3.ktx"),
                    depthTest: false,
                    transparent: true,
                    side: THREE.DoubleSide,
                  });

                  meshes.push(new THREE.Mesh(geometry, material1));
                  meshes.push(new THREE.Mesh(geometry, material2));
                }

                if (formats.etc1) {
                  material1 = new THREE.MeshBasicMaterial({
                    //@ts-ignore
                    map: loader.load("threejs/disturb_ETC1.ktx"),
                  });

                  meshes.push(new THREE.Mesh(geometry, material1));
                }

                if (formats.astc) {
                  material1 = new THREE.MeshBasicMaterial({
                    //@ts-ignore
                    map: loader.load("threejs/disturb_ASTC4x4.ktx"),
                  });
                  material2 = new THREE.MeshBasicMaterial({
                    //@ts-ignore
                    map: loader.load("threejs/lensflare_ASTC8x8.ktx"),
                    depthTest: false,
                    transparent: true,
                    side: THREE.DoubleSide,
                  });

                  meshes.push(new THREE.Mesh(geometry, material1));
                  meshes.push(new THREE.Mesh(geometry, material2));
                }

                let x = (-meshes.length / 2) * 150;
                for (let i = 0; i < meshes.length; ++i, x += 300) {
                  const mesh = meshes[i];
                  mesh.position.x = x;
                  mesh.position.y = 0;
                  scene.add(mesh);
                }

                window.addEventListener("resize", onWindowResize);
              }

              function onWindowResize() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();

                renderer.setSize(window.innerWidth, window.innerHeight);
              }

              function animate() {
                requestAnimationFrame(animate);

                const time = Date.now() * 0.001;

                for (let i = 0; i < meshes.length; i++) {
                  const mesh = meshes[i];
                  mesh.rotation.x = time;
                  mesh.rotation.y = time;
                }

                renderer.render(scene, camera);

                gl.endFrame();
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
          backgroundColor: Color.BLACK,
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
