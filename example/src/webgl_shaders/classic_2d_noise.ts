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
class classic_2d_noise extends Panel {
  private gestureView?: GestureContainer;

  onShow() {
    navbar(context).setTitle("classic_2d_noise");
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
                    * GLSL textureless classic 2D noise "cnoise",
                    * with an RSL-style periodic variant "pnoise".
                    * Author:  Stefan Gustavson (stefan.gustavson@liu.se)
                    * Version: 2011-08-22
                    *
                    * Many thanks to Ian McEwan of Ashima Arts for the
                    * ideas for permutation and gradient selection.
                    *
                    * Copyright (c) 2011 Stefan Gustavson. All rights reserved.
                    * Distributed under the MIT license. See LICENSE file.
                    * https://github.com/stegu/webgl-noise
                    */

                    vec4 mod289(vec4 x) {
                        return x - floor(x * (1.0 / 289.0)) * 289.0;
                    }

                    vec4 permute(vec4 x) {
                        return mod289(((x * 34.0) + 1.0) * x);
                    }

                    vec4 taylorInvSqrt(vec4 r) {
                        return 1.79284291400159 - 0.85373472095314 * r;
                    }

                    vec2 fade(vec2 t) {
                        return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
                    }

                    float cnoise(vec2 P) {
                        vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
                        vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
                        Pi = mod289(Pi);
                        vec4 ix = Pi.xzxz;
                        vec4 iy = Pi.yyww;
                        vec4 fx = Pf.xzxz;
                        vec4 fy = Pf.yyww;

                        vec4 i = permute(permute(ix) + iy);

                        vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0;
                        vec4 gy = abs(gx) - 0.5;
                        vec4 tx = floor(gx + 0.5);
                        gx = gx - tx;

                        vec2 g00 = vec2(gx.x, gy.x);
                        vec2 g10 = vec2(gx.y, gy.y);
                        vec2 g01 = vec2(gx.z, gy.z);
                        vec2 g11 = vec2(gx.w, gy.w);

                        vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));
                        g00 *= norm.x;
                        g01 *= norm.y;
                        g10 *= norm.z;
                        g11 *= norm.w;

                        float n00 = dot(g00, vec2(fx.x, fy.x));
                        float n10 = dot(g10, vec2(fx.y, fy.y));
                        float n01 = dot(g01, vec2(fx.z, fy.z));
                        float n11 = dot(g11, vec2(fx.w, fy.w));

                        vec2 fade_xy = fade(Pf.xy);
                        vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
                        float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
                        return 2.3 * n_xy;
                    }

                    /*
                    * Combines the 2d noise function at three different scales
                    */
                    float multy_scale_noise(vec2 p, vec2 rel_mouse_pos) {
                        return 0.8 * cnoise(5.0 * p) + rel_mouse_pos.x * cnoise(15.0 * p) + rel_mouse_pos.y * cnoise(60.0 * p);
                    }

                    /*
                    * The main program
                    */
                    void main() {
                        // Normalize the pixel and mouse positions to the maximum scale dimension
                        float max_dim = max(u_resolution.x, u_resolution.y);
                        vec2 rel_pixel_pos = gl_FragCoord.xy / max_dim;
                        vec2 rel_mouse_pos = u_mouse / max_dim;

                        // Use a slightly shifted noise value for each color
                        float r = multy_scale_noise(rel_pixel_pos + 0.05 * rel_mouse_pos, rel_mouse_pos);
                        float g = multy_scale_noise(rel_pixel_pos + 0.05 * rel_mouse_pos.yx, rel_mouse_pos);
                        float b = multy_scale_noise(rel_pixel_pos - 0.05 * rel_mouse_pos, rel_mouse_pos);

                        // Fragment shader output
                        gl_FragColor = vec4(vec3(r, g, b), 1.0);
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
