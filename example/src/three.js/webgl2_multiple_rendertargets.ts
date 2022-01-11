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
import { TextureLoader } from "./dangle/assets/TextureLoader";

@Entry
class webgl2_multiple_rendertargets extends Panel {
  private gestureView?: GestureContainer;

  onShow() {
    navbar(context).setTitle("webgl2_multiple_rendertargets");
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

          const requestAnimationFrame = vsync(context).requestAnimationFrame;

          //#region code to impl

          let camera, scene, renderer, controls;
          let renderTarget;
          let postScene, postCamera;

          init();

          function init() {
            renderer = new THREE.WebGLRenderer({ canvas: inputCanvas });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);

            // Create a multi render target with Float buffers

            renderTarget = new THREE.WebGLMultipleRenderTargets(
              window.innerWidth * window.devicePixelRatio,
              window.innerHeight * window.devicePixelRatio,
              2
            );

            for (let i = 0, il = renderTarget.texture.length; i < il; i++) {
              renderTarget.texture[i].minFilter = THREE.NearestFilter;
              renderTarget.texture[i].magFilter = THREE.NearestFilter;
              renderTarget.texture[i].type = THREE.FloatType;
            }

            // Name our G-Buffer attachments for debugging

            renderTarget.texture[0].name = "diffuse";
            renderTarget.texture[1].name = "normal";

            // Scene setup

            scene = new THREE.Scene();

            camera = new THREE.PerspectiveCamera(
              70,
              window.innerWidth / window.innerHeight,
              1,
              10
            );
            camera.position.z = 4;

            //@ts-ignore
            const diffuse = new TextureLoader().load(
              "threejs/brick_diffuse.jpg",

              function () {
                // ready to render
                render();
              }
            );

            diffuse.wrapS = diffuse.wrapT = THREE.RepeatWrapping;

            scene.add(
              new THREE.Mesh(
                new THREE.TorusKnotGeometry(1, 0.3, 128, 64),
                new THREE.RawShaderMaterial({
                  vertexShader: `
                    in vec3 position;
                    in vec3 normal;
                    in vec2 uv;

                    out vec3 vNormal;
                    out vec2 vUv;

                    uniform mat4 modelViewMatrix;
                    uniform mat4 projectionMatrix;
                    uniform mat3 normalMatrix;

                    void main() {

                      vUv = uv;

                      // get smooth normals
                      vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

                      vec3 transformedNormal = normalMatrix * normal;
                      vNormal = normalize( transformedNormal );

                      gl_Position = projectionMatrix * mvPosition;

                    }
                  `,
                  fragmentShader: `
                    precision highp float;
                    precision highp int;

                    layout(location = 0) out vec4 gColor;
                    layout(location = 1) out vec4 gNormal;

                    uniform sampler2D tDiffuse;
                    uniform vec2 repeat;

                    in vec3 vNormal;
                    in vec2 vUv;

                    void main() {

                      // write color to G-Buffer
                      gColor = texture( tDiffuse, vUv * repeat );

                      // write normals to G-Buffer
                      gNormal = vec4( normalize( vNormal ), 0.0 );

                    }
                  `,
                  uniforms: {
                    tDiffuse: { value: diffuse },
                    repeat: { value: new THREE.Vector2(5, 0.5) },
                  },
                  glslVersion: THREE.GLSL3,
                })
              )
            );

            // PostProcessing setup

            postScene = new THREE.Scene();
            postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

            postScene.add(
              new THREE.Mesh(
                new THREE.PlaneGeometry(2, 2),
                new THREE.RawShaderMaterial({
                  vertexShader: `
                    in vec3 position;
                    in vec2 uv;

                    out vec2 vUv;

                    uniform mat4 modelViewMatrix;
                    uniform mat4 projectionMatrix;

                    void main() {

                      vUv = uv;
                      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

                    }
                  `,
                  fragmentShader: `
                    precision highp float;
                    precision highp int;

                    layout(location = 0) out vec4 pc_FragColor;

                    in vec2 vUv;

                    uniform sampler2D tDiffuse;
                    uniform sampler2D tNormal;

                    void main() {

                      vec3 diffuse = texture( tDiffuse, vUv ).rgb;
                      vec3 normal = texture( tNormal, vUv ).rgb;

                      pc_FragColor.rgb = mix( diffuse, normal, step( 0.5, vUv.x ) );
                      pc_FragColor.a = 1.0;

                    }
                  `,
                  uniforms: {
                    tDiffuse: { value: renderTarget.texture[0] },
                    tNormal: { value: renderTarget.texture[1] },
                  },
                  glslVersion: THREE.GLSL3,
                })
              )
            );

            // Controls

            controls = new OrbitControls(camera, renderer.domElement);
            controls.addEventListener("change", render);
            controls.enableZoom = false;
            controls.screenSpacePanning = true;

            window.addEventListener("resize", onWindowResize);
          }

          function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);

            const dpr = renderer.getPixelRatio();
            renderTarget.setSize(
              window.innerWidth * dpr,
              window.innerHeight * dpr
            );

            render();
          }

          function render() {
            // render scene into target
            renderer.setRenderTarget(renderTarget);
            renderer.render(scene, camera);

            // render post FX
            renderer.setRenderTarget(null);
            renderer.render(postScene, postCamera);

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
