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
class clustered_spot_shadows extends Panel {
  onShow() {
    navbar(context).setTitle("clustered_spot_shadows");
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
                "https://raw.githubusercontent.com/playcanvas/engine/dev/examples/assets/textures/normal-map.png"
              );
              const imageInfo = await imageDecoder(context).getImageInfo(
                remoteResource
              );
              const imagePixels = await imageDecoder(context).decodeToPixels(
                remoteResource
              );
              const array = new Uint8Array(imagePixels);

              const remoteResource1 = new RemoteResource(
                "https://raw.githubusercontent.com/playcanvas/engine/dev/examples/assets/textures/channels.png"
              );
              const imageInfo1 = await imageDecoder(context).getImageInfo(
                remoteResource1
              );
              const imagePixels1 = await imageDecoder(context).decodeToPixels(
                remoteResource1
              );
              const array1 = new Uint8Array(imagePixels1);

              //#region code to impl
              // Create the application and start the update loop
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
                normal: {
                  resource: texture,
                },
              };

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
                channels: {
                  resource: texture1,
                },
              };

              app.start();

              // setup skydome as ambient light
              app.scene.skyboxMip = 3;
              app.scene.skyboxIntensity = 0.4;
              // app.scene.setSkybox(assets.cubemap.resources);

              // enabled clustered lighting. This is a temporary API and will change in the future
              // @ts-ignore engine-tsd
              app.scene.clusteredLightingEnabled = true;

              // adjust default clustered lighting parameters to handle many lights:
              // @ts-ignore
              const lighting = app.scene.lighting;

              // 1) subdivide space with lights into this many cells:
              // @ts-ignore engine-tsd
              lighting.cells = new pc.Vec3(12, 4, 12);

              // 2) and allow this many lights per cell:
              // @ts-ignore engine-tsd
              const maxLights = 24;
              lighting.maxLightsPerCell = maxLights;

              // enable clustered shadows (it's enabled by default as well)
              // @ts-ignore engine-tsd
              lighting.shadowsEnabled = true;

              // enable clustered cookies
              // @ts-ignore engine-tsd
              lighting.cookiesEnabled = true;

              // resolution of the shadow and cookie atlas
              // lighting.shadowAtlasResolution = data.get('settings.shadowAtlasResolution');
              lighting.cookieAtlasResolution = 1500;

              // Set the canvas to fill the window and automatically change resolution to be the same as the canvas size
              app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
              app.setCanvasResolution(pc.RESOLUTION_AUTO);

              // window.addEventListener("resize", function () {
              //   app.resizeCanvas(canvas.width, canvas.height);
              // });

              // ground material
              const groundMaterial = new pc.StandardMaterial();
              groundMaterial.gloss = 25;
              groundMaterial.metalness = 0.4;
              groundMaterial.useMetalness = true;

              // normal map
              groundMaterial.normalMap = assets.normal.resource;
              groundMaterial.normalMapTiling.set(10, 10);
              groundMaterial.bumpiness = 0.5;

              groundMaterial.update();

              // helper function to create a 3d primitive including its material
              function createPrimitive(
                primitiveType: string,
                position: pc.Vec3,
                scale: pc.Vec3
              ) {
                // create the primitive using the material
                const primitive = new pc.Entity();
                primitive.addComponent("render", {
                  type: primitiveType,
                  castShadows: true,
                  material: groundMaterial,
                });

                // set position and scale and add it to scene
                primitive.setLocalPosition(position);
                primitive.setLocalScale(scale);
                app.root.addChild(primitive);

                return primitive;
              }

              const ground = createPrimitive(
                "box",
                new pc.Vec3(0, 0, 0),
                new pc.Vec3(500, 0, 500)
              );

              const numTowers = 8;
              for (let i = 0; i < numTowers; i++) {
                let scale = 12;
                const fraction = (i / numTowers) * Math.PI * 2;
                const radius = 200;
                const numCubes = 12;
                for (let y = 0; y <= 10; y++) {
                  const elevationRadius = radius * (1 - y / numCubes);
                  const pos = new pc.Vec3(
                    elevationRadius * Math.sin(fraction),
                    y * 6,
                    elevationRadius * Math.cos(fraction)
                  );
                  const prim = createPrimitive(
                    "box",
                    pos,
                    new pc.Vec3(scale, scale, scale)
                  );
                  prim.setLocalEulerAngles(
                    Math.random() * 360,
                    Math.random() * 360,
                    Math.random() * 360
                  );
                }
                scale -= 1.5;
              }

              const spotLightList: Array<pc.Entity> = [];
              const cookieChannels = ["r", "g", "b", "a", "rgb"];

              function createLight() {
                const intensity = 1.5;
                const color = new pc.Color(
                  intensity * Math.random(),
                  intensity * Math.random(),
                  intensity * Math.random(),
                  1
                );
                const lightSpot = new pc.Entity("Spot");
                const cookieChannel =
                  cookieChannels[
                    Math.floor(Math.random() * cookieChannels.length)
                  ];

                lightSpot.addComponent("light", {
                  type: "spot",
                  color: color,
                  intensity: 3,
                  innerConeAngle: 30,
                  outerConeAngle: 35,
                  range: 150,
                  castShadows: true,
                  shadowBias: 0.4,
                  normalOffsetBias: 0.1,
                  shadowResolution: 512, // only used when clustering is off

                  // cookie texture
                  cookie: assets1.channels.resource,
                  cookieChannel: cookieChannel,
                  cookieIntensity: 0.5,
                });

                // attach a render component with a small cone to each light
                const material = new pc.StandardMaterial();
                material.emissive = color;
                material.update();

                lightSpot.addComponent("render", {
                  type: "cone",
                  material: material,
                  castShadows: false,
                });
                lightSpot.setLocalScale(5, 5, 5);
                app.root.addChild(lightSpot);
                spotLightList.push(lightSpot);
              }

              // create many spot lights
              const count = 10;
              for (let i = 0; i < count; i++) {
                createLight();
              }
              updateLightCount();

              // Create an entity with a camera component
              const camera = new pc.Entity();
              camera.addComponent("camera", {
                clearColor: new pc.Color(0.2, 0.2, 0.2),
                farClip: 2000,
                nearClip: 1,
              });
              app.root.addChild(camera);
              camera.setLocalPosition(
                300 * Math.sin(0),
                150,
                300 * Math.cos(0)
              );

              // add orbit camera script with mouse and touch support
              camera.addComponent("script");
              //@ts-ignore
              camera.script.create("orbitCamera", {
                attributes: {
                  inertiaFactor: 0.2,
                  focusEntity: ground,
                  distanceMax: 1200,
                  frameOnStart: false,
                },
              });
              // camera.script.create("orbitCameraInputMouse");
              // camera.script.create("orbitCameraInputTouch");

              // handle HUD changes - update properties on the scene
              // data.on('*:set', (path: string, value: any) => {
              //   const pathArray = path.split('.');

              //   if (pathArray[1] === 'debug') {

              //     // debug rendering of lighting clusters on world layer
              //     lighting.debugLayer = value ? app.scene.layers.getLayerByName("World").id : undefined;

              //   } else {
              //     // @ts-ignore
              //     lighting[pathArray[1]] = value;
              //   }
              // });

              function updateLightCount() {
                // data.set('settings.numLights', spotLightList.length);
              }

              // data.on('add', function () {
              //   if (spotLightList.length < maxLights) {
              //     createLight();
              //     updateLightCount();
              //   }
              // });

              // data.on('remove', function () {
              //   if (spotLightList.length) {
              //     const light = spotLightList.pop();
              //     app.root.removeChild(light);
              //     light.destroy();
              //     updateLightCount();
              //   }
              // });

              // Set an update function on the app's update event
              let time = 0;

              app.on("update", (dt) => {
                time += dt * 0.15;
                // rotate spot lights around
                const lightPos = new pc.Vec3();
                spotLightList.forEach(function (spotlight, i) {
                  const angle = (i / spotLightList.length) * Math.PI * 2;
                  const x = 130 * Math.sin(angle + time);
                  const z = 130 * Math.cos(angle + time);
                  lightPos.set(x, 100, z);
                  spotlight.setLocalPosition(lightPos);

                  lightPos.y = 0;
                  spotlight.lookAt(lightPos, pc.Vec3.RIGHT);

                  spotlight.rotateLocal(90, 0, 0);
                });

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
