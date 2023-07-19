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
class clustered_omni_shadows extends Panel {
  onShow() {
    navbar(context).setTitle("clustered_omni_shadows");
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
                "https://raw.githubusercontent.com/playcanvas/engine/dev/examples/assets/cubemaps/xmas_faces/xmas_negx.png"
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
              app.start();

              const graphicsDevice = new pc.GraphicsDevice(canvas, {});

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
                xmas_negx: {
                  resource: texture1,
                },
              };

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

              // Set the canvas to fill the window and automatically change resolution to be the same as the canvas size
              app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
              app.setCanvasResolution(pc.RESOLUTION_AUTO);

              // enabled clustered lighting. This is a temporary API and will change in the future
              // @ts-ignore engine-tsd
              app.scene.clusteredLightingEnabled = true;

              // adjust default clustered lighting parameters to handle many lights:
              // @ts-ignore
              const lighting = app.scene.lighting;

              // 1) subdivide space with lights into this many cells:
              // @ts-ignore engine-tsd
              lighting.cells = new pc.Vec3(16, 12, 16);

              // 2) and allow this many lights per cell:
              // @ts-ignore engine-tsd
              lighting.maxLightsPerCell = 12;

              // enable clustered shadows (it's enabled by default as well)
              // @ts-ignore engine-tsd
              lighting.shadowsEnabled = true;

              // enable clustered cookies
              // @ts-ignore engine-tsd
              lighting.cookiesEnabled = true;

              // resolution of the shadow and cookie atlas
              // lighting.shadowAtlasResolution = data.get('settings.shadowAtlasResolution');
              lighting.cookieAtlasResolution = 2048;

              // helper function to create a 3d primitive including its material
              function createPrimitive(
                primitiveType: string,
                position: pc.Vec3,
                scale: pc.Vec3
              ) {
                // create a material
                const material = new pc.StandardMaterial();
                material.diffuse = new pc.Color(0.7, 0.7, 0.7);

                // normal map
                material.normalMap = assets.normal.resource;
                material.normalMapTiling.set(5, 5);
                material.bumpiness = 0.7;

                // enable specular
                material.gloss = 40;
                material.metalness = 0.3;
                material.useMetalness = true;

                material.update();

                // create the primitive using the material
                const primitive = new pc.Entity();
                primitive.addComponent("render", {
                  type: primitiveType,
                  material: material,
                });

                // set position and scale and add it to scene
                primitive.setLocalPosition(position);
                primitive.setLocalScale(scale);
                app.root.addChild(primitive);

                return primitive;
              }

              // create the ground plane from the boxes
              createPrimitive(
                "box",
                new pc.Vec3(0, 0, 0),
                new pc.Vec3(800, 2, 800)
              );
              createPrimitive(
                "box",
                new pc.Vec3(0, 400, 0),
                new pc.Vec3(800, 2, 800)
              );

              // walls
              createPrimitive(
                "box",
                new pc.Vec3(400, 200, 0),
                new pc.Vec3(2, 400, 800)
              );
              createPrimitive(
                "box",
                new pc.Vec3(-400, 200, 0),
                new pc.Vec3(2, 400, 800)
              );
              createPrimitive(
                "box",
                new pc.Vec3(0, 200, 400),
                new pc.Vec3(800, 400, 0)
              );
              createPrimitive(
                "box",
                new pc.Vec3(0, 200, -400),
                new pc.Vec3(800, 400, 0)
              );

              const numTowers = 7;
              for (let i = 0; i < numTowers; i++) {
                let scale = 25;
                const fraction = (i / numTowers) * Math.PI * 2;
                const radius = i % 2 ? 340 : 210;
                for (let y = 0; y <= 7; y++) {
                  const prim = createPrimitive(
                    "box",
                    new pc.Vec3(
                      radius * Math.sin(fraction),
                      2 + y * 25,
                      radius * Math.cos(fraction)
                    ),
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

              // construct the cubemap asset for the omni light cookie texture
              // Note: the textures array could contain 6 texture asset names to load instead as well
              // const cubemapAsset = new pc.Asset('xmas_cubemap', 'cubemap', null, {
              //   textures: [
              //     assets.xmas_posx.id, assets1.xmas_negx.id,
              //     assets.xmas_posy.id, assets.xmas_negy.id,
              //     assets.xmas_posz.id, assets.xmas_negz.id
              //   ]
              // });
              // @ts-ignore engine-tsd
              // cubemapAsset.loadFaces = true;
              // app.assets.add(cubemapAsset);

              const omniLights: Array<pc.Entity> = [];
              const numLights = 10;
              for (let i = 0; i < numLights; i++) {
                const lightOmni = new pc.Entity("Omni");
                lightOmni.addComponent("light", {
                  type: "omni",
                  color: pc.Color.WHITE,
                  intensity: 13 / numLights,
                  range: 350,
                  castShadows: true,
                  shadowBias: 0.2,
                  normalOffsetBias: 0.2,

                  // cookie texture
                  // cookieAsset: cubemapAsset,
                  cookieChannel: "rgb",
                });

                // attach a render component with a small sphere to it
                const material = new pc.StandardMaterial();
                material.emissive = pc.Color.WHITE;
                material.update();

                lightOmni.addComponent("render", {
                  type: "sphere",
                  material: material,
                  castShadows: false,
                });
                lightOmni.setPosition(0, 120, 0);
                lightOmni.setLocalScale(5, 5, 5);
                app.root.addChild(lightOmni);

                omniLights.push(lightOmni);
              }

              // create an Entity with a camera component
              const camera = new pc.Entity();
              camera.addComponent("camera", {
                fov: 80,
                clearColor: new pc.Color(0.1, 0.1, 0.1),
                farClip: 1500,
              });

              // and position it in the world
              camera.setLocalPosition(300, 120, 25);

              // add orbit camera script with a mouse and a touch support
              camera.addComponent("script");
              //@ts-ignore
              camera.script.create("orbitCamera", {
                attributes: {
                  inertiaFactor: 0.2,
                  focusEntity: app.root,
                  distanceMax: 1200,
                  frameOnStart: false,
                },
              });
              //  //@ts-ignore
              // camera.script.create("orbitCameraInputMouse");
              //  //@ts-ignore
              // camera.script.create("orbitCameraInputTouch");
              app.root.addChild(camera);

              // handle HUD changes - update properties on the scene
              // data.on('*:set', (path: string, value: any) => {
              //   const pathArray = path.split('.');
              //   // @ts-ignore
              //   lighting[pathArray[1]] = value;
              // });

              // Set an update function on the app's update event
              let time = 0;

              app.on("update", (dt) => {
                // rotate camera around
                time += dt * 0.3;
                const radius = 250;
                for (let i = 0; i < omniLights.length; i++) {
                  const fraction = (i / omniLights.length) * Math.PI * 2;
                  omniLights[i].setPosition(
                    radius * Math.sin(time + fraction),
                    190 + Math.sin(time + fraction) * 150,
                    radius * Math.cos(time + fraction)
                  );
                }
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
