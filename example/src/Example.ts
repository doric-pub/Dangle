import {
  Panel,
  Group,
  vlayout,
  layoutConfig,
  Gravity,
  text,
  Color,
  navbar,
  modal,
  stack,
} from "doric";
import { demoPlugin, dangleView, getGl } from "dangle";

@Entry
class Example extends Panel {
  onShow() {
    navbar(context).setTitle("Example");
  }
  build(rootView: Group) {
    vlayout([
      text({
        text: "Click to call native plugin",
        textSize: 20,
        backgroundColor: Color.parse("#70a1ff"),
        textColor: Color.WHITE,
        onClick: async () => {
          const result = await demoPlugin(this.context).call();
          await modal(this.context).alert(result);
        },
        layoutConfig: layoutConfig().fit(),
        padding: { left: 20, right: 20, top: 20, bottom: 20 },
      }),
      stack([
        dangleView({
          onPrepared: () => {
            let gl = getGl(1) as any
  
            gl.viewport(0, 0, 825, 825);
            gl.clearColor(0, 1, 1, 1);
  
            // Create vertex shader (shape & position)
            const vert = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(
            vert,
            `
            void main(void) {
                gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
                gl_PointSize = 150.0;
            }
            `
            );
            gl.compileShader(vert);
  
            // Create fragment shader (color)
            const frag = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(
            frag,
            `
            void main(void) {
                gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
            }
            `
            );
            gl.compileShader(frag);
  
            // Link together into a program
            const program = gl.createProgram();
            gl.attachShader(program, vert);
            gl.attachShader(program, frag);
            gl.linkProgram(program);
            gl.useProgram(program);
  
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.POINTS, 0, 1);
  
            gl.flush();
            gl.endFrameEXP();
          }
        }).apply({
          layoutConfig: layoutConfig().just(),
          width: 300,
          height: 300
        })
      ], {
        layoutConfig: layoutConfig().just(),
        width: 300,
        height: 300,
        backgroundColor: Color.BLACK
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
