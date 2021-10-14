import {
  Panel,
  Group,
  vlayout,
  layoutConfig,
  Gravity,
  navbar,
  stack,
  gestureContainer,
  GestureContainer,
  Color,
} from "doric";
import { dangleView, getGl, vsync } from "dangle";

import * as THREE from "three";

@Entry
class webgl_points_waves extends Panel {

  private gestureView?: GestureContainer

  onShow() {
    navbar(context).setTitle("webgl_points_waves");
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

          const SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50;

          let container, stats;
          let camera, scene, renderer;
    
          let particles, count = 0;
    
          let mouseX = 0, mouseY = 0;
    
          let windowHalfX = window.innerWidth / 2;
          let windowHalfY = window.innerHeight / 2;
    
          init();
          animate();
    
          function init() {
    
            // container = document.createElement( 'div' );
            // document.body.appendChild( container );
    
            camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
            camera.position.z = 1000;
    
            scene = new THREE.Scene();
    
            //
    
            const numParticles = AMOUNTX * AMOUNTY;
    
            const positions = new Float32Array( numParticles * 3 );
            const scales = new Float32Array( numParticles );
    
            let i = 0, j = 0;
    
            for ( let ix = 0; ix < AMOUNTX; ix ++ ) {
    
              for ( let iy = 0; iy < AMOUNTY; iy ++ ) {
    
                positions[ i ] = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 ); // x
                positions[ i + 1 ] = 0; // y
                positions[ i + 2 ] = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 ); // z
    
                scales[ j ] = 1;
    
                i += 3;
                j ++;
    
              }
    
            }
    
            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
            geometry.setAttribute( 'scale', new THREE.BufferAttribute( scales, 1 ) );
    
            const material = new THREE.ShaderMaterial( {
    
              uniforms: {
                color: { value: new THREE.Color( 0xffffff ) },
              },
              vertexShader: `
                attribute float scale;

                void main() {

                  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

                  gl_PointSize = scale * ( 300.0 / - mvPosition.z );

                  gl_Position = projectionMatrix * mvPosition;

                }
              `,
              fragmentShader: `
                uniform vec3 color;

                void main() {

                  if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;

                  gl_FragColor = vec4( color, 1.0 );

                }
              `
    
            } );
    
            //
    
            particles = new THREE.Points( geometry, material );
            scene.add( particles );
    
            //
    
            renderer = new THREE.WebGLRenderer( { antialias: true, canvas: inputCanvas } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            // container.appendChild( renderer.domElement );
    
            // stats = new Stats();
            // container.appendChild( stats.dom );
    
            // container.style.touchAction = 'none';
            // container.addEventListener( 'pointermove', onPointerMove );
            self.gestureView!!.onTouchMove = ({ x, y }) => {
              onPointerMove({
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
    
          //
    
          function onPointerMove( event ) {
    
            if ( event.isPrimary === false ) return;
    
            mouseX = event.clientX - windowHalfX;
            mouseY = event.clientY - windowHalfY;
    
          }
    
          //
    
          function animate() {
    
            vsync(context).requestAnimationFrame( animate );
    
            render();
            // stats.update();
    
            gl.flush();
            gl.endFrameEXP();
          }
    
          function render() {
    
            camera.position.x += ( mouseX - camera.position.x ) * .05;
            camera.position.y += ( - mouseY - camera.position.y ) * .05;
            camera.lookAt( scene.position );
    
            const positions = particles.geometry.attributes.position.array;
            const scales = particles.geometry.attributes.scale.array;
    
            let i = 0, j = 0;
    
            for ( let ix = 0; ix < AMOUNTX; ix ++ ) {
    
              for ( let iy = 0; iy < AMOUNTY; iy ++ ) {
    
                positions[ i + 1 ] = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) +
                        ( Math.sin( ( iy + count ) * 0.5 ) * 50 );
    
                scales[ j ] = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 20 +
                        ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 20;
    
                i += 3;
                j ++;
    
              }
    
            }
    
            particles.geometry.attributes.position.needsUpdate = true;
            particles.geometry.attributes.scale.needsUpdate = true;
    
            renderer.render( scene, camera );
    
            count += 0.1;
    
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
