import {
  Panel,
  Group,
  vlayout,
  layoutConfig,
  Gravity,
  navbar,
  gestureContainer,
  GestureContainer,
  Color,
  VLayout,
  hlayout,
  text,
  Text,
  stack,
  Stack,
} from "doric";
import { dangleView, DangleWebGLRenderingContext, vsync } from "dangle";

import * as THREE from "three";
import { OrbitControls } from "./jsm/controls/OrbitControls";
import { GLTFLoader } from "./jsm/loaders/GLTFLoader";

@Entry
class webgl_animation_skinning_additive_blending extends Panel {

  private vlayoutView?: VLayout
  private gestureView?: GestureContainer

  private noneText?: Text
  private idleText?: Text
  private walkText?: Text
  private runText?: Text

  private sneakPoseValue?: Stack
  private sadPoseValue?: Stack
  private agreeValue?: Stack
  private headShakeValue?: Stack

  private modifyTimeScaleValue?: Stack

  onShow() {
    navbar(context).setTitle("webgl_animation_skinning_additive_blending");
  }
  build(rootView: Group) {
    this.vlayoutView = vlayout([
      this.gestureView = gestureContainer([], {
        layoutConfig: layoutConfig().just(),
        width: 300,
        height: 300,
        backgroundColor: Color.BLACK,
      }),
    ])
      .apply({
        layoutConfig: layoutConfig().fit().configAlignment(Gravity.Center),
        space: 10,
        gravity: Gravity.Center,
      })
      .in(rootView);

    let self = this
    this.gestureView.addChild(
      dangleView({
        onReady: (gl: DangleWebGLRenderingContext) => {
          const width = gl.drawingBufferWidth
          const height = gl.drawingBufferHeight

          const inputCanvas = 
          ({
            width: width,
            height: height,
            style: {},
            addEventListener: ((
              name: string,
              fn: (event: { pageX: number; pageY: number, pointerType: string }) => void
            ) => {
              if (name == "pointerdown") {
                self.gestureView!!.onTouchDown = ({x, y}) => {
                  fn({pageX: x, pageY: y, pointerType: 'touch'})
                };
              } else if (name == "pointerup") {
                self.gestureView!!.onTouchUp = ({x, y}) => {
                  fn({pageX: x, pageY: y, pointerType: 'touch'})
                };
              } else if (name == "pointermove") {
                self.gestureView!!.onTouchMove = ({x, y}) => {
                  fn({pageX: x, pageY: y, pointerType: 'touch'})
                };
              } else if (name == "pointercancel") {
                self.gestureView!!.onTouchCancel = ({x, y}) => {
                  fn({pageX: x, pageY: y, pointerType: 'touch'})
                };
              }
            }) as any,
            removeEventListener: (() => {}) as any,
            setPointerCapture: (() => {}) as any,
            releasePointerCapture: (() => {}) as any,
            clientHeight: height,
            getContext: (() => {return gl}) as any,
          } as HTMLCanvasElement);

          let window = {
            innerWidth: width,
            innerHeight: height,
            devicePixelRatio: 1,
            addEventListener: (() => {}) as any
          }

          const requestAnimationFrame = vsync(context).requestAnimationFrame

          //#region code to impl

          let scene, renderer, camera, stats;
          let model, skeleton, mixer, clock;

          const crossFadeControls = [];

          let currentBaseAction = 'idle';
          const allActions = [];
          const baseActions = {
            idle: { weight: 1 },
            walk: { weight: 0 },
            run: { weight: 0 }
          };
          const additiveActions = {
            sneak_pose: { weight: 0 },
            sad_pose: { weight: 0 },
            agree: { weight: 0 },
            headShake: { weight: 0 }
          };
          let panelSettings, numAnimations;

          init();

          function init() {

            // const container = document.getElementById( 'container' );
            clock = new THREE.Clock();

            scene = new THREE.Scene();
            scene.background = new THREE.Color( 0xa0a0a0 );
            scene.fog = new THREE.Fog( 0xa0a0a0, 10, 50 );

            const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
            hemiLight.position.set( 0, 20, 0 );
            scene.add( hemiLight );

            const dirLight = new THREE.DirectionalLight( 0xffffff );
            dirLight.position.set( 3, 10, 10 );
            dirLight.castShadow = true;
            dirLight.shadow.camera.top = 2;
            dirLight.shadow.camera.bottom = - 2;
            dirLight.shadow.camera.left = - 2;
            dirLight.shadow.camera.right = 2;
            dirLight.shadow.camera.near = 0.1;
            dirLight.shadow.camera.far = 40;
            scene.add( dirLight );

            // ground

            const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
            mesh.rotation.x = - Math.PI / 2;
            mesh.receiveShadow = true;
            scene.add( mesh );

            //@ts-ignore
            const loader = new GLTFLoader();
            //@ts-ignore
            loader.load( 'https://raw.githubusercontent.com/doric-pub/Dangle/645b2789eb464156970f9bedcf902cdc929dab70/example/src/three.js/models/Xbot/Xbot.gltf', function ( gltf ) {

              model = gltf.scene;
              scene.add( model );

              model.traverse( function ( object ) {

                if ( object.isMesh ) object.castShadow = true;

              } );

              skeleton = new THREE.SkeletonHelper( model );
              skeleton.visible = false;
              scene.add( skeleton );

              const animations = gltf.animations;
              mixer = new THREE.AnimationMixer( model );

              numAnimations = animations.length;

              for ( let i = 0; i !== numAnimations; ++ i ) {

                let clip = animations[ i ];
                const name = clip.name;

                if ( baseActions[ name ] ) {

                  const action = mixer.clipAction( clip );
                  activateAction( action );
                  baseActions[ name ].action = action;
                  //@ts-ignore
                  allActions.push( action );

                } else if ( additiveActions[ name ] ) {

                  // Make the clip additive and remove the reference frame

                  THREE.AnimationUtils.makeClipAdditive( clip );

                  if ( clip.name.endsWith( '_pose' ) ) {

                    clip = THREE.AnimationUtils.subclip( clip, clip.name, 2, 3, 30 );

                  }

                  const action = mixer.clipAction( clip );
                  activateAction( action );
                  additiveActions[ name ].action = action;
                  //@ts-ignore
                  allActions.push( action );

                }

              }

              createPanel();

              animate();

            } );

            renderer = new THREE.WebGLRenderer( { antialias: true, canvas: inputCanvas } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            renderer.outputEncoding = THREE.sRGBEncoding;
            renderer.shadowMap.enabled = true;
            // container.appendChild( renderer.domElement );

            // camera
            camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 100 );
            camera.position.set( - 1, 2, 3 );

            const controls = new OrbitControls( camera, renderer.domElement ) as any;
            controls.enablePan = false;
            controls.enableZoom = false;
            controls.target.set( 0, 1, 0 );
            controls.update();

            // stats = new Stats();
            // container.appendChild( stats.dom );

            window.addEventListener( 'resize', onWindowResize );

          }

          function createPanel() {

            // const panel = new GUI( { width: 310 } );

            // const folder1 = panel.addFolder( 'Base Actions' );
            // const folder2 = panel.addFolder( 'Additive Action Weights' );
            // const folder3 = panel.addFolder( 'General Speed' );

            // panelSettings = {
            //   'modify time scale': 1.0
            // };

            // const baseNames = [ 'None', ...Object.keys( baseActions ) ];

            self.vlayoutView?.addChild(
              text({text: 'Base Actions'})
            )
            self.vlayoutView?.addChild(
              hlayout([
                self.noneText = text({
                  text: 'None',
                  layoutConfig: layoutConfig().justWidth().fitHeight(),
                  width: 60,
                  backgroundColor: Color.GRAY,
                  textColor: Color.BLACK,

                  onClick: () => {
                    const currentSettings = baseActions[ currentBaseAction ]
                    const currentAction = currentSettings ? currentSettings.action : null;
                    const settings = baseActions[ 'None' ]
                    const action = settings ? settings.action : null;
                    prepareCrossFade( currentAction, action, 0.35 );

                    self.noneText!!.textColor = Color.WHITE
                    self.idleText!!.textColor = Color.BLACK
                    self.walkText!!.textColor = Color.BLACK
                    self.runText!!.textColor = Color.BLACK
                  }
                }),
                self.idleText = text({
                  text: 'idle',
                  layoutConfig: layoutConfig().justWidth().fitHeight(),
                  width: 60,
                  backgroundColor: Color.GRAY,
                  textColor: Color.WHITE,

                  onClick: () => {
                    const currentSettings = baseActions[ currentBaseAction ]
                    const currentAction = currentSettings ? currentSettings.action : null;
                    const settings = baseActions[ 'idle' ]
                    //@ts-ignore
                    const action = settings ? settings.action : null;
                    prepareCrossFade( currentAction, action, 0.35 );

                    self.noneText!!.textColor = Color.BLACK
                    self.idleText!!.textColor = Color.WHITE
                    self.walkText!!.textColor = Color.BLACK
                    self.runText!!.textColor = Color.BLACK
                  }
                }),
                self.walkText = text({
                  text: 'walk',
                  layoutConfig: layoutConfig().justWidth().fitHeight(),
                  width: 60,
                  backgroundColor: Color.GRAY,
                  textColor: Color.BLACK,

                  onClick: () => {
                    const currentSettings = baseActions[ currentBaseAction ]
                    const currentAction = currentSettings ? currentSettings.action : null;
                    const settings = baseActions[ 'walk' ]
                    //@ts-ignore
                    const action = settings ? settings.action : null;
                    prepareCrossFade( currentAction, action, 0.35 );

                    self.noneText!!.textColor = Color.BLACK
                    self.idleText!!.textColor = Color.BLACK
                    self.walkText!!.textColor = Color.WHITE
                    self.runText!!.textColor = Color.BLACK
                  }
                }),
                self.runText = text({
                  text: 'run',
                  layoutConfig: layoutConfig().justWidth().fitHeight(),
                  width: 60,
                  backgroundColor: Color.GRAY,
                  textColor: Color.BLACK,

                  onClick: () => {
                    const currentSettings = baseActions[ currentBaseAction ]
                    const currentAction = currentSettings ? currentSettings.action : null;
                    const settings = baseActions[ 'run' ]
                    //@ts-ignore
                    const action = settings ? settings.action : null;
                    prepareCrossFade( currentAction, action, 0.35 );

                    self.noneText!!.textColor = Color.BLACK
                    self.idleText!!.textColor = Color.BLACK
                    self.walkText!!.textColor = Color.BLACK
                    self.runText!!.textColor = Color.WHITE
                  }
                }),
              ], {
                space: 10,
                gravity: Gravity.CenterY,
              })
            )

            self.vlayoutView?.addChild(
              hlayout([
                text({
                  text: "sneak_pose",
                  layoutConfig: layoutConfig().justWidth().fitHeight(),
                  width: 90,
                }),
                gestureContainer([
                  self.sneakPoseValue = stack([], {
                    layoutConfig: layoutConfig().just(),
                    width: 135 ,
                    height: 25,
                    x: 0 * 135 / 1 - 135,
                    backgroundColor: Color.parse("#2FA1D6"),
                  })
                ], {
                  onPan: (dx, dy) => {
                    self.sneakPoseValue!!.x -= dx
                    if (self.sneakPoseValue!!.x <= 0 * 135 / 1 - 135) {
                      self.sneakPoseValue!!.x = 0 * 135 / 1 - 135
                    } else if (self.sneakPoseValue!!.x >= 0) {
                      self.sneakPoseValue!!.x = 0
                    }
                    let sneakPose = (self.sneakPoseValue!!.x + 135) * 1 / 135
  
                    const settings = additiveActions[ 'sneak_pose' ]
                    //@ts-ignore
                    setWeight( settings.action, sneakPose );
                    settings.weight = sneakPose;
                  },
                  layoutConfig: layoutConfig().just(),
                  width: 135,
                  height: 25,
                  backgroundColor: Color.parse("#303030"),
                })
              ], {
                space: 10,
                gravity: Gravity.CenterY,
              })
            )

            self.vlayoutView?.addChild(
              hlayout([
                text({
                  text: "sad_pose",
                  layoutConfig: layoutConfig().justWidth().fitHeight(),
                  width: 90,
                }),
                gestureContainer([
                  self.sadPoseValue = stack([], {
                    layoutConfig: layoutConfig().just(),
                    width: 135 ,
                    height: 25,
                    x: 0 * 135 / 1 - 135,
                    backgroundColor: Color.parse("#2FA1D6"),
                  })
                ], {
                  onPan: (dx, dy) => {
                    self.sadPoseValue!!.x -= dx
                    if (self.sadPoseValue!!.x <= 0 * 135 / 1 - 135) {
                      self.sadPoseValue!!.x = 0 * 135 / 1 - 135
                    } else if (self.sadPoseValue!!.x >= 0) {
                      self.sadPoseValue!!.x = 0
                    }
                    let sadPose = (self.sadPoseValue!!.x + 135) * 1 / 135
  
                    const settings = additiveActions[ 'sad_pose' ]
                    //@ts-ignore
                    setWeight( settings.action, sadPose );
                    settings.weight = sadPose;
                  },
                  layoutConfig: layoutConfig().just(),
                  width: 135,
                  height: 25,
                  backgroundColor: Color.parse("#303030"),
                })
              ], {
                space: 10,
                gravity: Gravity.CenterY,
              })
            )

            self.vlayoutView?.addChild(
              hlayout([
                text({
                  text: "agree",
                  layoutConfig: layoutConfig().justWidth().fitHeight(),
                  width: 90,
                }),
                gestureContainer([
                  self.agreeValue = stack([], {
                    layoutConfig: layoutConfig().just(),
                    width: 135 ,
                    height: 25,
                    x: 0 * 135 / 1 - 135,
                    backgroundColor: Color.parse("#2FA1D6"),
                  })
                ], {
                  onPan: (dx, dy) => {
                    self.agreeValue!!.x -= dx
                    if (self.agreeValue!!.x <= 0 * 135 / 1 - 135) {
                      self.agreeValue!!.x = 0 * 135 / 1 - 135
                    } else if (self.agreeValue!!.x >= 0) {
                      self.agreeValue!!.x = 0
                    }
                    let agree = (self.agreeValue!!.x + 135) * 1 / 135
  
                    const settings = additiveActions[ 'agree' ]
                    //@ts-ignore
                    setWeight( settings.action, agree );
                    settings.weight = agree;
                  },
                  layoutConfig: layoutConfig().just(),
                  width: 135,
                  height: 25,
                  backgroundColor: Color.parse("#303030"),
                })
              ], {
                space: 10,
                gravity: Gravity.CenterY,
              })
            )

            self.vlayoutView?.addChild(
              hlayout([
                text({
                  text: "headShake",
                  layoutConfig: layoutConfig().justWidth().fitHeight(),
                  width: 90,
                }),
                gestureContainer([
                  self.headShakeValue = stack([], {
                    layoutConfig: layoutConfig().just(),
                    width: 135 ,
                    height: 25,
                    x: 0 * 135 / 1 - 135,
                    backgroundColor: Color.parse("#2FA1D6"),
                  })
                ], {
                  onPan: (dx, dy) => {
                    self.headShakeValue!!.x -= dx
                    if (self.headShakeValue!!.x <= 0 * 135 / 1 - 135) {
                      self.headShakeValue!!.x = 0 * 135 / 1 - 135
                    } else if (self.headShakeValue!!.x >= 0) {
                      self.headShakeValue!!.x = 0
                    }
                    let headShake = (self.headShakeValue!!.x + 135) * 1 / 135
  
                    const settings = additiveActions[ 'headShake' ]
                    //@ts-ignore
                    setWeight( settings.action, headShake );
                    settings.weight = headShake;
                  },
                  layoutConfig: layoutConfig().just(),
                  width: 135,
                  height: 25,
                  backgroundColor: Color.parse("#303030"),
                })
              ], {
                space: 10,
                gravity: Gravity.CenterY,
              })
            )

            self.vlayoutView?.addChild(
              hlayout([
                text({
                  text: "time scale",
                  layoutConfig: layoutConfig().justWidth().fitHeight(),
                  width: 90,
                }),
                gestureContainer([
                  self.modifyTimeScaleValue = stack([], {
                    layoutConfig: layoutConfig().just(),
                    width: 135 ,
                    height: 25,
                    x: 1 * 135 / 1.5 - 135,
                    backgroundColor: Color.parse("#2FA1D6"),
                  })
                ], {
                  onPan: (dx, dy) => {
                    self.modifyTimeScaleValue!!.x -= dx
                    if (self.modifyTimeScaleValue!!.x <= 0 * 135 / 1.5 - 135) {
                      self.modifyTimeScaleValue!!.x = 0 * 135 / 1.5 - 135
                    } else if (self.modifyTimeScaleValue!!.x >= 0) {
                      self.modifyTimeScaleValue!!.x = 0
                    }
                    let value = (self.modifyTimeScaleValue!!.x + 135) * 1.5 / 135
  
                    modifyTimeScale(value)
                  },
                  layoutConfig: layoutConfig().just(),
                  width: 135,
                  height: 25,
                  backgroundColor: Color.parse("#303030"),
                })
              ], {
                space: 10,
                gravity: Gravity.CenterY,
              })
            )

            // for ( let i = 0, l = baseNames.length; i !== l; ++ i ) {

            //   const name = baseNames[ i ];
            //   const settings = baseActions[ name ];
            //   panelSettings[ name ] = function () {

            //     const currentSettings = baseActions[ currentBaseAction ];
            //     const currentAction = currentSettings ? currentSettings.action : null;
            //     const action = settings ? settings.action : null;

            //     prepareCrossFade( currentAction, action, 0.35 );

            //   };

            //   crossFadeControls.push( folder1.add( panelSettings, name ) );

            // }

            // for ( const name of Object.keys( additiveActions ) ) {

            //   const settings = additiveActions[ name ];

            //   panelSettings[ name ] = settings.weight;
            //   folder2.add( panelSettings, name, 0.0, 1.0, 0.01 ).listen().onChange( function ( weight ) {

            //     setWeight( settings.action, weight );
            //     settings.weight = weight;

            //   } );

            // }

            // folder3.add( panelSettings, 'modify time scale', 0.0, 1.5, 0.01 ).onChange( modifyTimeScale );

            // folder1.open();
            // folder2.open();
            // folder3.open();

            // crossFadeControls.forEach( function ( control ) {

            //   control.setInactive = function () {

            //     control.domElement.classList.add( 'control-inactive' );

            //   };

            //   control.setActive = function () {

            //     control.domElement.classList.remove( 'control-inactive' );

            //   };

            //   const settings = baseActions[ control.property ];

            //   if ( ! settings || ! settings.weight ) {

            //     control.setInactive();

            //   }

            // } );

          }

          function activateAction( action ) {

            const clip = action.getClip();
            const settings = baseActions[ clip.name ] || additiveActions[ clip.name ];
            setWeight( action, settings.weight );
            action.play();

          }

          function modifyTimeScale( speed ) {

            mixer.timeScale = speed;

          }

          function prepareCrossFade( startAction, endAction, duration ) {

            // If the current action is 'idle', execute the crossfade immediately;
            // else wait until the current action has finished its current loop

            if ( currentBaseAction === 'idle' || ! startAction || ! endAction ) {

              executeCrossFade( startAction, endAction, duration );

            } else {

              synchronizeCrossFade( startAction, endAction, duration );

            }

            // Update control colors

            if ( endAction ) {

              const clip = endAction.getClip();
              currentBaseAction = clip.name;

            } else {

              currentBaseAction = 'None';

            }

            crossFadeControls.forEach( function ( control ) {

              //@ts-ignore
              const name = control.property;

              if ( name === currentBaseAction ) {

                //@ts-ignore
                control.setActive();

              } else {

                //@ts-ignore
                control.setInactive();

              }

            } );

          }

          function synchronizeCrossFade( startAction, endAction, duration ) {

            mixer.addEventListener( 'loop', onLoopFinished );

            function onLoopFinished( event ) {

              if ( event.action === startAction ) {

                mixer.removeEventListener( 'loop', onLoopFinished );

                executeCrossFade( startAction, endAction, duration );

              }

            }

          }

          function executeCrossFade( startAction, endAction, duration ) {

            // Not only the start action, but also the end action must get a weight of 1 before fading
            // (concerning the start action this is already guaranteed in this place)

            if ( endAction ) {

              setWeight( endAction, 1 );
              endAction.time = 0;

              if ( startAction ) {

                // Crossfade with warping

                startAction.crossFadeTo( endAction, duration, true );

              } else {

                // Fade in

                endAction.fadeIn( duration );

              }

            } else {

              // Fade out

              startAction.fadeOut( duration );

            }

          }

          // This function is needed, since animationAction.crossFadeTo() disables its start action and sets
          // the start action's timeScale to ((start animation's duration) / (end animation's duration))

          function setWeight( action, weight ) {

            action.enabled = true;
            action.setEffectiveTimeScale( 1 );
            action.setEffectiveWeight( weight );

          }

          function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

          }

          function animate() {

            // Render loop

            requestAnimationFrame( animate );

            for ( let i = 0; i !== numAnimations; ++ i ) {

              const action = allActions[ i ];
              //@ts-ignore
              const clip = action.getClip();
              const settings = baseActions[ clip.name ] || additiveActions[ clip.name ];
              //@ts-ignore
              settings.weight = action.getEffectiveWeight();

            }

            // Get the time elapsed since the last frame, used for mixer update

            const mixerUpdateDelta = clock.getDelta();

            // Update the animation mixer, the stats panel, and render this frame

            mixer.update( mixerUpdateDelta );

            // stats.update();

            renderer.render( scene, camera );

            gl.endFrame();
          }

          //#endregion
        },
      }).apply({
        layoutConfig: layoutConfig().just(),
        width: 300,
        height: 300,
      }),
    )
  }
}