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
} from "doric";
import { dangleView, vsync } from "dangle";

import * as THREE from "three";
import { OrbitControls } from "./jsm/controls/OrbitControls";

@Entry
class misc_controls_orbit extends Panel {

  private gestureView?: GestureContainer

  onShow() {
    navbar(context).setTitle("misc_controls_orbit");
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
        onReady: (gl: WebGL2RenderingContext) => {
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

          //#region code to impl

          let camera, controls, scene, renderer;

          init();
          //render(); // remove when using next line for animation loop (requestAnimationFrame)
          animate();

          function init() {

            scene = new THREE.Scene();
            scene.background = new THREE.Color( 0xcccccc );
            scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

            renderer = new THREE.WebGLRenderer( { antialias: true, canvas: inputCanvas } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            // document.body.appendChild( renderer.domElement );

            camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
            camera.position.set( 400, 200, 0 );

            // controls

            controls = new OrbitControls( camera, renderer.domElement );
            controls.listenToKeyEvents( window ); // optional

            //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

            controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
            controls.dampingFactor = 0.05;

            controls.screenSpacePanning = false;

            controls.minDistance = 100;
            controls.maxDistance = 500;

            controls.maxPolarAngle = Math.PI / 2;

            // world

            const geometry = new THREE.CylinderGeometry( 0, 10, 30, 4, 1 );
            const material = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } );

            for ( let i = 0; i < 500; i ++ ) {

              const mesh = new THREE.Mesh( geometry, material );
              mesh.position.x = Math.random() * 1600 - 800;
              mesh.position.y = 0;
              mesh.position.z = Math.random() * 1600 - 800;
              mesh.updateMatrix();
              mesh.matrixAutoUpdate = false;
              scene.add( mesh );

            }

            // lights

            const dirLight1 = new THREE.DirectionalLight( 0xffffff );
            dirLight1.position.set( 1, 1, 1 );
            scene.add( dirLight1 );

            const dirLight2 = new THREE.DirectionalLight( 0x002288 );
            dirLight2.position.set( - 1, - 1, - 1 );
            scene.add( dirLight2 );

            const ambientLight = new THREE.AmbientLight( 0x222222 );
            scene.add( ambientLight );

            //

            window.addEventListener( 'resize', onWindowResize );

          }

          function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

          }

          function animate() {

            vsync(context).requestAnimationFrame( animate );

            controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

            render();

          }

          function render() {

            renderer.render( scene, camera );

            gl.flush();
            (<any>gl).endFrameEXP();
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
  