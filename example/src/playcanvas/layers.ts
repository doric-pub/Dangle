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

const global = new Function("return this")();
global.window = {
  devicePixelRatio: 1,
  addEventListener: (() => {}) as any,
  navigator: {
    appVersion:
      "5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
  },
  requestAnimationFrame: vsync(context).requestAnimationFrame,
  cancelAnimationFrame: vsync(context).cancelAnimationFrame,
};
global.navigator = global.window.navigator;

import * as pc from "playcanvas";

@Entry
class layers extends Panel {
  onShow() {
    navbar(context).setTitle("layers");
  }
  build(rootView: Group) {
    vlayout([
      stack(
        [
          dangleView({
            onReady: async (gl: DangleWebGLRenderingContext) => {
              const width = gl.drawingBufferWidth;
              const height = gl.drawingBufferHeight;

              const canvas = {
                width: width,
                height: height,
                style: {},
                addEventListener: (() => {}) as any,
                removeEventListener: (() => {}) as any,
                clientHeight: height,
                getContext: (() => {
                  return gl;
                }) as any,
                getBoundingClientRect: (() => {
                  return {
                    width: width,
                    height: height,
                  };
                }) as any,
              } as HTMLCanvasElement;

              global.window.innerWidth = width;
              global.window.innerHeight = height;

              //#region code to impl
              // Create the app and start the update loop
              const app = new pc.Application(canvas, {});

              app.start();

              // Set the canvas to fill the window and automatically change resolution to be the same as the canvas size
              app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
              app.setCanvasResolution(pc.RESOLUTION_AUTO);

              app.scene.ambientLight = new pc.Color(0.2, 0.2, 0.2);

              // Create a new layer to put in front of everything
              const layer = new pc.Layer({
                name: "Front Layer",
              });

              // get the world layer index
              const worldLayer = app.scene.layers.getLayerByName("World");
              const idx = app.scene.layers.getTransparentIndex(worldLayer);

              // insert the new layer after the world layer
              app.scene.layers.insert(layer, idx + 1);

              // Create an Entity with a camera component
              // Make sure it renders both World and Front Layer
              const camera = new pc.Entity();
              camera.addComponent("camera", {
                clearColor: new pc.Color(0.4, 0.45, 0.5),
                layers: [worldLayer.id, layer.id],
              });
              camera.translate(0, 0, 24);
              app.root.addChild(camera);

              // Create an Entity with a omni light component
              // Make sure it lights both World and Front Layer
              const light = new pc.Entity();
              light.addComponent("light", {
                type: "omni",
                color: new pc.Color(1, 1, 1),
                range: 100,
                layers: [worldLayer.id, layer.id],
              });
              light.translate(5, 0, 15);
              app.root.addChild(light);

              // red material is semi-transparent
              const red = new pc.StandardMaterial();
              red.diffuse.set(1, 0, 0);
              red.blendType = pc.BLEND_NORMAL;
              red.opacity = 0.5;
              red.update();

              // blue material does not test the existing depth buffer
              const blue = new pc.StandardMaterial();
              blue.diffuse.set(0, 0, 1);
              blue.depthTest = false;
              blue.update();

              // red box is rendered first in World layer
              const redBox = new pc.Entity();
              redBox.addComponent("model", {
                type: "box",
              });
              // @ts-ignore engine-tsd
              redBox.model.material = red;
              redBox.setLocalScale(5, 5, 5);
              app.root.addChild(redBox);

              // blue box is rendered in the Front Layer which is after World
              // because it does not test for depth
              // and is in a later layer
              // it is visible even though it should be inside the red box
              const blueBox = new pc.Entity();
              blueBox.addComponent("model", {
                type: "box",
                layers: [layer.id], // try removing this line, the blue box will appear inside the red one
              });
              // @ts-ignore engine-tsd
              blueBox.model.material = blue;
              blueBox.setLocalScale(2.5, 2.5, 2.5);
              app.root.addChild(blueBox);

              app.on("update", function (dt) {
                if (redBox) {
                  redBox.rotate(0, 10 * dt, 0);
                }
                if (blueBox) {
                  blueBox.rotate(0, -10 * dt, 0);
                }

                // @ts-ignore engine-tsd
                blueBox.model.meshInstances[0].layer = 10;
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
