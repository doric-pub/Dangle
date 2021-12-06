import {
  Panel,
  Group,
  vlayout,
  layoutConfig,
  Gravity,
  navbar,
  stack,
  gestureContainer,
  Color,
  text,
  GestureContainer,
  hlayout,
} from "doric";
import { dangleView, getGl, vsync } from "dangle";

import * as THREE from "three";

import { GLTFLoader } from "./jsm/loaders/GLTFLoader";
import { Octree } from './jsm/math/Octree.js';
import { Capsule } from './jsm/math/Capsule.js';

@Entry
class games_fps extends Panel {

  private gestureView?: GestureContainer;

  private w?: GestureContainer;
  private a?: GestureContainer;
  private s?: GestureContainer;
  private d?: GestureContainer;
  private space?: GestureContainer;

  onShow() {
    navbar(context).setTitle("games_fps");
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

          const requestAnimationFrame = vsync(context).requestAnimationFrame

          //#region code to impl
          
          const clock = new THREE.Clock();

          const scene = new THREE.Scene();
          scene.background = new THREE.Color( 0x88ccff );

          const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
          camera.rotation.order = 'YXZ';

          const ambientlight = new THREE.AmbientLight( 0x6688cc );
          scene.add( ambientlight );

          const fillLight1 = new THREE.DirectionalLight( 0xff9999, 0.5 );
          fillLight1.position.set( - 1, 1, 2 );
          scene.add( fillLight1 );

          const fillLight2 = new THREE.DirectionalLight( 0x8888ff, 0.2 );
          fillLight2.position.set( 0, - 1, 0 );
          scene.add( fillLight2 );

          const directionalLight = new THREE.DirectionalLight( 0xffffaa, 1.2 );
          directionalLight.position.set( - 5, 25, - 1 );
          directionalLight.castShadow = true;
          directionalLight.shadow.camera.near = 0.01;
          directionalLight.shadow.camera.far = 500;
          directionalLight.shadow.camera.right = 30;
          directionalLight.shadow.camera.left = - 30;
          directionalLight.shadow.camera.top	= 30;
          directionalLight.shadow.camera.bottom = - 30;
          directionalLight.shadow.mapSize.width = 1024;
          directionalLight.shadow.mapSize.height = 1024;
          directionalLight.shadow.radius = 4;
          directionalLight.shadow.bias = - 0.00006;
          scene.add( directionalLight );

          const renderer = new THREE.WebGLRenderer( { antialias: true, canvas: inputCanvas } );
          renderer.setPixelRatio( window.devicePixelRatio );
          renderer.setSize( window.innerWidth, window.innerHeight );
          renderer.shadowMap.enabled = true;
          renderer.shadowMap.type = THREE.VSMShadowMap;

          // const container = document.getElementById( 'container' );

          // container.appendChild( renderer.domElement );

          // const stats = new Stats();
          // stats.domElement.style.position = 'absolute';
          // stats.domElement.style.top = '0px';

          // container.appendChild( stats.domElement );

          const GRAVITY = 30;

          const NUM_SPHERES = 100;
          const SPHERE_RADIUS = 0.2;

          const STEPS_PER_FRAME = 5;

          const sphereGeometry = new THREE.SphereGeometry( SPHERE_RADIUS, 32, 32 );
          const sphereMaterial = new THREE.MeshStandardMaterial( { color: 0x888855, roughness: 0.8, metalness: 0.5 } );

          const spheres: any[] = [];
          let sphereIdx = 0;

          for ( let i = 0; i < NUM_SPHERES; i ++ ) {

            const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
            sphere.castShadow = true;
            sphere.receiveShadow = true;

            scene.add( sphere );

            spheres.push( { mesh: sphere, collider: new THREE.Sphere( new THREE.Vector3( 0, - 100, 0 ), SPHERE_RADIUS ), velocity: new THREE.Vector3() } );

          }

          //@ts-ignore
          const worldOctree = new Octree();

          const playerCollider = new Capsule( new THREE.Vector3( 0, 0.35, 0 ), new THREE.Vector3( 0, 1, 0 ), 0.35 ) as any;

          const playerVelocity = new THREE.Vector3();
          const playerDirection = new THREE.Vector3() as any;

          let playerOnFloor = false;
          let mouseTime = 0;

          const keyStates = {};

          const vector1 = new THREE.Vector3();
          const vector2 = new THREE.Vector3();
          const vector3 = new THREE.Vector3();

          // document.addEventListener( 'keydown', ( event ) => {

          //   keyStates[ event.code ] = true;

          // } );
          self.w!!.onTouchDown = () => {
            keyStates[ 'KeyW' ] = true;
          }
          self.a!!.onTouchDown = () => {
            keyStates[ 'KeyA' ] = true;
          }
          self.s!!.onTouchDown = () => {
            keyStates[ 'KeyS' ] = true;
          }
          self.d!!.onTouchDown = () => {
            keyStates[ 'KeyD' ] = true;
          }
          self.space!!.onTouchDown = () => {
            keyStates[ 'KeyD' ] = true;
          }

          // document.addEventListener( 'keyup', ( event ) => {

          //   keyStates[ event.code ] = false;

          // } );

          self.w!!.onTouchUp = () => {
            keyStates[ 'KeyW' ] = false;
          }
          self.a!!.onTouchUp = () => {
            keyStates[ 'KeyA' ] = false;
          }
          self.s!!.onTouchUp = () => {
            keyStates[ 'KeyS' ] = false;
          }
          self.d!!.onTouchUp = () => {
            keyStates[ 'KeyD' ] = false;
          }
          self.space!!.onTouchUp = () => {
            keyStates[ 'KeyD' ] = false;
          }

          // document.addEventListener( 'mousedown', () => {

          //   document.body.requestPointerLock();

          //   mouseTime = performance.now();

          // } );

          self.gestureView!!.onTouchDown = () => {
            mouseTime = Date.now();
          }

          // document.addEventListener( 'mouseup', () => {

          //   throwBall();

          // } );

          self.gestureView!!.onTouchUp = () => {
            throwBall();
          }

          // document.body.addEventListener( 'mousemove', ( event ) => {

          //   if ( document.pointerLockElement === document.body ) {

          //     camera.rotation.y -= event.movementX / 500;
          //     camera.rotation.x -= event.movementY / 500;

          //   }

          // } );

          self.gestureView!!.onPan = (dx, dy) => {
            camera.rotation.y -= dx * Environment.screenScale / 500;
            camera.rotation.x -= dy * Environment.screenScale / 500;
          }

          window.addEventListener( 'resize', onWindowResize );

          function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

          }

