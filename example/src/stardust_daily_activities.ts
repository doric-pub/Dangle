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
import { dangleView, getGl, vsync } from "dangle";

import * as Stardust from 'stardust-core'
import 'stardust-webgl'
import { WebGLCanvasPlatform3D } from 'stardust-webgl'
import * as d3 from 'd3'
import data from './data.json'

const global = new Function('return this')()

@Entry
class stardust_daily_activities extends Panel {

  private mode1Button?: Text
  private mode2Button?: Text

  onShow() {
    navbar(context).setTitle("stardust_daily_activities");
  }
  build(rootView: Group) {
    var _previousTransition = null;

    async function beginTransition(func, maxTime) {
      if (_previousTransition) (<any>_previousTransition).stop();
      _previousTransition = null;
      maxTime = maxTime || 1;
      var t0 = new Date().getTime();
      var req = null;
      var totalFrames = 0;
      var rerender = async function() {
        req = null;
        var t1 = new Date().getTime();
        var t = (t1 - t0) / 1000;
        var shouldStop = false;
        if (t > maxTime) {
          t = maxTime;
          shouldStop = true;
        }
        func(t);
        totalFrames += 1;
        if (!shouldStop) {
          req = await vsync(context).requestAnimationFrame(rerender) as any;
        } else {
          requestAnimationFrame(function() {
            var t1 = new Date().getTime();
            // d3.select(".fps").text("FPS: " + (totalFrames / ((t1 - t0) / 1000)).toFixed(1));
          });
        }
      };
      req = await vsync(context).requestAnimationFrame(rerender) as any;
      (<any>_previousTransition) = {
        stop: function() {
          if (req != null) vsync(context).cancelAnimationFrame(req as unknown as string);
        }
      };
      return _previousTransition;
    }

    let self = this
    vlayout([
      stack(
        [
          dangleView({
            onPrepared: (glContextId, width, height) => {
              let gl = getGl(glContextId) as any;

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

              // Create bar marks using wedge
              var barMark = Stardust.mark.compile(`
                import { Wedge } from P2D;

                mark Bar(
                    index: float,
                    center: Vector2,
                    vcenter: Vector2,
                    radius: float,
                    t1: float,
                    t2: float,
                    t: float,
                    width: float,
                    width2: float,
                    color: Color = [ 0, 0, 0, 1 ]
                ) {
                    let thetaA = (t1 - 6) / 12.0 * PI;
                    let thetaB = (t2 - 6) / 12.0 * PI;
                    let cP1 = center + Vector2(cos(thetaA), sin(thetaA)) * radius;
                    let k = 1.5;
                    if(t1 + t2 < 12) k = -0.5;
                    let ss = 2;
                    let ti = t * (1 + ss) - ss + (1 - index) * ss;
                    if(ti < 0) ti = 0;
                    if(ti > 1) ti = 1;
                    Wedge(
                        mix(cP1, vcenter + Vector2(t1 * 38, 0), ti),
                        mix(thetaA, PI * k, ti),
                        mix(thetaB, PI * k, ti),
                        mix(radius * (thetaB - thetaA), (t2 - t1) * 38, ti),
                        mix(width2, width, ti),
                        color
                    );
                  }
              ` );

              // Create bars with our barMark
              var bars = Stardust.mark.create(barMark.Bar, platform);

              // Use D3's scale for colors
              var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

              let yScale = d3.scaleLinear()
                .domain([0, data.length - 1])
                .range([15, height - 15]);
              let h = (yScale(1) - yScale(0)) * 0.8;
              let sz = Math.sqrt(((width - 15) * (height - 15)) / data.length / 5);
              let grouping = Math.floor(width / sz / 2);

              // Attributes
              bars.attr("t", 0);
              bars.attr("t1", d => d.start);
              bars.attr("t2", d => d.start + d.duration);
              bars.attr("color", d => Stardust.Color.FromHTML(colorScale(d.type)));
              bars.attr("width", h);
              bars.attr("width2", sz * 0.3);

              // Instancing
              bars.instance(
                d => d.activities,
                (d, i) => {
                  return {
                    index: i / (data.length - 1),
                    center: [(i % grouping) * sz * 2 + sz + 4, Math.floor(i / grouping) * sz * 2 + sz + 10],
                    radius: sz - (sz * 0.3) / 2 - 2,
                    vcenter: [20, yScale(i)]
                  };
                }
              );

              // Set data items to bars
              bars.data(data);

              // Render/Re-render bars
              function render() {
                (platform as WebGLCanvasPlatform3D).clear();
                bars.render();

                gl.flush();
                gl.endFrameEXP();
              }

              render();

              self.mode1Button!!.onClick = () => {
                beginTransition(t => {
                  bars.attr("t", 1 - t);
                  render();
                }, null);
              }

              self.mode2Button!!.onClick = () => {
                beginTransition(t => {
                  bars.attr("t", t);
                  render();
                }, null);
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
      ),
      this.mode1Button = text({
        text: "Mode 1",
        textSize: 20,
      }),
      this.mode2Button = text({
        text: "Mode2",
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
  