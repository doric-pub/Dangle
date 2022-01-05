import {
  Panel,
  Group,
  vlayout,
  layoutConfig,
  Gravity,
  navbar,
  stack,
  GestureContainer,
  gestureContainer,
  Color,
} from "doric";
import { dangleView, DangleWebGLRenderingContext, vsync } from "dangle";

import * as THREE from "three";
import { OrbitControls } from "./jsm/controls/OrbitControls";

@Entry
class webgl_depth_texture extends Panel {
  private gestureView?: GestureContainer;

  onShow() {
    navbar(context).setTitle("webgl_depth_texture");
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

          //#region code to impl

          let camera, scene, renderer, controls, stats;
          let target;
          let postScene, postCamera, postMaterial;
          let supportsExtension = true;

          const params = {
            format: THREE.DepthFormat,
            type: THREE.UnsignedShortType,
          };

          const formats = {
            DepthFormat: THREE.DepthFormat,
            DepthStencilFormat: THREE.DepthStencilFormat,
          };
          const types = {
            UnsignedShortType: THREE.UnsignedShortType,
            UnsignedIntType: THREE.UnsignedIntType,
            UnsignedInt248Type: THREE.UnsignedInt248Type,
          };

          init();
          animate();

          function init() {
            renderer = new THREE.WebGLRenderer({ canvas: inputCanvas });

            if (
              renderer.capabilities.isWebGL2 === false &&
              renderer.extensions.has("WEBGL_depth_texture") === false
            ) {
              supportsExtension = false;
              // document.querySelector( '#error' ).style.display = 'block';
              return;
            }

            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            // document.body.appendChild( renderer.domElement );

            //

            // stats = new Stats();
            // document.body.appendChild( stats.dom );

            camera = new THREE.PerspectiveCamera(
              70,
              window.innerWidth / window.innerHeight,
              0.01,
              50
            );
            camera.position.z = 4;

            controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;

            // Create a render target with depth texture
            setupRenderTarget();

            // Our scene
            setupScene();

            // Setup post-processing step
            setupPost();

            onWindowResize();
            window.addEventListener("resize", onWindowResize);

            //
            // const gui = new GUI( { width: 300 } );

            // gui.add( params, 'format', formats ).onChange( setupRenderTarget );
            // gui.add( params, 'type', types ).onChange( setupRenderTarget );
            // gui.open();
          }

          function setupRenderTarget() {
            if (target) target.dispose();

            //@ts-ignore
            const format = parseFloat(params.format);
            //@ts-ignore
            const type = parseFloat(params.type);

            target = new THREE.WebGLRenderTarget(
              window.innerWidth,
              window.innerHeight
            );
            target.texture.format = THREE.RGBFormat;
            target.texture.minFilter = THREE.NearestFilter;
            target.texture.magFilter = THREE.NearestFilter;
            target.texture.generateMipmaps = false;
            target.stencilBuffer =
              format === THREE.DepthStencilFormat ? true : false;
            target.depthBuffer = true;
            //@ts-ignore
            target.depthTexture = new THREE.DepthTexture();
            target.depthTexture.format = format;
            target.depthTexture.type = type;
          }

          function setupPost() {
            // Setup post processing stage
            postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
            postMaterial = new THREE.ShaderMaterial({
              vertexShader: `
                varying vec2 vUv;

                void main() {
                  vUv = uv;
                  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
              `,
              fragmentShader: `
                #include <packing>

                varying vec2 vUv;
                uniform sampler2D tDiffuse;
                uniform sampler2D tDepth;
                uniform float cameraNear;
                uniform float cameraFar;
          
          
                float readDepth( sampler2D depthSampler, vec2 coord ) {
                  float fragCoordZ = texture2D( depthSampler, coord ).x;
                  float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
                  return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
                }
          
                void main() {
                  //vec3 diffuse = texture2D( tDiffuse, vUv ).rgb;
                  float depth = readDepth( tDepth, vUv );
          
                  gl_FragColor.rgb = 1.0 - vec3( depth );
                  gl_FragColor.a = 1.0;
                }
              `,
              uniforms: {
                cameraNear: { value: camera.near },
                cameraFar: { value: camera.far },
                tDiffuse: { value: null },
                tDepth: { value: null },
              },
            });
            const postPlane = new THREE.PlaneGeometry(2, 2);
            const postQuad = new THREE.Mesh(postPlane, postMaterial);
            postScene = new THREE.Scene();
            postScene.add(postQuad);
          }

          function setupScene() {
            scene = new THREE.Scene();

            const geometry = new THREE.TorusKnotGeometry(1, 0.3, 128, 64);
            const material = new THREE.MeshBasicMaterial({ color: "blue" });

            const count = 50;
            const scale = 5;

            for (let i = 0; i < count; i++) {
              const r = Math.random() * 2.0 * Math.PI;
              const z = Math.random() * 2.0 - 1.0;
              const zScale = Math.sqrt(1.0 - z * z) * scale;

              const mesh = new THREE.Mesh(geometry, material);
              mesh.position.set(
                Math.cos(r) * zScale,
                Math.sin(r) * zScale,
                z * scale
              );
              mesh.rotation.set(Math.random(), Math.random(), Math.random());
              scene.add(mesh);
            }
          }

          function onWindowResize() {
            const aspect = window.innerWidth / window.innerHeight;
            camera.aspect = aspect;
            camera.updateProjectionMatrix();

            const dpr = renderer.getPixelRatio();
            target.setSize(window.innerWidth * dpr, window.innerHeight * dpr);
            renderer.setSize(window.innerWidth, window.innerHeight);
          }

          function animate() {
            if (!supportsExtension) return;

            vsync(context).requestAnimationFrame(animate);

            // render scene into target
            renderer.setRenderTarget(target);
            renderer.render(scene, camera);

            // render post FX
            postMaterial.uniforms.tDiffuse.value = target.texture;
            postMaterial.uniforms.tDepth.value = target.depthTexture;

            renderer.setRenderTarget(null);
            renderer.render(postScene, postCamera);

            controls.update(); // required because damping is enabled

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
