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

              // const remoteResource = new RemoteResource('https://raw.githubusercontent.com/playcanvas/engine/dev/examples/assets/textures/particles-coins.png')
              // const imageInfo = await imageDecoder(context).getImageInfo(remoteResource)
              // const imagePixels = await imageDecoder(context).decodeToPixels(remoteResource)
              // const array = new Uint8Array(imagePixels)

              // const remoteResource1 = new RemoteResource('https://raw.githubusercontent.com/playcanvas/engine/dev/examples/assets/textures/particles-bonus.png')
              // const imageInfo1 = await imageDecoder(context).getImageInfo(remoteResource1)
              // const imagePixels1 = await imageDecoder(context).decodeToPixels(remoteResource1)
              // const array1 = new Uint8Array(imagePixels1)

              //#region code to impl
              // Create the app and start the update loop
              // const app = new pc.Application(canvas, {
              //   mouse: new pc.Mouse(document.body),
              //   touch: new pc.TouchDevice(document.body),
              //   elementInput: new pc.ElementInput(canvas)
              // });

              const app = new pc.Application(canvas, {});

              const remoteResource = new RemoteResource(
                "https://raw.githubusercontent.com/playcanvas/engine/dev/examples/assets/textures/particles-coins.png"
              );
              const imageInfo = await imageDecoder(context).getImageInfo(
                remoteResource
              );
              const imagePixels = await imageDecoder(context).decodeToPixels(
                remoteResource
              );
              const array = new Uint8Array(imagePixels);

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
                particlesCoinsTexture: {
                  resource: texture,
                },
              };

              const remoteResource1 = new RemoteResource(
                "https://raw.githubusercontent.com/playcanvas/engine/dev/examples/assets/textures/particles-bonus.png"
              );
              const imageInfo1 = await imageDecoder(context).getImageInfo(
                remoteResource1
              );
              const imagePixels1 = await imageDecoder(context).decodeToPixels(
                remoteResource1
              );
              const array1 = new Uint8Array(imagePixels1);

              const texture1 = new pc.Texture(graphicsDevice, {
                width: imageInfo1.width,
                height: imageInfo1.height,
                format: pc.PIXELFORMAT_R8_G8_B8_A8,
              });

              var pixels1 = texture1.lock();
              for (var i = 0; i < pixels1.length; i++) {
                pixels1[i] = array1[i];
              }
              texture1.unlock();

              let assets1 = {
                particlesBonusTexture: {
                  resource: texture1,
                },
              };

              // Create an Entity with a camera component
              const cameraEntity = new pc.Entity();
              cameraEntity.addComponent("camera", {
                clearColor: new pc.Color(0.23, 0.5, 0.75),
              });
              cameraEntity.rotateLocal(0, 0, 0);
              cameraEntity.translateLocal(0, 0, 20);

              // Create a directional light
              const lightDirEntity = new pc.Entity();
              lightDirEntity.addComponent("light", {
                type: "directional",
                color: new pc.Color(1, 1, 1),
                intensity: 1,
              });
              lightDirEntity.setLocalEulerAngles(45, 0, 0);

              // Create a screen to display the particle systems textures
              const screenEntity = new pc.Entity();
              screenEntity.addComponent("screen", {
                resolution: new pc.Vec2(640, 480),
                screenSpace: true,
              });
              //@ts-ignore
              screenEntity.screen.scaleMode = "blend";
              //@ts-ignore
              screenEntity.screen.referenceResolution = new pc.Vec2(1280, 720);

              // Create a panel to display the full particle textures
              const panel = new pc.Entity();
              screenEntity.addChild(panel);
              const panel2 = new pc.Entity();
              screenEntity.addChild(panel2);

              // Add Entities into the scene hierarchy
              app.root.addChild(cameraEntity);
              app.root.addChild(lightDirEntity);
              app.root.addChild(screenEntity);

              // Create entity for first particle system
              const particleEntity1 = new pc.Entity();
              app.root.addChild(particleEntity1);
              particleEntity1.setLocalPosition(-3, 3, 0);

              // Create entity for second particle system
              const particleEntity2 = new pc.Entity();
              app.root.addChild(particleEntity2);
              particleEntity2.setLocalPosition(3, 3, 0);

              // gradually make particles bigger
              const scaleCurve = new pc.Curve([0, 0.1, 1, 0.5]);

              // make particles fade in and out
              const alphaCurve = new pc.Curve([0, 0, 0.5, 1, 1, 0]);

              const particleSystemConfiguration = function (
                asset: any,
                animTilesX: any,
                animTilesY: any
              ) {
                return {
                  numParticles: 32,
                  lifetime: 2,
                  rate: 0.2,
                  colorMap: asset.resource,
                  initialVelocity: 0.125,
                  emitterShape: pc.EMITTERSHAPE_SPHERE,
                  emitterRadius: 2.0,
                  animLoop: true,
                  animTilesX: animTilesX,
                  animTilesY: animTilesY,
                  animSpeed: 4,
                  autoPlay: true,
                  alphaGraph: alphaCurve,
                  scaleGraph: scaleCurve,
                };
              };

              // add particlesystem component to particle entity
              particleEntity1.addComponent(
                "particlesystem",
                Object.assign(
                  particleSystemConfiguration(
                    assets.particlesCoinsTexture,
                    4,
                    6
                  ),
                  {
                    // set the number of animations in the sprite sheet to 4
                    animNumAnimations: 4,
                    // set the number of frames in each animation to 6
                    animNumFrames: 6,
                    // set the particle system to randomly select a different animation for each particle
                    randomizeAnimIndex: true,
                  }
                )
              );

              // display the full coin texture to the left of the panel
              // panel.addComponent('element', {
              //   anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
              //   pivot: new pc.Vec2(1.75, 1.0),
              //   width: 150,
              //   height: 225,
              //   type: "image",
              //   textureAsset: assets.particlesCoinsTexture
              // });

              // add particlesystem component to particle entity
              particleEntity2.addComponent(
                "particlesystem",
                Object.assign(
                  particleSystemConfiguration(
                    assets1.particlesBonusTexture,
                    4,
                    2
                  ),
                  {
                    // set the number of animations in the sprite sheet to 7
                    animNumAnimations: 7,
                    // set the number of frames in each animation to 1
                    animNumFrames: 1,
                    // set the particle system to randomly select a different animation for each particle
                    randomizeAnimIndex: true,
                  }
                )
              );

              // display the full bonus item texture to the left of the panel
              // panel2.addComponent('element', {
              //   anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
              //   pivot: new pc.Vec2(-0.5, 1.0),
              //   width: 200,
              //   height: 100,
              //   type: "image",
              //   textureAsset: assets1.particlesBonusTexture
              // });

              app.start();

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
