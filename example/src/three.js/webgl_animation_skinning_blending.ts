import {
  Panel,
  Group,
  vlayout,
  layoutConfig,
  Gravity,
  navbar,
  stack,
  gestureContainer,
  GestureContainer,
  Color,
  hlayout,
  text,
  Text,
} from "doric";
import { dangleView, getGl, vsync } from "dangle";

import * as THREE from 'three'
import { GLTFLoader } from "./jsm/loaders/GLTFLoader";
import {VLayout} from "doric/lib/src/widget/layouts";
import {Switch, switchView} from "doric/lib/src/widget/switch";

@Entry
class webgl_animation_skinning_blending extends Panel {
  private container?: VLayout
  private gestureView?: GestureContainer

  private pauseOrContinueText?: Text
  private singleStepText?: Text
  private deactivateText?: Text
  private activateText?: Text

  private walkToIdleText?: Text
  private idleToWalkText?: Text
  private walkToRunText?: Text
  private runToWalkText?: Text

  private showFocusValue?: Switch

  onShow() {
    navbar(context).setTitle("webgl_animation_skinning_blending");
  }
  build(rootView: Group) {
        this.container = vlayout([
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
                  gravity: Gravity.CenterX,
                })
            .in(rootView);
        //
            let self = this

    vlayout([
      stack(
        [
          dangleView({
            onPrepared: (glContextId, width, height) => {
              let gl = getGl(glContextId) as any;

              const inputCanvas =
              ({
                width: width,
                height: height,
                style: {},
                addEventListener: (() => {}) as any,
                removeEventListener: (() => {}) as any,
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

              let idleAction, walkAction, runAction;
              let idleWeight, walkWeight, runWeight;
              let actions, settings;

              let singleStepMode = false;
              let sizeOfNextStep = 0;

              init();

              function init() {

                // const container = document.getElementById( 'container' );

                camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
                camera.position.set( 1, 2, - 3 );
                camera.lookAt( 0, 1, 0 );

                clock = new THREE.Clock();

                scene = new THREE.Scene();
                scene.background = new THREE.Color( 0xa0a0a0 );
                scene.fog = new THREE.Fog( 0xa0a0a0, 10, 50 );

                const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
                hemiLight.position.set( 0, 20, 0 );
                scene.add( hemiLight );

                const dirLight = new THREE.DirectionalLight( 0xffffff );
                dirLight.position.set( - 3, 10, - 10 );
                dirLight.castShadow = true;
                dirLight.shadow.camera.top = 2;
                dirLight.shadow.camera.bottom = - 2;
                dirLight.shadow.camera.left = - 2;
                dirLight.shadow.camera.right = 2;
                dirLight.shadow.camera.near = 0.1;
                dirLight.shadow.camera.far = 40;
                scene.add( dirLight );

                // scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );

                // ground

                const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
                mesh.rotation.x = - Math.PI / 2;
                mesh.receiveShadow = true;
                scene.add( mesh );

                //@ts-ignore
                const loader = new GLTFLoader();
                //@ts-ignore
                loader.load( 'https://raw.githubusercontent.com/doric-pub/Dangle/98bc198cc5871ec33f5aa28231cb80cdd96ea1aa/example/src/three.js/models/Soldier/Soldier.gltf', function ( gltf ) {

                  model = gltf.scene;
                  scene.add( model );

                  model.traverse( function ( object ) {

                    if ( object.isMesh ) object.castShadow = true;

                  } );

                  //

                  skeleton = new THREE.SkeletonHelper( model );
                  skeleton.visible = false;
                  scene.add( skeleton );

                  //

                  createPanel();


                  //

                  const animations = gltf.animations;

                  mixer = new THREE.AnimationMixer( model );

                  idleAction = mixer.clipAction( animations[ 0 ] );
                  walkAction = mixer.clipAction( animations[ 3 ] );
                  runAction = mixer.clipAction( animations[ 1 ] );

                  actions = [ idleAction, walkAction, runAction ];

                  activateAllActions();

                  animate();

                } );

                renderer = new THREE.WebGLRenderer( { antialias: true, canvas: inputCanvas} );
                renderer.setPixelRatio( window.devicePixelRatio );
                renderer.setSize( window.innerWidth, window.innerHeight );
                renderer.outputEncoding = THREE.sRGBEncoding;
                renderer.shadowMap.enabled = true;
                // container.appendChild( renderer.domElement );

                // stats = new Stats();
                // container.appendChild( stats.dom );

                window.addEventListener( 'resize', onWindowResize );

              }

              function createPanel() {
                settings = {
                  'show model': true,
                  'show skeleton': false,
                  'deactivate all': deactivateAllActions,
                  'activate all': activateAllActions,
                  'pause/continue': pauseContinue,
                  'make single step': toSingleStepMode,
                  'modify step size': 0.05,
                  'from walk to idle': function () {

                    prepareCrossFade( walkAction, idleAction, 1.0 );

                  },
                  'from idle to walk': function () {

                    prepareCrossFade( idleAction, walkAction, 0.5 );

                  },
                  'from walk to run': function () {

                    prepareCrossFade( walkAction, runAction, 2.5 );

                  },
                  'from run to walk': function () {

                    prepareCrossFade( runAction, walkAction, 5.0 );

                  },
                  'use default duration': true,
                  'set custom duration': 3.5,
                  'modify idle weight': 0.0,
                  'modify walk weight': 1.0,
                  'modify run weight': 0.0,
                  'modify time scale': 1.0
                };

                self.container?.addChild(
                                        vlayout([

                                               hlayout([
                                                    text({
                                                          text: "show model",
                                              layoutConfig: layoutConfig().justWidth().fitHeight(),
                                              width: 200,
                                              textColor: Color.WHITE,
                                           }),
                                       self.showFocusValue = switchView({
                                              state:true,
                                              onSwitch: (state) => {
                                              showModel(state);
                                            }
                                        })
                                      ], {
                                          space: 20,
                                              backgroundColor: Color.BLACK,
                                            }),
                                      hlayout([
                                          text({
                                                text: "show skeleton",
                                              layoutConfig: layoutConfig().justWidth().fitHeight(),
                                              width: 200,
                                              textColor: Color.WHITE,
                                            }),
                                        self.showFocusValue = switchView({
                                              onSwitch: (state) => {
                                              showSkeleton(state);
                                            }
                                        })
                                      ], {
                                          space: 20,
                                              backgroundColor: Color.BLACK,
                                            }),
                                          self.deactivateText = text(
                                                                          {
                                                                           text:'deactivate all',
                                                  layoutConfig: layoutConfig().justWidth().fitHeight(),
                                                  width: 120,
                                                  backgroundColor: Color.GRAY,
                                                  textColor: Color.WHITE,

                                                      onClick: () => {
                                                  deactivateAllActions();
                                                }
                                            }
                                        ),
                                        self.activateText = text(
                                                {
                                                  text:'activate all',
                                                  layoutConfig: layoutConfig().justWidth().fitHeight(),
                                                  width: 120,
                                                  backgroundColor: Color.GRAY,
                                                  textColor: Color.WHITE,

                                                      onClick: () => {
                                                  activateAllActions();
                                                }
                                            }
                                        ),


                                                self.pauseOrContinueText = text(
                                                {
                                                  text:'pause/continue',
                                                  layoutConfig: layoutConfig().justWidth().fitHeight(),
                                                  width: 120,
                                                  backgroundColor: Color.GRAY,
                                                  textColor: Color.WHITE,

                                                     onClick: () => {
                                                  pauseContinue();
                                                }
                                            }
                                        ),
                                          self.singleStepText= text({
                                                                      text:'make single step',
                                            layoutConfig: layoutConfig().justWidth().fitHeight(),
                                            width: 120,
                                            backgroundColor: Color.GRAY,
                                            textColor: Color.WHITE,

                                                onClick: () => {
                                            toSingleStepMode();
                                          }
                                      }),

                                          self.walkToIdleText= text({
                                            text:'from walk to idle',
                                            layoutConfig: layoutConfig().justWidth().fitHeight(),
                                            width: 120,
                                            backgroundColor: Color.GRAY,
                                            textColor: Color.WHITE,

                                                onClick: () => {
                                            prepareCrossFade( walkAction, idleAction, 1.0 );

                                                self.walkToIdleText!!.textColor = Color.GRAY
                                            self.walkToIdleText!!.backgroundColor = Color.BLACK

                                            self.idleToWalkText!!.textColor = Color.WHITE
                                            self.idleToWalkText!!.backgroundColor = Color.GRAY

                                            self.walkToRunText!!.textColor = Color.GRAY
                                            self.walkToRunText!!.backgroundColor = Color.BLACK

                                            self.runToWalkText!!.textColor = Color.GRAY
                                            self.runToWalkText!!.backgroundColor = Color.BLACK

                                              }
                                      }),
                                      self.idleToWalkText= text({
                                            text:'from idle to walk',
                                            layoutConfig: layoutConfig().justWidth().fitHeight(),
                                            width: 120,
                                            backgroundColor: Color.GRAY,
                                            textColor: Color.BLACK,

                                                onClick: () => {
                                            prepareCrossFade( idleAction, walkAction, 0.5 );
                                                  self.walkToIdleText!!.textColor = Color.WHITE
                                                  self.walkToIdleText!!.backgroundColor = Color.GRAY

                                                  self.idleToWalkText!!.textColor = Color.GRAY
                                                  self.idleToWalkText!!.backgroundColor = Color.BLACK

                                                  self.walkToRunText!!.textColor = Color.WHITE
                                                  self.walkToRunText!!.backgroundColor = Color.GRAY

                                                  self.runToWalkText!!.textColor = Color.GRAY
                                                  self.runToWalkText!!.backgroundColor = Color.BLACK

                                            }
                                      }),
                                      self.walkToRunText= text({
                                            text:'from walk to run',
                                            layoutConfig: layoutConfig().justWidth().fitHeight(),
                                            width: 120,
                                            backgroundColor: Color.GRAY,
                                            textColor: Color.WHITE,

                                                onClick: () => {
                                            prepareCrossFade( walkAction, runAction, 2.5 );

                                            self.walkToIdleText!!.textColor = Color.GRAY
                                            self.walkToIdleText!!.backgroundColor = Color.BLACK

                                            self.idleToWalkText!!.textColor = Color.GRAY
                                            self.idleToWalkText!!.backgroundColor = Color.BLACK

                                            self.walkToRunText!!.textColor = Color.GRAY
                                            self.walkToRunText!!.backgroundColor = Color.BLACK

                                            self.runToWalkText!!.textColor = Color.WHITE
                                            self.runToWalkText!!.backgroundColor = Color.BLACK

                                              }
                                      }),
                                          self.runToWalkText= text({
                                                                      text:'from run to walk',
                                            layoutConfig: layoutConfig().justWidth().fitHeight(),
                                            width: 120,
                                            backgroundColor: Color.GRAY,
                                            textColor: Color.BLACK,

                                            onClick: () => {
                                            prepareCrossFade( runAction, walkAction, 5.0 );

                                            self.walkToIdleText!!.textColor = Color.WHITE
                                            self.walkToIdleText!!.backgroundColor = Color.GRAY

                                            self.idleToWalkText!!.textColor = Color.GRAY
                                            self.idleToWalkText!!.backgroundColor = Color.BLACK

                                            self.walkToRunText!!.textColor = Color.WHITE
                                            self.walkToRunText!!.backgroundColor = Color.GRAY

                                            self.runToWalkText!!.textColor = Color.GRAY
                                            self.runToWalkText!!.backgroundColor = Color.BLACK

                                                                      }
                                      })
                                    ],{
                                        space: 10,
                                            gravity: Gravity.Center,
                                          })
                                )
              }


              function showModel( visibility ) {

                model.visible = visibility;

              }


              function showSkeleton( visibility ) {

                skeleton.visible = visibility;

              }


              function modifyTimeScale( speed ) {

                mixer.timeScale = speed;

              }


              function deactivateAllActions() {

                actions.forEach( function ( action ) {

                  action.stop();

                } );

              }

              function activateAllActions() {
                setWeight( idleAction, 0 );
                setWeight( walkAction, 1 );
                setWeight( runAction, 0 );

                actions.forEach( function ( action ) {

                  action.play();

                } );

              }

              function pauseContinue() {

                if ( singleStepMode ) {

                  singleStepMode = false;
                  unPauseAllActions();

                } else {

                  if ( idleAction.paused ) {

                    unPauseAllActions();

                  } else {

                    pauseAllActions();

                  }

                }

              }

              function pauseAllActions() {

                actions.forEach( function ( action ) {

                  action.paused = true;

                } );

              }

              function unPauseAllActions() {

                actions.forEach( function ( action ) {

                  action.paused = false;

                } );

              }

              function toSingleStepMode() {

                unPauseAllActions();

                singleStepMode = true;
                sizeOfNextStep = settings[ 'modify step size' ];

              }

              function prepareCrossFade( startAction, endAction, defaultDuration ) {

                // Switch default / custom crossfade duration (according to the user's choice)

                const duration = setCrossFadeDuration( defaultDuration );

                // Make sure that we don't go on in singleStepMode, and that all actions are unpaused

                singleStepMode = false;
                unPauseAllActions();

                // If the current action is 'idle' (duration 4 sec), execute the crossfade immediately;
                // else wait until the current action has finished its current loop

                if ( startAction === idleAction ) {

                  executeCrossFade( startAction, endAction, duration );

                } else {

                  synchronizeCrossFade( startAction, endAction, duration );

                }

              }

              function setCrossFadeDuration( defaultDuration ) {

                // Switch default crossfade duration <-> custom crossfade duration

                if ( settings[ 'use default duration' ] ) {

                  return defaultDuration;

                } else {

                  return settings[ 'set custom duration' ];

                }

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

                setWeight( endAction, 1 );
                endAction.time = 0;

                // Crossfade with warping - you can also try without warping by setting the third parameter to false

                startAction.crossFadeTo( endAction, duration, true );

              }

              // This function is needed, since animationAction.crossFadeTo() disables its start action and sets
              // the start action's timeScale to ((start animation's duration) / (end animation's duration))

              function setWeight( action, weight ) {

                action.enabled = true;
                action.setEffectiveTimeScale( 1 );
                action.setEffectiveWeight( weight );

              }

              // Called by the render loop

              function updateWeightSliders() {

                settings[ 'modify idle weight' ] = idleWeight;
                settings[ 'modify walk weight' ] = walkWeight;
                settings[ 'modify run weight' ] = runWeight;

              }

              // Called by the render loop

              function updateCrossFadeControls() {

                if ( idleWeight === 1 && walkWeight === 0 && runWeight === 0 ) {

                  //@ts-ignore
                  crossFadeControls[ 0 ].disable();
                  //@ts-ignore
                  crossFadeControls[ 1 ].enable();
                  //@ts-ignore
                  crossFadeControls[ 2 ].disable();
                  //@ts-ignore
                  crossFadeControls[ 3 ].disable();

                }

                if ( idleWeight === 0 && walkWeight === 1 && runWeight === 0 ) {

                  //@ts-ignore
                  crossFadeControls[ 0 ].enable();
                  //@ts-ignore
                  crossFadeControls[ 1 ].disable();
                  //@ts-ignore
                  crossFadeControls[ 2 ].enable();
                  //@ts-ignore
                  crossFadeControls[ 3 ].disable();

                }

                if ( idleWeight === 0 && walkWeight === 0 && runWeight === 1 ) {

                  //@ts-ignore
                  crossFadeControls[ 0 ].disable();
                  //@ts-ignore
                  crossFadeControls[ 1 ].disable();
                  //@ts-ignore
                  crossFadeControls[ 2 ].disable();
                  //@ts-ignore
                  crossFadeControls[ 3 ].enable();

                }

              }

              function onWindowResize() {

                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();

                renderer.setSize( window.innerWidth, window.innerHeight );

              }

              function animate() {

                // Render loop

                requestAnimationFrame( animate );

                idleWeight = idleAction.getEffectiveWeight();
                walkWeight = walkAction.getEffectiveWeight();
                runWeight = runAction.getEffectiveWeight();

                // Update the panel values if weights are modified from "outside" (by crossfadings)

                updateWeightSliders();

                // Enable/disable crossfade controls according to current weight values

                // updateCrossFadeControls();

                // Get the time elapsed since the last frame, used for mixer update (if not in single step mode)

                let mixerUpdateDelta = clock.getDelta();

                // If in single step mode, make one step and then do nothing (until the user clicks again)

                if ( singleStepMode ) {

                  mixerUpdateDelta = sizeOfNextStep;
                  sizeOfNextStep = 0;

                }

                // Update the animation mixer, the stats panel, and render this frame

                mixer.update( mixerUpdateDelta );

                // stats.update();

                renderer.render( scene, camera );

                gl.flush();
                gl.endFrameEXP();

              }

              //#endregion

              gl.flush();
              gl.endFrameEXP();
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
        layoutConfig: layoutConfig().fit().configAlignment(Gravity.CenterX),
        space: 20,
        gravity: Gravity.CenterX,
      })
      .in(rootView);
  }
}
