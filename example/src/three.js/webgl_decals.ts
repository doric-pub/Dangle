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
import { GLTFLoader } from "./jsm/loaders/GLTFLoader";
import { DecalGeometry } from "./jsm/geometries/DecalGeometry";

@Entry
class webgl_decals extends Panel {
  private gestureView?: GestureContainer;

  onShow() {
    navbar(context).setTitle("webgl_decals");
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
          const requestAnimationFrame = vsync(context).requestAnimationFrame;

          //#region code to impl

          // const container = document.getElementById( 'container' );

          let renderer, scene, camera, stats;
          let mesh;
          let raycaster;
          let line;

          const intersection = {
            intersects: false,
            point: new THREE.Vector3(),
            normal: new THREE.Vector3(),
          };
          const mouse = new THREE.Vector2();
          const intersects = [];

          // const textureLoader = new THREE.TextureLoader();
          // const decalDiffuse = textureLoader.load( 'textures/decal/decal-diffuse.png' );
          var decalDiffuse;
          {
            const assetsResource = new AssetsResource(
              "threejs/decal/decal-diffuse.png"
            );
            const imageInfo = await imageDecoder(context).getImageInfo(
              assetsResource
            );
            const imagePixels = await imageDecoder(context).decodeToPixels(
              assetsResource
            );

            decalDiffuse = new THREE.DataTexture(
              imagePixels,
              imageInfo.width,
              imageInfo.height,
              THREE.RGBAFormat
            );
            decalDiffuse.needsUpdate = true;
          }

          // const decalNormal = textureLoader.load( 'textures/decal/decal-normal.jpg' );
          var decalNormal;
          {
            const assetsResource = new AssetsResource(
              "threejs/decal/decal-normal.jpg"
            );
            const imageInfo = await imageDecoder(context).getImageInfo(
              assetsResource
            );
            const imagePixels = await imageDecoder(context).decodeToPixels(
              assetsResource
            );

            decalNormal = new THREE.DataTexture(
              imagePixels,
              imageInfo.width,
              imageInfo.height,
              THREE.RGBAFormat
            );
            decalNormal.needsUpdate = true;
          }

          var mapTexture;
          {
            const assetsResource = new AssetsResource(
              "threejs/LeePerrySmith/Map-COL.jpg"
            );
            const imageInfo = await imageDecoder(context).getImageInfo(
              assetsResource
            );
            const imagePixels = await imageDecoder(context).decodeToPixels(
              assetsResource
            );

            mapTexture = new THREE.DataTexture(
              imagePixels,
              imageInfo.width,
              imageInfo.height,
              THREE.RGBAFormat
            );
            mapTexture.needsUpdate = true;
          }
          var specularMapTexture;
          {
            const assetsResource = new AssetsResource(
              "threejs/LeePerrySmith/Map-SPEC.jpg"
            );
            const imageInfo = await imageDecoder(context).getImageInfo(
              assetsResource
            );
            const imagePixels = await imageDecoder(context).decodeToPixels(
              assetsResource
            );

            specularMapTexture = new THREE.DataTexture(
              imagePixels,
              imageInfo.width,
              imageInfo.height,
              THREE.RGBAFormat
            );
            specularMapTexture.needsUpdate = true;
          }
          var normalMapTexture;
          {
            const assetsResource = new AssetsResource(
              "threejs/LeePerrySmith/Infinite-Level_02_Tangent_SmoothUV.jpg"
            );
            const imageInfo = await imageDecoder(context).getImageInfo(
              assetsResource
            );
            const imagePixels = await imageDecoder(context).decodeToPixels(
              assetsResource
            );

            normalMapTexture = new THREE.DataTexture(
              imagePixels,
              imageInfo.width,
              imageInfo.height,
              THREE.RGBAFormat
            );
            normalMapTexture.needsUpdate = true;
          }

          const decalMaterial = new THREE.MeshPhongMaterial({
            specular: 0x444444,
            map: decalDiffuse,
            normalMap: decalNormal,
            normalScale: new THREE.Vector2(1, 1),
            shininess: 30,
            transparent: true,
            depthTest: true,
            depthWrite: false,
            polygonOffset: true,
            polygonOffsetFactor: -4,
            wireframe: false,
          });

          const decals = [];
          let mouseHelper;
          const position = new THREE.Vector3();
          const orientation = new THREE.Euler();
          const size = new THREE.Vector3(10, 10, 10);

          const params = {
            minScale: 10,
            maxScale: 20,
            rotate: true,
            clear: function () {
              removeDecals();
            },
          };

          // window.addEventListener( 'load', init );
          init();

          function init() {
            renderer = new THREE.WebGLRenderer({
              antialias: true,
              canvas: inputCanvas,
            });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            // container.appendChild( renderer.domElement );

            // stats = new Stats();
            // container.appendChild( stats.dom );

            scene = new THREE.Scene();

            camera = new THREE.PerspectiveCamera(
              45,
              window.innerWidth / window.innerHeight,
              1,
              1000
            );
            camera.position.z = 120;

            const controls = new OrbitControls(camera, renderer.domElement);
            //@ts-ignore
            controls.minDistance = 50;
            //@ts-ignore
            controls.maxDistance = 200;

            scene.add(new THREE.AmbientLight(0x443333));

            const dirLight1 = new THREE.DirectionalLight(0xffddcc, 1);
            dirLight1.position.set(1, 0.75, 0.5);
            scene.add(dirLight1);

            const dirLight2 = new THREE.DirectionalLight(0xccccff, 1);
            dirLight2.position.set(-1, 0.75, -0.5);
            scene.add(dirLight2);

            const geometry = new THREE.BufferGeometry();
            geometry.setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);

            line = new THREE.Line(geometry, new THREE.LineBasicMaterial());
            scene.add(line);

            loadLeePerrySmith();

            raycaster = new THREE.Raycaster();

            mouseHelper = new THREE.Mesh(
              new THREE.BoxGeometry(1, 1, 10),
              new THREE.MeshNormalMaterial()
            );
            mouseHelper.visible = false;
            scene.add(mouseHelper);

            window.addEventListener("resize", onWindowResize);

            let moved = false;

            controls.addEventListener("change", function () {
              moved = true;
            });

            window.addEventListener("pointerdown", function () {
              moved = false;
            });
            self.gestureView!!.onTouchDown = () => {
              moved = false;
            };

            window.addEventListener("pointerup", function (event) {
              if (moved === false) {
                checkIntersection(event.clientX, event.clientY);

                if (intersection.intersects) shoot();
              }
            });
            self.gestureView!!.onTouchUp = (event: { x; y }) => {
              if (moved === false) {
                checkIntersection(
                  event.x * Environment.screenScale,
                  event.y * Environment.screenScale
                );

                if (intersection.intersects) shoot();
              }
            };

            window.addEventListener("pointermove", onPointerMove);
            self.gestureView!!.onTouchMove = (event: { x; y }) => {
              onPointerMove({
                isPrimary: true,
                clientX: event.x * Environment.screenScale,
                clientY: event.y * Environment.screenScale,
              });
            };

            function onPointerMove(event) {
              if (event.isPrimary) {
                checkIntersection(event.clientX, event.clientY);
              }
            }

            function checkIntersection(x, y) {
              if (mesh === undefined) return;

              mouse.x = (x / window.innerWidth) * 2 - 1;
              mouse.y = -(y / window.innerHeight) * 2 + 1;

              raycaster.setFromCamera(mouse, camera);
              raycaster.intersectObject(mesh, false, intersects);

              if (intersects.length > 0) {
                //@ts-ignore
                const p = intersects[0].point;
                mouseHelper.position.copy(p);
                intersection.point.copy(p);

                //@ts-ignore
                const n = intersects[0].face.normal.clone();
                n.transformDirection(mesh.matrixWorld);
                n.multiplyScalar(10);
                //@ts-ignore
                n.add(intersects[0].point);

                //@ts-ignore
                intersection.normal.copy(intersects[0].face.normal);
                mouseHelper.lookAt(n);

                const positions = line.geometry.attributes.position;
                positions.setXYZ(0, p.x, p.y, p.z);
                positions.setXYZ(1, n.x, n.y, n.z);
                positions.needsUpdate = true;

                intersection.intersects = true;

                intersects.length = 0;
              } else {
                intersection.intersects = false;
              }
            }

            // const gui = new GUI();

            // gui.add( params, 'minScale', 1, 30 );
            // gui.add( params, 'maxScale', 1, 30 );
            // gui.add( params, 'rotate' );
            // gui.add( params, 'clear' );
            // gui.open();

            onWindowResize();
            animate();
          }

