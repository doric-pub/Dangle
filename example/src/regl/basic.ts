import {
  Panel,
  Group,
  vlayout,
  layoutConfig,
  Gravity,
  navbar,
  stack,
} from "doric";
import { dangleView, DangleWebGLRenderingContext } from "dangle";

import REGL from "regl";

@Entry
class basic extends Panel {
  onShow() {
    navbar(context).setTitle("basic");
  }
  build(rootView: Group) {
    vlayout([
      stack(
        [
          dangleView({
            onReady: (gl: DangleWebGLRenderingContext) => {
              //#region code to impl

              // Calling the regl module with no arguments creates a full screen canvas and
              // WebGL context, and then uses this context to initialize a new REGL instance
              const regl = REGL(gl);

              // This clears the color buffer to black and the depth buffer to 1
              regl.clear({
                color: [0, 0, 0, 1],
                depth: 1,
              });

              // In regl, draw operations are specified declaratively using. Each JSON
              // command is a complete description of all state. This removes the need to
              // .bind() things like buffers or shaders. All the boilerplate of setting up
              // and tearing down state is automated.
              regl({
                // In a draw call, we can pass the shader source code to regl
                frag: `
                precision mediump float;
                uniform vec4 color;
                void main () {
                  gl_FragColor = color;
                }`,

                vert: `
                precision mediump float;
                attribute vec2 position;
                void main () {
                  gl_Position = vec4(position, 0, 1);
                }`,

                attributes: {
                  position: [
                    [-1, 0],
                    [0, -1],
                    [1, 1],
                  ],
                },

                uniforms: {
                  color: [1, 0, 0, 1],
                },

                count: 3,
              })();
              //#endregion

              gl.endFrame();
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
      ),
    ])
      .apply({
        layoutConfig: layoutConfig().fit().configAlignment(Gravity.Center),
        space: 20,
        gravity: Gravity.Center,
      })
      .in(rootView);
  }
}
