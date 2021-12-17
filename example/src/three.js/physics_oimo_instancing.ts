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
import { dangleView, DangleWebGLRenderingContext, vsync } from "dangle";

import * as THREE from "three";
import { OrbitControls } from "./jsm/controls/OrbitControls";
import { OimoPhysics } from "./jsm/physics/OimoPhysics";

@Entry
class physics_oimo_instancing extends Panel {

  private gestureView?: GestureContainer

  onShow() {
    navbar(context).setTitle("physics_oimo_instancing");
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

          let camera, scene, renderer, stats;
          let physics, position;

          let boxes, spheres;

          init();

          async function init() {

            physics = await OimoPhysics();
            position = new THREE.Vector3();

            //

            camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 100 );
            camera.position.set( - 1, 1.5, 2 );
            camera.lookAt( 0, 0.5, 0 );

            scene = new THREE.Scene();
            scene.background = new THREE.Color( 0x666666 );

            const hemiLight = new THREE.HemisphereLight();
            hemiLight.intensity = 0.35;
            scene.add( hemiLight );

            const dirLight = new THREE.DirectionalLight();
            dirLight.position.set( 5, 5, 5 );
            dirLight.castShadow = true;
            dirLight.shadow.camera.zoom = 2;
            scene.add( dirLight );

            const floor = new THREE.Mesh(
              new THREE.BoxGeometry( 10, 5, 10 ),
              new THREE.ShadowMaterial( { color: 0x111111 } )
            );
            floor.position.y = - 2.5;
            floor.receiveShadow = true;
            scene.add( floor );
            physics.addMesh( floor );

            //

            const material = new THREE.MeshLambertMaterial();

            const matrix = new THREE.Matrix4();
            const color = new THREE.Color();

            // Boxes

            const geometryBox = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
            boxes = new THREE.InstancedMesh( geometryBox, material, 100 );
            boxes.instanceMatrix.setUsage( THREE.DynamicDrawUsage ); // will be updated every frame
            boxes.castShadow = true;
            boxes.receiveShadow = true;
            scene.add( boxes );

            for ( let i = 0; i < boxes.count; i ++ ) {

              matrix.setPosition( Math.random() - 0.5, Math.random() * 2, Math.random() - 0.5 );
              boxes.setMatrixAt( i, matrix );
              boxes.setColorAt( i, color.setHex( 0xffffff * Math.random() ) );

            }

            physics.addMesh( boxes, 1 );

            // Spheres

            const geometrySphere = new THREE.IcosahedronGeometry( 0.075, 3 );
            spheres = new THREE.InstancedMesh( geometrySphere, material, 100 );
            spheres.instanceMatrix.setUsage( THREE.DynamicDrawUsage ); // will be updated every frame
            spheres.castShadow = true;
            spheres.receiveShadow = true;
            scene.add( spheres );

            for ( let i = 0; i < spheres.count; i ++ ) {

              matrix.setPosition( Math.random() - 0.5, Math.random() * 2, Math.random() - 0.5 );
              spheres.setMatrixAt( i, matrix );
              spheres.setColorAt( i, color.setHex( 0xffffff * Math.random() ) );

            }

            physics.addMesh( spheres, 1 );

            //

            renderer = new THREE.WebGLRenderer( { antialias: true, canvas: inputCanvas } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            renderer.shadowMap.enabled = true;
            renderer.outputEncoding = THREE.sRGBEncoding;
            // document.body.appendChild( renderer.domElement );

            // stats = new Stats();
            // document.body.appendChild( stats.dom );

            //

            const controls = new OrbitControls( camera, renderer.domElement ) as any;
            controls.target.y = 0.5;
            controls.update();

            animate();

          }

          function animate() {

            requestAnimationFrame( animate );

            //

            let index = Math.floor( Math.random() * boxes.count );

            position.set( 0, Math.random() + 1, 0 );
            physics.setMeshPosition( boxes, position, index );

            //

            index = Math.floor( Math.random() * spheres.count );

            position.set( 0, Math.random() + 1, 0 );
            physics.setMeshPosition( spheres, position, index );

            renderer.render( scene, camera );

            // stats.update();

            gl.endFrame();
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