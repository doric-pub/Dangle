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
} from "doric";
import { dangleView } from "dangle";
import { TextureLoader } from "./dangle/TextureLoader";

import * as THREE from "three";

@Entry
class webgl_interactive_voxelpainter extends Panel {

  private gestureView?: GestureContainer

  onShow() {
    navbar(context).setTitle("webgl_interactive_voxelpainter");
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

          //#region code to impl

          let camera, scene, renderer;
          let plane;
          let pointer, raycaster, isShiftDown = false;

          let rollOverMesh, rollOverMaterial;
          let cubeGeo, cubeMaterial;

          const objects: any[] = [];

          init();
          render();

          function init() {

            camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
            camera.position.set( 500, 800, 1300 );
            camera.lookAt( 0, 0, 0 );

            scene = new THREE.Scene();
            scene.background = new THREE.Color( 0xf0f0f0 );

            // roll-over helpers

            const rollOverGeo = new THREE.BoxGeometry( 50, 50, 50 );
            rollOverMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } );
            rollOverMesh = new THREE.Mesh( rollOverGeo, rollOverMaterial );
            scene.add( rollOverMesh );

            // cubes

            cubeGeo = new THREE.BoxGeometry( 50, 50, 50 );
            //@ts-ignore
            new TextureLoader().load( 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/square-outline-textured.png', function(texture) {
              cubeMaterial = new THREE.MeshLambertMaterial( { color: 0xfeb74c, map: texture } );
            } )
            

            // grid

            const gridHelper = new THREE.GridHelper( 1000, 20 );
            scene.add( gridHelper );

            //

            raycaster = new THREE.Raycaster();
            pointer = new THREE.Vector2();

            const geometry = new THREE.PlaneGeometry( 1000, 1000 );
            geometry.rotateX( - Math.PI / 2 );

            plane = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { visible: false } ) );
            scene.add( plane );

            objects.push( plane );

            // lights

            const ambientLight = new THREE.AmbientLight( 0x606060 );
            scene.add( ambientLight );

            const directionalLight = new THREE.DirectionalLight( 0xffffff );
            directionalLight.position.set( 1, 0.75, 0.5 ).normalize();
            scene.add( directionalLight );

            renderer = new THREE.WebGLRenderer( { antialias: true, canvas: inputCanvas } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            // document.body.appendChild( renderer.domElement );

            // document.addEventListener( 'pointermove', onPointerMove );
            self.gestureView!!.onTouchMove = ({x, y}) => {
              onPointerMove({
                clientX: x * Environment.screenScale,
                clientY: y * Environment.screenScale,
              });
            };
            // document.addEventListener( 'pointerdown', onPointerDown );
            self.gestureView!!.onTouchDown = ({x, y}) => {
              onPointerDown({
                clientX: x * Environment.screenScale,
                clientY: y * Environment.screenScale,
              });
            };
            // document.addEventListener( 'keydown', onDocumentKeyDown );
            // document.addEventListener( 'keyup', onDocumentKeyUp );

            //

            window.addEventListener( 'resize', onWindowResize );

          }

          function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

            render();

          }

          function onPointerMove( event ) {

            pointer.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );

            raycaster.setFromCamera( pointer, camera );

            const intersects = raycaster.intersectObjects( objects, false );

            if ( intersects.length > 0 ) {

              const intersect = intersects[ 0 ];

              rollOverMesh.position.copy( intersect.point ).add( intersect.face.normal );
              rollOverMesh.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );

            }

            render();

          }

          function onPointerDown( event ) {

            pointer.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );

            raycaster.setFromCamera( pointer, camera );

            const intersects = raycaster.intersectObjects( objects, false );

            if ( intersects.length > 0 ) {

              const intersect = intersects[ 0 ];

              // delete cube

              if ( isShiftDown ) {

                if ( intersect.object !== plane ) {

                  scene.remove( intersect.object );

                  objects.splice( objects.indexOf( intersect.object ), 1 );

                }

                // create cube

              } else {

                const voxel = new THREE.Mesh( cubeGeo, cubeMaterial );
                voxel.position.copy( intersect.point ).add( intersect.face.normal );
                voxel.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
                scene.add( voxel );

                objects.push( voxel );

              }

              render();

            }

          }

          function onDocumentKeyDown( event ) {

            switch ( event.keyCode ) {

              case 16: isShiftDown = true; break;

            }

          }

          function onDocumentKeyUp( event ) {

            switch ( event.keyCode ) {

              case 16: isShiftDown = false; break;

            }

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