          function throwBall() {

            const sphere = spheres[ sphereIdx ];

            camera.getWorldDirection( playerDirection );

            sphere.collider.center.copy( playerCollider.end ).addScaledVector( playerDirection, playerCollider.radius * 1.5 );

            // throw the ball with more force if we hold the button longer, and if we move forward

            const impulse = 15 + 30 * ( 1 - Math.exp( ( mouseTime - Date.now() ) * 0.001 ) );

            sphere.velocity.copy( playerDirection ).multiplyScalar( impulse );
            sphere.velocity.addScaledVector( playerVelocity, 2 );

            sphereIdx = ( sphereIdx + 1 ) % spheres.length;

          }

          function playerCollisions() {

            const result = worldOctree.capsuleIntersect( playerCollider );

            playerOnFloor = false;

            if ( result ) {

              playerOnFloor = result.normal.y > 0;

              if ( ! playerOnFloor ) {

                playerVelocity.addScaledVector( result.normal, - result.normal.dot( playerVelocity ) );

              }

              playerCollider.translate( result.normal.multiplyScalar( result.depth ) );

            }

          }

          function updatePlayer( deltaTime ) {

            let damping = Math.exp( - 4 * deltaTime ) - 1;

            if ( ! playerOnFloor ) {

              playerVelocity.y -= GRAVITY * deltaTime;

              // small air resistance
              damping *= 0.1;

            }

            playerVelocity.addScaledVector( playerVelocity, damping );

            const deltaPosition = playerVelocity.clone().multiplyScalar( deltaTime );
            playerCollider.translate( deltaPosition );

            playerCollisions();

            camera.position.copy( playerCollider.end );

          }

          function playerSphereCollision( sphere ) {

            const center = vector1.addVectors( playerCollider.start, playerCollider.end ).multiplyScalar( 0.5 );

            const sphere_center = sphere.collider.center;

            const r = playerCollider.radius + sphere.collider.radius;
            const r2 = r * r;

            // approximation: player = 3 spheres

            for ( const point of [ playerCollider.start, playerCollider.end, center ] ) {

              const d2 = point.distanceToSquared( sphere_center );

              if ( d2 < r2 ) {

                const normal = vector1.subVectors( point, sphere_center ).normalize();
                const v1 = vector2.copy( normal ).multiplyScalar( normal.dot( playerVelocity ) );
                const v2 = vector3.copy( normal ).multiplyScalar( normal.dot( sphere.velocity ) );

                playerVelocity.add( v2 ).sub( v1 );
                sphere.velocity.add( v1 ).sub( v2 );

                const d = ( r - Math.sqrt( d2 ) ) / 2;
                sphere_center.addScaledVector( normal, - d );

              }

            }

          }

