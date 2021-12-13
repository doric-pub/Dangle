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
class webgl_clipping extends Panel {

  private gestureView?: GestureContainer

  onShow() {
    navbar(context).setTitle("webgl_clipping");
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

          let camera, scene, renderer, startTime, object, stats;

          init();
          animate();

          function init() {

            camera = new THREE.PerspectiveCamera( 36, window.innerWidth / window.innerHeight, 0.25, 16 );

            camera.position.set( 0, 1.3, 3 );

            scene = new THREE.Scene();

            // Lights

            scene.add( new THREE.AmbientLight( 0x505050 ) );

            const spotLight = new THREE.SpotLight( 0xffffff );
            spotLight.angle = Math.PI / 5;
            spotLight.penumbra = 0.2;
            spotLight.position.set( 2, 3, 3 );
            spotLight.castShadow = true;
            spotLight.shadow.camera.near = 3;
            spotLight.shadow.camera.far = 10;
            spotLight.shadow.mapSize.width = 1024;
            spotLight.shadow.mapSize.height = 1024;
            scene.add( spotLight );

            const dirLight = new THREE.DirectionalLight( 0x55505a, 1 );
            dirLight.position.set( 0, 3, 0 );
            dirLight.castShadow = true;
            dirLight.shadow.camera.near = 1;
            dirLight.shadow.camera.far = 10;

            dirLight.shadow.camera.right = 1;
            dirLight.shadow.camera.left = - 1;
            dirLight.shadow.camera.top	= 1;
            dirLight.shadow.camera.bottom = - 1;

            dirLight.shadow.mapSize.width = 1024;
            dirLight.shadow.mapSize.height = 1024;
            scene.add( dirLight );

            // ***** Clipping planes: *****

            const localPlane = new THREE.Plane( new THREE.Vector3( 0, - 1, 0 ), 0.8 );
            const globalPlane = new THREE.Plane( new THREE.Vector3( - 1, 0, 0 ), 0.1 );

            // Geometry

            const material = new THREE.MeshPhongMaterial( {
              color: 0x80ee10,
              shininess: 100,
              side: THREE.DoubleSide,

              // ***** Clipping setup (material): *****
              clippingPlanes: [ localPlane ],
              clipShadows: true

            } );

            const geometry = new THREE.TorusKnotGeometry( 0.4, 0.08, 95, 20 );

            object = new THREE.Mesh( geometry, material );
            object.castShadow = true;
            scene.add( object );

            const ground = new THREE.Mesh(
              new THREE.PlaneGeometry( 9, 9, 1, 1 ),
              new THREE.MeshPhongMaterial( { color: 0xa0adaf, shininess: 150 } )
            );

            ground.rotation.x = - Math.PI / 2; // rotates X/Y to X/Z
            ground.receiveShadow = true;
            scene.add( ground );

            // Stats

            // stats = new Stats();
            // document.body.appendChild( stats.dom );

            // Renderer

            renderer = new THREE.WebGLRenderer({canvas: inputCanvas});
            renderer.shadowMap.enabled = true;
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            window.addEventListener( 'resize', onWindowResize );
            // document.body.appendChild( renderer.domElement );

            // ***** Clipping setup (renderer): *****
            const globalPlanes = [ globalPlane ],
              Empty = Object.freeze( [] );
            renderer.clippingPlanes = Empty; // GUI sets it to globalPlanes
            renderer.localClippingEnabled = true;

            // Controls

            const controls = new OrbitControls( camera, renderer.domElement );
            (<any>controls).target.set( 0, 1, 0 );
            (<any>controls).update();

            // GUI

            // const gui = new GUI(),
            //   folderLocal = gui.addFolder( 'Local Clipping' ),
            //   propsLocal = {

            //     get 'Enabled'() {

            //       return renderer.localClippingEnabled;

            //     },
            //     set 'Enabled'( v ) {

            //       renderer.localClippingEnabled = v;

            //     },

            //     get 'Shadows'() {

            //       return material.clipShadows;

            //     },
            //     set 'Shadows'( v ) {

            //       material.clipShadows = v;

            //     },

            //     get 'Plane'() {

            //       return localPlane.constant;

            //     },
            //     set 'Plane'( v ) {

            //       localPlane.constant = v;

            //     }

            //   },

            //   folderGlobal = gui.addFolder( 'Global Clipping' ),
            //   propsGlobal = {

            //     get 'Enabled'() {

            //       return renderer.clippingPlanes !== Empty;

            //     },
            //     set 'Enabled'( v ) {

            //       renderer.clippingPlanes = v ? globalPlanes : Empty;

            //     },

            //     get 'Plane'() {

            //       return globalPlane.constant;

            //     },
            //     set 'Plane'( v ) {

            //       globalPlane.constant = v;

            //     }

            //   };

            // folderLocal.add( propsLocal, 'Enabled' );
            // folderLocal.add( propsLocal, 'Shadows' );
            // folderLocal.add( propsLocal, 'Plane', 0.3, 1.25 );

            // folderGlobal.add( propsGlobal, 'Enabled' );
            // folderGlobal.add( propsGlobal, 'Plane', - 0.4, 3 );

            // Start

            startTime = Date.now();

          }

          function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

          }

          function animate() {

            const currentTime = Date.now();
            const time = ( currentTime - startTime ) / 1000;

            vsync(context).requestAnimationFrame( animate );

            object.position.y = 0.8;
            object.rotation.x = time * 0.5;
            object.rotation.y = time * 0.2;
            object.scale.setScalar( Math.cos( time ) * 0.125 + 0.875 );

            // stats.begin();
            renderer.render( scene, camera );
            // stats.end();

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
  