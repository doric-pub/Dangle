import {
  Panel,
  Group,
  vlayout,
  layoutConfig,
  Gravity,
  navbar,
  stack,
  Color,
} from "doric";
import { dangleView, DangleWebGLRenderingContext, vsync } from "dangle";

import * as THREE from "three"
import { PeppersGhostEffect } from "./jsm/effects/PeppersGhostEffect"

@Entry
class webgl_effects_peppersghost extends Panel {
  onShow() {
    navbar(context).setTitle("webgl_effects_peppersghost");
  }
  build(rootView: Group) {
    vlayout([
      stack(
        [
          dangleView({
            onReady: (gl: DangleWebGLRenderingContext) => {
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

              let container;

              let camera, scene, renderer, effect;
              let group;

              init();
              animate();

              function init() {

                // container = document.createElement( 'div' );
                // document.body.appendChild( container );

                camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 100000 );

                scene = new THREE.Scene();

                group = new THREE.Group();
                scene.add( group );

                // Cube

                const geometry = new THREE.BoxGeometry().toNonIndexed(); // ensure unique vertices for each triangle

                const position = geometry.attributes.position;
                const colors: any[] = [];
                const color = new THREE.Color();

                // generate for each side of the cube a different color

                for ( let i = 0; i < position.count; i += 6 ) {

                  color.setHex( Math.random() * 0xffffff );

                  // first face

                  colors.push( color.r, color.g, color.b );
                  colors.push( color.r, color.g, color.b );
                  colors.push( color.r, color.g, color.b );

                  // second face

                  colors.push( color.r, color.g, color.b );
                  colors.push( color.r, color.g, color.b );
                  colors.push( color.r, color.g, color.b );

                }

                geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

                const material = new THREE.MeshBasicMaterial( { vertexColors: true } );

                for ( let i = 0; i < 10; i ++ ) {

                  const cube = new THREE.Mesh( geometry, material );
                  cube.position.x = Math.random() * 2 - 1;
                  cube.position.y = Math.random() * 2 - 1;
                  cube.position.z = Math.random() * 2 - 1;
                  cube.scale.multiplyScalar( Math.random() + 0.5 );
                  group.add( cube );

                }

                renderer = new THREE.WebGLRenderer({canvas: inputCanvas});
                renderer.setPixelRatio( window.devicePixelRatio );
                // container.appendChild( renderer.domElement );

                effect = new PeppersGhostEffect( renderer );
                effect.setSize( window.innerWidth, window.innerHeight );
                effect.cameraDistance = 5;

                window.addEventListener( 'resize', onWindowResize );

              }

              function onWindowResize() {

                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();

                effect.setSize( window.innerWidth, window.innerHeight );

              }

              function animate() {

                vsync(context).requestAnimationFrame( animate );

                group.rotation.y += 0.01;

                effect.render( scene, camera );

                gl.endFrame();

              }

              //#endregion
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
          backgroundColor: Color.BLACK,
        }
      ),
    ])
      .apply({
        layoutConfig: layoutConfig().fit().configAlignment(Gravity.Center),
        space: 20,
        gravity: Gravity.Center,
      })
      .in(rootView);
  }
}
  