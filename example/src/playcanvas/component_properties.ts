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
class component_properties extends Panel {
  onShow() {
    navbar(context).setTitle("component_properties");
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

              const remoteResource = new RemoteResource('https://raw.githubusercontent.com/playcanvas/engine/dev/examples/assets/textures/playcanvas-grey.png')
              const imageInfo = await imageDecoder(context).getImageInfo(remoteResource)
              const imagePixels = await imageDecoder(context).decodeToPixels(remoteResource)
              const array = new Uint8Array(imagePixels)



              //#region code to impl
              // Create the app and start the update loop
              const app = new pc.Application(canvas, {});

              // app.start();

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
                playcanvasGreyTexture: {
                  resource: texture
                }
              }

              // create the animation data for two static spot lights
              const animClipStaticLightData = {
                "name": "staticLight",
                "duration": 1.0,
                // curve keyframe inputs
                "inputs": [
                  [
                    0.0
                  ]
                ],
                // curve keyframe outputs
                "outputs": [
                  // a single RGBA color keyframe value of a green light
                  {
                    "components": 4,
                    "data": [
                      0.0, 1.0, 0.0, 1.0
                    ]
                  },
                  // a single quaternion keyframe value with no rotation
                  {
                    "components": 4,
                    "data": [
                      0.0, 0.0, 0.0, 0.0
                    ]
                  }
                ],
                // the curves contained in the clip, each with the path to the property they animation, the index of
                // their input and output keyframes and the method of interpolation to be used
                "curves": [
                  {
                    "path": { entityPath: ["lights", "spotLight1"], component: "light", propertyPath: ["color"] },
                    "inputIndex": 0,
                    "outputIndex": 0,
                    "interpolation": 1
                  },
                  {
                    "path": { entityPath: ["lights", "spotLight2"], component: "light", propertyPath: ["color"] },
                    "inputIndex": 0,
                    "outputIndex": 0,
                    "interpolation": 1
                  },
                  {
                    "path": { entityPath: ["lights", "spotLight1"], component: "entity", propertyPath: ["localEulerAngles"] },
                    "inputIndex": 0,
                    "outputIndex": 1,
                    "interpolation": 1
                  },
                  {
                    "path": { entityPath: ["lights", "spotLight2"], component: "entity", propertyPath: ["localEulerAngles"] },
                    "inputIndex": 0,
                    "outputIndex": 1,
                    "interpolation": 1
                  }
                ]
              };

              // create the animation data for two flashing spot lights
              const animClipFlashingLightData = {
                "name": "flashingLight",
                "duration": 2.0,
                // curve keyframe inputs
                "inputs": [
                  [
                    0.0, 0.5, 1.0, 1.5, 2.0
                  ],
                  [
                    0, 1, 2
                  ]
                ],
                // curve keyframe outputs
                "outputs": [
                  //  keyframe outputs for a flashing red RGBA color
                  {
                    "components": 4,
                    "data": [
                      1.0, 0.0, 0.0, 1.0,
                      0.4, 0.0, 0.0, 1.0,
                      1.0, 0.0, 0.0, 1.0,
                      0.4, 0.0, 0.0, 1.0,
                      1.0, 0.0, 0.0, 1.0
                    ]
                  },
                  //  keyframe outputs for a quaternion rotation
                  {
                    "components": 4,
                    "data": [
                      4.0, 0.0, 0.0, 0.0,
                      4.0, 180.0, 0.0, 0.0,
                      4.0, 0.0, 0.0, 0.0
                    ]
                  },
                  //  keyframe outputs for a quaternion rotation
                  {
                    "components": 4,
                    "data": [
                      -4.0, 0.0, 0.0, 0.0,
                      -4.0, 180.0, 0.0, 0.0,
                      -4.0, 0.0, 0.0, 0.0
                    ]
                  }
                ],
                // the curves contained in the clip, each with the path to the property they animation, the index of
                // their input and output keyframes and the method of interpolation to be used
                "curves": [
                  {
                    "path": { entityPath: ["lights", "spotLight1"], component: "light", propertyPath: ["color"] },
                    "inputIndex": 0,
                    "outputIndex": 0,
                    "interpolation": 1
                  },
                  {
                    "path": { entityPath: ["lights", "spotLight2"], component: "light", propertyPath: ["color"] },
                    "inputIndex": 0,
                    "outputIndex": 0,
                    "interpolation": 1
                  },
                  {
                    "path": { entityPath: ["lights", "spotLight1"], component: "entity", propertyPath: ["localEulerAngles"] },
                    "inputIndex": 1,
                    "outputIndex": 1,
                    "interpolation": 1
                  },
                  {
                    "path": { entityPath: ["lights", "spotLight2"], component: "entity", propertyPath: ["localEulerAngles"] },
                    "inputIndex": 1,
                    "outputIndex": 2,
                    "interpolation": 1
                  }
                ]
              };

