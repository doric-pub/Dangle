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
  imageDecoder,
  AssetsResource,
} from "doric";
import { dangleView, DangleWebGLRenderingContext, vsync } from "dangle";

import * as THREE from "three";
import { ParallaxBarrierEffect } from "./jsm/effects/ParallaxBarrierEffect";

@Entry
class webgl_effects_parallaxbarrier_instanced_mesh extends Panel {
  private gestureView?: GestureContainer;

  onShow() {
    navbar(context).setTitle("webgl_effects_parallaxbarrier_instanced_mesh");
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
    this.gestureView?.addChild(
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
          let camera, scene, renderer, effect, mesh;
          let positions: any[] = [];

          const spheres: any[] = [];

          let mouseX = 0;
          let mouseY = 0;

          let windowHalfX = window.innerWidth / 2;
          let windowHalfY = window.innerHeight / 2;

          // document.addEventListener( 'mousemove', onDocumentMouseMove );
          self.gestureView!!.onTouchMove = ({ x, y }) => {
            onDocumentMouseMove({
              clientX: x * Environment.screenScale,
              clientY: y * Environment.screenScale,
            });
          };

          await init();
          animate();

          async function init() {
            // container = document.createElement( 'div' );
            // document.body.appendChild( container );

            camera = new THREE.PerspectiveCamera(
              60,
              window.innerWidth / window.innerHeight,
              0.01,
              100
            );
            camera.position.z = 3;
            camera.focalLength = 3;

            const path = "threejs/pisa/";
            const format = ".png";
            const urls = [
              path + "px" + format,
              path + "nx" + format,
              path + "py" + format,
              path + "ny" + format,
              path + "pz" + format,
              path + "nz" + format,
            ];

            var textures: any[] = [];
            for (let index = 0; index < urls.length; index++) {
              const url = urls[index];
              const assetsResource = new AssetsResource(url);
              const imageInfo = await imageDecoder(context).getImageInfo(
                assetsResource
              );
              const imagePixels = await imageDecoder(context).decodeToPixels(
                assetsResource
              );

              const texture = new THREE.DataTexture(
                imagePixels,
                imageInfo.width,
                imageInfo.height,
                THREE.RGBAFormat
              );
              textures.push(texture);
            }

            var textureCube = new THREE.CubeTexture(textures);
            textureCube.needsUpdate = true;

            scene = new THREE.Scene();
            scene.background = textureCube;

            const geometry = new THREE.SphereGeometry(0.1, 32, 16);
            const material = new THREE.MeshBasicMaterial({
              color: 0xffffff,
              envMap: textureCube,
            });

            mesh = new THREE.InstancedMesh(geometry, material, 500);
            for (let i = 0; i < 500; i++) {
              const matrix = new THREE.Matrix4();
              const scale = Math.random() * 3 + 1;
              const quaternion = new THREE.Quaternion();
              let position = new THREE.Vector3(
                Math.random() * 10 - 5,
                Math.random() * 10 - 5,
                Math.random() * 10 - 5
              );
              positions.push(position);
              matrix.compose(
                position,
                quaternion,
                new THREE.Vector3(scale, scale, scale)
              );
              mesh.setMatrixAt(i, matrix);

              spheres.push(mesh);
            }

            scene.add(mesh);
            //

            renderer = new THREE.WebGLRenderer({ canvas: inputCanvas });
            renderer.setPixelRatio(window.devicePixelRatio);
            // container.appendChild( renderer.domElement );

            const width = window.innerWidth || 2;
            const height = window.innerHeight || 2;

            effect = new ParallaxBarrierEffect(renderer);
            effect.setSize(width, height);

            //

            window.addEventListener("resize", onWindowResize);
          }

          function onWindowResize() {
            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            effect.setSize(window.innerWidth, window.innerHeight);
          }

          function onDocumentMouseMove(event) {
            mouseX = (event.clientX - windowHalfX) / 100;
            mouseY = (event.clientY - windowHalfY) / 100;
          }

          //

          function animate() {
            requestAnimationFrame(animate);

            render();
          }

          function render() {
            const timer = 0.0001 * Date.now();

            camera.position.x += (mouseX - camera.position.x) * 0.05;
            camera.position.y += (-mouseY - camera.position.y) * 0.05;

            camera.lookAt(scene.position);

            const meshInstanced = mesh as THREE.InstancedMesh;
            for (let i = 0; i < 500; i++) {
              const matrix = new THREE.Matrix4();
              meshInstanced.getMatrixAt(i, matrix);
              var position = new THREE.Vector3();
              position = position.setFromMatrixPosition(matrix);
              position.x = 5 * Math.cos(timer + i);
              position.y = 5 * Math.sin(timer + i * 1.1);

              var scale = new THREE.Vector3();
              scale = scale.setFromMatrixScale(matrix);

              var qt = new THREE.Quaternion();

              const newMatrix = matrix.compose(position, qt, scale);

              meshInstanced.setMatrixAt(i, newMatrix);
            }
            meshInstanced.instanceMatrix.needsUpdate = true;

            effect.render(scene, camera);

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
