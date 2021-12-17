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
  hlayout,
} from "doric";
import { dangleView, DangleWebGLRenderingContext, vsync } from "dangle";

import * as Stardust from 'stardust-core'
import 'stardust-webgl'
import { WebGLCanvasPlatform3D } from 'stardust-webgl'
import * as d3 from 'd3'

//@ts-ignore
import data from "./demovoteclean.tsv";

const global = new Function('return this')()

let lastTime = Date.now()

@Entry
class sanddance extends Panel {

  private fpsText?: Text

  private mode1Button?: Text
  private mode2Button?: Text
  private mode3Button?: Text

  private previousMode: string = "mode1"
  private newMode: string = "mode1"

  onShow() {
    navbar(context).setTitle("sanddance");
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

        let current = Date.now()
        let diff = current - lastTime
        self.fpsText!!.text = Math.ceil(1000 / diff).toString()
        lastTime = current

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
      hlayout([
        text({text: "fps: "}),
        this.fpsText = text({})
      ], {
        space: 20,
      }),
      stack(
        [
          dangleView({
            onReady: async (gl: DangleWebGLRenderingContext) => {
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

              let platform = Stardust.platform("webgl-2d", inputCanvas, width, height) as WebGLCanvasPlatform3D;
              platform.set3DView(Math.PI / 2, width / height);
              platform.setPose(new Stardust.Pose(new Stardust.Vector3(0, 0, 200), new Stardust.Quaternion(0, 0, 0, 1)));
              platform.clear([1, 1, 1, 1]);
              platform.setCameraPosition(new Stardust.Vector3(0, 0, 200));

              let demovote = data;
              let mark = Stardust.mark.compile(`
                  import { Cube } from P3D;

                  let longitude: float;
                  let latitude: float;
                  let state: float;
                  let stateBinIndex: float;
                  let xBin: float;
                  let yBin: float;
                  let xyBinIndex: float;
                  let index: float;

                  function getPositionScatterplot(): Vector3 {
                      let scaleX = 0.2;
                      let scaleY = 0.3;
                      return Vector3(
                          scaleX * (longitude - (-95.9386152570054)),
                          scaleY * (latitude - (37.139536624928695)),
                          0
                      );
                  }

                  function getPositionStateBins(): Vector3 {
                      return Vector3(
                          (state - 48 / 2) * 0.3 + (stateBinIndex % 10 - 4.5) * 0.02,
                          floor(stateBinIndex / 10) * 0.02 - 2.0, 0
                      );
                  }

                  function getPositionXYBinning(): Vector3 {
                      let n = 6;
                      let txy = xyBinIndex % (n * n);
                      let tx = txy % n;
                      let ty = floor(txy / n);
                      let tz = floor(xyBinIndex / (n * n));
                      return Vector3(
                          (xBin - 9 / 2) * 0.6 + (tx - n / 2 + 0.5) * 0.04,
                          tz * 0.04 - 2.0,
                          (yBin - 6 / 2) * 0.6 + (ty - n / 2 + 0.5) * 0.04
                      );
                  }

                  function clamp01(t: float): float {
                      if(t < 0) t = 0;
                      if(t > 1) t = 1;
                      return t;
                  }

                  mark Mark(color: Color, t1: float, t2: float, t3: float, ki1: float, ki2: float, ki3: float) {
                      let p1 = getPositionScatterplot();
                      let p2 = getPositionStateBins();
                      let p3 = getPositionXYBinning();
                      let p = p1 * clamp01(t1 + ki1 * index) +
                          p2 * clamp01(t2 + ki2 * index) +
                          p3 * clamp01(t3 + ki3 * index);
                      Cube(
                          p * 50,
                          0.7,
                          color
                      );
                  }
              `)["Mark"];
              let marks = Stardust.mark.create(mark, Stardust.shader.lighting(), platform);
              demovote.forEach(d => {
                d.Longitude = +d.Longitude;
                d.Latitude = +d.Latitude;
              });

              let longitudeExtent = d3.extent(demovote, d => (d as any).Longitude);
              let latitudeExtent = d3.extent(demovote, d => (d as any).Latitude);

              let longitudeScale = d3.scaleLinear()
                .domain(longitudeExtent as any)
                .range([0, 1]);
              let latitudeScale = d3.scaleLinear()
                .domain(latitudeExtent as any)
                .range([0, 1]);

              // Map states to integer.
              let states = new Set();
              let state2number = {};
              let state2count = {};
              demovote.forEach(d => states.add(d.StateAbb));
              (<any>states) = Array.from(states);
              (<any>states).sort();
              states.forEach((d, i) => {
                state2number[d as any] = i;
                state2count[d as any] = 0;
              });

              let xyBinCounter = {};

              let xBinCount = 10;
              let yBinCount = 7;

              demovote.sort((a, b) => a.Obama - b.Obama);

              demovote.forEach((d, i) => {
                d.index = i;
                if (state2count[d.StateAbb] == null) state2count[d.StateAbb] = 0;
                d.stateBinIndex = state2count[d.StateAbb]++;

                let xBin = Math.floor(longitudeScale(d.Longitude) * xBinCount);
                let yBin = Math.floor(latitudeScale(d.Latitude) * yBinCount);
                let bin = yBin * (xBinCount + 1) + xBin;
                d.xBin = xBin;
                d.yBin = yBin;
                if (xyBinCounter[bin] == null) xyBinCounter[bin] = 0;
                d.xyBinIndex = xyBinCounter[bin]++;
              });

              let s1 = d3.interpolateLab("#f7f7f7", "#0571b0");
              let s2 = d3.interpolateLab("#f7f7f7", "#ca0020");

              let strToRGBA = str => {
                let rgb = d3.rgb(str);
                return [rgb.r / 255, rgb.g / 255, rgb.b / 255, 1];
              };

              let scaleColor = value => {
                if (value > 0.5) {
                  return strToRGBA(s1((value - 0.5) * 2));
                } else {
                  return strToRGBA(s2((0.5 - value) * 2));
                }
              };

              marks
                .attr("index", d => d.index / (demovote.length - 1))
                .attr("longitude", d => d.Longitude)
                .attr("latitude", d => d.Latitude)
                .attr("state", d => state2number[d.StateAbb])
                .attr("stateBinIndex", d => d.stateBinIndex)
                .attr("xBin", d => d.xBin)
                .attr("yBin", d => d.yBin)
                .attr("xyBinIndex", d => d.xyBinIndex)
                .attr("color", d => scaleColor(d.Obama));

              let skewing = 1;

              function transition12(t) {
                let tt = t * (1 + skewing) - skewing;
                marks
                  .attr("t1", 1 - tt)
                  .attr("t2", tt)
                  .attr("t3", 0)
                  .attr("ki1", -skewing)
                  .attr("ki2", +skewing)
                  .attr("ki3", 0);
              }
              function transition23(t) {
                let tt = t * (1 + skewing) - skewing;
                marks
                  .attr("t1", 0)
                  .attr("t2", 1 - tt)
                  .attr("t3", tt)
                  .attr("ki1", 0)
                  .attr("ki2", -skewing)
                  .attr("ki3", +skewing);
              }
              function transition31(t) {
                let tt = t * (1 + skewing) - skewing;
                marks
                  .attr("t1", tt)
                  .attr("t2", 0)
                  .attr("t3", 1 - tt)
                  .attr("ki1", +skewing)
                  .attr("ki2", 0)
                  .attr("ki3", -skewing);
              }

              marks.data(demovote);

              function render() {
                platform.clear([1, 1, 1, 1]);
                marks.render();

                gl.endFrame();
              }

              transition12(0);
              render();

              var transitions = {
                mode1mode2: t => transition12(t),
                mode2mode1: t => transition12(1 - t),
                mode2mode3: t => transition23(t),
                mode3mode2: t => transition23(1 - t),
                mode3mode1: t => transition31(t),
                mode1mode3: t => transition31(1 - t)
              };

              self.mode1Button!!.onClick = () => {
                self.newMode = "mode1"
                if (self.previousMode == "mode2" || self.previousMode == "mode3") {
                  let fn = transitions[self.previousMode + self.newMode];
                  beginTransition(t => {
                    fn(t);
                    render();
                  }, null);
                }
                self.previousMode = "mode1"
              }

              self.mode2Button!!.onClick = () => {
                self.newMode = "mode2"
                if (self.previousMode == "mode1" || self.previousMode == "mode3") {
                  let fn = transitions[self.previousMode + self.newMode];
                  beginTransition(t => {
                    fn(t);
                    render();
                  }, null);
                }
                self.previousMode = "mode2"
              }

              self.mode3Button!!.onClick = () => {
                self.newMode = "mode3"
                if (self.previousMode == "mode2" || self.previousMode == "mode1") {
                  let fn = transitions[self.previousMode + self.newMode];
                  beginTransition(t => {
                    fn(t);
                    render();
                  }, null);
                }
                self.previousMode = "mode3"
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
      hlayout([
        this.mode1Button = text({
          text: "Map",
          textSize: 20,
        }),
        this.mode3Button = text({
          text: "Map Bins",
          textSize: 20,
        }),
        this.mode2Button = text({
          text: "State",
          textSize: 20,
        }),
      ], {space: 20})
    ])
      .apply({
        layoutConfig: layoutConfig().fit().configAlignment(Gravity.Center),
        space: 20,
        gravity: Gravity.Center,
      })
      .in(rootView);
  }
}
  