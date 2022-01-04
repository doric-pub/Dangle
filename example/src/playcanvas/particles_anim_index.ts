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

const global = new Function('return this')()
global.window = {
  devicePixelRatio: 1,
  addEventListener: (() => { }) as any,
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
class particles_anim_index extends Panel {
  onShow() {
    navbar(context).setTitle("particles_anim_index");
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
                  addEventListener: (() => { }) as any,
                  removeEventListener: (() => { }) as any,
                  clientHeight: height,
                  getContext: (() => { return gl }) as any,
                  getBoundingClientRect: (() => {
                    return {
                      width: width,
                      height: height,
                    }
                  }) as any
                } as HTMLCanvasElement);

              global.window.innerWidth = width
              global.window.innerHeight = height


              const remoteResource = new RemoteResource('https://raw.githubusercontent.com/playcanvas/engine/dev/examples/assets/textures/particles-numbers.png')
              const imageInfo = await imageDecoder(context).getImageInfo(remoteResource)
              const imagePixels = await imageDecoder(context).decodeToPixels(remoteResource)
              const array = new Uint8Array(imagePixels)


              //#region code to impl
              // Create the app and start the update loop
              const app = new pc.Application(canvas, {});


              const graphicsDevice = new pc.GraphicsDevice(canvas)

              const texture = new pc.Texture(graphicsDevice, {
                width: imageInfo.width,
                height: imageInfo.height,
                format: pc.PIXELFORMAT_R8_G8_B8_A8,
              })

              var pixels = texture.lock();
              for (var i = 0; i < pixels.length; i++) {
                pixels[i] = array[i]
              }
              texture.unlock();


              let assets = {
                particlesNumbers: {
                  resource: texture
                }
              }
              // Set the canvas to fill the window and automatically change resolution to be the same as the canvas size
              app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
              app.setCanvasResolution(pc.RESOLUTION_AUTO);

              // Create an Entity with a camera component
              const cameraEntity = new pc.Entity();
              cameraEntity.addComponent("camera", {
                clearColor: new pc.Color(0.75, 0.75, 0.75)
              });
              cameraEntity.rotateLocal(0, 0, 0);
              cameraEntity.translateLocal(0, 0, 20);

              // Create a directional light
              const lightDirEntity = new pc.Entity();
              lightDirEntity.addComponent("light", {
                type: "directional",
                color: new pc.Color(1, 1, 1),
                intensity: 1
              });
              lightDirEntity.setLocalEulerAngles(45, 0, 0);

              // Create a screen to display the particle texture
              const screenEntity = new pc.Entity();
              screenEntity.addComponent("screen", { resolution: new pc.Vec2(640, 480), screenSpace: true });
              //@ts-ignore
              screenEntity.screen.scaleMode = "blend";
              //@ts-ignore
              screenEntity.screen.referenceResolution = new pc.Vec2(1280, 720);

              // Create a panel to display the full particle texture
              const panel = new pc.Entity();
              screenEntity.addChild(panel);

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

              // Create entity for third particle system
              const particleEntity3 = new pc.Entity();
              app.root.addChild(particleEntity3);
              particleEntity3.setLocalPosition(-3, -3, 0);

              // Create entity for fourth particle system
              const particleEntity4 = new pc.Entity();
              app.root.addChild(particleEntity4);
              particleEntity4.setLocalPosition(3, -3, 0);

              // when the texture is loaded add particlesystem components to particle entities

              // gradually make sparks bigger
              const scaleCurve = new pc.Curve(
                [0, 0, 1, 1]
              );

              const particleSystemConfiguration = {
                numParticles: 8,
                lifetime: 4,
                rate: 0.5,
                colorMap: assets.particlesNumbers.resource,
                initialVelocity: 0.25,
                emitterShape: pc.EMITTERSHAPE_SPHERE,
                emitterRadius: 0.1,
                animLoop: true,
                animTilesX: 4,
                animTilesY: 4,
                animSpeed: 1,
                autoPlay: true,
                scaleGraph: scaleCurve
              };

              particleEntity1.addComponent("particlesystem",
                Object.assign(particleSystemConfiguration, {
                  // states that each animation in the sprite sheet has 4 frames
                  animNumFrames: 4,
                  // set the animation index of the first particle system to 0
                  animIndex: 0
                })
              );

              particleEntity2.addComponent("particlesystem",
                Object.assign(particleSystemConfiguration, {
                  // states that each animation in the sprite sheet has 4 frames
                  animNumFrames: 4,
                  // set the animation index of the second particle system to 1
                  animIndex: 1
                })
              );

              particleEntity3.addComponent("particlesystem",
                Object.assign(particleSystemConfiguration, {
                  // states that each animation in the sprite sheet has 4 frames
                  animNumFrames: 4,
                  // set the animation index of the third particle system to 2
                  animIndex: 2
                })
              );

              particleEntity4.addComponent("particlesystem",
                Object.assign(particleSystemConfiguration, {
                  // states that each animation in the sprite sheet has 4 frames
                  animNumFrames: 4,
                  // set the animation index of the fourth particle system to 3
                  animIndex: 3
                })
              );

              // add the full particle texture to the panel
              panel.addComponent('element', {
                anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
                pivot: new pc.Vec2(0.5, 0.5),
                width: 100,
                height: 100,
                type: "image",
                textureAsset: assets.particlesNumbers
              });

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
