import {
  Panel,
  Group,
  vlayout,
  layoutConfig,
  Gravity,
  navbar,
  GestureContainer,
  gestureContainer,
  Color,
  loge,
} from "doric";
import { dangleView, getGl, vsync } from "dangle";

import * as THREE from "three";
import { OrbitControls } from "./jsm/controls/OrbitControls";
import { FBXLoader } from "./jsm/loaders/FBXLoader";

@Entry
class webgl_loader_fbx extends Panel {

  private gestureView?: GestureContainer

  onShow() {
    navbar(context).setTitle("webgl_loader_fbx");
  }
  build(rootView: Group) {
    vlayout([
      this.gestureView = gestureContainer([], {
        layoutConfig: layoutConfig().just(),
        width: 300,
        height: 300,
        backgroundColor: Color.BLACK,
      }),
    ])
      .apply({
        layoutConfig: layoutConfig().fit().configAlignment(Gravity.Center),
        space: 20,
        gravity: Gravity.Center,
      })
      .in(rootView);

    let self = this
    this.gestureView.addChild(
      dangleView({
        onPrepared: async (glContextId, width, height) => {
          let gl = getGl(glContextId) as any;

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
          let requestAnimationFrame = vsync(context).requestAnimationFrame

          //#region code to impl

          let camera, scene, renderer, stats;

          const clock = new THREE.Clock();

          let mixer;

          init();
          animate();

          function init() {

            // const container = document.createElement( 'div' );
            // document.body.appendChild( container );

            camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
            camera.position.set( 100, 200, 300 );

            scene = new THREE.Scene();
            scene.background = new THREE.Color( 0xa0a0a0 );
            scene.fog = new THREE.Fog( 0xa0a0a0, 200, 1000 );

            const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
            hemiLight.position.set( 0, 200, 0 );
            scene.add( hemiLight );

            const dirLight = new THREE.DirectionalLight( 0xffffff );
            dirLight.position.set( 0, 200, 100 );
            dirLight.castShadow = true;
            dirLight.shadow.camera.top = 180;
            dirLight.shadow.camera.bottom = - 100;
            dirLight.shadow.camera.left = - 120;
            dirLight.shadow.camera.right = 120;
            scene.add( dirLight );

            // scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );

            // ground
            const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
            mesh.rotation.x = - Math.PI / 2;
            mesh.receiveShadow = true;
            scene.add( mesh );

            const grid = new THREE.GridHelper( 2000, 20, 0x000000, 0x000000 );
            //@ts-ignore
            grid.material.opacity = 0.2;
            //@ts-ignore
            grid.material.transparent = true;
            scene.add( grid );

            // model
            //@ts-ignore
            const loader = new FBXLoader();
            //@ts-ignore
            loader.load( 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/fbx/Samba%20Dancing.fbx', function ( object ) {

              mixer = new THREE.AnimationMixer( object );

              const action = mixer.clipAction( object.animations[ 0 ] );
              action.play();

              object.traverse( function ( child ) {

                if ( child.isMesh ) {

                  child.castShadow = true;
                  child.receiveShadow = true;

                }

              } );

              scene.add( object );

            } );

            renderer = new THREE.WebGLRenderer( { antialias: true, canvas: inputCanvas } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            renderer.shadowMap.enabled = true;
            // container.appendChild( renderer.domElement );

            const controls = new OrbitControls( camera, renderer.domElement );
            //@ts-ignore
            controls.target.set( 0, 100, 0 );
            //@ts-ignore
            controls.update();

            window.addEventListener( 'resize', onWindowResize );

            // stats
            // stats = new Stats();
            // container.appendChild( stats.dom );

          }

          function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

          }

          //

          function animate() {

            requestAnimationFrame( animate );

            const delta = clock.getDelta();

            if ( mixer ) mixer.update( delta );

            renderer.render( scene, camera );

            // stats.update();

            gl.flush();
            gl.endFrameEXP();
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
