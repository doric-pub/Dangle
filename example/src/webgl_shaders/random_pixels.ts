import {
  Panel,
  Group,
  vlayout,
  layoutConfig,
  Gravity,
  navbar,
  gestureContainer,
  GestureContainer,
} from "doric";
import { dangleView, DangleWebGLRenderingContext, vsync } from "dangle";

import * as THREE from "three";

@Entry
class random_pixels extends Panel {
  private gestureView?: GestureContainer;

  onShow() {
    navbar(context).setTitle("random_pixels");
  }
  build(rootView: Group) {
    const self = this;
    vlayout([
      (self.gestureView = gestureContainer(
        [
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
                  if (name == "touchstart") {
                    self.gestureView!!.onTouchDown = ({ x, y }) => {
                      fn({
                        pageX: x * Environment.screenScale,
                        pageY: y * Environment.screenScale,
                      });
                    };
                  } else if (name == "touchmove") {
                    self.gestureView!!.onTouchUp = ({ x, y }) => {
                      fn({
                        pageX: x * Environment.screenScale,
                        pageY: y * Environment.screenScale,
                      });
                    };
                  } else if (name == "mousemove") {
                    self.gestureView!!.onTouchMove = ({ x, y }) => {
                      fn({
                        pageX: x * Environment.screenScale,
                        pageY: y * Environment.screenScale,
                      });
                    };
                  }
                }) as any,
                removeEventListener: (() => { }) as any,
                setPointerCapture: (() => { }) as any,
                releasePointerCapture: (() => { }) as any,
                clientHeight: height,
                getContext: (() => {
                  return gl;
                }) as any,
              } as HTMLCanvasElement;

              let window = {
                innerWidth: width,
                innerHeight: height,
                devicePixelRatio: 1,
                addEventListener: (() => { }) as any,
              };

              const requestAnimationFrame =
                vsync(context).requestAnimationFrame;

              //#region code to impl

              var renderer, scene, camera, clock, uniforms;

              init();
              animate();

              /*
               * Initializes the sketch
               */
              function init() {
                // Initialize the WebGL renderer
                renderer = new THREE.WebGLRenderer({ canvas: inputCanvas });
                renderer.setPixelRatio(window.devicePixelRatio);
                renderer.setSize(window.innerWidth, window.innerHeight);

                // Initialize the scene
                scene = new THREE.Scene();

                // Initialize the camera
                camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

                // Initialize the clock
                clock = new THREE.Clock(true);

                // Create the plane geometry
                var geometry = new THREE.PlaneGeometry(2, 2);

                // Define the shader uniforms
                uniforms = {
                  u_time: {
                    type: "f",
                    value: 0.0,
                  },
                  u_frame: {
                    type: "f",
                    value: 0.0,
                  },
                  u_resolution: {
                    type: "v2",
                    value: new THREE.Vector2(
                      window.innerWidth,
                      window.innerHeight
                    ).multiplyScalar(window.devicePixelRatio),
                  },
                  u_mouse: {
                    type: "v2",
                    value: new THREE.Vector2(
                      0.7 * window.innerWidth,
                      window.innerHeight
                    ).multiplyScalar(window.devicePixelRatio),
                  },
                };

                // Create the shader material
                var material = new THREE.ShaderMaterial({
                  uniforms: uniforms,
                  vertexShader: `
                    #define GLSLIFY 1
                    /*
                    * The main program
                    */
                    void main() {
                        // Vertex shader output
                        gl_Position = vec4(position, 1.0);
                    }
                  `,
                  fragmentShader: `
                    #define GLSLIFY 1
                    // Common uniforms
                    uniform vec2 u_resolution;
                    uniform vec2 u_mouse;
                    uniform float u_time;
                    uniform float u_frame;

                    /*
                    * Random number generator with a vec2 seed
                    *
                    * Credits:
                    * http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0
                    * https://github.com/mattdesl/glsl-random
                    */
                    highp float random2d(vec2 co) {
                        highp float a = 12.9898;
                        highp float b = 78.233;
                        highp float c = 43758.5453;
                        highp float dt = dot(co.xy, vec2(a, b));
                        highp float sn = mod(dt, 3.14);
                        return fract(sin(sn) * c);
                    }

                    /*
                    * The main program
                    */
                    void main() {
                        // Create a grid of squares that depends on the mouse position
                        vec2 square = floor((gl_FragCoord.xy - u_mouse) / 30.0);

                        // Give a random color to each square
                        vec3 square_color = vec3(random2d(square), random2d(1.234 * square), 1.0);

                        // Fragment shader output
                        gl_FragColor = vec4(square_color, 1.0);
                    }
                  `,
                });

                // Create the mesh and add it to the scene
                var mesh = new THREE.Mesh(geometry, material);
                scene.add(mesh);

                // Add the event listeners
                window.addEventListener("resize", onWindowResize, false);
                renderer.domElement.addEventListener(
                  "mousemove",
                  onMouseMove,
                  false
                );
                renderer.domElement.addEventListener(
                  "touchstart",
                  onTouchMove,
                  false
                );
                renderer.domElement.addEventListener(
                  "touchmove",
                  onTouchMove,
                  false
                );
              }

              /*
               * Animates the sketch
               */
              function animate() {
                requestAnimationFrame(animate);
                render();

                gl.endFrame();
              }

              /*
               * Renders the sketch
               */
              function render() {
                uniforms.u_time.value = clock.getElapsedTime();
                uniforms.u_frame.value += 1.0;
                renderer.render(scene, camera);
              }

              /*
               * Updates the renderer size and the uniforms when the window is resized
               */
              function onWindowResize(event) {
                // Update the renderer
                renderer.setSize(window.innerWidth, window.innerHeight);

                // Update the resolution uniform
                uniforms.u_resolution.value
                  .set(window.innerWidth, window.innerHeight)
                  .multiplyScalar(window.devicePixelRatio);
              }

              /*
               * Updates the uniforms when the mouse moves
               */
              function onMouseMove(event) {
                // Update the mouse uniform
                uniforms.u_mouse.value
                  .set(event.pageX, window.innerHeight - event.pageY)
                  .multiplyScalar(window.devicePixelRatio);
              }

              /*
               * Updates the uniforms when the touch moves
               */
              function onTouchMove(event) {
                // Update the mouse uniform
                uniforms.u_mouse.value
                  .set(event.pageX, window.innerHeight - event.pageY)
                  .multiplyScalar(window.devicePixelRatio);
              }

              //#endregion
            },
          }).apply({
            layoutConfig: layoutConfig().just(),
            width: 300,
            height: 300,
          }),
        ],
        {
          layoutConfig: layoutConfig().just(),
          width: 300,
          height: 300,
        }
      )),
    ])
      .apply({
        layoutConfig: layoutConfig().fit().configAlignment(Gravity.Center),
        space: 20,
        gravity: Gravity.Center,
      })
      .in(rootView);
  }
}
