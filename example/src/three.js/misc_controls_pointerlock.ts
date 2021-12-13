import {
  Panel,
  Group,
  vlayout,
  layoutConfig,
  Gravity,
  navbar,
  gestureContainer,
  GestureContainer,
  text,
  VLayout,
  Color,
  hlayout,
} from "doric";
import { dangleView, vsync } from "dangle";

import * as THREE from "three";
import { PointerLockControls } from "./jsm/controls/PointerLockControls";

@Entry
class misc_controls_pointerlock extends Panel {

  private gestureView?: GestureContainer;
  private instructions?: VLayout;

  private w?: GestureContainer;
  private a?: GestureContainer;
  private s?: GestureContainer;
  private d?: GestureContainer;
  private space?: GestureContainer;

  private lastX: number = 0
  private lastY: number = 0

  onShow() {
    navbar(context).setTitle("misc_controls_pointerlock");
  }
  build(rootView: Group) {
    vlayout([
      this.gestureView = gestureContainer([], {
        layoutConfig: layoutConfig().just(),
        width: 300,
        height: 300,
      }),
      this.w = gestureContainer([
        text({
          width: 50,
          height: 50,
          text: "W",
          textSize: 30,
          textAlignment: new Gravity().center(),
          backgroundColor: Color.parse('#ffff00'),
          layoutConfig: layoutConfig().just(),
        })
      ]),
      hlayout([
        this.a = gestureContainer([
          text({
            width: 50,
            height: 50,
            text: "A",
            textSize: 30,
            textAlignment: new Gravity().center(),
            backgroundColor: Color.parse('#ffff00'),
            layoutConfig: layoutConfig().just(),
          })
        ]),
        this.space = gestureContainer([
          text({
            width: 50,
            height: 50,
            text: "○",
            textSize: 30,
            textAlignment: new Gravity().center(),
            backgroundColor: Color.parse('#ffff00'),
            layoutConfig: layoutConfig().just(),
          }),
        ]),
        this.d = gestureContainer([
          text({
            width: 50,
            height: 50,
            text: "D",
            textSize: 30,
            textAlignment: new Gravity().center(),
            backgroundColor: Color.parse('#ffff00'),
            layoutConfig: layoutConfig().just(),
          }),
        ]),
      ]).also(it => {
          it.space = 10
      }),
      this.s = gestureContainer([
        text({
          width: 50,
          height: 50,
          text: "S",
          textSize: 30,
          textAlignment: new Gravity().center(),
          backgroundColor: Color.parse('#ffff00'),
          layoutConfig: layoutConfig().just(),
        })
      ]),
    ])
      .apply({
        layoutConfig: layoutConfig().fit().configAlignment(Gravity.Center),
        space: 10,
        gravity: Gravity.Center,
      })
      .in(rootView);

    let self = this
    this.gestureView?.addChild(
      dangleView({
        onReady: (gl: WebGL2RenderingContext) => {
          const width = gl.drawingBufferWidth
          const height = gl.drawingBufferHeight

          let inputCanvas
          inputCanvas = 
          ({
            functions: {},
            width: width,
            height: height,
            style: {},
            addEventListener: (() => {}) as any,
            removeEventListener: (() => {}) as any,
            clientHeight: height,
            getContext: (() => {return gl}) as any,
            ownerDocument: {
              pointerLockElement: null,
              addEventListener: ((name: string, fn: Function) => {
                if (name == "mousemove") {
                  self.gestureView!!.onTouchMove = ({x, y}) => {
                    fn({
                      movementX: (x - self.lastX) * Environment.screenScale,
                      movementY: (y - self.lastY) * Environment.screenScale
                    })
                    self.lastX = x
                    self.lastY = y
                  }
                  inputCanvas.functions.mousemove = fn
                } else if (name == "pointerlockchange") {
                  inputCanvas.functions.pointerlockchange = fn
                } else if (name == "pointerlockerror") {
                  inputCanvas.functions.pointerlockerror = fn
                }
              }) as any,
              removeEventListener: (() => {}) as any,
              exitPointerLock: (() => {}) as any,
            },
            requestPointerLock: (() => {
              inputCanvas.ownerDocument.pointerLockElement = inputCanvas
              inputCanvas.functions.pointerlockchange()
            }),
          });

          let window = {
            innerWidth: width,
            innerHeight: height,
            devicePixelRatio: 1,
            addEventListener: (() => {}) as any
          }
          //#region code to impl

          let camera, scene, renderer, controls;

          const objects: any[] = [];

          let raycaster;

          let moveForward = false;
          let moveBackward = false;
          let moveLeft = false;
          let moveRight = false;
          let canJump = false;

          let prevTime = Date.now();
          const velocity = new THREE.Vector3();
          const direction = new THREE.Vector3();
          const vertex = new THREE.Vector3();
          const color = new THREE.Color();

          init();
          animate(prevTime);

          function init() {

            camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
            camera.position.y = 10;

            scene = new THREE.Scene();
            scene.background = new THREE.Color( 0xffffff );
            scene.fog = new THREE.Fog( 0xffffff, 0, 750 );

            const light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
            light.position.set( 0.5, 1, 0.75 );
            scene.add( light );

            controls = new PointerLockControls( camera, inputCanvas );

            self.instructions!!.onClick = function () {

              controls.lock();

            };

            controls.addEventListener( 'lock', function () {

              self.instructions!!.hidden = true;
              self.instructions!!.backgroundColor = Color.parse('#000000').alpha(0)
            } );

            controls.addEventListener( 'unlock', function () {

              self.instructions!!.hidden = false;
              self.instructions!!.backgroundColor = Color.parse('#000000').alpha(0.5)

            } );

            scene.add( controls.getObject() );

            const onKeyDown = function ( event ) {

              switch ( event.code ) {

                case 'ArrowUp':
                case 'KeyW':
                  moveForward = true;
                  break;

                case 'ArrowLeft':
                case 'KeyA':
                  moveLeft = true;
                  break;

                case 'ArrowDown':
                case 'KeyS':
                  moveBackward = true;
                  break;

                case 'ArrowRight':
                case 'KeyD':
                  moveRight = true;
                  break;

                case 'Space':
                  if ( canJump === true ) velocity.y += 350;
                  canJump = false;
                  break;

              }

            };

            const onKeyUp = function ( event ) {

              switch ( event.code ) {

                case 'ArrowUp':
                case 'KeyW':
                  moveForward = false;
                  break;

                case 'ArrowLeft':
                case 'KeyA':
                  moveLeft = false;
                  break;

                case 'ArrowDown':
                case 'KeyS':
                  moveBackward = false;
                  break;

                case 'ArrowRight':
                case 'KeyD':
                  moveRight = false;
                  break;

              }

            };

            self.w!!.onTouchDown = () => {
              onKeyDown({code: "KeyW"})
            }
            self.w!!.onTouchUp = () => {
              onKeyUp({code: "KeyW"})
            }
            self.a!!.onTouchDown = () => {
              onKeyDown({code: "KeyA"})
            }
            self.a!!.onTouchUp = () => {
              onKeyUp({code: "KeyA"})
            }
            self.s!!.onTouchDown = () => {
              onKeyDown({code: "KeyS"})
            }
            self.s!!.onTouchUp = () => {
              onKeyUp({code: "KeyS"})
            }
            self.d!!.onTouchDown = () => {
              onKeyDown({code: "KeyD"})
            }
            self.d!!.onTouchUp = () => {
              onKeyUp({code: "KeyD"})
            }
            self.space!!.onTouchDown = () => {
              onKeyDown({code: "Space"})
            }

            // document.addEventListener( 'keydown', onKeyDown );
            // document.addEventListener( 'keyup', onKeyUp );

            raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );

            // floor

            let floorGeometry = new THREE.PlaneGeometry( 2000, 2000, 100, 100 );
            floorGeometry.rotateX( - Math.PI / 2 );

            // vertex displacement

            let position = floorGeometry.attributes.position;

            for ( let i = 0, l = position.count; i < l; i ++ ) {

              vertex.fromBufferAttribute( position, i );

              vertex.x += Math.random() * 20 - 10;
              vertex.y += Math.random() * 2;
              vertex.z += Math.random() * 20 - 10;

              position.setXYZ( i, vertex.x, vertex.y, vertex.z );

            }

            (<any>floorGeometry) = floorGeometry.toNonIndexed(); // ensure each face has unique vertices

            position = floorGeometry.attributes.position;
            const colorsFloor: any[] = [];

            for ( let i = 0, l = position.count; i < l; i ++ ) {

              color.setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
              colorsFloor.push( color.r, color.g, color.b );

            }

            floorGeometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colorsFloor, 3 ) );

            const floorMaterial = new THREE.MeshBasicMaterial( { vertexColors: true } );

            const floor = new THREE.Mesh( floorGeometry, floorMaterial );
            scene.add( floor );

            // objects

            const boxGeometry = new THREE.BoxGeometry( 20, 20, 20 ).toNonIndexed();

            position = boxGeometry.attributes.position;
            const colorsBox:any[] = [];

            for ( let i = 0, l = position.count; i < l; i ++ ) {

              color.setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
              colorsBox.push( color.r, color.g, color.b );

            }

            boxGeometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colorsBox, 3 ) );

            for ( let i = 0; i < 500; i ++ ) {

              const boxMaterial = new THREE.MeshPhongMaterial( { specular: 0xffffff, flatShading: true, vertexColors: true } );
              boxMaterial.color.setHSL( Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );

              const box = new THREE.Mesh( boxGeometry, boxMaterial );
              box.position.x = Math.floor( Math.random() * 20 - 10 ) * 20;
              box.position.y = Math.floor( Math.random() * 20 ) * 20 + 10;
              box.position.z = Math.floor( Math.random() * 20 - 10 ) * 20;

              scene.add( box );
              objects.push( box );

            }

            //

            renderer = new THREE.WebGLRenderer( { antialias: true, canvas: inputCanvas } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            // document.body.appendChild( renderer.domElement );

            //

            window.addEventListener( 'resize', onWindowResize );

          }

          function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

          }

