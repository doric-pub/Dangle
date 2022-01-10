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
class portal extends Panel {
  onShow() {
    navbar(context).setTitle("portal");
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
              // Create the application and start the update loop
              const app = new pc.Application(canvas, {
                // keyboard: new pc.Keyboard(window)
              });

              // Set the canvas to fill the window and automatically change resolution to be the same as the canvas size
              app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
              app.setCanvasResolution(pc.RESOLUTION_AUTO);

              app.start();

              const Rotator = pc.createScript("rotator");

              let t = 0;

              Rotator.prototype.update = function (dt) {
                t += dt;
                this.entity.setEulerAngles(0, Math.sin(t) * 20, 0);
              };

              const InsidePortal = pc.createScript("insidePortal");

              InsidePortal.prototype.initialize = function () {
                //@ts-ignore
                const meshInstances = this.entity.model.meshInstances;
                let mat, i;
                const stencil = new pc.StencilParameters({
                  func: pc.FUNC_NOTEQUAL,
                  ref: 0,
                });
                for (i = 0; i < meshInstances.length; i++) {
                  //@ts-ignore
                  meshInstances[i].layer -= 2;
                  mat = meshInstances[i].material;
                  mat.stencilBack = mat.stencilFront = stencil;
                }

                const prt = this.entity.particlesystem;
                if (prt) {
                  //@ts-ignore
                  prt.emitter.meshInstance.layer -= 2;
                  //@ts-ignore
                  mat = prt.emitter.material;
                  mat.stencilBack = mat.stencilFront = stencil;
                }
              };

              const OutsidePortal = pc.createScript("outsidePortal");

              OutsidePortal.prototype.initialize = function () {
                //@ts-ignore
                const meshInstances = this.entity.model.meshInstances;
                let mat, i;
                const stencil = new pc.StencilParameters({
                  func: pc.FUNC_EQUAL,
                  ref: 0,
                });
                for (i = 0; i < meshInstances.length; i++) {
                  //@ts-ignore
                  meshInstances[i].layer--;
                  mat = meshInstances[i].material;
                  mat.stencilBack = mat.stencilFront = stencil;
                }

                const prt = this.entity.particlesystem;
                if (prt) {
                  //@ts-ignore
                  prt.emitter.meshInstance.meshes[i].layer--;
                  //@ts-ignore
                  mat = prt.emitter.material;
                  mat.stencilBack = mat.stencilFront = stencil;
                }
              };

              const Portal = pc.createScript("portal");

              // initialize code called once per entity
              Portal.prototype.initialize = function () {
                // We only want to write to the stencil buffer
                //@ts-ignore
                const mat = this.entity.model.meshInstances[0].material;
                mat.depthWrite = false;
                mat.redWrite =
                  mat.greenWrite =
                  mat.blueWrite =
                  mat.alphaWrite =
                    false;
                mat.stencilBack = mat.stencilFront = new pc.StencilParameters({
                  zpass: pc.STENCILOP_INCREMENT,
                });
                mat.update();
              };

              app.scene.ambientLight = new pc.Color(0.2, 0.2, 0.2);

              const insideMat = new pc.StandardMaterial();
              const outsideMat = new pc.StandardMaterial();
              const portalMat = new pc.StandardMaterial();
              const borderMat = new pc.StandardMaterial();
              borderMat.emissive.set(1, 0.4, 0);
              borderMat.update();

              // Create an Entity with a camera component
              const camera = new pc.Entity();
              camera.addComponent("camera", {
                clearColor: new pc.Color(0.12, 0.12, 0.12),
              });
              camera.setLocalPosition(7.5, 5.5, 6.1);
              camera.setLocalEulerAngles(-30, 45, 0);

              // Create an Entity with a directional light component
              const light = new pc.Entity();
              light.addComponent("light", {
                type: "directional",
                color: new pc.Color(1, 1, 1),
              });
              light.setEulerAngles(45, 135, 0);

              // Create a root for the graphical scene
              const group = new pc.Entity();
              group.addComponent("script");
              //@ts-ignore
              group.script.create("rotator");

              // Create a Entity with a Box model component
              const box = new pc.Entity();
              box.addComponent("model", {
                type: "box",
              });
              //@ts-ignore
              box.model.material = insideMat;
              box.addComponent("particlesystem", {
                numParticles: 128,
                lifetime: 5,
                rate: 0.1,
                rate2: 0.1,
                emitterShape: pc.EMITTERSHAPE_BOX,
                emitterExtents: new pc.Vec3(0, 0, 0),
                scaleGraph: new pc.Curve([0, 0.1]),
                velocityGraph: new pc.CurveSet([
                  [0, 3],
                  [0, 3],
                  [0, 3],
                ]),
                velocityGraph2: new pc.CurveSet([
                  [0, -3],
                  [0, -3],
                  [0, -3],
                ]),
              });
              box.addComponent("script");
              //@ts-ignore
              box.script.create("insidePortal");
              box.setLocalPosition(0, 0.5, -1.936);

              // Create the portal entity
              const portal = new pc.Entity();
              portal.addComponent("model", {
                type: "plane",
              });
              //@ts-ignore
              portal.model.material = portalMat;
              portal.addComponent("script");
              //@ts-ignore
              portal.script.create("portal");
              portal.setLocalPosition(0, 0, 0);
              portal.setLocalEulerAngles(90, 0, 0);
              portal.setLocalScale(4, 1, 6);

              // Create the portal border entity
              const border = new pc.Entity();
              border.addComponent("model", {
                type: "plane",
              });
              //@ts-ignore
              border.model.material = borderMat;
              border.addComponent("script");
              //@ts-ignore
              border.script.create("outsidePortal");
              border.setLocalPosition(0, 0, 0);
              border.setLocalEulerAngles(90, 0, 0);
              border.setLocalScale(4.68, 1.17, 7.019);

              // Create an entity with a sphere model component
              const sphere = new pc.Entity();
              sphere.addComponent("model", {
                type: "sphere",
              });
              //@ts-ignore
              sphere.model.material = outsideMat;
              sphere.addComponent("script");
              //@ts-ignore
              sphere.script.create("outsidePortal");
              sphere.setLocalPosition(0, 0, -2.414);
              sphere.setLocalEulerAngles(0, 0, 0);
              sphere.setLocalScale(1, 1, 1);

              // Add the new entities to the hierarchy
              app.root.addChild(camera);
              app.root.addChild(light);
              app.root.addChild(group);
              group.addChild(box);
              group.addChild(portal);
              group.addChild(border);
              group.addChild(sphere);

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
