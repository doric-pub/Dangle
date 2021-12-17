import {
  Panel,
  Group,
  vlayout,
  layoutConfig,
  Gravity,
  navbar,
  stack,
} from "doric";
import { dangleView, DangleWebGLRenderingContext, vsync } from "dangle";

const global = new Function('return this')()
global.window = {
  devicePixelRatio: 1,
  addEventListener: (() => {}) as any,
  navigator: {
    appVersion: '5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
  },
  requestAnimationFrame: vsync(context).requestAnimationFrame,
  cancelAnimationFrame: vsync(context).cancelAnimationFrame
}
global.navigator = global.window.navigator

import * as pc from 'playcanvas'

@Entry
class shapes extends Panel {
  onShow() {
    navbar(context).setTitle("shapes");
  }
  build(rootView: Group) {
    vlayout([
      stack(
        [
          dangleView({
            onReady: async (gl: DangleWebGLRenderingContext) => {
              const width = gl.drawingBufferWidth
              const height = gl.drawingBufferHeight

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

              global.window.innerWidth = width
              global.window.innerHeight = height

              //#region code to impl
              // Create the application and start the update loop
              const app = new pc.Application(canvas, {});

              app.start();

              // Set the canvas to fill the window and automatically change resolution to be the same as the canvas size
              app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
              app.setCanvasResolution(pc.RESOLUTION_AUTO);

              // All render component primitive shape types
              const shapes = ["box", "plane", "cone", "cylinder", "sphere", "capsule"];
              let x = -1,
                  y = -1;

              shapes.forEach(function (shape) {
                  // Create an entity with a render component
                  const entity = new pc.Entity();
                  entity.addComponent("render", {
                      type: shape,
                  });

                  app.root.addChild(entity);

                  // Lay out the 6 primitives in two rows, 3 per row
                  entity.setLocalPosition(x * 1.2, y, 0);
                  if (x++ === 1) {
                      x = -1;
                      y = 1;
                  }
              });

              // Create an entity with a directional light component
              const light = new pc.Entity();
              light.addComponent("light", {
                  type: "directional",
              });

              app.root.addChild(light);
              light.setLocalEulerAngles(45, 30, 0);

              // Create an entity with a camera component
              const camera = new pc.Entity();
              camera.addComponent("camera", {
                  clearColor: new pc.Color(0.4, 0.45, 0.5),
              });

              app.root.addChild(camera);
              camera.setLocalPosition(0, 0, 5);

              //#endregion
              
              app.on('update', dt => {
                gl.endFrame();
              });
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