          function animate(time) {

            vsync(context).requestAnimationFrame( animate );

            // const time = performance.now();

            if ( controls.isLocked === true ) {

              raycaster.ray.origin.copy( controls.getObject().position );
              raycaster.ray.origin.y -= 10;

              const intersections = raycaster.intersectObjects( objects, false );

              const onObject = intersections.length > 0;

              const delta = ( time - prevTime ) / 1000;

              velocity.x -= velocity.x * 10.0 * delta;
              velocity.z -= velocity.z * 10.0 * delta;

              velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

              direction.z = Number( moveForward ) - Number( moveBackward );
              direction.x = Number( moveRight ) - Number( moveLeft );
              direction.normalize(); // this ensures consistent movements in all directions

              if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
              if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;

              if ( onObject === true ) {

                velocity.y = Math.max( 0, velocity.y );
                canJump = true;

              }

              controls.moveRight( - velocity.x * delta );
              controls.moveForward( - velocity.z * delta );

              controls.getObject().position.y += ( velocity.y * delta ); // new behavior

              if ( controls.getObject().position.y < 10 ) {

                velocity.y = 0;
                controls.getObject().position.y = 10;

                canJump = true;

              }

            }

            prevTime = time;

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

    this.gestureView?.addChild(
      this.instructions = vlayout([
        text({text: "Click to play", textSize: 36, textColor: Color.WHITE}),
        text({text: "Move: WASD", textSize: 16, textColor: Color.WHITE}),
        text({text: "Jump: SPACE", textSize: 16, textColor: Color.WHITE}),
        text({text: "Look: MOUSE", textSize: 16, textColor: Color.WHITE}),
      ]).apply({
        layoutConfig: layoutConfig().most(),
        gravity: Gravity.Center,
        backgroundColor: Color.parse("#000000").alpha(0.5)
      })
    )
  }
}