          function loadLeePerrySmith() {
            //@ts-ignore
            const loader = new GLTFLoader();

            //@ts-ignore
            loader.load(
              "threejs/LeePerrySmith/LeePerrySmith.gltf",
              function (gltf) {
                mesh = gltf.scene.children[0];
                mesh.material = new THREE.MeshPhongMaterial({
                  specular: 0x111111,
                  map: mapTexture, //textureLoader.load( 'models/gltf/LeePerrySmith/Map-COL.jpg' ),
                  specularMap: specularMapTexture, //textureLoader.load( 'models/gltf/LeePerrySmith/Map-SPEC.jpg' ),
                  normalMap: normalMapTexture, //textureLoader.load( 'models/gltf/LeePerrySmith/Infinite-Level_02_Tangent_SmoothUV.jpg' ),
                  shininess: 25,
                });

                scene.add(mesh);
                mesh.scale.set(10, 10, 10);
              }
            );
          }

          function shoot() {
            position.copy(intersection.point);
            orientation.copy(mouseHelper.rotation);

            if (params.rotate) orientation.z = Math.random() * 2 * Math.PI;

            const scale =
              params.minScale +
              Math.random() * (params.maxScale - params.minScale);
            size.set(scale, scale, scale);

            const material = decalMaterial.clone();
            material.color.setHex(Math.random() * 0xffffff);

            const m = new THREE.Mesh(
              new DecalGeometry(mesh, position, orientation, size),
              material
            );

            //@ts-ignore
            decals.push(m);
            scene.add(m);
          }

          function removeDecals() {
            decals.forEach(function (d) {
              scene.remove(d);
            });

            decals.length = 0;
          }

          function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);
          }

          function animate() {
            requestAnimationFrame(animate);

            renderer.render(scene, camera);

            // stats.update();

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