          function spheresCollisions() {

            for ( let i = 0, length = spheres.length; i < length; i ++ ) {

              const s1 = spheres[ i ];

              for ( let j = i + 1; j < length; j ++ ) {

                const s2 = spheres[ j ];

                const d2 = s1.collider.center.distanceToSquared( s2.collider.center );
                const r = s1.collider.radius + s2.collider.radius;
                const r2 = r * r;

                if ( d2 < r2 ) {

                  const normal = vector1.subVectors( s1.collider.center, s2.collider.center ).normalize();
                  const v1 = vector2.copy( normal ).multiplyScalar( normal.dot( s1.velocity ) );
                  const v2 = vector3.copy( normal ).multiplyScalar( normal.dot( s2.velocity ) );

                  s1.velocity.add( v2 ).sub( v1 );
                  s2.velocity.add( v1 ).sub( v2 );

                  const d = ( r - Math.sqrt( d2 ) ) / 2;

                  s1.collider.center.addScaledVector( normal, d );
                  s2.collider.center.addScaledVector( normal, - d );

                }

              }

            }

          }

          function updateSpheres( deltaTime ) {

            spheres.forEach( sphere => {

              sphere.collider.center.addScaledVector( sphere.velocity, deltaTime );

              const result = worldOctree.sphereIntersect( sphere.collider );

              if ( result ) {

                sphere.velocity.addScaledVector( result.normal, - result.normal.dot( sphere.velocity ) * 1.5 );
                sphere.collider.center.add( result.normal.multiplyScalar( result.depth ) );

              } else {

                sphere.velocity.y -= GRAVITY * deltaTime;

              }

              const damping = Math.exp( - 1.5 * deltaTime ) - 1;
              sphere.velocity.addScaledVector( sphere.velocity, damping );

              playerSphereCollision( sphere );

            } );

            spheresCollisions();

            for ( const sphere of spheres ) {

              sphere.mesh.position.copy( sphere.collider.center );

            }

          }

          function getForwardVector() {

            camera.getWorldDirection( playerDirection );
            playerDirection.y = 0;
            playerDirection.normalize();

            return playerDirection;

          }

          function getSideVector() {

            camera.getWorldDirection( playerDirection );
            playerDirection.y = 0;
            playerDirection.normalize();
            playerDirection.cross( camera.up );

            return playerDirection;

          }

          function controls( deltaTime ) {

            // gives a bit of air control
            const speedDelta = deltaTime * ( playerOnFloor ? 25 : 8 );

            if ( keyStates[ 'KeyW' ] ) {

              playerVelocity.add( getForwardVector().multiplyScalar( speedDelta ) );

            }

            if ( keyStates[ 'KeyS' ] ) {

              playerVelocity.add( getForwardVector().multiplyScalar( - speedDelta ) );

            }

            if ( keyStates[ 'KeyA' ] ) {

              playerVelocity.add( getSideVector().multiplyScalar( - speedDelta ) );

            }

            if ( keyStates[ 'KeyD' ] ) {

              playerVelocity.add( getSideVector().multiplyScalar( speedDelta ) );

            }

            if ( playerOnFloor ) {

              if ( keyStates[ 'Space' ] ) {

                playerVelocity.y = 15;

              }

            }

          }

          //@ts-ignore
          const loader = new GLTFLoader();

          //@ts-ignore
          loader.load( 'https://raw.githubusercontent.com/doric-pub/Dangle/450c3b923befb3d3ed1098b4289f54f8800f5635/example/src/three.js/models/collision-world/collision-world.gltf', ( gltf ) => {

            scene.add( gltf.scene );

            worldOctree.fromGraphNode( gltf.scene );

            gltf.scene.traverse( child => {

              if ( child.isMesh ) {

                child.castShadow = true;
                child.receiveShadow = true;

                if ( child.material.map ) {

                  child.material.map.anisotropy = 8;

                }

              }

            } );

            animate();

          } );

          function teleportPlayerIfOob(){
            if (camera.position.y <= -25){
              playerCollider.start.set( 0, 0.35, 0 );
              playerCollider.end.set( 0, 1, 0 );
              playerCollider.radius =  0.35;
              camera.position.copy( playerCollider.end );
              camera.rotation.set( 0, 0, 0 );
            }
          }


          function animate() {

            const deltaTime = Math.min( 0.05, clock.getDelta() ) / STEPS_PER_FRAME;

            // we look for collisions in substeps to mitigate the risk of
            // an object traversing another too quickly for detection.

            for ( let i = 0; i < STEPS_PER_FRAME; i ++ ) {

              controls( deltaTime );

              updatePlayer( deltaTime );

              updateSpheres( deltaTime );

              teleportPlayerIfOob();

            }

            renderer.render( scene, camera );

            // stats.update();

            requestAnimationFrame( animate );

            gl.flush();
            gl.endFrameEXP();
          }

          //#endregion

          gl.flush();
          gl.endFrameEXP();
        },
      }).apply({
        layoutConfig: layoutConfig().just(),
        width: 300,
        height: 300,
      }),
    )
  }
}
  