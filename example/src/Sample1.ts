import {
  Panel,
  Group,
  vlayout,
  layoutConfig,
  Gravity,
  Color,
  navbar,
  stack,
} from "doric";
import { dangleView, getGl } from "dangle";

@Entry
class Sample1 extends Panel {
  onShow() {
    navbar(context).setTitle("Sample1");
  }
  build(rootView: Group) {
    vlayout([
      stack(
        [
          dangleView({
            onPrepared: (glContextId) => {
              let gl = getGl(glContextId) as any;

              //#region code to impl
              // Set clear color to black, fully opaque
              gl.clearColor(0.0, 0.0, 0.0, 1.0);
              // Clear the color buffer with specified clear color
              gl.clear(gl.COLOR_BUFFER_BIT);
              //#endregion

              gl.flush();
              gl.endFrameEXP();
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
