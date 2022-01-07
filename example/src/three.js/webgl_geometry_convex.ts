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

import { OrbitControls } from "./jsm/controls/OrbitControls";
import { ConvexGeometry } from "./jsm/geometries/ConvexGeometry.js";
import * as BufferGeometryUtils from "./jsm/utils/BufferGeometryUtils.js";

@Entry
class webgl_geometry_convex extends Panel {
  private gestureView?: GestureContainer;

  onShow() {
    navbar(context).setTitle("webgl_geometry_convex");
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

          let group, camera, scene, renderer;

          await init();
          animate();

          async function init() {
            scene = new THREE.Scene();

            renderer = new THREE.WebGLRenderer({
              antialias: true,
              canvas: inputCanvas,
            });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            // document.body.appendChild( renderer.domElement );

            // camera

            camera = new THREE.PerspectiveCamera(
              40,
              window.innerWidth / window.innerHeight,
              1,
              1000
            );
            camera.position.set(15, 20, 30);
            scene.add(camera);

            // controls

            const controls = new OrbitControls(
              camera,
              renderer.domElement
            ) as any;
            controls.minDistance = 20;
            controls.maxDistance = 50;
            controls.maxPolarAngle = Math.PI / 2;

            // ambient light

            scene.add(new THREE.AmbientLight(0x222222));

            // point light

            const light = new THREE.PointLight(0xffffff, 1);
            camera.add(light);

            // helper

            scene.add(new THREE.AxesHelper(20));

            // textures

            // const loader = new THREE.TextureLoader();
            // const texture = loader.load( 'textures/sprites/disc.png' );
            const assetsResource = new AssetsResource("threejs/disc.png");
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

            group = new THREE.Group();
            scene.add(group);

            // points

            let dodecahedronGeometry = new THREE.DodecahedronGeometry(10);

            // if normal and uv attributes are not removed, mergeVertices() can't consolidate indentical vertices with different normal/uv data

            dodecahedronGeometry.deleteAttribute("normal");
            dodecahedronGeometry.deleteAttribute("uv");

            dodecahedronGeometry =
              BufferGeometryUtils.mergeVertices(dodecahedronGeometry);

            const vertices: any[] = [];
            const positionAttribute =
              dodecahedronGeometry.getAttribute("position");

            for (let i = 0; i < positionAttribute.count; i++) {
              const vertex = new THREE.Vector3();
              vertex.fromBufferAttribute(positionAttribute, i);
              vertices.push(vertex);
            }

            const pointsMaterial = new THREE.PointsMaterial({
              color: 0x0080ff,
              map: texture,
              size: 1,
              alphaTest: 0.5,
            });

            const pointsGeometry = new THREE.BufferGeometry().setFromPoints(
              vertices
            );

            const points = new THREE.Points(pointsGeometry, pointsMaterial);
            group.add(points);

            // convex hull

            const meshMaterial = new THREE.MeshLambertMaterial({
              color: 0xffffff,
              opacity: 0.5,
              transparent: true,
            });

            const meshGeometry = new ConvexGeometry(vertices);

            const mesh1 = new THREE.Mesh(meshGeometry, meshMaterial);
            mesh1.material.side = THREE.BackSide; // back faces
            mesh1.renderOrder = 0;
            group.add(mesh1);

            const mesh2 = new THREE.Mesh(meshGeometry, meshMaterial.clone());
            mesh2.material.side = THREE.FrontSide; // front faces
            mesh2.renderOrder = 1;
            group.add(mesh2);

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

            group.rotation.y += 0.005;

            render();
          }

          function render() {
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
