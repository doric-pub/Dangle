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
import { DDSLoader } from "./jsm/loaders/DDSLoader";

@Entry
class webgl_loader_texture_dds extends Panel {
  onShow() {
    navbar(context).setTitle("webgl_loader_texture_dds");
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
                camera = new THREE.PerspectiveCamera(
                  50,
                  window.innerWidth / window.innerHeight,
                  1,
                  2000
                );
                camera.position.z = 1000;

                scene = new THREE.Scene();

                const geometry = new THREE.BoxGeometry(200, 200, 200);

                /*
                This is how compressed textures are supposed to be used:
                DXT1 - RGB - opaque textures
                DXT3 - RGBA - transparent textures with sharp alpha transitions
                DXT5 - RGBA - transparent textures with full alpha range
                */

                //@ts-ignore
                const loader = new DDSLoader();

                //@ts-ignore
                const map1 = loader.load(
                  "threejs/disturb_dxt1_nomip.dds"
                );
                map1.minFilter = map1.magFilter = THREE.LinearFilter;
                map1.anisotropy = 4;

                //@ts-ignore
                const map2 = loader.load(
                  "threejs/disturb_dxt1_mip.dds"
                );
                map2.anisotropy = 4;

                //@ts-ignore
                const map3 = loader.load(
                  "threejs/hepatica_dxt3_mip.dds"
                );
                map3.anisotropy = 4;

                //@ts-ignore
                const map4 = loader.load(
                  "threejs/explosion_dxt5_mip.dds"
                );
                map4.anisotropy = 4;

                //@ts-ignore
                const map5 = loader.load(
                  "threejs/disturb_argb_nomip.dds"
                );
                map5.minFilter = map5.magFilter = THREE.LinearFilter;
                map5.anisotropy = 4;

                //@ts-ignore
                const map6 = loader.load(
                  "threejs/disturb_argb_mip.dds"
                );
                map6.anisotropy = 4;

                //@ts-ignore
                const cubemap1 = loader.load(
                  "threejs/Mountains.dds",
                  function (texture) {
                    texture.magFilter = THREE.LinearFilter;
                    texture.minFilter = THREE.LinearFilter;
                    texture.mapping = THREE.CubeReflectionMapping;
                    material1.needsUpdate = true;
                  }
                );

                //@ts-ignore
                const cubemap2 = loader.load(
                  "threejs/Mountains_argb_mip.dds",
                  function (texture) {
                    texture.magFilter = THREE.LinearFilter;
                    texture.minFilter = THREE.LinearFilter;
                    texture.mapping = THREE.CubeReflectionMapping;
                    material5.needsUpdate = true;
                  }
                );

                //@ts-ignore
                const cubemap3 = loader.load(
                  "threejs/Mountains_argb_nomip.dds",
                  function (texture) {
                    texture.magFilter = THREE.LinearFilter;
                    texture.minFilter = THREE.LinearFilter;
                    texture.mapping = THREE.CubeReflectionMapping;
                    material6.needsUpdate = true;
                  }
                );

                const material1 = new THREE.MeshBasicMaterial({
                  map: map1,
                  envMap: cubemap1,
                });
                const material2 = new THREE.MeshBasicMaterial({ map: map2 });
                const material3 = new THREE.MeshBasicMaterial({
                  map: map3,
                  alphaTest: 0.5,
                  side: THREE.DoubleSide,
                });
                const material4 = new THREE.MeshBasicMaterial({
                  map: map4,
                  side: THREE.DoubleSide,
                  blending: THREE.AdditiveBlending,
                  depthTest: false,
                  transparent: true,
                });
                const material5 = new THREE.MeshBasicMaterial({
                  envMap: cubemap2,
                });
                const material6 = new THREE.MeshBasicMaterial({
                  envMap: cubemap3,
                });
                const material7 = new THREE.MeshBasicMaterial({ map: map5 });
                const material8 = new THREE.MeshBasicMaterial({ map: map6 });

                let mesh = new THREE.Mesh(
                  new THREE.TorusGeometry(100, 50, 32, 16),
                  material1
                );
                mesh.position.x = -600;
                mesh.position.y = -200;
                scene.add(mesh);
                meshes.push(mesh);

                //@ts-ignore
                mesh = new THREE.Mesh(geometry, material2);
                mesh.position.x = -200;
                mesh.position.y = -200;
                scene.add(mesh);
                meshes.push(mesh);

                //@ts-ignore
                mesh = new THREE.Mesh(geometry, material3);
                mesh.position.x = -200;
                mesh.position.y = 200;
                scene.add(mesh);
                meshes.push(mesh);

                //@ts-ignore
                mesh = new THREE.Mesh(geometry, material4);
                mesh.position.x = -600;
                mesh.position.y = 200;
                scene.add(mesh);
                meshes.push(mesh);

                //@ts-ignore
                mesh = new THREE.Mesh(geometry, material5);
                mesh.position.x = 200;
                mesh.position.y = 200;
                scene.add(mesh);
                meshes.push(mesh);

                //@ts-ignore
                mesh = new THREE.Mesh(geometry, material6);
                mesh.position.x = 200;
                mesh.position.y = -200;
                scene.add(mesh);
                meshes.push(mesh);

                //@ts-ignore
                mesh = new THREE.Mesh(geometry, material7);
                mesh.position.x = 600;
                mesh.position.y = -200;
                scene.add(mesh);
                meshes.push(mesh);

                //@ts-ignore
                mesh = new THREE.Mesh(geometry, material8);
                mesh.position.x = 600;
                mesh.position.y = 200;
                scene.add(mesh);
                meshes.push(mesh);

                renderer = new THREE.WebGLRenderer({
                  antialias: true,
                  canvas: inputCanvas,
                });
                renderer.setPixelRatio(window.devicePixelRatio);
                renderer.setSize(window.innerWidth, window.innerHeight);

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
            width: Environment.screenWidth - 4,
            height: 250,
          }),
        ],
        {
          layoutConfig: layoutConfig().just(),
          width: Environment.screenWidth - 4,
          height: 250,
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
