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
import { Water } from "./jsm/objects/Water";
import { TextureLoader } from "./dangle/TextureLoader";
import { Sky } from "./jsm/objects/Sky";

@Entry
class webgl_shaders_ocean extends Panel {
  private gestureView?: GestureContainer;

  onShow() {
    navbar(context).setTitle("webgl_shaders_ocean");
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
                  fn({ pageX: x, pageY: y, pointerType: "touch" });
                };
              } else if (name == "pointerup") {
                self.gestureView!!.onTouchUp = ({ x, y }) => {
                  fn({ pageX: x, pageY: y, pointerType: "touch" });
                };
              } else if (name == "pointermove") {
                self.gestureView!!.onTouchMove = ({ x, y }) => {
                  fn({ pageX: x, pageY: y, pointerType: "touch" });
                };
              } else if (name == "pointercancel") {
                self.gestureView!!.onTouchCancel = ({ x, y }) => {
                  fn({ pageX: x, pageY: y, pointerType: "touch" });
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

          const requestAnimationFrame = vsync(context).requestAnimationFrame;

          //#region code to impl

          let camera, scene, renderer;
          let controls, water, sun, mesh;

          init();
          animate();

          function init() {
            //

            renderer = new THREE.WebGLRenderer({ canvas: inputCanvas });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.toneMapping = THREE.ACESFilmicToneMapping;

            //

            scene = new THREE.Scene();

            camera = new THREE.PerspectiveCamera(
              55,
              window.innerWidth / window.innerHeight,
              1,
              20000
            );
            camera.position.set(30, 30, 100);

            //

            sun = new THREE.Vector3();

            // Water

            const waterGeometry = new THREE.PlaneGeometry(10000, 10000);

            water = new Water(waterGeometry, {
              textureWidth: 512,
              textureHeight: 512,
              //@ts-ignore
              waterNormals: new TextureLoader().load(
                "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/waternormals.jpg",
                function (texture) {
                  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                }
              ),
              sunDirection: new THREE.Vector3(),
              sunColor: 0xffffff,
              waterColor: 0x001e0f,
              distortionScale: 3.7,
              fog: scene.fog !== undefined,
            });

            water.rotation.x = -Math.PI / 2;

            scene.add(water);

            // Skybox

            const sky = new Sky();
            sky.scale.setScalar(10000);
            scene.add(sky);

            //@ts-ignore
            const skyUniforms = sky.material.uniforms;

            skyUniforms["turbidity"].value = 10;
            skyUniforms["rayleigh"].value = 2;
            skyUniforms["mieCoefficient"].value = 0.005;
            skyUniforms["mieDirectionalG"].value = 0.8;

            const parameters = {
              elevation: 2,
              azimuth: 180,
            };

            const pmremGenerator = new THREE.PMREMGenerator(renderer);

            function updateSun() {
              const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
              const theta = THREE.MathUtils.degToRad(parameters.azimuth);

              sun.setFromSphericalCoords(1, phi, theta);

              //@ts-ignore
              sky.material.uniforms["sunPosition"].value.copy(sun);
              water.material.uniforms["sunDirection"].value
                .copy(sun)
                .normalize();

              //@ts-ignore
              scene.environment = pmremGenerator.fromScene(sky).texture;
            }

            updateSun();

            //

            const geometry = new THREE.BoxGeometry(30, 30, 30);
            const material = new THREE.MeshStandardMaterial({ roughness: 0 });

            mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            //

            controls = new OrbitControls(camera, renderer.domElement);
            controls.maxPolarAngle = Math.PI * 0.495;
            controls.target.set(0, 10, 0);
            controls.minDistance = 40.0;
            controls.maxDistance = 200.0;
            controls.update();

            // GUI

            // const gui = new GUI();

            // const folderSky = gui.addFolder("Sky");
            // folderSky
            //   .add(parameters, "elevation", 0, 90, 0.1)
            //   .onChange(updateSun);
            // folderSky
            //   .add(parameters, "azimuth", -180, 180, 0.1)
            //   .onChange(updateSun);
            // folderSky.open();

            // const waterUniforms = water.material.uniforms;

            // const folderWater = gui.addFolder("Water");
            // folderWater
            //   .add(waterUniforms.distortionScale, "value", 0, 8, 0.1)
            //   .name("distortionScale");
            // folderWater
            //   .add(waterUniforms.size, "value", 0.1, 10, 0.1)
            //   .name("size");
            // folderWater.open();

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

            gl.endFrame();
          }

          function render() {
            const time = Date.now() * 0.001;

            mesh.position.y = Math.sin(time) * 20 + 5;
            mesh.rotation.x = time * 0.5;
            mesh.rotation.z = time * 0.51;

            water.material.uniforms["time"].value += 1.0 / 60.0;

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
