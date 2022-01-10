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
class hardware_instancing extends Panel {
  onShow() {
    navbar(context).setTitle("hardware_instancing");
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

              // setup skydome
              app.scene.skyboxMip = 2;
              app.scene.exposure = 0.7;
              // app.scene.setSkybox(assets['helipad.dds'].resources);

              // Set the canvas to fill the window and automatically change resolution to be the same as the canvas size
              app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
              app.setCanvasResolution(pc.RESOLUTION_AUTO);

              app.scene.ambientLight = new pc.Color(0.1, 0.1, 0.1);

              // Create an Entity with a camera component
              const camera = new pc.Entity();
              camera.addComponent("camera", {});
              app.root.addChild(camera);

              // Move the camera back to see the cubes
              camera.translate(0, 0, 10);

              // create standard material and enable instancing on it
              const material = new pc.StandardMaterial();
              material.onUpdateShader = function (options) {
                options.useInstancing = true;
                return options;
              };
              material.shininess = 60;
              material.metalness = 0.7;
              material.useMetalness = true;
              material.update();

              // Create a Entity with a cylinder render component and the instancing material
              const box = new pc.Entity();
              box.addComponent("render", {
                material: material,
                type: "cylinder",
              });

              // add the box entity to the hierarchy
              app.root.addChild(box);

              if (app.graphicsDevice.supportsInstancing) {
                // number of instances to render
                const instanceCount = 1000;

                // store matrices for individual instances into array
                const matrices = new Float32Array(instanceCount * 16);
                let matrixIndex = 0;

                const radius = 5;
                const pos = new pc.Vec3();
                const rot = new pc.Quat();
                const scl = new pc.Vec3();
                const matrix = new pc.Mat4();

                for (let i = 0; i < instanceCount; i++) {
                  // generate random positions / scales and rotations
                  pos.set(
                    Math.random() * radius - radius * 0.5,
                    Math.random() * radius - radius * 0.5,
                    Math.random() * radius - radius * 0.5
                  );
                  scl.set(
                    0.1 + Math.random() * 0.1,
                    0.1 + Math.random() * 0.3,
                    0.1 + Math.random() * 0.1
                  );
                  rot.setFromEulerAngles(i * 30, i * 50, i * 70);
                  matrix.setTRS(pos, rot, scl);

                  // copy matrix elements into array of floats
                  for (let m = 0; m < 16; m++)
                    matrices[matrixIndex++] = matrix.data[m];
                }

                // create static vertex buffer containing the matrices
                const vertexBuffer = new pc.VertexBuffer(
                  app.graphicsDevice,
                  pc.VertexFormat.defaultInstancingFormat,
                  instanceCount,
                  pc.BUFFER_STATIC,
                  matrices
                );

                // initialize instancing using the vertex buffer on meshInstance of the created box
                //@ts-ignore
                const boxMeshInst = box.render.meshInstances[0];
                boxMeshInst.setInstancing(vertexBuffer);
              }

              // Set an update function on the app's update event
              let angle = 0;

              app.on("update", function (dt) {
                // orbit camera around
                angle += dt * 0.2;
                camera.setLocalPosition(
                  8 * Math.sin(angle),
                  0,
                  8 * Math.cos(angle)
                );
                camera.lookAt(pc.Vec3.ZERO);

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
