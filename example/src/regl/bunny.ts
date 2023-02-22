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
import * as bunny from "bunny";
import { mat4 } from "gl-matrix";

@Entry
class bunny_demo extends Panel {
  onShow() {
    navbar(context).setTitle("bunny");
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

              const drawBunny = regl({
                vert: `
                precision mediump float;
                attribute vec3 position;
                uniform mat4 model, view, projection;
                void main() {
                  gl_Position = projection * view * model * vec4(position, 1);
                }`,

                frag: `
                precision mediump float;
                void main() {
                  gl_FragColor = vec4(1, 1, 1, 1);
                }`,

                // this converts the vertices of the mesh into the position attribute
                attributes: {
                  position: bunny.positions,
                },

                // and this converts the faces of the mesh into elements
                elements: bunny.cells,

                uniforms: {
                  //@ts-ignore
                  model: mat4.identity([]),
                  view: ({ tick }) => {
                    const t = 0.01 * tick;
                    return mat4.lookAt(
                      //@ts-ignore
                      [],
                      [30 * Math.cos(t), 2.5, 30 * Math.sin(t)],
                      [0, 2.5, 0],
                      [0, 1, 0]
                    );
                  },
                  projection: ({ viewportWidth, viewportHeight }) =>
                    mat4.perspective(
                      //@ts-ignore
                      [],
                      Math.PI / 4,
                      viewportWidth / viewportHeight,
                      0.01,
                      1000
                    ),
                },
              });

              regl.frame(() => {
                regl.clear({
                  depth: 1,
                  color: [0, 0, 0, 1],
                });

                drawBunny();

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
