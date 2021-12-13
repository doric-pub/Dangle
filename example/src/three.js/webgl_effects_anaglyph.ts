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
  RemoteResource,
  imageDecoder,
} from "doric";
import { dangleView, vsync } from "dangle";

import * as THREE from "three"
import { AnaglyphEffect } from "./jsm/effects/AnaglyphEffect"

@Entry
class webgl_effects_anaglyph extends Panel {

  private gestureView?: GestureContainer

  onShow() {
    navbar(context).setTitle("webgl_effects_anaglyph");
  }
  build(rootView: Group) {
    vlayout([
      this.gestureView = gestureContainer(
        [],
        {
          layoutConfig: layoutConfig().just(),
          width: 300,
          height: 300,
          backgroundColor: Color.BLACK
        }
      ),
    ])
      .apply({
        layoutConfig: layoutConfig().fit().configAlignment(Gravity.Center),
        space: 20,
        gravity: Gravity.Center,
      })
      .in(rootView);

    let self = this
    this.gestureView?.addChild(
      dangleView({
        onReady: async (gl: WebGL2RenderingContext) => {
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
          let requestAnimationFrame = vsync(context).requestAnimationFrame


          //#region code to impl
          let container, camera, scene, renderer, effect;

          const spheres: any[] = [];

          let mouseX = 0;
          let mouseY = 0;

          let windowHalfX = window.innerWidth / 2;
          let windowHalfY = window.innerHeight / 2;

          // document.addEventListener( 'mousemove', onDocumentMouseMove );
          self.gestureView!!.onTouchMove = ({ x, y }) => {
            onDocumentMouseMove({
              clientX: x * Environment.screenScale,
              clientY: y * Environment.screenScale,
            });
          };

          await init();
          animate();

          async function init() {

            // container = document.createElement( 'div' );
            // document.body.appendChild( container );

            camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.01, 100 );
            camera.position.z = 3;
            camera.focalLength = 3;

            const path = "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/cube/pisa/";
            const format = '.png';
            const urls = [
              path + 'px' + format, path + 'nx' + format,
              path + 'py' + format, path + 'ny' + format,
              path + 'pz' + format, path + 'nz' + format
            ];

            var textures: any[] = [];
            for (let index = 0; index < urls.length; index++) {
              const url = urls[index];
              const remoteResource = new RemoteResource(url)
              const imageInfo = await imageDecoder(context).getImageInfo(remoteResource)
              const imagePixels = await imageDecoder(context).decodeToPixels(remoteResource)

              const texture = new THREE.DataTexture(imagePixels, imageInfo.width, imageInfo.height, THREE.RGBAFormat);
              textures.push(texture)
            }
            
            var textureCube = new THREE.CubeTexture( textures );
		        textureCube.needsUpdate = true;

            scene = new THREE.Scene();
            scene.background = textureCube;

            const geometry = new THREE.SphereGeometry( 0.1, 32, 16 );
            const material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } );

            for ( let i = 0; i < 500; i ++ ) {

              const mesh = new THREE.Mesh( geometry, material );

              mesh.position.x = Math.random() * 10 - 5;
              mesh.position.y = Math.random() * 10 - 5;
              mesh.position.z = Math.random() * 10 - 5;

              mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;

              scene.add( mesh );

              spheres.push( mesh );

            }

            //

            renderer = new THREE.WebGLRenderer({canvas: inputCanvas});
            renderer.setPixelRatio( window.devicePixelRatio );
            // container.appendChild( renderer.domElement );

            const width = window.innerWidth || 2;
            const height = window.innerHeight || 2;

            effect = new AnaglyphEffect( renderer );
            effect.setSize( width, height );

            //

            window.addEventListener( 'resize', onWindowResize );

          }

          function onWindowResize() {

            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            effect.setSize( window.innerWidth, window.innerHeight );

          }

          function onDocumentMouseMove( event ) {

            mouseX = ( event.clientX - windowHalfX ) / 100;
            mouseY = ( event.clientY - windowHalfY ) / 100;

          }

          //

          function animate() {

            requestAnimationFrame( animate );

            render();

          }

          function render() {

            const timer = 0.0001 * Date.now();

            camera.position.x += ( mouseX - camera.position.x ) * .05;
            camera.position.y += ( - mouseY - camera.position.y ) * .05;

            camera.lookAt( scene.position );

            for ( let i = 0, il = spheres.length; i < il; i ++ ) {

              const sphere = spheres[ i ];

              sphere.position.x = 5 * Math.cos( timer + i );
              sphere.position.y = 5 * Math.sin( timer + i * 1.1 );

            }

            effect.render( scene, camera );

            gl.flush();
            (<any>gl).endFrameEXP();

          }

          //#endregion
        },
      }).apply({
        layoutConfig: layoutConfig().just(),
        width: 300,
        height: 300,
      })
    )
  }
}
  