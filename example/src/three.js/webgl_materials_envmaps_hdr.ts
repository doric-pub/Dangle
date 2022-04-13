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
import { HDRCubeTextureLoader } from "./jsm/loaders/HDRCubeTextureLoader";
import { RGBMLoader } from "./jsm/loaders/RGBMLoader";
import { DebugEnvironment } from "./jsm/environments/DebugEnvironment";
import { CubeTextureLoader } from "./dangle/assets/CubeTextureLoader";

@Entry
class webgl_materials_envmaps_hdr extends Panel {
  private gestureView?: GestureContainer;

  onShow() {
    navbar(context).setTitle("webgl_materials_envmaps_hdr");
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

          const params = {
            envMap: "HDR",
            roughness: 0.0,
            metalness: 0.0,
            exposure: 1.0,
            debug: false,
          };

          let camera, scene, renderer, controls;
          let torusMesh, planeMesh;
          let generatedCubeRenderTarget,
            ldrCubeRenderTarget,
            hdrCubeRenderTarget,
            rgbmCubeRenderTarget;
          let ldrCubeMap, hdrCubeMap, rgbmCubeMap;

          init();
          animate();

          function init() {
            camera = new THREE.PerspectiveCamera(
              40,
              window.innerWidth / window.innerHeight,
              1,
              1000
            );
            camera.position.set(0, 0, 120);

            scene = new THREE.Scene();
            scene.background = new THREE.Color(0x000000);

            renderer = new THREE.WebGLRenderer({ canvas: inputCanvas });
            renderer.physicallyCorrectLights = true;
            renderer.toneMapping = THREE.ACESFilmicToneMapping;

            //

            let geometry = new THREE.TorusKnotGeometry(18, 8, 150, 20);
            // let geometry = new THREE.SphereGeometry( 26, 64, 32 );
            let material = new THREE.MeshStandardMaterial({
              color: 0xffffff,
              metalness: params.metalness,
              roughness: params.roughness,
            });

            torusMesh = new THREE.Mesh(geometry, material);
            scene.add(torusMesh);

            //@ts-ignore
            geometry = new THREE.PlaneGeometry(200, 200);
            //@ts-ignore
            material = new THREE.MeshBasicMaterial();

            planeMesh = new THREE.Mesh(geometry, material);
            planeMesh.position.y = -50;
            planeMesh.rotation.x = -Math.PI * 0.5;
            scene.add(planeMesh);

            THREE.DefaultLoadingManager.onLoad = function () {
              pmremGenerator.dispose();
            };

            const hdrUrls = [
              "threejs/pisaHDR/px.hdr",
              "threejs/pisaHDR/nx.hdr",
              "threejs/pisaHDR/py.hdr",
              "threejs/pisaHDR/ny.hdr",
              "threejs/pisaHDR/pz.hdr",
              "threejs/pisaHDR/nz.hdr",
            ];
            //@ts-ignore
            hdrCubeMap = new HDRCubeTextureLoader()
              //@ts-ignore
              .load(hdrUrls, function () {
                hdrCubeRenderTarget = pmremGenerator.fromCubemap(hdrCubeMap);

                hdrCubeMap.magFilter = THREE.LinearFilter;
                hdrCubeMap.needsUpdate = true;
              });

            const ldrUrls = [
              "threejs/pisa/px.png",
              "threejs/pisa/nx.png",
              "threejs/pisa/py.png",
              "threejs/pisa/ny.png",
              "threejs/pisa/pz.png",
              "threejs/pisa/nz.png",
            ];
            //@ts-ignore
            ldrCubeMap = new CubeTextureLoader().load(ldrUrls, function () {
              ldrCubeMap.encoding = THREE.sRGBEncoding;

              ldrCubeRenderTarget = pmremGenerator.fromCubemap(ldrCubeMap);
            });

            const rgbmUrls = [
              "threejs/pisaRGBM16/px.png",
              "threejs/pisaRGBM16/nx.png",
              "threejs/pisaRGBM16/py.png",
              "threejs/pisaRGBM16/ny.png",
              "threejs/pisaRGBM16/pz.png",
              "threejs/pisaRGBM16/nz.png",
            ];
            //@ts-ignore
            rgbmCubeMap = new RGBMLoader()
              .setMaxRange(16)
              //@ts-ignore
              .loadCubemap(rgbmUrls, function () {
                rgbmCubeRenderTarget = pmremGenerator.fromCubemap(rgbmCubeMap);
              });

            const pmremGenerator = new THREE.PMREMGenerator(renderer);
            pmremGenerator.compileCubemapShader();

            const envScene = new DebugEnvironment();
            generatedCubeRenderTarget = pmremGenerator.fromScene(envScene);

            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);

            //renderer.toneMapping = ReinhardToneMapping;
            renderer.outputEncoding = THREE.sRGBEncoding;

            controls = new OrbitControls(camera, renderer.domElement);
            controls.minDistance = 50;
            controls.maxDistance = 300;

            window.addEventListener("resize", onWindowResize);

            // const gui = new GUI();

            // gui.add( params, 'envMap', [ 'Generated', 'LDR', 'HDR', 'RGBM16' ] );
            // gui.add( params, 'roughness', 0, 1, 0.01 );
            // gui.add( params, 'metalness', 0, 1, 0.01 );
            // gui.add( params, 'exposure', 0, 2, 0.01 );
            // gui.add( params, 'debug', false );
            // gui.open();
          }

          function onWindowResize() {
            const width = window.innerWidth;
            const height = window.innerHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            renderer.setSize(width, height);
          }

          function animate() {
            requestAnimationFrame(animate);

            render();

            gl.endFrame();
          }

          function render() {
            torusMesh.material.roughness = params.roughness;
            torusMesh.material.metalness = params.metalness;

            let renderTarget, cubeMap;

            switch (params.envMap) {
              case "Generated":
                renderTarget = generatedCubeRenderTarget;
                cubeMap = generatedCubeRenderTarget.texture;
                break;
              case "LDR":
                renderTarget = ldrCubeRenderTarget;
                cubeMap = ldrCubeMap;
                break;
              case "HDR":
                renderTarget = hdrCubeRenderTarget;
                cubeMap = hdrCubeMap;
                break;
              case "RGBM16":
                renderTarget = rgbmCubeRenderTarget;
                cubeMap = rgbmCubeMap;
                break;
            }

            const newEnvMap = renderTarget ? renderTarget.texture : null;

            if (newEnvMap && newEnvMap !== torusMesh.material.envMap) {
              torusMesh.material.envMap = newEnvMap;
              torusMesh.material.needsUpdate = true;

              planeMesh.material.map = newEnvMap;
              planeMesh.material.needsUpdate = true;
            }

            torusMesh.rotation.y += 0.005;
            planeMesh.visible = params.debug;

            scene.background = cubeMap;
            renderer.toneMappingExposure = params.exposure;

            renderer.render(scene, camera);
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
