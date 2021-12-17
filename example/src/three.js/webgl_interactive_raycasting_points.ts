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
import { dangleView, DangleWebGLRenderingContext, vsync } from "dangle";

import * as THREE from "three"

@Entry
class webgl_interactive_raycasting_points extends Panel {

  private gestureView?: GestureContainer

  onShow() {
    navbar(context).setTitle("webgl_interactive_raycasting_points");
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
        onReady: (gl: DangleWebGLRenderingContext) => {
          const viewWidth = gl.drawingBufferWidth
          const viewHeight = gl.drawingBufferHeight

          const inputCanvas = 
          ({
            width: viewWidth,
            height: viewHeight,
            style: {},
            addEventListener: (() => {}) as any,
            removeEventListener: (() => {}) as any,
            clientHeight: viewHeight,
            getContext: (() => {return gl}) as any,
          } as HTMLCanvasElement);

          let window = {
            innerWidth: viewWidth,
            innerHeight: viewHeight,
            devicePixelRatio: 1,
            addEventListener: (() => {}) as any
          }
          //#region code to impl
        
          let renderer, scene, camera, stats;
          let pointclouds;
          let raycaster;
          let intersection = null;
          let spheresIndex = 0;
          let clock;
          let toggle = 0;

          const pointer = new THREE.Vector2();
          const spheres: any[] = [];

          const threshold = 0.1;
          const pointSize = 0.05;
          const width = 80;
          const length = 160;
          const rotateY = new THREE.Matrix4().makeRotationY( 0.005 );

          init();
          animate();

          function generatePointCloudGeometry( color, width, length ) {

            const geometry = new THREE.BufferGeometry();
            const numPoints = width * length;

            const positions = new Float32Array( numPoints * 3 );
            const colors = new Float32Array( numPoints * 3 );

            let k = 0;

            for ( let i = 0; i < width; i ++ ) {

              for ( let j = 0; j < length; j ++ ) {

                const u = i / width;
                const v = j / length;
                const x = u - 0.5;
                const y = ( Math.cos( u * Math.PI * 4 ) + Math.sin( v * Math.PI * 8 ) ) / 20;
                const z = v - 0.5;

                positions[ 3 * k ] = x;
                positions[ 3 * k + 1 ] = y;
                positions[ 3 * k + 2 ] = z;

                const intensity = ( y + 0.1 ) * 5;
                colors[ 3 * k ] = color.r * intensity;
                colors[ 3 * k + 1 ] = color.g * intensity;
                colors[ 3 * k + 2 ] = color.b * intensity;

                k ++;

              }

            }

            geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
            geometry.setAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );
            geometry.computeBoundingBox();

            return geometry;

          }

          function generatePointcloud( color, width, length ) {

            const geometry = generatePointCloudGeometry( color, width, length );
            const material = new THREE.PointsMaterial( { size: pointSize, vertexColors: true } );

            return new THREE.Points( geometry, material );

          }

          function generateIndexedPointcloud( color, width, length ) {

            const geometry = generatePointCloudGeometry( color, width, length );
            const numPoints = width * length;
            const indices = new Uint16Array( numPoints );

            let k = 0;

            for ( let i = 0; i < width; i ++ ) {

              for ( let j = 0; j < length; j ++ ) {

                indices[ k ] = k;
                k ++;

              }

            }

            geometry.setIndex( new THREE.BufferAttribute( indices, 1 ) );

            const material = new THREE.PointsMaterial( { size: pointSize, vertexColors: true } );

            return new THREE.Points( geometry, material );

          }

          function generateIndexedWithOffsetPointcloud( color, width, length ) {

            const geometry = generatePointCloudGeometry( color, width, length );
            const numPoints = width * length;
            const indices = new Uint16Array( numPoints );

            let k = 0;

            for ( let i = 0; i < width; i ++ ) {

              for ( let j = 0; j < length; j ++ ) {

                indices[ k ] = k;
                k ++;

              }

            }

            geometry.setIndex( new THREE.BufferAttribute( indices, 1 ) );
            geometry.addGroup( 0, indices.length );

            const material = new THREE.PointsMaterial( { size: pointSize, vertexColors: true } );

            return new THREE.Points( geometry, material );

          }

          function init() {

            // const container = document.getElementById( 'container' );

            scene = new THREE.Scene();

            clock = new THREE.Clock();

            camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
            camera.position.set( 10, 10, 10 );
            camera.lookAt( scene.position );
            camera.updateMatrix();

            //

            const pcBuffer = generatePointcloud( new THREE.Color( 1, 0, 0 ), width, length );
            pcBuffer.scale.set( 5, 10, 10 );
            pcBuffer.position.set( - 5, 0, 0 );
            scene.add( pcBuffer );

            const pcIndexed = generateIndexedPointcloud( new THREE.Color( 0, 1, 0 ), width, length );
            pcIndexed.scale.set( 5, 10, 10 );
            pcIndexed.position.set( 0, 0, 0 );
            scene.add( pcIndexed );

            const pcIndexedOffset = generateIndexedWithOffsetPointcloud( new THREE.Color( 0, 1, 1 ), width, length );
            pcIndexedOffset.scale.set( 5, 10, 10 );
            pcIndexedOffset.position.set( 5, 0, 0 );
            scene.add( pcIndexedOffset );

            pointclouds = [ pcBuffer, pcIndexed, pcIndexedOffset ];

            //

            const sphereGeometry = new THREE.SphereGeometry( 0.1, 32, 32 );
            const sphereMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } );

            for ( let i = 0; i < 40; i ++ ) {

              const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
              scene.add( sphere );
              spheres.push( sphere );

            }

            //

            renderer = new THREE.WebGLRenderer( { antialias: true, canvas: inputCanvas } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            // container.appendChild( renderer.domElement );

            //

            raycaster = new THREE.Raycaster();
            raycaster.params.Points.threshold = threshold;

            //

            // stats = new Stats();
            // container.appendChild( stats.dom );

            //

            window.addEventListener( 'resize', onWindowResize );
            // document.addEventListener( 'pointermove', onPointerMove );
            self.gestureView!!.onTouchMove = ({ x, y }) => {
              onPointerMove({
                clientX: x * Environment.screenScale,
                clientY: y * Environment.screenScale,
              });
            };
          }

          function onPointerMove( event ) {

            pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

          }

          function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

          }

          function animate() {

            vsync(context).requestAnimationFrame( animate );

            render();
            // stats.update();

            gl.endFrame();
          }

          function render() {

            camera.applyMatrix4( rotateY );
            camera.updateMatrixWorld();

            raycaster.setFromCamera( pointer, camera );

            const intersections = raycaster.intersectObjects( pointclouds, false );
            intersection = ( intersections.length ) > 0 ? intersections[ 0 ] : null;

            if ( toggle > 0.02 && intersection !== null ) {

              spheres[ spheresIndex ].position.copy( (<any>intersection).point );
              spheres[ spheresIndex ].scale.set( 1, 1, 1 );
              spheresIndex = ( spheresIndex + 1 ) % spheres.length;

              toggle = 0;

            }

            for ( let i = 0; i < spheres.length; i ++ ) {

              const sphere = spheres[ i ];
              sphere.scale.multiplyScalar( 0.98 );
              sphere.scale.clampScalar( 0.01, 1 );

            }

            toggle += clock.getDelta();

            renderer.render( scene, camera );

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
