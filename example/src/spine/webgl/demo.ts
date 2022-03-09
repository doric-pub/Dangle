import {
  Panel,
  Group,
  vlayout,
  layoutConfig,
  Gravity,
  navbar,
  stack,
  loge,
  VLayout,
  hlayout,
  switchView,
  text,
  popover,
  Color,
  scroller,
} from "doric";
import { dangleView, DangleWebGLRenderingContext, vsync } from "dangle";
import {
  Matrix4,
  Shader,
  PolygonBatcher,
  SkeletonDebugRenderer,
  SkeletonRenderer,
  AssetManager,
  ShapeRenderer,
} from "./index";
import * as spine from "@esotericsoftware/spine-core";

@Entry
class demo extends Panel {
  private container?: VLayout;
  private currentEffect = "None";
  private skeletonList: Array<string> = [];
  private animationList: Array<string> = [];
  private effects = ["None", "Swirl", "Jitter"];
  private skinList: Array<string> = [];
  private debug = false;

  onShow() {
    navbar(context).setTitle("demo");
  }
  build(rootView: Group) {
    const self = this;
    this.container = vlayout([
      stack(
        [
          dangleView({
            onReady: (glContext: DangleWebGLRenderingContext) => {
              const canvas = {
                width: glContext.drawingBufferWidth,
                height: glContext.drawingBufferHeight,
                style: {},
                addEventListener: (() => {}) as any,
                removeEventListener: (() => {}) as any,
                clientWidth: glContext.drawingBufferHeight,
                clientHeight: glContext.drawingBufferHeight,
                getContext: (() => {
                  return gl;
                }) as any,
              } as HTMLCanvasElement;

              var gl = glContext as WebGLRenderingContext;
              const requestAnimationFrame =
                vsync(context).requestAnimationFrame;
              //#region code to impl

              var shader;
              var batcher;
              var mvp = new Matrix4();
              var skeletonRenderer;
              var assetManager;

              var debugRenderer;
              var debugShader;
              var shapes;

              var lastFrameTime;
              var skeletons = {};
              var format = "JSON";
              var activeSkeleton = "spineboy";
              var pow2 = new spine.Pow(2);
              var swirlEffect = new spine.SwirlEffect(0);
              var jitterEffect = new spine.JitterEffect(20, 20);
              var swirlTime = 0;

              function init() {
                // Setup canvas and WebGL context. We pass alpha: false to canvas.getContext() so we don't use premultiplied alpha when
                // loading textures. That is handled separately by PolygonBatcher.

                // Create a simple shader, mesh, model-view-projection matrix, SkeletonRenderer, and AssetManager.
                shader = Shader.newTwoColoredTextured(gl);
                batcher = new PolygonBatcher(gl);
                mvp.ortho2d(0, 0, canvas.width - 1, canvas.height - 1);
                //@ts-ignore
                skeletonRenderer = new SkeletonRenderer(gl);
                assetManager = new AssetManager(gl, "spine/assets/webgl/");

                // Create a debug renderer and the ShapeRenderer it needs to render lines.
                debugRenderer = new SkeletonDebugRenderer(gl);
                debugRenderer.drawRegionAttachments = true;
                debugRenderer.drawBoundingBoxes = true;
                debugRenderer.drawMeshHull = true;
                debugRenderer.drawMeshTriangles = true;
                debugRenderer.drawPaths = true;
                debugShader = Shader.newColored(gl);
                shapes = new ShapeRenderer(gl);

                // Tell AssetManager to load the resources for each skeleton, including the exported data file, the .atlas file and the .png
                // file for the atlas. We then wait until all resources are loaded in the load() method.
                assetManager.loadBinary("spineboy-pro.skel");
                assetManager.loadText("spineboy-pro.json");
                assetManager.loadTextureAtlas("spineboy-pma.atlas");
                assetManager.loadBinary("raptor-pro.skel");
                assetManager.loadText("raptor-pro.json");
                assetManager.loadTextureAtlas("raptor-pma.atlas");
                assetManager.loadBinary("tank-pro.skel");
                assetManager.loadText("tank-pro.json");
                assetManager.loadTextureAtlas("tank-pma.atlas");
                assetManager.loadBinary("goblins-pro.skel");
                assetManager.loadText("goblins-pro.json");
                assetManager.loadTextureAtlas("goblins-pma.atlas");
                assetManager.loadBinary("vine-pro.skel");
                assetManager.loadText("vine-pro.json");
                assetManager.loadTextureAtlas("vine-pma.atlas");
                assetManager.loadBinary("stretchyman-pro.skel");
                assetManager.loadText("stretchyman-pro.json");
                assetManager.loadTextureAtlas("stretchyman-pma.atlas");
                assetManager.loadBinary("coin-pro.skel");
                assetManager.loadText("coin-pro.json");
                assetManager.loadTextureAtlas("coin-pma.atlas");
                assetManager.loadBinary("mix-and-match-pro.skel");
                assetManager.loadText("mix-and-match-pro.json");
                assetManager.loadTextureAtlas("mix-and-match-pma.atlas");
                requestAnimationFrame(load);
              }

              function load() {
                // Wait until the AssetManager has loaded all resources, then load the skeletons.
                if (assetManager.isLoadingComplete()) {
                  skeletons = {
                    coin: {
                      //@ts-ignore
                      Binary: loadSkeleton("coin-pro.skel", "animation", true),
                      //@ts-ignore
                      JSON: loadSkeleton("coin-pro.json", "animation", true),
                    },
                    goblins: {
                      Binary: loadSkeleton(
                        "goblins-pro.skel",
                        "walk",
                        true,
                        "goblin"
                      ),
                      JSON: loadSkeleton(
                        "goblins-pro.json",
                        "walk",
                        true,
                        "goblin"
                      ),
                    },
                    "mix-and-match-pro": {
                      Binary: loadSkeleton(
                        "mix-and-match-pro.skel",
                        "dance",
                        true,
                        "full-skins/girl-blue-cape"
                      ),
                      JSON: loadSkeleton(
                        "mix-and-match-pro.json",
                        "dance",
                        true,
                        "full-skins/girl-blue-cape"
                      ),
                    },
                    raptor: {
                      //@ts-ignore
                      Binary: loadSkeleton("raptor-pro.skel", "walk", true),
                      //@ts-ignore
                      JSON: loadSkeleton("raptor-pro.json", "walk", true),
                    },
                    spineboy: {
                      //@ts-ignore
                      Binary: loadSkeleton("spineboy-pro.skel", "run", true),
                      //@ts-ignore
                      JSON: loadSkeleton("spineboy-pro.json", "run", true),
                    },
                    stretchyman: {
                      //@ts-ignore
                      Binary: loadSkeleton(
                        "stretchyman-pro.skel",
                        "sneak",
                        true
                      ),
                      //@ts-ignore
                      JSON: loadSkeleton("stretchyman-pro.json", "sneak", true),
                    },
                    tank: {
                      //@ts-ignore
                      Binary: loadSkeleton("tank-pro.skel", "drive", true),
                      //@ts-ignore
                      JSON: loadSkeleton("tank-pro.json", "drive", true),
                    },
                    vine: {
                      //@ts-ignore
                      Binary: loadSkeleton("vine-pro.skel", "grow", true),
                      //@ts-ignore
                      JSON: loadSkeleton("vine-pro.json", "grow", true),
                    },
                  };
                  setupUI();
                  lastFrameTime = Date.now() / 1000;
                  requestAnimationFrame(render); // Loading is done, call render every frame.
                } else requestAnimationFrame(load);
              }

              function loadSkeleton(
                name,
                initialAnimation,
                premultipliedAlpha,
                skin
              ) {
                if (skin === undefined) skin = "default";

                // Load the texture atlas using name.atlas from the AssetManager.
                var atlas = assetManager.require(
                  name.replace(/(?:-ess|-pro)\.(skel|json)/, "") +
                    (premultipliedAlpha ? "-pma" : "") +
                    ".atlas"
                );

                // Create an AtlasAttachmentLoader that resolves region, mesh, boundingbox and path attachments
                var atlasLoader = new spine.AtlasAttachmentLoader(atlas);

                // Create a skeleton loader instance for parsing the skeleton data file.
                var skeletonLoader = name.endsWith(".skel")
                  ? new spine.SkeletonBinary(atlasLoader)
                  : new spine.SkeletonJson(atlasLoader);

                // Set the scale to apply during parsing, parse the file, and create a new skeleton.
                skeletonLoader.scale = 1;
                var skeletonData = skeletonLoader.readSkeletonData(
                  assetManager.require(name)
                );
                var skeleton = new spine.Skeleton(skeletonData);
                skeleton.setSkinByName(skin);
                var bounds = calculateSetupPoseBounds(skeleton);

                // Create an AnimationState, and set the initial animation in looping mode.
                var animationStateData = new spine.AnimationStateData(
                  skeleton.data
                );
                var animationState = new spine.AnimationState(
                  animationStateData
                );
                if (
                  name == "spineboy-pro.skel" ||
                  name == "spineboy-pro.json"
                ) {
                  animationStateData.setMix("walk", "run", 1.5);
                  animationStateData.setMix("run", "jump", 0.2);
                  animationStateData.setMix("jump", "run", 0.4);
                  animationState.setEmptyAnimation(0, 0);
                  var entry = animationState.addAnimation(0, "walk", true, 0);
                  entry.mixDuration = 1;
                  animationState.addAnimation(0, "run", true, 1.5);
                  animationState.addAnimation(0, "jump", false, 2);
                  animationState.addAnimation(0, "run", true, 0);
                  animationState.addEmptyAnimation(0, 1, 1);
                  entry = animationState.addAnimation(0, "walk", true, 1.5);
                  entry.mixDuration = 1;
                } else animationState.setAnimation(0, initialAnimation, true);

                function log(message) {
                  loge(message);
                }
                animationState.addListener({
                  start: function (track) {
                    log("Animation on track " + track.trackIndex + " started");
                  },
                  interrupt: function (track) {
                    log(
                      "Animation on track " + track.trackIndex + " interrupted"
                    );
                  },
                  end: function (track) {
                    log("Animation on track " + track.trackIndex + " ended");
                  },
                  //@ts-ignore
                  disposed: function (track) {
                    log("Animation on track " + track.trackIndex + " disposed");
                  },
                  complete: function (track) {
                    log(
                      "Animation on track " + track.trackIndex + " completed"
                    );
                  },
                  event: function (track, event) {
                    log(
                      "Event on track " +
                        track.trackIndex +
                        ": " +
                        JSON.stringify(event)
                    );
                  },
                });

                // Pack everything up and return to caller.
                return {
                  skeleton: skeleton,
                  state: animationState,
                  bounds: bounds,
                  premultipliedAlpha: premultipliedAlpha,
                };
              }

              function calculateSetupPoseBounds(skeleton) {
                skeleton.setToSetupPose();
                skeleton.updateWorldTransform();
                var offset = new spine.Vector2();
                var size = new spine.Vector2();
                skeleton.getBounds(offset, size, []);
                return { offset: offset, size: size };
              }

              function setupUI() {
                const formatSwitch = switchView({});
                self.container?.addChild(
                  hlayout(
                    [
                      text({ text: "JSON" }),
                      formatSwitch,
                      text({ text: "Binary" }),
                    ],
                    {
                      layoutConfig: layoutConfig()
                        .most()
                        .configAlignment(Gravity.Center),
                      space: 10,
                      gravity: Gravity.Center,
                    }
                  )
                );

                for (var skeletonName in skeletons) {
                  self.skeletonList.push(skeletonName);
                }
                self.container?.addChild(
                  text({
                    text: "Select Skeleton",
                    onClick: () => {
                      const popRootView = vlayout([], {
                        layoutConfig: layoutConfig()
                          .most()
                          .configAlignment(Gravity.Center),
                        space: 10,
                        gravity: Gravity.Center,
                        backgroundColor: Color.parse("#4d4c4c4c"),
                        onClick: () => {
                          popover(context).dismiss(popRootView);
                        },
                      });
                      self.skeletonList.forEach((element) => {
                        popRootView.addChild(
                          text({
                            text: element,
                            textSize: 30,
                            backgroundColor: Color.YELLOW,
                            onClick: () => {
                              activeSkeleton = element;
                              setupAnimationUI();
                              setupSkinUI();
                              popover(context).dismiss(popRootView);
                            },
                          })
                        );
                      });
                      popover(context).show(popRootView);
                    },
                  })
                );

                self.container?.addChild(
                  text({
                    text: "Select Effect",
                    onClick: () => {
                      const popRootView = vlayout([], {
                        layoutConfig: layoutConfig()
                          .most()
                          .configAlignment(Gravity.Center),
                        space: 10,
                        gravity: Gravity.Center,
                        backgroundColor: Color.parse("#4d4c4c4c"),
                        onClick: () => {
                          popover(context).dismiss(popRootView);
                        },
                      });
                      self.effects.forEach((element) => {
                        popRootView.addChild(
                          text({
                            text: element,
                            textSize: 30,
                            backgroundColor: Color.YELLOW,
                            onClick: () => {
                              self.currentEffect = element;
                              popover(context).dismiss(popRootView);
                            },
                          })
                        );
                      });
                      popover(context).show(popRootView);
                    },
                  })
                );

                var setupAnimationUI = function () {
                  self.animationList = [];
                  var skeleton = skeletons[activeSkeleton][format].skeleton;
                  for (var i = 0; i < skeleton.data.animations.length; i++) {
                    var name = skeleton.data.animations[i].name;
                    self.animationList.push(name);
                  }
                };
                self.container?.addChild(
                  text({
                    text: "Select Animation",
                    onClick: () => {
                      const popRootView = vlayout([], {
                        layoutConfig: layoutConfig()
                          .most()
                          .configAlignment(Gravity.Center),
                        space: 10,
                        gravity: Gravity.Center,
                        backgroundColor: Color.parse("#4d4c4c4c"),
                        onClick: () => {
                          popover(context).dismiss(popRootView);
                        },
                      });
                      self.animationList.forEach((element) => {
                        popRootView.addChild(
                          text({
                            text: element,
                            textSize: 30,
                            backgroundColor: Color.YELLOW,
                            onClick: () => {
                              var state =
                                skeletons[activeSkeleton][format].state;
                              var skeleton =
                                skeletons[activeSkeleton][format].skeleton;
                              var animationName = element;
                              skeleton.setToSetupPose();
                              state.setAnimation(0, animationName, true);
                              popover(context).dismiss(popRootView);
                            },
                          })
                        );
                      });
                      popover(context).show(popRootView);
                    },
                  })
                );

                var setupSkinUI = function () {
                  self.skinList = [];
                  var skeleton = skeletons[activeSkeleton][format].skeleton;
                  for (var i = 0; i < skeleton.data.skins.length; i++) {
                    var name = skeleton.data.skins[i].name;
                    self.skinList.push(name);
                  }
                };
                self.container?.addChild(
                  text({
                    text: "Select Skin",
                    onClick: () => {
                      const popContent = vlayout([], {
                        layoutConfig: layoutConfig()
                          .mostWidth()
                          .fitHeight()
                          .configAlignment(Gravity.Center),
                        space: 10,
                        gravity: Gravity.Center,
                        backgroundColor: Color.parse("#4d4c4c4c"),
                        onClick: () => {
                          popover(context).dismiss(popRootView);
                        },
                      });
                      const popRootView = scroller(popContent, {
                        layoutConfig: layoutConfig().most(),
                      });

                      popContent.addChild(
                        text({
                          text: " ",
                          textSize: 20,
                        })
                      );
                      self.skinList.forEach((element) => {
                        popContent.addChild(
                          text({
                            text: element,
                            textSize: 20,
                            backgroundColor: Color.YELLOW,
                            onClick: () => {
                              var skeleton =
                                skeletons[activeSkeleton][format].skeleton;
                              var skinName = element;
                              skeleton.setSkinByName(skinName);
                              skeleton.setSlotsToSetupPose();

                              popover(context).dismiss(popRootView);
                            },
                          })
                        );
                      });
                      popContent.addChild(
                        text({
                          text: " ",
                          textSize: 20,
                        })
                      );
                      popover(context).show(popRootView);
                    },
                  })
                );

                formatSwitch.onSwitch = (state) => {
                  format = state ? "Binary" : "JSON";
                  setupAnimationUI();
                  setupSkinUI();
                };

                setupAnimationUI();
                setupSkinUI();

                self.container?.addChild(
                  hlayout(
                    [
                      text({
                        text: "Debug",
                      }),
                      switchView({
                        onSwitch: (state) => {
                          self.debug = state;
                        },
                      }),
                    ],
                    {
                      layoutConfig: layoutConfig()
                        .fit()
                        .configAlignment(Gravity.Center),
                      gravity: Gravity.Center,
                      space: 10,
                    }
                  )
                );
              }

              function render() {
                var now = Date.now() / 1000;
                var delta = now - lastFrameTime;
                lastFrameTime = now;

                // Update the MVP matrix to adjust for canvas size changes
                resize();

                gl.clearColor(0.3, 0.3, 0.3, 1);
                gl.clear(gl.COLOR_BUFFER_BIT);

                // Apply the animation state based on the delta time.
                var skeleton = skeletons[activeSkeleton][format].skeleton;
                var state = skeletons[activeSkeleton][format].state;
                var bounds = skeletons[activeSkeleton][format].bounds;
                var premultipliedAlpha =
                  skeletons[activeSkeleton][format].premultipliedAlpha;
                state.update(delta);
                state.apply(skeleton);
                skeleton.updateWorldTransform();

                // Bind the shader and set the texture and model-view-projection matrix.
                shader.bind();
                shader.setUniformi(Shader.SAMPLER, 0);
                shader.setUniform4x4f(Shader.MVP_MATRIX, mvp.values);

                // Start the batch and tell the SkeletonRenderer to render the active skeleton.
                batcher.begin(shader);

                if (self.currentEffect == "None") {
                  skeletonRenderer.vertexEffect = null;
                } else if (self.currentEffect == "Swirl") {
                  swirlTime += delta;
                  var percent = swirlTime % 2;
                  if (percent > 1) percent = 1 - (percent - 1);
                  swirlEffect.angle = pow2.apply(-60, 60, percent);
                  swirlEffect.centerX = bounds.offset.x + bounds.size.x / 2;
                  swirlEffect.centerY = bounds.offset.y + bounds.size.y / 2;
                  swirlEffect.radius =
                    Math.sqrt(
                      bounds.size.x * bounds.size.x +
                        bounds.size.y * bounds.size.y
                    ) * 0.75;
                  skeletonRenderer.vertexEffect = swirlEffect;
                } else if (self.currentEffect == "Jitter") {
                  skeletonRenderer.vertexEffect = jitterEffect;
                }

                skeletonRenderer.premultipliedAlpha = premultipliedAlpha;
                skeletonRenderer.draw(batcher, skeleton);
                batcher.end();

                shader.unbind();

                // Draw debug information.
                if (self.debug) {
                  debugShader.bind();
                  debugShader.setUniform4x4f(Shader.MVP_MATRIX, mvp.values);
                  debugRenderer.premultipliedAlpha = premultipliedAlpha;
                  shapes.begin(debugShader);
                  debugRenderer.draw(shapes, skeleton);
                  shapes.end();
                  debugShader.unbind();
                }

                requestAnimationFrame(render);

                glContext.endFrame();
              }

              function resize() {
                var w = canvas.clientWidth;
                var h = canvas.clientHeight;
                if (canvas.width != w || canvas.height != h) {
                  canvas.width = w;
                  canvas.height = h;
                }

                // Calculations to center the skeleton in the canvas.
                var bounds = skeletons[activeSkeleton][format].bounds;
                var centerX = bounds.offset.x + bounds.size.x / 2;
                var centerY = bounds.offset.y + bounds.size.y / 2;
                var scaleX = bounds.size.x / canvas.width;
                var scaleY = bounds.size.y / canvas.height;
                var scale = Math.max(scaleX, scaleY) * 2;
                if (scale < 1) scale = 1;
                var width = canvas.width * scale;
                var height = canvas.height * scale;

                mvp.ortho2d(
                  centerX - width / 2,
                  centerY - height / 2,
                  width,
                  height
                );
                gl.viewport(0, 0, canvas.width, canvas.height);
              }

              init();

              //#endregion
            },
          }).apply({
            layoutConfig: layoutConfig().just(),
            width: Environment.screenWidth - 4,
            height: Environment.screenWidth - 4,
          }),
        ],
        {
          layoutConfig: layoutConfig().just(),
          width: Environment.screenWidth - 4,
          height: Environment.screenWidth - 4,
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
