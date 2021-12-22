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
  RemoteResource,
  resourceLoader,
  input,
  Input,
  loge,
} from "doric";
import { dangleView, getGl, vsync , DangleWebGLRenderingContext} from "dangle";

import * as THREE from "three";

import { DDSLoader } from './jsm/loaders/DDSLoader.js';
import { MTLLoader } from './jsm/loaders/MTLLoader.js';
import { OBJLoader } from './jsm/loaders/OBJLoader';


@Entry
class webgl_loader_mtl extends Panel {

  private gestureView?: GestureContainer

  onShow() {
    navbar(context).setTitle("webgl_loader_mtl");
  }
  build(rootView: Group) {
    vlayout([
      this.gestureView = gestureContainer([], {
        layoutConfig: layoutConfig().just(),
        width: 300,
        height: 300,
      })
    ])
      .apply({
        layoutConfig: layoutConfig().fit().configAlignment(Gravity.Center),
        space: 20,
        gravity: Gravity.Center,
      })
      .in(rootView);

    let self = this
    self.gestureView?.addChild(
      dangleView({
        onReady: (gl: DangleWebGLRenderingContext) => {
          const glWidth = gl.drawingBufferWidth
          const glHeight = gl.drawingBufferHeight

          const inputCanvas =
          ({
            width: glWidth,
            height: glHeight,
            style: {},
            addEventListener: (() => {}) as any,
            removeEventListener: (() => {}) as any,
            clientHeight: glHeight,
            getContext: (() => {return gl}) as any,
          } as HTMLCanvasElement);

          let window = {
            innerWidth: glWidth,
            innerHeight: glHeight,
            devicePixelRatio: 1,
            addEventListener: (() => {}) as any
          }

          const requestAnimationFrame = vsync(context).requestAnimationFrame

          //#region code to impl

          let camera, scene, renderer;

          let mouseX = 0, mouseY = 0;

          let windowHalfX = window.innerWidth / 2;
          let windowHalfY = window.innerHeight / 2;

          init();
          animate();

          function init() {

            // container = document.createElement( 'div' );
            // document.body.appendChild( container );

            // CAMERA

            camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
            camera.position.z = 250;

            // scene

            scene = new THREE.Scene();

            const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
            scene.add( ambientLight );

            //@ts-ignore
            const pointLight = new THREE.PointLight( 0xffffff, 0.8 );
            camera.add( pointLight );
            scene.add( camera );



            // model

            const onProgress = function ( xhr ) {

              if ( xhr.lengthComputable ) {

                const percentComplete = xhr.loaded / xhr.total * 100;
                //@ts-ignore
                console.log( Math.round( percentComplete, 2 ) + '% downloaded' );

              }

            };

            const onError = function () {
            
            };

            const manager = new THREE.LoadingManager();
            //@ts-ignore
            manager.addHandler( /\.dds$/i, new DDSLoader() );


            const mtlLoader =   new MTLLoader( manager );

               mtlLoader
                .setPath('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/obj/male02/')
                //@ts-ignore
                .load('male02_dds.mtl', function ( materials ) {
                  materials.preload();

                  setTimeout(function(){
                    new OBJLoader( manager )
                    .setMaterials( materials )
                    .setPath( 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/obj/male02/' )
                    .load( 'male02.obj', function ( object ) {
      
                      object.position.y = - 95;
                      scene.add( object );
      
                    }, onProgress, onError );
                  },10000)                
                });

            // RENDERER
            renderer = new THREE.WebGLRenderer({ canvas: inputCanvas } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            self.gestureView!!.onTouchMove = ({ x, y }) => {
              onDocumentMouseMove({
                clientX: x * Environment.screenScale,
                clientY: y * Environment.screenScale,
              });
            };


            window.addEventListener( 'resize', onWindowResize );

          }

          function onWindowResize() {

            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

          }

          function onDocumentMouseMove( event ) {

            mouseX = ( event.clientX - windowHalfX ) / 2;
            mouseY = ( event.clientY - windowHalfY ) / 2;

          }




          //

          function animate() {

            requestAnimationFrame( animate );

            render()

            gl.endFrame();

          }

          function render() {

            camera.position.x += ( mouseX - camera.position.x ) * .05;
            camera.position.y += ( - mouseY - camera.position.y ) * .05;

            camera.lookAt( scene.position );

            renderer.render( scene, camera );

          }

          //#endregion

          gl.endFrame();
        },
      }).apply({
        layoutConfig: layoutConfig().just(),
        width: 300,
        height: 300,
      }),
    )
  }
}
