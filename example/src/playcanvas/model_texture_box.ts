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
class model_texture_box extends Panel {
  onShow() {
    navbar(context).setTitle("model_texture_box");
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
                "https://raw.githubusercontent.com/playcanvas/engine/dev/examples/assets/textures/clouds.jpg"
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

              const graphicsDevice = new pc.GraphicsDevice(canvas);

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
                clouds: {
                  resource: texture,
                },
              };

              app.start();

              // Set the canvas to fill the window and automatically change resolution to be the same as the canvas size
              app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
              app.setCanvasResolution(pc.RESOLUTION_AUTO);

              app.scene.ambientLight = new pc.Color(0.2, 0.2, 0.2);

              // Create a Entity with a Box model component
              const box = new pc.Entity();
              box.addComponent("model", {
                type: "box",
              });

              // Create an Entity with a omni light component and a sphere model component.
              const light = new pc.Entity();
              light.addComponent("light", {
                type: "omni",
                color: new pc.Color(1, 0, 0),
                radius: 10,
              });
              light.addComponent("model", {
                type: "sphere",
              });
              // Scale the sphere down to 0.1m
              light.setLocalScale(0.1, 0.1, 0.1);

              // Create an Entity with a camera component
              const camera = new pc.Entity();
              camera.addComponent("camera", {
                clearColor: new pc.Color(0.4, 0.45, 0.5),
              });

              // Add the new Entities to the hierarchy
              app.root.addChild(box);
              app.root.addChild(light);
              app.root.addChild(camera);

              // Move the camera 10m along the z-axis
              camera.translate(0, 0, 10);

              // Set an update function on the app's update event
              let angle = 0;

              app.on("update", function (dt) {
                angle += dt;
                if (angle > 360) {
                  angle = 0;
                }

                // Move the light in a circle
                light.setLocalPosition(
                  3 * Math.sin(angle),
                  0,
                  3 * Math.cos(angle)
                );

                // Rotate the box
                box.setEulerAngles(angle * 2, angle * 4, angle * 8);
                gl.endFrame();
              });

              const material = new pc.StandardMaterial();
              material.diffuseMap = assets.clouds.resource;
              material.update();
              //@ts-ignore
              box.model.material = material;

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
