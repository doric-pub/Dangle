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
class shader_burn extends Panel {
  onShow() {
    navbar(context).setTitle("shader_burn");
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
              // Create the application and start the update loop
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

              app.scene.ambientLight = new pc.Color(0.2, 0.2, 0.2);

              // Create an Entity with a camera component
              const camera = new pc.Entity();
              camera.addComponent("camera", {
                clearColor: new pc.Color(0.4, 0.45, 0.5),
              });
              camera.translate(0, 7, 24);

              // Create an Entity with a omni light component and a sphere model component.
              const light = new pc.Entity();
              light.addComponent("light", {
                type: "omni",
                color: new pc.Color(1, 1, 1),
                radius: 10,
              });
              light.translate(0, 1, 0);

              // Add entities into scene hierarchy
              app.root.addChild(camera);
              app.root.addChild(light);

              app.start();

              // create shader using vertex and fragment shaders
              const shaderDefinition = {
                attributes: {
                  aPosition: pc.SEMANTIC_POSITION,
                  aUv: pc.SEMANTIC_TEXCOORD0,
                },

                vshader: `
                attribute vec3 aPosition;
                attribute vec2 aUv0;
                uniform mat4 matrix_model;
                uniform mat4 matrix_viewProjection;
                varying vec2 vUv0;
                void main(void)
                {
                    vUv0 = aUv0;
                    gl_Position = matrix_viewProjection * matrix_model * vec4(aPosition, 1.0);
                }
                `,
                fshader: `
                precision mediump float;
                varying vec2 vUv0;
                uniform sampler2D uDiffuseMap;
                uniform sampler2D uHeightMap;
                uniform float uTime;
                void main(void)
                {
                    float height = texture2D(uHeightMap, vUv0).r;
                    vec4 color = texture2D(uDiffuseMap, vUv0);
                    if (height < uTime) {
                      discard;
                    }
                    if (height < (uTime + uTime * 0.1)) {
                      color = vec4(1.0, 0.2, 0.0, 1.0);
                    }
                    gl_FragColor = color;
                }
                `,
              };

              const shader = new pc.Shader(
                app.graphicsDevice,
                shaderDefinition
              );

              // Create a new material with the new shader
              const material = new pc.Material();
              material.shader = shader;
              material.setParameter("uHeightMap", assets.clouds.resource);

              // create a hierarchy of entities with render components, representing the statue model
              //@ts-ignore
              // const entity = assets.statue.resource.instantiateRenderEntity();
              // app.root.addChild(entity);

              // Set the new material on all meshes in the model, and use original texture from the model on the new material
              //@ts-ignore
              // let originalTexture: pc.Texture = null;
              // const renders: Array<pc.RenderComponent> = entity.findComponents("render");
              // renders.forEach((render) => {
              //   const meshInstances = render.meshInstances;
              //   for (let i = 0; i < meshInstances.length; i++) {
              //     const meshInstance = meshInstances[i];
              //     // @ts-ignore
              //     if (!originalTexture) originalTexture = meshInstance.material.diffuseMap;
              //     meshInstance.material = material;
              //   }
              // });

              // material is set up, update it
              // material.setParameter('uDiffuseMap', originalTexture);
              // material.update();

              let time = 0;
              app.on("update", function (dt) {
                time += 0.2 * dt;

                // reverse time
                let t = time % 2;
                if (t > 1) {
                  t = 1 - (t - 1);
                }

                // set time parameter for the shader
                material.setParameter("uTime", t);
                material.update();
              });

              // app.start();
              //#endregion

              app.on("update", (dt) => {
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
