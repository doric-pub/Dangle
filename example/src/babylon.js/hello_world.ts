import {
  Panel,
  Group,
  vlayout,
  layoutConfig,
  Gravity,
  navbar,
  stack,
} from "doric";
import { dangleView, vsync } from "dangle";

const global = new Function('return this')()
global.window = {
  devicePixelRatio: 1,
  addEventListener: (() => {}) as any,
  navigator: {
    appVersion: '5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
  },
  requestAnimationFrame: vsync(context).requestAnimationFrame,
  cancelAnimationFrame: vsync(context).cancelAnimationFrame
}
global.navigator = global.window.navigator
global.document = {
  addEventListener: (() => {}) as any,
}

import * as BABYLON from 'babylonjs'

@Entry
class hello_world extends Panel {
  onShow() {
    navbar(context).setTitle("hello_world");
  }
  build(rootView: Group) {
    vlayout([
      stack(
        [
          dangleView({
            onReady: (gl: WebGL2RenderingContext) => {
              const width = gl.drawingBufferWidth
              const height = gl.drawingBufferHeight

              const canvas = 
              ({
                width: width,
                height: height,
                style: {},
                addEventListener: (() => {}) as any,
                removeEventListener: (() => {}) as any,
                clientHeight: height,
                getContext: (() => {return gl}) as any,
                getBoundingClientRect: (() => {return {
                  width: width,
                  height: height,
                }}) as any
              } as HTMLCanvasElement);

              global.window.innerWidth = width
              global.window.innerHeight = height

              //#region code to impl
              // Load the 3D engine
              var engine = new BABYLON.Engine(gl as any, true, {preserveDrawingBuffer: true, stencil: true});
              // CreateScene function that creates and return the scene
              var createScene = function(){
                // Create a basic BJS Scene object
                var scene = new BABYLON.Scene(engine);
                // Create a FreeCamera, and set its position to {x: 0, y: 5, z: -10}
                var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);
                // Target the camera to scene origin
                camera.setTarget(BABYLON.Vector3.Zero());
                // Attach the camera to the canvas
                camera.attachControl(canvas, false);
                // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
                var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
                // Create a built-in "sphere" shape using the SphereBuilder
                var sphere = BABYLON.MeshBuilder.CreateSphere('sphere1', {segments: 16, diameter: 2, sideOrientation: BABYLON.Mesh.FRONTSIDE}, scene);
                // Move the sphere upward 1/2 of its height
                sphere.position.y = 1;
                // Create a built-in "ground" shape;
                var ground = BABYLON.MeshBuilder.CreateGround("ground1", { width: 6, height: 6, subdivisions: 2, updatable: false }, scene);
                // Return the created scene
                return scene;
              }
              // call the createScene function
              var scene = createScene();
              // run the render loop
              engine.runRenderLoop(function(){
                scene.render();

                gl.flush();
                (<any>gl).endFrameEXP();
              });
              // the canvas/window resize event handler
              window.addEventListener('resize', function(){
                engine.resize();
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
