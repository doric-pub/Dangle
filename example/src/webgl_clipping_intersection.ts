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
  Switch,
  hlayout,
  text,
  switchView,
} from "doric";
import { dangleView, getGl } from "dangle";

import * as THREE from "three";
import { OrbitControls } from "./jsm/controls/OrbitControls";

@Entry
class webgl_clipping_intersection extends Panel {

  private gestureView?: GestureContainer
  private clipIntersectionView?: Switch

  onShow() {
    navbar(context).setTitle("webgl_clipping_intersection");
  }
  build(rootView: Group) {
    vlayout([
      this.gestureView = gestureContainer([], {
        layoutConfig: layoutConfig().just(),
        width: 300,
        height: 300,
        backgroundColor: Color.BLACK,
      }),
      hlayout([
        text({
          text: 'clipIntersection'
        }),
        this.clipIntersectionView = switchView({state: true})
      ]).apply({
        gravity: Gravity.Center,
      })
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
        onPrepared: (glContextId, width, height) => {
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

          //#region code to impl

          let camera, scene, renderer;

          const params = {
            clipIntersection: true,
            planeConstant: 0,
            showHelpers: false
          };

          const clipPlanes = [
            new THREE.Plane( new THREE.Vector3( 1, 0, 0 ), 0 ),
            new THREE.Plane( new THREE.Vector3( 0, - 1, 0 ), 0 ),
            new THREE.Plane( new THREE.Vector3( 0, 0, - 1 ), 0 )
          ];

          init();
          render();

          function init() {

            renderer = new THREE.WebGLRenderer( { antialias: true, canvas: inputCanvas } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            renderer.localClippingEnabled = true;
            // document.body.appendChild( renderer.domElement );

            scene = new THREE.Scene();

            camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 200 );

            camera.position.set( - 1.5, 2.5, 3.0 );

            const controls = new OrbitControls( camera, renderer.domElement );
            controls.addEventListener( 'change', render ); // use only if there is no animation loop
            (<any>controls).minDistance = 1;
            (<any>controls).maxDistance = 10;
            (<any>controls).enablePan = false;

            const light = new THREE.HemisphereLight( 0xffffff, 0x080808, 1.5 );
            light.position.set( - 1.25, 1, 1.25 );
            scene.add( light );

            // const helper = new THREE.CameraHelper( light.shadow.camera );
            // scene.add( helper );

            //

            const group = new THREE.Group();

            for ( let i = 1; i <= 30; i += 2 ) {

              const geometry = new THREE.SphereGeometry( i / 30, 48, 24 );

              const material = new THREE.MeshLambertMaterial( {

                color: new THREE.Color().setHSL( Math.random(), 0.5, 0.5 ),
                side: THREE.DoubleSide,
                clippingPlanes: clipPlanes,
                clipIntersection: params.clipIntersection

              } );

              group.add( new THREE.Mesh( geometry, material ) );

            }

            scene.add( group );

            // helpers

            const helpers = new THREE.Group();
            helpers.add( new THREE.PlaneHelper( clipPlanes[ 0 ], 2, 0xff0000 ) );
            helpers.add( new THREE.PlaneHelper( clipPlanes[ 1 ], 2, 0x00ff00 ) );
            helpers.add( new THREE.PlaneHelper( clipPlanes[ 2 ], 2, 0x0000ff ) );
            helpers.visible = false;
            scene.add( helpers );

            // gui

            // const gui = new GUI();

            // gui.add( params, 'clipIntersection' ).name( 'clip intersection' ).onChange( function ( value ) {

            //   const children = group.children;

            //   for ( let i = 0; i < children.length; i ++ ) {

            //     children[ i ].material.clipIntersection = value;

            //   }

            //   render();

            // } );

            // gui.add( params, 'planeConstant', - 1, 1 ).step( 0.01 ).name( 'plane constant' ).onChange( function ( value ) {

            //   for ( let j = 0; j < clipPlanes.length; j ++ ) {

            //     clipPlanes[ j ].constant = value;

            //   }

            //   render();

            // } );

            // gui.add( params, 'showHelpers' ).name( 'show helpers' ).onChange( function ( value ) {

            //   helpers.visible = value;

            //   render();

            // } );

            self.clipIntersectionView!!.onSwitch = (state) => {
              const children = group.children;

              for ( let i = 0; i < children.length; i ++ ) {

                (<any>children[ i ]).material.clipIntersection = state;

              }

              render();
            }
            //

            window.addEventListener( 'resize', onWindowResize );

          }

          function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

            render();

          }

          function render() {

            renderer.render( scene, camera );

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
