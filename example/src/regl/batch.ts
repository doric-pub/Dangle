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
class batch extends Panel {
  onShow() {
    navbar(context).setTitle("batch");
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
              const regl = REGL(gl as WebGLRenderingContext);

              // Next we create our command
              const draw = regl({
                frag: `
                  precision mediump float;
                  uniform vec4 color;
                  void main() {
                    gl_FragColor = color;
                  }`,

                vert: `
                  precision mediump float;
                  attribute vec2 position;
                  uniform float angle;
                  uniform vec2 offset;
                  void main() {
                    gl_Position = vec4(
                      cos(angle) * position.x + sin(angle) * position.y + offset.x,
                      -sin(angle) * position.x + cos(angle) * position.y + offset.y, 0, 1);
                  }`,

                attributes: {
                  position: [0.5, 0, 0, 0.5, 1, 1],
                },

                uniforms: {
                  // the batchId parameter gives the index of the command
                  color: ({ tick }, props, batchId) => [
                    Math.sin(
                      0.02 * ((0.1 + Math.sin(batchId)) * tick + 3.0 * batchId)
                    ),
                    Math.cos(0.02 * (0.02 * tick + 0.1 * batchId)),
                    Math.sin(
                      0.02 *
                        ((0.3 + Math.cos(2.0 * batchId)) * tick + 0.8 * batchId)
                    ),
                    1,
                  ],
                  angle: ({ tick }) => 0.01 * tick,
                  //@ts-ignore
                  offset: regl.prop("offset"),
                },

                depth: {
                  enable: false,
                },

                count: 3,
              });

              // Here we register a per-frame callback to draw the whole scene
              regl.frame(function () {
                regl.clear({
                  color: [0, 0, 0, 1],
                });

                // This tells regl to execute the command once for each object
                draw([
                  { offset: [-1, -1] },
                  { offset: [-1, 0] },
                  { offset: [-1, 1] },
                  { offset: [0, -1] },
                  { offset: [0, 0] },
                  { offset: [0, 1] },
                  { offset: [1, -1] },
                  { offset: [1, 0] },
                  { offset: [1, 1] },
                ]);

                gl.endFrame();
              });
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
