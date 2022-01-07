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
  AssetsResource,
} from "doric";
import { dangleView, DangleWebGLRenderingContext, vsync } from "dangle";

import * as THREE from "three";
import { FirstPersonControls } from "./jsm/controls/FirstPersonControls.js";
import * as BufferGeometryUtils from "./jsm/utils/BufferGeometryUtils.js";
import { ImprovedNoise } from "./jsm/math/ImprovedNoise.js";

const global = new Function("return this")();

@Entry
class webgl_geometry_minecraft extends Panel {
  private gestureView?: GestureContainer;

  onShow() {
    navbar(context).setTitle("webgl_geometry_minecraft");
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
        onReady: async (gl: DangleWebGLRenderingContext) => {
          const width = gl.drawingBufferWidth;
          const height = gl.drawingBufferHeight;

          const inputCanvas = {
            width: width,
            height: height,
            style: {},
            addEventListener: ((
              name: string,
              fn: (event: { pageX: number; pageY: number }) => void
            ) => {
              if (name == "mousemove") {
                self.gestureView!!.onTouchMove = ({ x, y }) => {
                  fn({ pageX: x, pageY: y });
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

          global.window = {
            innerWidth: width,
            innerHeight: height,
            devicePixelRatio: 1,
            addEventListener: (() => {}) as any,
          };
          global.document = inputCanvas;

          const requestAnimationFrame = vsync(context).requestAnimationFrame;

          //#region code to impl

          let container, stats;

          let camera, controls, scene, renderer;

          const worldWidth = 128,
            worldDepth = 128;
          const worldHalfWidth = worldWidth / 2;
          const worldHalfDepth = worldDepth / 2;
          const data = generateHeight(worldWidth, worldDepth);

          const clock = new THREE.Clock();

          await init();
          animate();

          async function init() {
            // container = document.getElementById( 'container' );

            camera = new THREE.PerspectiveCamera(
              60,
              window.innerWidth / window.innerHeight,
              1,
              20000
            );
            camera.position.y =
              getY(worldHalfWidth, worldHalfDepth) * 100 + 100;

            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xbfd1e5);

            // sides

            const matrix = new THREE.Matrix4();

            const pxGeometry = new THREE.PlaneGeometry(100, 100) as any;
            pxGeometry.attributes.uv.array[1] = 0.5;
            pxGeometry.attributes.uv.array[3] = 0.5;
            pxGeometry.rotateY(Math.PI / 2);
            pxGeometry.translate(50, 0, 0);

            const nxGeometry = new THREE.PlaneGeometry(100, 100) as any;
            nxGeometry.attributes.uv.array[1] = 0.5;
            nxGeometry.attributes.uv.array[3] = 0.5;
            nxGeometry.rotateY(-Math.PI / 2);
            nxGeometry.translate(-50, 0, 0);

            const pyGeometry = new THREE.PlaneGeometry(100, 100) as any;
            pyGeometry.attributes.uv.array[5] = 0.5;
            pyGeometry.attributes.uv.array[7] = 0.5;
            pyGeometry.rotateX(-Math.PI / 2);
            pyGeometry.translate(0, 50, 0);

            const pzGeometry = new THREE.PlaneGeometry(100, 100) as any;
            pzGeometry.attributes.uv.array[1] = 0.5;
            pzGeometry.attributes.uv.array[3] = 0.5;
            pzGeometry.translate(0, 0, 50);

            const nzGeometry = new THREE.PlaneGeometry(100, 100) as any;
            nzGeometry.attributes.uv.array[1] = 0.5;
            nzGeometry.attributes.uv.array[3] = 0.5;
            nzGeometry.rotateY(Math.PI);
            nzGeometry.translate(0, 0, -50);

            //

            const geometries: any[] = [];

            for (let z = 0; z < worldDepth; z++) {
              for (let x = 0; x < worldWidth; x++) {
                const h = getY(x, z);

                matrix.makeTranslation(
                  x * 100 - worldHalfWidth * 100,
                  h * 100,
                  z * 100 - worldHalfDepth * 100
                );

                const px = getY(x + 1, z);
                const nx = getY(x - 1, z);
                const pz = getY(x, z + 1);
                const nz = getY(x, z - 1);

                geometries.push(pyGeometry.clone().applyMatrix4(matrix));

                if ((px !== h && px !== h + 1) || x === 0) {
                  geometries.push(pxGeometry.clone().applyMatrix4(matrix));
                }

                if ((nx !== h && nx !== h + 1) || x === worldWidth - 1) {
                  geometries.push(nxGeometry.clone().applyMatrix4(matrix));
                }

                if ((pz !== h && pz !== h + 1) || z === worldDepth - 1) {
                  geometries.push(pzGeometry.clone().applyMatrix4(matrix));
                }

                if ((nz !== h && nz !== h + 1) || z === 0) {
                  geometries.push(nzGeometry.clone().applyMatrix4(matrix));
                }
              }
            }

            const geometry = BufferGeometryUtils.mergeBufferGeometries(
              geometries
            ) as any;
            geometry.computeBoundingSphere();

            // const texture = new THREE.TextureLoader().load( 'textures/minecraft/atlas.png' );
            const assetsResource = new AssetsResource("threejs/atlas.png");
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
            texture.magFilter = THREE.NearestFilter;

            const mesh = new THREE.Mesh(
              geometry,
              new THREE.MeshLambertMaterial({
                map: texture,
                side: THREE.DoubleSide,
              })
            );
            scene.add(mesh);

            const ambientLight = new THREE.AmbientLight(0xcccccc);
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
            directionalLight.position.set(1, 1, 0.5).normalize();
            scene.add(directionalLight);

            renderer = new THREE.WebGLRenderer({
              antialias: true,
              canvas: inputCanvas,
            });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            // container.appendChild( renderer.domElement );

            controls = new FirstPersonControls(camera, renderer.domElement);

            controls.movementSpeed = 1000;
            controls.lookSpeed = 0.125;
            controls.lookVertical = true;

            // stats = new Stats();
            // container.appendChild( stats.dom );

            //

            window.addEventListener("resize", onWindowResize);
          }

          function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);

            controls.handleResize();
          }

          function generateHeight(width, height) {
            const data: any[] = [],
              perlin = new ImprovedNoise(),
              size = width * height,
              z = Math.random() * 100;

            let quality = 2;

            for (let j = 0; j < 4; j++) {
              if (j === 0) for (let i = 0; i < size; i++) data[i] = 0;

              for (let i = 0; i < size; i++) {
                const x = i % width,
                  y = (i / width) | 0;
                data[i] += perlin.noise(x / quality, y / quality, z) * quality;
              }

              quality *= 4;
            }

            return data;
          }

          function getY(x, z) {
            return (data[x + z * worldWidth] * 0.15) | 0;
          }

          //

          function animate() {
            requestAnimationFrame(animate);

            render();
            // stats.update();

            gl.endFrame();
          }

          function render() {
            controls.update(clock.getDelta());
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
