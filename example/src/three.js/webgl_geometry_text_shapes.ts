import {
  Panel,
  Group,
  vlayout,
  layoutConfig,
  Gravity,
  navbar,
  GestureContainer,
  gestureContainer,
} from "doric";
import { dangleView } from "dangle";

import * as THREE from "three"
import { OrbitControls } from "./jsm/controls/OrbitControls";
import { FontLoader } from "./jsm/loaders/FontLoader";

@Entry
class webgl_geometry_text_shapes extends Panel {
  private gestureView?: GestureContainer

  onShow() {
    navbar(context).setTitle("webgl_geometry_text_shapes");
  }
  build(rootView: Group) {
    vlayout([
      this.gestureView = gestureContainer([], {
        layoutConfig: layoutConfig().just(),
        width: 300,
        height: 300,
      }),
    ])
      .apply({
        layoutConfig: layoutConfig().fit().configAlignment(Gravity.Center),
        space: 20,
        gravity: Gravity.Center,
      })
      .in(rootView);

    let self = this;
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
          let camera, scene, renderer;

          init();

          function init( ) {

            camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
            camera.position.set( 0, - 400, 600 );

            scene = new THREE.Scene();
            scene.background = new THREE.Color( 0xf0f0f0 );

            //@ts-ignore
            const loader = new FontLoader();
            //@ts-ignore
            loader.load( 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {

              const color = 0x006699;

              const matDark = new THREE.LineBasicMaterial( {
                color: color,
                side: THREE.DoubleSide
              } );

              const matLite = new THREE.MeshBasicMaterial( {
                color: color,
                transparent: true,
                opacity: 0.4,
                side: THREE.DoubleSide
              } );

              const message = '   Three.js\nSimple text.';

              const shapes = font.generateShapes( message, 100 );

              const geometry = new THREE.ShapeGeometry( shapes ) as any;

              geometry.computeBoundingBox();

              const xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );

              geometry.translate( xMid, 0, 0 );

              // make shape ( N.B. edge view not visible )

              const text = new THREE.Mesh( geometry, matLite );
              text.position.z = - 150;
              scene.add( text );

              // make line shape ( N.B. edge view remains visible )

              const holeShapes: any[] = [];

              for ( let i = 0; i < shapes.length; i ++ ) {

                const shape = shapes[ i ];

                if ( shape.holes && shape.holes.length > 0 ) {

                  for ( let j = 0; j < shape.holes.length; j ++ ) {

                    const hole = shape.holes[ j ];
                    holeShapes.push( hole );

                  }

                }

              }

              shapes.push.apply( shapes, holeShapes );

              const lineText = new THREE.Object3D();

              for ( let i = 0; i < shapes.length; i ++ ) {

                const shape = shapes[ i ];

                const points = shape.getPoints();
                const geometry = new THREE.BufferGeometry().setFromPoints( points );

                geometry.translate( xMid, 0, 0 );

                const lineMesh = new THREE.Line( geometry, matDark );
                lineText.add( lineMesh );

              }

              scene.add( lineText );

              render();

            } ); //end load function

            renderer = new THREE.WebGLRenderer( { antialias: true, canvas: inputCanvas } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            // document.body.appendChild( renderer.domElement );

            const controls = new OrbitControls( camera, renderer.domElement ) as any;
            controls.target.set( 0, 0, 0 );
            controls.update();

            controls.addEventListener( 'change', render );

            window.addEventListener( 'resize', onWindowResize );

          } // end init

          function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

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
