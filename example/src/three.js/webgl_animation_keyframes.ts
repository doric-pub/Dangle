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
  loge,
} from "doric";
import { dangleView, vsync } from "dangle";

import * as THREE from "three";
import { OrbitControls } from "./jsm/controls/OrbitControls";
import { GLTFLoader } from "./jsm/loaders/GLTFLoader";

@Entry
class webgl_animation_keyframes extends Panel {

  private gestureView?: GestureContainer

  onShow() {
    navbar(context).setTitle("webgl_animation_keyframes");
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
          let requestAnimationFrame = vsync(context).requestAnimationFrame

          //#region code to impl

          let mixer;

          const clock = new THREE.Clock();
          // const container = document.getElementById( 'container' );

          // const stats = new Stats();
          // container.appendChild( stats.dom );

          const renderer = new THREE.WebGLRenderer( { antialias: true, canvas: inputCanvas } );
          renderer.setPixelRatio( window.devicePixelRatio );
          renderer.setSize( window.innerWidth, window.innerHeight );
          renderer.outputEncoding = THREE.sRGBEncoding;
          // container.appendChild( renderer.domElement );

          const pmremGenerator = new THREE.PMREMGenerator( renderer );

          const scene = new THREE.Scene();
          scene.background = new THREE.Color( 0xbfe3dd );
          // scene.environment = pmremGenerator.fromScene( new RoomEnvironment(), 0.04 ).texture;

          const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 100 );
          camera.position.set( 5, 2, 8 );

          {
            const skyColor = 0xFFFFFF;
            const groundColor = 0xFFFFFF;  // brownish orange
            const intensity = 1;
            const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
            scene.add(light);
          }
        
          {
            const color = 0xFFFFFF;
            const intensity = 1.5;
            const light = new THREE.DirectionalLight(color, intensity);
            light.position.set(5, 10, 2);
            scene.add(light);
          }

          const controls = new OrbitControls( camera, renderer.domElement ) as any;
          controls.target.set( 0, 0.5, 0 );
          controls.update();
          controls.enablePan = false;
          controls.enableDamping = true;

          //@ts-ignore
          const loader = new GLTFLoader();
          try {
            loader.load( 'https://raw.githubusercontent.com/greggman/doodles/master/models/littlest_tokyo/scene.gltf', function ( gltf ) {

              const model = gltf.scene;
              model.position.set( 1, 1, 0 );
              model.scale.set( 0.01, 0.01, 0.01 );
              scene.add( model );
      
              mixer = new THREE.AnimationMixer( model );
              mixer.clipAction( gltf.animations[ 0 ] ).play();
      
              animate();
      
            }, undefined, function ( e ) {
      
              console.error( e );
      
            } );
          } catch (error: any) {
            loge(error.stack)
          }
          


          // window.onresize = function () {

          //   camera.aspect = window.innerWidth / window.innerHeight;
          //   camera.updateProjectionMatrix();

          //   renderer.setSize( window.innerWidth, window.innerHeight );

          // };


          function animate() {

            requestAnimationFrame( animate );

            const delta = clock.getDelta();

            mixer.update( delta );

            controls.update();

            // stats.update();

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
  