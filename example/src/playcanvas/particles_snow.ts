import {
  Panel,
  Group,
  vlayout,
  layoutConfig,
  Gravity,
  navbar,
  stack,
  imageDecoder,
  AssetsResource,
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
class particles_random_sprites extends Panel {
  onShow() {
    navbar(context).setTitle("particles_random_sprites");
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

              const assetsResource = new AssetsResource(
                "playcanvas/snowflake.png"
              );
              const imageInfo = await imageDecoder(context).getImageInfo(
                assetsResource
              );
              const imagePixels = await imageDecoder(context).decodeToPixels(
                assetsResource
              );
              const array = new Uint8Array(imagePixels);

              const app = new pc.Application(canvas, {});

              //#region code to impl
              // Create the app and start the update loop

              const graphicsDevice = new pc.GraphicsDevice(canvas, {});

              const texture = new pc.Texture(graphicsDevice, {
                width: imageInfo.width,
                height: imageInfo.height,
                format: pc.PIXELFORMAT_R8_G8_B8_A8,
              });

              var pixels = texture.lock();
              for (var i = 0; i < pixels.length; i++) {
                pixels[i] = array[i];
              }
              texture.unlock();

              let assets = {
                snowflake: {
                  resource: texture,
                },
              };

              app.start();

              // Set the canvas to fill the window and automatically change resolution to be the same as the canvas size
              app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
              app.setCanvasResolution(pc.RESOLUTION_AUTO);

              // Create an Entity with a camera component
              const cameraEntity = new pc.Entity();
              cameraEntity.addComponent("camera", {
                clearColor: new pc.Color(0, 0, 0),
              });
              cameraEntity.rotateLocal(0, 0, 0);
              cameraEntity.translateLocal(0, 0, 10);

              // Create a directional light
              const lightDirEntity = new pc.Entity();
              lightDirEntity.addComponent("light", {
                type: "directional",
                color: new pc.Color(1, 1, 1),
                intensity: 1,
              });
              lightDirEntity.setLocalEulerAngles(45, 0, 0);

              // Add Entities into the scene hierarchy
              app.root.addChild(cameraEntity);
              app.root.addChild(lightDirEntity);

              // set up random downwards velocity from -0.4 to -0.7
              const velocityCurve = new pc.CurveSet([
                [0, 0], // x
                [0, -0.7], // y
                [0, 0], // z
              ]);
              const velocityCurve2 = new pc.CurveSet([
                [0, 0], // x
                [0, -0.4], // y
                [0, 0], // z
              ]);

              // set up random rotation speed from -100 to 100 degrees per second
              const rotCurve = new pc.Curve([0, 100]);
              const rotCurve2 = new pc.Curve([0, -100]);

              // scale is constant at 0.1
              const scaleCurve = new pc.Curve([0, 0.1]);

              // Create entity for particle system
              const entity = new pc.Entity();
              app.root.addChild(entity);
              entity.setLocalPosition(0, 3, 0);

              // load snowflake texture

              entity.addComponent("particlesystem", {
                numParticles: 100,
                lifetime: 10,
                rate: 0.1,
                startAngle: 360,
                startAngle2: -360,
                emitterExtents: new pc.Vec3(5, 0, 0),
                velocityGraph: velocityCurve,
                velocityGraph2: velocityCurve2,
                scaleGraph: scaleCurve,
                rotationSpeedGraph: rotCurve,
                rotationSpeedGraph2: rotCurve2,
                colorMap: assets.snowflake.resource,
              });

              app.on("update", function (dt) {
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
