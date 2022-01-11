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
import { RenderPass } from "./jsm/postprocessing/RenderPass";
import { ShaderPass } from "./jsm/postprocessing/ShaderPass";
import { EffectComposer } from "./jsm/postprocessing/EffectComposer";
import { CopyShader } from "./jsm/shaders/CopyShader";

@Entry
class webgl2_multisampled_renderbuffers extends Panel {
  onShow() {
    navbar(context).setTitle("webgl2_multisampled_renderbuffers");
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

              let camera, renderer, clock, group;

              let composer1, composer2;

              init();

              function init() {
                camera = new THREE.PerspectiveCamera(
                  45,
                  window.innerWidth / window.innerHeight,
                  1,
                  2000
                );
                camera.position.z = 500;

                const scene = new THREE.Scene();
                scene.background = new THREE.Color(0xffffff);
                scene.fog = new THREE.Fog(0xcccccc, 100, 1500);

                clock = new THREE.Clock();

                //

                const hemiLight = new THREE.HemisphereLight(
                  0xffffff,
                  0x222222,
                  1.5
                );
                hemiLight.position.set(1, 1, 1);
                scene.add(hemiLight);

                //

                group = new THREE.Group();

                const geometry = new THREE.SphereGeometry(10, 64, 40);
                const material = new THREE.MeshLambertMaterial({
                  color: 0xee0808,
                });
                const material2 = new THREE.MeshBasicMaterial({
                  color: 0xffffff,
                  wireframe: true,
                });

                for (let i = 0; i < 10; i++) {
                  const mesh = new THREE.Mesh(geometry, material);
                  mesh.position.x = Math.random() * 600 - 300;
                  mesh.position.y = Math.random() * 600 - 300;
                  mesh.position.z = Math.random() * 600 - 300;
                  mesh.rotation.x = Math.random();
                  mesh.rotation.z = Math.random();
                  mesh.scale.setScalar(Math.random() * 5 + 5);
                  group.add(mesh);

                  const mesh2 = new THREE.Mesh(geometry, material2);
                  mesh2.position.copy(mesh.position);
                  mesh2.rotation.copy(mesh.rotation);
                  mesh2.scale.copy(mesh.scale);
                  group.add(mesh2);
                }

                scene.add(group);

                //

                renderer = new THREE.WebGLRenderer({ canvas: inputCanvas });
                renderer.autoClear = false;
                renderer.setPixelRatio(window.devicePixelRatio);
                renderer.setSize(window.innerWidth, window.innerHeight);

                //

                const parameters = {
                  format: THREE.RGBFormat,
                };

                const size = renderer.getDrawingBufferSize(new THREE.Vector2());
                const renderTarget = new THREE.WebGLMultisampleRenderTarget(
                  size.width,
                  size.height,
                  parameters
                );

                //@ts-ignore
                const renderPass = new RenderPass(scene, camera);
                //@ts-ignore
                const copyPass = new ShaderPass(CopyShader);

                //

                //@ts-ignore
                composer1 = new EffectComposer(renderer);
                composer1.addPass(renderPass);
                composer1.addPass(copyPass);

                //

                composer2 = new EffectComposer(renderer, renderTarget);
                composer2.addPass(renderPass);
                composer2.addPass(copyPass);

                //

                window.addEventListener("resize", onWindowResize);

                animate();
              }

              function onWindowResize() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();

                renderer.setSize(window.innerWidth, window.innerHeight);
                composer1.setSize(window.innerWidth, window.innerHeight);
                composer2.setSize(window.innerWidth, window.innerHeight);
              }

              function animate() {
                requestAnimationFrame(animate);

                const halfWidth = window.innerWidth / 2;

                group.rotation.y += clock.getDelta() * 0.1;

                renderer.setScissorTest(true);

                renderer.setScissor(0, 0, halfWidth - 1, window.innerHeight);
                composer1.render();

                renderer.setScissor(
                  halfWidth,
                  0,
                  halfWidth,
                  window.innerHeight
                );
                composer2.render();

                renderer.setScissorTest(false);

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
