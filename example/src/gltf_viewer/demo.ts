import {
  Panel,
  Group,
  vlayout,
  layoutConfig,
  Gravity,
  navbar,
  stack,
  loge,
} from "doric";
import { dangleView, DangleWebGLRenderingContext } from "dangle";
import { GltfView } from "./gltf-sample-viewer";

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
              } as HTMLCanvasElement;

              //#region code to impl
              const view = new GltfView(gl as WebGL2RenderingContext);
              const resourceLoader = view.createResourceLoader();
              const state = view.createState();
              state.renderingParameters.useDirectionalLightsWithDisabledIBL =
                true;

              resourceLoader
                .loadGltf("threejs/LittlestTokyo/LittlestTokyo.gltf", undefined)
                .then((gltf) => {
                  state.gltf = gltf;
                  const defaultScene = state.gltf.scene;
                  state.sceneIndex =
                    defaultScene === undefined ? 0 : defaultScene;
                  state.cameraIndex = undefined;
                  if (state.gltf.scenes.length != 0) {
                    if (state.sceneIndex > state.gltf.scenes.length - 1) {
                      state.sceneIndex = 0;
                    }
                    const scene = state.gltf.scenes[state.sceneIndex];
                    scene.applyTransformHierarchy(state.gltf);
                    state.userCamera.aspectRatio = canvas.width / canvas.height;
                    state.userCamera.fitViewToScene(
                      state.gltf,
                      state.sceneIndex
                    );

                    // Try to start as many animations as possible without generating conficts.
                    state.animationIndices = [];
                    for (let i = 0; i < gltf.animations.length; i++) {
                      if (
                        !gltf
                          .nonDisjointAnimations(state.animationIndices)
                          .includes(i)
                      ) {
                        state.animationIndices.push(i);
                      }
                    }
                    state.animationTimer.start();

                    gl.endFrame();
                  }

                  return state;
                })
                .catch((error) => {
                  loge(error.stack);
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
