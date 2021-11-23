import {
  Panel,
  Group,
  vlayout,
  layoutConfig,
  Gravity,
  navbar,
  stack,
  GestureContainer,
  gestureContainer,
  Color,
  resourceLoader,
  RemoteResource,
  loge,
} from "doric";
import { dangleView, getGl, vsync } from "dangle";

import * as THREE from "three";
import { OBJLoader } from "./jsm/loaders/OBJLoader";

@Entry
class webgl_loader_obj extends Panel {

  private gestureView?: GestureContainer

  onShow() {
    navbar(context).setTitle("webgl_loader_obj");
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
    self.gestureView?.addChild(
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

          //#region code to impl
          let container;

          let camera, scene, renderer;

          let mouseX = 0, mouseY = 0;

          let windowHalfX = window.innerWidth / 2;
          let windowHalfY = window.innerHeight / 2;

          let object;

          init();
          animate();


          function init() {

            camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
            camera.position.z = 250;

            // scene

            scene = new THREE.Scene();

            const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
            scene.add( ambientLight );

            const pointLight = new THREE.PointLight( 0xffffff, 0.8 );
            camera.add( pointLight );
            scene.add( camera );

            // manager

            function loadModel() {

              object.traverse( function ( child ) {

                // if ( child.isMesh ) child.material.map = texture;

              } );

              object.position.y = - 95;
              scene.add( object );

            }

            const manager = new THREE.LoadingManager( loadModel );

            manager.onProgress = function ( item, loaded, total ) {

              console.log( item, loaded, total );

            };

            // texture

            // const textureLoader = new THREE.TextureLoader( manager );
            // const texture = textureLoader.load( 'textures/uv_grid_opengl.jpg' );

            // model

            function onProgress( xhr ) {

              if ( xhr.lengthComputable ) {

                const percentComplete = xhr.loaded / xhr.total * 100;
                // console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );

              }

            }

            function onError() {}

            const loader = new OBJLoader( manager );

            const resource = new RemoteResource('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/obj/male02/male02.obj')
            resourceLoader(context).load(resource)
            .then((arrayBuffer) => {
              loge('then')
              const array = new Uint8Array(arrayBuffer)
              let text = ""
              for (let index = 0; index < array.length; index++) {
                text += String.fromCharCode(array[index]);
              }
              loge('decode')
              object = loader.parse(text);

              loadModel()
            })
            .catch(() => {
              loge('catch')
              onError()
            })

            //

            renderer = new THREE.WebGLRenderer({canvas: inputCanvas});
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );

            // document.addEventListener( 'mousemove', onDocumentMouseMove );
            self.gestureView!!.onTouchMove = ({ x, y }) => {
              onDocumentMouseMove({
                clientX: x * Environment.screenScale,
                clientY: y * Environment.screenScale,
              });
            };
            //

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

            vsync(context).requestAnimationFrame( animate );
            render();

          }

          function render() {

            camera.position.x += ( mouseX - camera.position.x ) * .05;
            camera.position.y += ( - mouseY - camera.position.y ) * .05;

            camera.lookAt( scene.position );

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