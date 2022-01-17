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
  imageDecoder,
  hlayout,
  text,
  input,
  Text,
  Input,
  AssetsResource,
} from "doric";
import { dangleView, DangleWebGLRenderingContext, vsync } from "dangle";

import * as THREE from "three";
import { OrbitControls } from "./jsm/controls/OrbitControls";
import { GLTFLoader } from "./jsm/loaders/GLTFLoader";
import { RoomEnvironment } from "./jsm/environments/RoomEnvironment";

@Entry
class webgl_materials_car extends Panel {
  private gestureView?: GestureContainer;

  private bodyBtn?: Text;
  private bodyInput?: Input;
  private detailsBtn?: Text;
  private detailsInput?: Input;
  private glassBtn?: Text;
  private glassInput?: Input;

  onShow() {
    navbar(context).setTitle("webgl_materials_car");
  }
  build(rootView: Group) {
    vlayout([
      (this.gestureView = gestureContainer([], {
        layoutConfig: layoutConfig().just(),
        width: 300,
        height: 300,
        backgroundColor: Color.BLACK,
      })),
      hlayout(
        [
          text({
            text: "Body",
            layoutConfig: layoutConfig().fitHeight().justWidth(),
            width: 60,
          }),
          (this.bodyInput = input({
            layoutConfig: layoutConfig().fitHeight().justWidth(),
            width: 100,
            border: {
              width: 1,
              color: Color.GRAY,
            },
          })),
          (this.bodyBtn = text({
            text: "Go",
            width: 50,
            height: 50,
            layoutConfig: layoutConfig().just(),
            backgroundColor: Color.GRAY,
          })),
        ],
        {
          gravity: Gravity.CenterY,
          space: 10,
        }
      ),
      hlayout(
        [
          text({
            text: "Details",
            layoutConfig: layoutConfig().fitHeight().justWidth(),
            width: 60,
          }),
          (this.detailsInput = input({
            layoutConfig: layoutConfig().fitHeight().justWidth(),
            width: 100,
            border: {
              width: 1,
              color: Color.GRAY,
            },
          })),
          (this.detailsBtn = text({
            text: "Go",
            width: 50,
            height: 50,
            layoutConfig: layoutConfig().just(),
            backgroundColor: Color.GRAY,
          })),
        ],
        {
          gravity: Gravity.CenterY,
          space: 10,
        }
      ),
      hlayout(
        [
          text({
            text: "Glass",
            layoutConfig: layoutConfig().fitHeight().justWidth(),
            width: 60,
          }),
          (this.glassInput = input({
            layoutConfig: layoutConfig().fitHeight().justWidth(),
            width: 100,
            border: {
              width: 1,
              color: Color.GRAY,
            },
          })),
          (this.glassBtn = text({
            text: "Go",
            width: 50,
            height: 50,
            layoutConfig: layoutConfig().just(),
            backgroundColor: Color.GRAY,
          })),
        ],
        {
          gravity: Gravity.CenterY,
          space: 10,
        }
      ),
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
        onReady: async (gl: DangleWebGLRenderingContext) => {
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

          let camera, scene, renderer;
          let stats;

          let grid;
          let controls;

          const wheels: any[] = [];

          async function init() {
            // const container = document.getElementById( 'container' );

            renderer = new THREE.WebGLRenderer({
              antialias: true,
              canvas: inputCanvas,
            });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            // renderer.setAnimationLoop( render );
            renderer.outputEncoding = THREE.sRGBEncoding;
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 0.85;
            // container.appendChild( renderer.domElement );

            window.addEventListener("resize", onWindowResize);

            // stats = new Stats();
            // container.appendChild( stats.dom );

            //

            camera = new THREE.PerspectiveCamera(
              40,
              window.innerWidth / window.innerHeight,
              0.1,
              100
            );
            camera.position.set(4.25, 1.4, -4.5);

            controls = new OrbitControls(camera, inputCanvas);
            controls.target.set(0, 0.5, 0);
            controls.update();

            const pmremGenerator = new THREE.PMREMGenerator(renderer);

            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xeeeeee);
            scene.environment = pmremGenerator.fromScene(
              new RoomEnvironment()
            ).texture;
            scene.fog = new THREE.Fog(0xeeeeee, 10, 50);

            {
              const skyColor = 0xffffff;
              const groundColor = 0xffffff; // brownish orange
              const intensity = 1;
              const light = new THREE.HemisphereLight(
                skyColor,
                groundColor,
                intensity
              );
              scene.add(light);
            }

            {
              const color = 0xffffff;
              const intensity = 1.5;
              const light = new THREE.DirectionalLight(color, intensity);
              light.position.set(5, 10, 2);
              scene.add(light);
            }

            grid = new THREE.GridHelper(100, 40, 0x000000, 0x000000);
            grid.material.opacity = 0.1;
            grid.material.depthWrite = false;
            grid.material.transparent = true;
            scene.add(grid);

            // materials

            const bodyMaterial = new THREE.MeshPhysicalMaterial({
              color: 0xff0000,
              metalness: 0.6,
              roughness: 0.4,
              clearcoat: 0.05,
              clearcoatRoughness: 0.05,
            });

            const detailsMaterial = new THREE.MeshStandardMaterial({
              color: 0xffffff,
              metalness: 1.0,
              roughness: 0.5,
            });

            const glassMaterial = new THREE.MeshPhysicalMaterial({
              color: 0xffffff,
              metalness: 0,
              roughness: 0.1,
              transmission: 0.9,
              transparent: true,
            });

            // const bodyColorInput = document.getElementById( 'body-color' );
            // bodyColorInput.addEventListener( 'input', function () {

            //   bodyMaterial.color.set( this.value );

            // } );
            self.bodyBtn!!.onClick = () => {
              self.bodyInput?.getText(context).then((value) => {
                bodyMaterial.color.set(parseInt(value, 16));
              });
            };

            // const detailsColorInput = document.getElementById( 'details-color' );
            // detailsColorInput.addEventListener( 'input', function () {

            //   detailsMaterial.color.set( this.value );

            // } );
            self.detailsBtn!!.onClick = () => {
              self.detailsInput?.getText(context).then((value) => {
                detailsMaterial.color.set(parseInt(value, 16));
              });
            };

            // const glassColorInput = document.getElementById( 'glass-color' );
            // glassColorInput.addEventListener( 'input', function () {

            //   glassMaterial.color.set( this.value );

            // } );
            self.glassBtn!!.onClick = () => {
              self.glassInput?.getText(context).then((value) => {
                glassMaterial.color.set(parseInt(value, 16));
              });
            };

            // Car

            // const shadow = new THREE.TextureLoader().load( 'models/gltf/ferrari_ao.png' );
            const assetsResource = new AssetsResource(
              "threejs/ferrari/ferrari_ao.png"
            );
            const imageInfo = await imageDecoder(context).getImageInfo(
              assetsResource
            );
            const imagePixels = await imageDecoder(context).decodeToPixels(
              assetsResource
            );

            const shadow = new THREE.DataTexture(
              imagePixels,
              imageInfo.width,
              imageInfo.height,
              THREE.RGBAFormat
            );
            shadow.needsUpdate = true;

            // const dracoLoader = new DRACOLoader();
            // dracoLoader.setDecoderPath( 'js/libs/draco/gltf/' );

            //@ts-ignore
            const loader = new GLTFLoader();
            // loader.setDRACOLoader( dracoLoader );

            //@ts-ignore
            loader.load("threejs/ferrari/ferrari.gltf", function (gltf) {
              const carModel = gltf.scene.children[0];

              carModel.getObjectByName("body").material = bodyMaterial;

              carModel.getObjectByName("rim_fl").material = detailsMaterial;
              carModel.getObjectByName("rim_fr").material = detailsMaterial;
              carModel.getObjectByName("rim_rr").material = detailsMaterial;
              carModel.getObjectByName("rim_rl").material = detailsMaterial;
              carModel.getObjectByName("trim").material = detailsMaterial;

              carModel.getObjectByName("glass").material = glassMaterial;

              wheels.push(
                carModel.getObjectByName("wheel_fl"),
                carModel.getObjectByName("wheel_fr"),
                carModel.getObjectByName("wheel_rl"),
                carModel.getObjectByName("wheel_rr")
              );

              // shadow
              const mesh = new THREE.Mesh(
                new THREE.PlaneGeometry(0.655 * 4, 1.3 * 4),
                new THREE.MeshBasicMaterial({
                  map: shadow,
                  blending: THREE.MultiplyBlending,
                  toneMapped: false,
                  transparent: true,
                })
              );
              mesh.rotation.x = -Math.PI / 2;
              mesh.renderOrder = 2;
              carModel.add(mesh);

              scene.add(carModel);
            });
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
            const time = -Date.now() / 1000;

            for (let i = 0; i < wheels.length; i++) {
              wheels[i].rotation.x = time * Math.PI;
            }

            grid.position.z = -time % 5;

            renderer.render(scene, camera);

            // stats.update();
          }

          await init();
          animate();

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
