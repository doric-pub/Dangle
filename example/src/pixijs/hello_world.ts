import {
  Panel,
  Group,
  vlayout,
  layoutConfig,
  Gravity,
  navbar,
  stack,
} from "doric";
import { dangleView, getGl } from "dangle";

import * as PIXI from 'pixi.js'

@Entry
class hello_world extends Panel {
  onShow() {
    navbar(context).setTitle("hello_world");
  }
  build(rootView: Group) {
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
              //#region code to impl

              const app = new PIXI.Application({view: inputCanvas, antialias: true});

              const graphics = new PIXI.Graphics();

              // Rectangle
              graphics.beginFill(0xDE3249);
              graphics.drawRect(50, 50, 100, 100);
              graphics.endFill();

              // Rectangle + line style 1
              graphics.lineStyle(2, 0xFEEB77, 1);
              graphics.beginFill(0x650A5A);
              graphics.drawRect(200, 50, 100, 100);
              graphics.endFill();

              // Rectangle + line style 2
              graphics.lineStyle(10, 0xFFBD01, 1);
              graphics.beginFill(0xC34288);
              graphics.drawRect(350, 50, 100, 100);
              graphics.endFill();

              // Rectangle 2
              graphics.lineStyle(2, 0xFFFFFF, 1);
              graphics.beginFill(0xAA4F08);
              graphics.drawRect(530, 50, 140, 100);
              graphics.endFill();

              // Circle
              graphics.lineStyle(0); // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
              graphics.beginFill(0xDE3249, 1);
              graphics.drawCircle(100, 250, 50);
              graphics.endFill();

              // Circle + line style 1
              graphics.lineStyle(2, 0xFEEB77, 1);
              graphics.beginFill(0x650A5A, 1);
              graphics.drawCircle(250, 250, 50);
              graphics.endFill();

              // Circle + line style 2
              graphics.lineStyle(10, 0xFFBD01, 1);
              graphics.beginFill(0xC34288, 1);
              graphics.drawCircle(400, 250, 50);
              graphics.endFill();

              // Ellipse + line style 2
              graphics.lineStyle(2, 0xFFFFFF, 1);
              graphics.beginFill(0xAA4F08, 1);
              graphics.drawEllipse(600, 250, 80, 50);
              graphics.endFill();

              // draw a shape
              graphics.beginFill(0xFF3300);
              graphics.lineStyle(4, 0xffd900, 1);
              graphics.moveTo(50, 350);
              graphics.lineTo(250, 350);
              graphics.lineTo(100, 400);
              graphics.lineTo(50, 350);
              graphics.closePath();
              graphics.endFill();

              // draw a rounded rectangle
              graphics.lineStyle(2, 0xFF00FF, 1);
              graphics.beginFill(0x650A5A, 0.25);
              graphics.drawRoundedRect(50, 440, 100, 100, 16);
              graphics.endFill();

              // draw star
              // graphics.lineStyle(2, 0xFFFFFF);
              // graphics.beginFill(0x35CC5A, 1);
              // graphics.drawStar(360, 370, 5, 50);
              // graphics.endFill();

              // // draw star 2
              // graphics.lineStyle(2, 0xFFFFFF);
              // graphics.beginFill(0xFFCC5A, 1);
              // graphics.drawStar(280, 510, 7, 50);
              // graphics.endFill();

              // // draw star 3
              // graphics.lineStyle(4, 0xFFFFFF);
              // graphics.beginFill(0x55335A, 1);
              // graphics.drawStar(470, 450, 4, 50);
              // graphics.endFill();

              // draw polygon
              const path = [600, 370, 700, 460, 780, 420, 730, 570, 590, 520];

              graphics.lineStyle(0);
              graphics.beginFill(0x3500FA, 1);
              graphics.drawPolygon(path);
              graphics.endFill();

              app.stage.addChild(graphics);

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
