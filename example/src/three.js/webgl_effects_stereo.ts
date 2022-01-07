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
import { StereoEffect } from "./jsm/effects/StereoEffect";

@Entry
class webgl_effects_stereo extends Panel {
  private gestureView?: GestureContainer;

  onShow() {
    navbar(context).setTitle("webgl_effects_stereo");
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
          let container, camera, scene, renderer, effect;

          const spheres: any[] = [];

          let mouseX = 0,
            mouseY = 0;

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
              1,
              100000
            );
            camera.position.z = 3200;

            scene = new THREE.Scene();

            var textureCube;
            {
              const path = "threejs/Park3Med/";
              const format = ".jpg";
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

              let cube = new THREE.CubeTexture(textures);
              cube.needsUpdate = true;
              scene.background = cube;

              textureCube = new THREE.CubeTexture(textures);
              textureCube.mapping = THREE.CubeRefractionMapping;
              textureCube.needsUpdate = true;
            }

            const geometry = new THREE.SphereGeometry(100, 32, 16);

            const material = new THREE.MeshBasicMaterial({
              color: 0xffffff,
              envMap: textureCube,
              refractionRatio: 0.95,
            });

            for (let i = 0; i < 500; i++) {
              const mesh = new THREE.Mesh(geometry, material);
              mesh.position.x = Math.random() * 10000 - 5000;
              mesh.position.y = Math.random() * 10000 - 5000;
              mesh.position.z = Math.random() * 10000 - 5000;
              mesh.scale.x =
                mesh.scale.y =
                mesh.scale.z =
                  Math.random() * 3 + 1;
              scene.add(mesh);

              spheres.push(mesh);
            }

            //

            renderer = new THREE.WebGLRenderer({ canvas: inputCanvas });
            renderer.setPixelRatio(window.devicePixelRatio);
            // container.appendChild( renderer.domElement );

            effect = new StereoEffect(renderer);
            effect.setSize(window.innerWidth, window.innerHeight);

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
            mouseX = (event.clientX - windowHalfX) * 10;
            mouseY = (event.clientY - windowHalfY) * 10;
          }

          //

          function animate() {
            requestAnimationFrame(animate);

            render();

            gl.endFrame();
          }

          function render() {
            const timer = 0.0001 * Date.now();

            camera.position.x += (mouseX - camera.position.x) * 0.05;
            camera.position.y += (-mouseY - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            for (let i = 0, il = spheres.length; i < il; i++) {
              const sphere = spheres[i];

              sphere.position.x = 5000 * Math.cos(timer + i);
              sphere.position.y = 5000 * Math.sin(timer + i * 1.1);
            }

            effect.render(scene, camera);
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
