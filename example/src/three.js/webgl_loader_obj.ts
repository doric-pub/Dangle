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
  resourceLoader,
  loge,
  imageDecoder,
  AssetsResource,
} from "doric";
import { dangleView, DangleWebGLRenderingContext, vsync } from "dangle";

import * as THREE from "three";
import { OBJLoader } from "./jsm/loaders/OBJLoader";

@Entry
class webgl_loader_obj extends Panel {
  private gestureView?: GestureContainer;

  onShow() {
    navbar(context).setTitle("webgl_loader_obj");
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
    self.gestureView?.addChild(
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

          //#region code to impl
          let container;

          let camera, scene, renderer;

          let mouseX = 0,
            mouseY = 0;

          let windowHalfX = window.innerWidth / 2;
          let windowHalfY = window.innerHeight / 2;

          let object;

          await init();
          animate();

          async function init() {
            camera = new THREE.PerspectiveCamera(
              45,
              window.innerWidth / window.innerHeight,
              1,
              2000
            );
            camera.position.z = 250;

            // scene

            scene = new THREE.Scene();

            const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
            scene.add(ambientLight);

            const pointLight = new THREE.PointLight(0xffffff, 0.8);
            camera.add(pointLight);
            scene.add(camera);

            // manager

            function loadModel() {
              object.traverse(function (child) {
                if (child.isMesh) child.material.map = texture;
              });

              object.position.y = -95;
              scene.add(object);
            }

            const manager = new THREE.LoadingManager(loadModel);

            manager.onProgress = function (item, loaded, total) {
              console.log(item, loaded, total);
            };

            // texture
            const assetsResource = new AssetsResource(
              "threejs/uv_grid_opengl.jpg"
            );
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

            // const textureLoader = new THREE.TextureLoader( manager );
            // const texture = textureLoader.load( 'textures/uv_grid_opengl.jpg' );

            // model

            function onProgress(xhr) {
              if (xhr.lengthComputable) {
                const percentComplete = (xhr.loaded / xhr.total) * 100;
                // console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );
              }
            }

            function onError() {}

            const loader = new OBJLoader(manager);

            loge("begin fetch array buffer");
            const resource = new AssetsResource("threejs/male02/male02.obj");
            resourceLoader(context)
              .load(resource)
              .then((arrayBuffer) => {
                loge("got array buffer");
                const array = new Uint8Array(arrayBuffer);
                let text = "";
                for (let index = 0; index < array.length; index++) {
                  text += String.fromCharCode(array[index]);
                }
                loge("begin parse obj");
                object = loader.parse(text);
                loge("end parse obj");

                loadModel();
                loge("loadModel");
              })
              .catch(() => {
                loge("catch");
                onError();
              });

            //

            renderer = new THREE.WebGLRenderer({ canvas: inputCanvas });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);

            // document.addEventListener( 'mousemove', onDocumentMouseMove );
            self.gestureView!!.onTouchMove = ({ x, y }) => {
              onDocumentMouseMove({
                clientX: x * Environment.screenScale,
                clientY: y * Environment.screenScale,
              });
            };
            //

            window.addEventListener("resize", onWindowResize);
          }

          function onWindowResize() {
            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);
          }

          function onDocumentMouseMove(event) {
            mouseX = (event.clientX - windowHalfX) / 2;
            mouseY = (event.clientY - windowHalfY) / 2;
          }

          //

          function animate() {
            vsync(context).requestAnimationFrame(animate);
            render();
          }

          function render() {
            camera.position.x += (mouseX - camera.position.x) * 0.05;
            camera.position.y += (-mouseY - camera.position.y) * 0.05;

            camera.lookAt(scene.position);

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