              // @ts-ignore
              const animClipHandler = new pc.AnimClipHandler();
              const animClipStaticLight = animClipHandler.open(undefined, animClipStaticLightData);
              const animClipFlashingLight = animClipHandler.open(undefined, animClipFlashingLightData);

              // Create an Entity with a camera component
              const cameraEntity = new pc.Entity();
              cameraEntity.name = 'camera';
              cameraEntity.addComponent("camera", {
                clearColor: new pc.Color(0, 0, 0.0)
              });
              cameraEntity.translateLocal(7, 10, 7);
              cameraEntity.lookAt(0, 0, 0);

              const boxEntity = new pc.Entity();
              boxEntity.addComponent("render", {
                type: 'box'
              });
              boxEntity.name = 'model';
              boxEntity.setPosition(0, 0.25, 0);
              boxEntity.setLocalScale(0.5, 0.5, 0.5);
              const material = new pc.StandardMaterial();
              material.diffuseMap = assets.playcanvasGreyTexture.resource;
              material.update();
              //@ts-ignore
              boxEntity.render.meshInstances[0].material = material;

              const planeEntity = new pc.Entity();
              planeEntity.name = 'plane';
              planeEntity.addComponent("render", {
                type: "plane"
              });
              planeEntity.setLocalScale(15, 1, 15);
              planeEntity.setPosition(0, 0, 0);

              // Create the animatible lights
              const lightsEntity = new pc.Entity();
              lightsEntity.name = 'lights';

              const light1 = new pc.Entity();
              light1.name = 'spotLight1';
              light1.addComponent("light", {
                type: "spot",
                color: new pc.Color(0.0, 0.0, 0.0, 1.0),
                intensity: 1,
                range: 15,
                innerConeAngle: 5,
                outerConeAngle: 10
              });
              light1.setPosition(0, 10, 0);

              const light2 = new pc.Entity();
              light2.name = 'spotLight2';
              light2.addComponent("light", {
                type: "spot",
                color: new pc.Color(0.0, 0.0, 0.0, 1.0),
                intensity: 1,
                range: 15,
                innerConeAngle: 5,
                outerConeAngle: 10
              });
              light2.setPosition(0, 10, 0);

              // Add Entities into the scene hierarchy
              app.root.addChild(cameraEntity);
              lightsEntity.addChild(light1);
              lightsEntity.addChild(light2);
              app.root.addChild(lightsEntity);
              app.root.addChild(boxEntity);
              app.root.addChild(planeEntity);

              // add the anim component to the lights entity
              lightsEntity.addComponent("anim", {
                speed: 1.0,
                activate: true
              });

              // assign animation clip asset resources to the appropriate states
              //@ts-ignore
              lightsEntity.anim.assignAnimation('Static', animClipStaticLight);
               //@ts-ignore
              lightsEntity.anim.assignAnimation('Flash', animClipFlashingLight);

              app.start();

               //@ts-ignore
              // data.on('flash:set', () => {
              //    //@ts-ignore
              //   if (lightsEntity.anim.baseLayer.activeState === 'Static') {
              //      //@ts-ignore
              //     lightsEntity.anim.baseLayer.transition('Flash', 0.5);
              //   } else {
              //      //@ts-ignore
              //     lightsEntity.anim.baseLayer.transition('Static', 0.5);
              //   }
              // });




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
