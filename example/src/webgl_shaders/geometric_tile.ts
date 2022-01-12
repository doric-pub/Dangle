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
class geometric_tile extends Panel {
  private gestureView?: GestureContainer;

  onShow() {
    navbar(context).setTitle("geometric_tile");
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
                var geometry = new THREE.PlaneBufferGeometry(2, 2);

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
                    * Returns a value between 1 and 0 that indicates if the pixel is inside the square
                    */
                    float square(vec2 pixel, vec2 bottom_left, float side) {
                        vec2 top_right = bottom_left + side;

                        return smoothstep(-1.0, 1.0, pixel.x - bottom_left.x) * smoothstep(-1.0, 1.0, pixel.y - bottom_left.y)
                                * smoothstep(-1.0, 1.0, top_right.x - pixel.x) * smoothstep(-1.0, 1.0, top_right.y - pixel.y);
                    }

                    /*
                    * Returns a value between 1 and 0 that indicates if the pixel is inside the rectangle
                    */
                    float rectangle(vec2 pixel, vec2 bottom_left, vec2 sides) {
                        vec2 top_right = bottom_left + sides;

                        return smoothstep(-1.0, 1.0, pixel.x - bottom_left.x) * smoothstep(-1.0, 1.0, pixel.y - bottom_left.y)
                                * smoothstep(-1.0, 1.0, top_right.x - pixel.x) * smoothstep(-1.0, 1.0, top_right.y - pixel.y);
                    }

                    /*
                    * Returns a value between 1 and 0 that indicates if the pixel is inside the circle
                    */
                    float circle(vec2 pixel, vec2 center, float radius) {
                        return 1.0 - smoothstep(radius - 1.0, radius + 1.0, length(pixel - center));
                    }

                    /*
                    * Returns a value between 1 and 0 that indicates if the pixel is inside the ellipse
                    */
                    float ellipse(vec2 pixel, vec2 center, vec2 radii) {
                        vec2 relative_pos = pixel - center;
                        float dist = length(relative_pos);
                        float r = radii.x * radii.y * dist / length(radii.yx * relative_pos);

                        return 1.0 - smoothstep(r - 1.0, r + 1.0, dist);
                    }

                    /*
                    * Returns a value between 1 and 0 that indicates if the pixel is inside the line segment
                    */
                    float lineSegment(vec2 pixel, vec2 start, vec2 end, float width) {
                        vec2 pixel_dir = pixel - start;
                        vec2 line_dir = end - start;
                        float line_length = length(line_dir);
                        float projected_dist = dot(pixel_dir, line_dir) / line_length;
                        float tanjential_dist = sqrt(dot(pixel_dir, pixel_dir) - projected_dist * projected_dist);

                        return smoothstep(-1.0, 1.0, projected_dist) * smoothstep(-1.0, 1.0, line_length - projected_dist)
                                * (1.0 - smoothstep(-1.0, 1.0, tanjential_dist - 0.5 * width));
                    }

                    /*
                    * Returns a rotation matrix for the given angle
                    */
                    mat2 rotate(float angle) {
                        return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
                    }

                    /*
                    * The main program
                    */
                    void main() {
                        // Set the background color
                        vec3 pixel_color = vec3(0.0);

                        // Divide the screen in a grid
                        vec2 grid1_pos = mod(gl_FragCoord.xy, 250.0);

                        // Add a blue square to each grid element
                        pixel_color = mix(pixel_color, vec3(0.3, 0.4, 1.0), square(grid1_pos, vec2(5.0, 5.0), 150.0));

                        // Add a red circle to each grid element
                        pixel_color = mix(pixel_color, vec3(1.0, 0.4, 0.3), circle(grid1_pos, vec2(0.0, 0.0), 80.0));

                        // Add ten grey lines to each grid element
                        for (float i = 0.0; i < 10.0; ++i) {
                            pixel_color = mix(pixel_color, vec3(0.8),
                                    lineSegment(grid1_pos, vec2(10.0, -10.0 * i), vec2(150.0, 100.0 - 10.0 * i), 4.0));
                        }

                        // Apply some rotations to the grid
                        grid1_pos -= 100.0;
                        grid1_pos = rotate(u_time) * grid1_pos;
                        grid1_pos += 100.0;
                        grid1_pos -= 60.0;
                        grid1_pos = rotate(0.66 * u_time) * grid1_pos;
                        grid1_pos += 60.0;

                        // Draw a green rectangle to each grid element
                        pixel_color = mix(pixel_color, vec3(0.3, 0.9, 0.3), rectangle(grid1_pos, vec2(60.0, 50.0), vec2(40.0, 20)));

                        // Define a second rotated grid
                        vec2 grid2_pos = mod(rotate(radians(45.0)) * gl_FragCoord.xy, 100.0);

                        // Add a white circle to each grid element
                        pixel_color = mix(pixel_color, vec3(1.0), circle(grid2_pos, vec2(50.0, 50.0), 20.0));

                        // Fragment shader output
                        gl_FragColor = vec4(pixel_color, 1.0);
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
