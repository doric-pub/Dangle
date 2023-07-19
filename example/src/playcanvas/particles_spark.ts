import {
  Panel,
  Group,
  vlayout,
  layoutConfig,
  Gravity,
  navbar,
  stack,
  RemoteResource,
  imageDecoder,
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
class particles_spark extends Panel {
  onShow() {
    navbar(context).setTitle("particles_spark");
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

              const remoteResource = new RemoteResource(
                "https://raw.githubusercontent.com/playcanvas/engine/dev/examples/assets/textures/spark.png"
              );
              const imageInfo = await imageDecoder(context).getImageInfo(
                remoteResource
              );
              const imagePixels = await imageDecoder(context).decodeToPixels(
                remoteResource
              );
              const array = new Uint8Array(imagePixels);

              //#region code to impl
              // Create the app and start the update loop
              const app = new pc.Application(canvas, {});

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
                spark: {
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
                clearColor: new pc.Color(0, 0, 0.05),
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

              // Offset position
              const localPosCurve = new pc.CurveSet([
                [0, 0, 1, 4],
                [0, 0, 1, 3],
                [0, 0, 1, 0],
              ]);
              localPosCurve.type = pc.CURVE_LINEAR;

              // make particles move in different directions
              const localVelocityCurve = new pc.CurveSet([
                [0, 0, 1, 8],
                [0, 0, 1, 6],
                [0, 0, 1, 0],
              ]);
              const localVelocityCurve2 = new pc.CurveSet([
                [0, 0, 1, -8],
                [0, 0, 1, -6],
                [0, 0, 1, 0],
              ]);

              // increasing gravity
              const worldVelocityCurve = new pc.CurveSet([
                [0, 0],
                [0, 0, 0.2, 6, 1, -48],
                [0, 0],
              ]);

              // gradually make sparks bigger
              const scaleCurve = new pc.Curve([
                0, 0, 0.5, 0.3, 0.8, 0.2, 1, 0.1,
              ]);

              // rotate sparks 360 degrees per second
              const angleCurve = new pc.Curve([0, 360]);

              // color changes throughout lifetime
              const colorCurve = new pc.CurveSet([
                [0, 1, 0.25, 1, 0.375, 0.5, 0.5, 0],
                [0, 0, 0.125, 0.25, 0.25, 0.5, 0.375, 0.75, 0.5, 1],
                [0, 0, 1, 0],
              ]);

              // Create entity for particle system
              const entity = new pc.Entity();
              app.root.addChild(entity);
              entity.setLocalPosition(0, 0, 0);

              // when texture is loaded add particlesystem component to entity
              entity.addComponent("particlesystem", {
                numParticles: 200,
                lifetime: 2,
                rate: 0.01,
                scaleGraph: scaleCurve,
                rotationSpeedGraph: angleCurve,
                colorGraph: colorCurve,
                colorMap: assets.spark.resource,
                velocityGraph: worldVelocityCurve,
                localVelocityGraph: localVelocityCurve,
                localVelocityGraph2: localVelocityCurve2,
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
