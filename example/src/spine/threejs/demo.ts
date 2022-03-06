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
import * as THREE from "three";
import * as spine from "@esotericsoftware/spine-core";
import { AssetManager } from "./AssetManager";
import { SkeletonMesh } from "./SkeletonMesh";

@Entry
class demo extends Panel {
  onShow() {
    navbar(context).setTitle("demo");
  }
  build(rootView: Group) {
    vlayout([
      stack(
        [
          dangleView({
            onReady: (gl: DangleWebGLRenderingContext) => {
              const width = gl.drawingBufferWidth;
              const height = gl.drawingBufferHeight;

              const inputCanvas = {
                width: width,
                height: height,
                style: {},
                addEventListener: (() => {}) as any,
                removeEventListener: (() => {}) as any,
                clientHeight: height,
                getContext: (() => {
                  return gl;
                }) as any,
              } as HTMLCanvasElement;
              //@ts-ignore
              gl.canvas = inputCanvas

              let window = {
                innerWidth: width,
                innerHeight: height,
                devicePixelRatio: 1,
                addEventListener: (() => {}) as any,
              };

              const requestAnimationFrame =
                vsync(context).requestAnimationFrame;

              //#region code to impl
              var scene, camera, renderer;
              var geometry, material, mesh, skeletonMesh;
              var assetManager;
              var lastFrameTime = Date.now() / 1000;

              var baseUrl = "spine/assets/";
              var skeletonFile = "raptor-pro.json";
              var atlasFile = skeletonFile
                .replace("-pro", "")
                .replace("-ess", "")
                .replace(".json", ".atlas");
              var animation = "walk";

              function init() {
                // create the THREE.JS camera, scene and renderer (WebGL)
                var width = window.innerWidth,
                  height = window.innerHeight;
                camera = new THREE.PerspectiveCamera(
                  75,
                  width / height,
                  1,
                  3000
                );
                camera.position.y = 100;
                camera.position.z = 400;
                scene = new THREE.Scene();
                renderer = new THREE.WebGLRenderer({ canvas: inputCanvas });
                renderer.setSize(width, height);

                // load the assets required to display the Raptor model
                assetManager = new AssetManager(baseUrl);
                assetManager.loadText(skeletonFile);
                assetManager.loadTextureAtlas(atlasFile);

                requestAnimationFrame(load);
              }

              function load() {
                if (assetManager.isLoadingComplete()) {
                  // Add a box to the scene to which we attach the skeleton mesh
                  geometry = new THREE.BoxGeometry(200, 200, 200);
                  material = new THREE.MeshBasicMaterial({
                    color: 0xff0000,
                    wireframe: true,
                  });
                  mesh = new THREE.Mesh(geometry, material);

                  // Load the texture atlas using name.atlas and name.png from the AssetManager.
                  // The function passed to TextureAtlas is used to resolve relative paths.
                  const atlas = assetManager.require(atlasFile);

                  // Create a AtlasAttachmentLoader that resolves region, mesh, boundingbox and path attachments
                  const atlasLoader = new spine.AtlasAttachmentLoader(atlas);

                  // Create a SkeletonJson instance for parsing the .json file.
                  var skeletonJson = new spine.SkeletonJson(atlasLoader);

                  // Set the scale to apply during parsing, parse the file, and create a new skeleton.
                  skeletonJson.scale = 0.4;
                  var skeletonData = skeletonJson.readSkeletonData(
                    assetManager.require(skeletonFile)
                  );

                  // Create a SkeletonMesh from the data and attach it to the scene
                  //@ts-ignore
                  skeletonMesh = new SkeletonMesh(skeletonData, function (parameters) {
                    parameters.depthTest = false;
                  });
                  skeletonMesh.state.setAnimation(0, animation, true);
                  mesh.add(skeletonMesh);

                  scene.add(mesh);

                  requestAnimationFrame(render);
                } else requestAnimationFrame(load);
              }

              var lastTime = Date.now();
              function render() {
                // calculate delta time for animation purposes
                var now = Date.now() / 1000;
                var delta = now - lastFrameTime;
                lastFrameTime = now;

                // resize canvas to use full page, adjust camera/renderer
                resize();

                // rotate the cube
                mesh.rotation.x = Math.sin(now) * Math.PI * 0.2;
                mesh.rotation.y = Math.cos(now) * Math.PI * 0.4;

                // update the animation
                skeletonMesh.update(delta);

                // render the scene
                renderer.render(scene, camera);

                requestAnimationFrame(render);

                gl.endFrame();
              }

              function resize() {
                var w = window.innerWidth;
                var h = window.innerHeight;

                camera.aspect = w / h;
                camera.updateProjectionMatrix();

                renderer.setSize(w, h);
              }

              init();
              //#endregion
            },
          }).apply({
            layoutConfig: layoutConfig().most(),
          }),
        ],
        {
          layoutConfig: layoutConfig().most(),
        }
      ),
    ])
      .apply({
        layoutConfig: layoutConfig().most().configAlignment(Gravity.Center),
        space: 20,
        gravity: Gravity.Center,
      })
      .in(rootView);
  }
}
