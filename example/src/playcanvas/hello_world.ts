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

import * as pc from 'playcanvas'

const global = new Function('return this')()

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

              const canvas = 
              ({
                width: width,
                height: height,
                style: {},
                addEventListener: (() => {}) as any,
                removeEventListener: (() => {}) as any,
                clientHeight: height,
                getContext: (() => {return gl}) as any,
                getBoundingClientRect: (() => {return {
                  width: width,
                  height: height,
                }}) as any
              } as HTMLCanvasElement);

              global.window = {
                innerWidth: width,
                innerHeight: height,
                devicePixelRatio: 1,
                addEventListener: (() => {}) as any
              }

              //#region code to impl
              const app = new pc.Application(canvas, {});

              // fill the available space at full resolution
              app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
              app.setCanvasResolution(pc.RESOLUTION_AUTO);

              // ensure canvas is resized when window changes size
              window.addEventListener('resize', () => app.resizeCanvas());

              // create box entity
              const box = new pc.Entity('cube');
              box.addComponent('model', {
                  type: 'box'
              });
              app.root.addChild(box);

              // create camera entity
              const camera = new pc.Entity('camera');
              camera.addComponent('camera', {
                  clearColor: new pc.Color(0.1, 0.1, 0.1)
              });
              app.root.addChild(camera);
              camera.setPosition(0, 0, 3);

              // create directional light entity
              const light = new pc.Entity('light');
              light.addComponent('light');
              app.root.addChild(light);
              light.setEulerAngles(45, 0, 0);

              // rotate the box according to the delta time since the last frame
              app.on('update', dt => {
                box.rotate(10 * dt, 20 * dt, 30 * dt)

                gl.flush();
                gl.endFrameEXP();
              });

              app.start();

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
