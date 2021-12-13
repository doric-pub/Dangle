import {
  Panel,
  Group,
  vlayout,
  layoutConfig,
  Gravity,
  navbar,
  stack,
  Text,
  text,
} from "doric";
import { dangleView } from "dangle";

import * as Stardust from 'stardust-core'
import 'stardust-webgl'
import { WebGLCanvasPlatform3D } from 'stardust-webgl'

const global = new Function('return this')()

@Entry
class hello_world extends Panel {

  private changeButton?: Text

  onShow() {
    navbar(context).setTitle("hello_world");
  }
  build(rootView: Group) {
    let self = this
    vlayout([
      stack(
        [
          dangleView({
            onReady: async (gl: WebGL2RenderingContext) => {
              const width = gl.drawingBufferWidth
              const height = gl.drawingBufferHeight

              const inputCanvas = 
              ({
                width: width,
                height: height,
                style: {},
                addEventListener: (() => {}) as any,
                removeEventListener: (() => {}) as any,
                clientHeight: height,
                getContext: (() => {return gl}) as any,
              } as HTMLCanvasElement);

              global.window = {
                devicePixelRatio: 1
              } as any

              //#region code to impl

              var platform = Stardust.platform("webgl-2d", inputCanvas, width, height);

              var data = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

              var circleSpec = Stardust.mark.circle();

              var circles = Stardust.mark.create(circleSpec, platform);

              circles.attr("center", (d) => [ d * 80, 250 ]);
              circles.attr("radius", (d) => d * 3);
              circles.attr("color", [ 0, 0, 0, 1 ]);

              circles.data(data);

              circles.render();

              self.changeButton!!.onClick = () => {
                // Update binding attributes
                circles.attr("color", [ 1, 0, 0, 1 ]);

                // Clear the previously rendered stuff
                (platform as WebGLCanvasPlatform3D).clear();

                // Re-render the circles
                circles.render();

                gl.flush();
                (<any>gl).endFrameEXP();
              }

              //#endregion
              gl.flush();
              (<any>gl).endFrameEXP();
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
      this.changeButton = text({
        text: "Change",
        textSize: 20,
      })
    ])
      .apply({
        layoutConfig: layoutConfig().fit().configAlignment(Gravity.Center),
        space: 20,
        gravity: Gravity.Center,
      })
      .in(rootView);
  }
}
