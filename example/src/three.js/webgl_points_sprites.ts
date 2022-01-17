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
  imageDecoder,
  Switch,
  VLayout,
  hlayout,
  text,
  switchView,
  AssetsResource,
} from "doric";
import { dangleView, DangleWebGLRenderingContext, vsync } from "dangle";

import * as THREE from "three";

@Entry
class webgl_points_sprites extends Panel {
  private container?: VLayout;
  private gestureView?: GestureContainer;
  private textureSwitch?: Switch;

  onShow() {
    navbar(context).setTitle("webgl_points_sprites");
  }
  build(rootView: Group) {
    this.container = vlayout([
      (this.gestureView = gestureContainer([], {
        layoutConfig: layoutConfig().just(),
        width: 300,
        height: 300,
        backgroundColor: Color.BLACK,
      })),
    ])
      .apply({
        layoutConfig: layoutConfig().fit().configAlignment(Gravity.Center),
        space: 20,
        gravity: Gravity.Center,
      })
      .in(rootView);

    let self = this;
    this.gestureView.addChild(
      dangleView({
        onReady: async (gl: DangleWebGLRenderingContext) => {
          const width = gl.drawingBufferWidth;
          const height = gl.drawingBufferHeight;

          const inputCanvas = {
            width: width,
            height: height,
            style: {},
            addEventListener: (() => {}) as any,
            removeEventListener: (() => {}) as any,
            clientHeight: height,
            getContext: (() => {
              return gl;
            }) as any,
          } as HTMLCanvasElement;

          let window = {
            innerWidth: width,
            innerHeight: height,
            devicePixelRatio: 1,
            addEventListener: (() => {}) as any,
          };

          const requestAnimationFrame = vsync(context).requestAnimationFrame;
          //#region code to impl

          let camera, scene, renderer, stats, parameters;
          let mouseX = 0,
            mouseY = 0;

          let windowHalfX = window.innerWidth / 2;
          let windowHalfY = window.innerHeight / 2;

          const materials: any[] = [];

          await init();
          animate();

          async function init() {
            camera = new THREE.PerspectiveCamera(
              75,
              window.innerWidth / window.innerHeight,
              1,
              2000
            );
            camera.position.z = 1000;

            scene = new THREE.Scene();
            scene.fog = new THREE.FogExp2(0x000000, 0.0008);

            const geometry = new THREE.BufferGeometry();
            const vertices: any[] = [];

            // const textureLoader = new THREE.TextureLoader();

            var sprite1;
            {
              const assetsResource = new AssetsResource(
                "threejs/snowflake1.png"
              );
              const imageInfo = await imageDecoder(context).getImageInfo(
                assetsResource
              );
              const imagePixels = await imageDecoder(context).decodeToPixels(
                assetsResource
              );

              sprite1 = new THREE.DataTexture(
                imagePixels,
                imageInfo.width,
                imageInfo.height,
                THREE.RGBAFormat
              );
              sprite1.needsUpdate = true;
            }
            var sprite2;
            {
              const assetsResource = new AssetsResource(
                "threejs/snowflake2.png"
              );
              const imageInfo = await imageDecoder(context).getImageInfo(
                assetsResource
              );
              const imagePixels = await imageDecoder(context).decodeToPixels(
                assetsResource
              );

              sprite2 = new THREE.DataTexture(
                imagePixels,
                imageInfo.width,
                imageInfo.height,
                THREE.RGBAFormat
              );
              sprite2.needsUpdate = true;
            }
            var sprite3;
            {
              const assetsResource = new AssetsResource(
                "threejs/snowflake3.png"
              );
              const imageInfo = await imageDecoder(context).getImageInfo(
                assetsResource
              );
              const imagePixels = await imageDecoder(context).decodeToPixels(
                assetsResource
              );

              sprite3 = new THREE.DataTexture(
                imagePixels,
                imageInfo.width,
                imageInfo.height,
                THREE.RGBAFormat
              );
              sprite3.needsUpdate = true;
            }
            var sprite4;
            {
              const assetsResource = new AssetsResource(
                "threejs/snowflake4.png"
              );
              const imageInfo = await imageDecoder(context).getImageInfo(
                assetsResource
              );
              const imagePixels = await imageDecoder(context).decodeToPixels(
                assetsResource
              );

              sprite4 = new THREE.DataTexture(
                imagePixels,
                imageInfo.width,
                imageInfo.height,
                THREE.RGBAFormat
              );
              sprite4.needsUpdate = true;
            }
            var sprite5;
            {
              const assetsResource = new AssetsResource(
                "threejs/snowflake5.png"
              );
              const imageInfo = await imageDecoder(context).getImageInfo(
                assetsResource
              );
              const imagePixels = await imageDecoder(context).decodeToPixels(
                assetsResource
              );

              sprite5 = new THREE.DataTexture(
                imagePixels,
                imageInfo.width,
                imageInfo.height,
                THREE.RGBAFormat
              );
              sprite5.needsUpdate = true;
            }

            for (let i = 0; i < 10000; i++) {
              const x = Math.random() * 2000 - 1000;
              const y = Math.random() * 2000 - 1000;
              const z = Math.random() * 2000 - 1000;

              vertices.push(x, y, z);
            }

            geometry.setAttribute(
              "position",
              new THREE.Float32BufferAttribute(vertices, 3)
            );

            parameters = [
              [[1.0, 0.2, 0.5], sprite2, 20],
              [[0.95, 0.1, 0.5], sprite3, 15],
              [[0.9, 0.05, 0.5], sprite1, 10],
              [[0.85, 0, 0.5], sprite5, 8],
              [[0.8, 0, 0.5], sprite4, 5],
            ];

            for (let i = 0; i < parameters.length; i++) {
              const color = parameters[i][0];
              const sprite = parameters[i][1];
              const size = parameters[i][2];

              materials[i] = new THREE.PointsMaterial({
                size: size,
                map: sprite,
                blending: THREE.AdditiveBlending,
                depthTest: false,
                transparent: true,
              });
              materials[i].color.setHSL(color[0], color[1], color[2]);

              const particles = new THREE.Points(geometry, materials[i]);

              particles.rotation.x = Math.random() * 6;
              particles.rotation.y = Math.random() * 6;
              particles.rotation.z = Math.random() * 6;

              scene.add(particles);
            }

            //

            renderer = new THREE.WebGLRenderer({ canvas: inputCanvas });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            // document.body.appendChild( renderer.domElement );

            //

            // stats = new Stats();
            // document.body.appendChild( stats.dom );

            //

            // const gui = new GUI();

            // const params = {
            //   texture: true
            // };

            // gui.add( params, 'texture' ).onChange( function ( value ) {

            //   for ( let i = 0; i < materials.length; i ++ ) {

            //     materials[ i ].map = ( value === true ) ? parameters[ i ][ 1 ] : null;
            //     materials[ i ].needsUpdate = true;

            //   }

            // } );

            // gui.open();

            // document.body.style.touchAction = 'none';
            // document.body.addEventListener( 'pointermove', onPointerMove );
            self.gestureView!!.onTouchMove = ({ x, y }) => {
              onPointerMove({
                clientX: x * Environment.screenScale,
                clientY: y * Environment.screenScale,
              });
            };

            //

            window.addEventListener("resize", onWindowResize);

            setTimeout(() => {
              self.container!!.addChild(
                hlayout([
                  text({
                    text: "texture",
                  }),
                  (self.textureSwitch = switchView({ state: true })),
                ]).apply({
                  gravity: Gravity.Center,
                })
              );

              self.textureSwitch!!.onSwitch = (state) => {
                for (let i = 0; i < materials.length; i++) {
                  materials[i].map = state === true ? parameters[i][1] : null;
                  materials[i].needsUpdate = true;
                }
              };
            }, 0);
          }

          function onWindowResize() {
            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);
          }

          function onPointerMove(event) {
            if (event.isPrimary === false) return;

            mouseX = event.clientX - windowHalfX;
            mouseY = event.clientY - windowHalfY;
          }

          //

          function animate() {
            requestAnimationFrame(animate);

            render();
            // stats.update();

            gl.endFrame();
          }

          function render() {
            const time = Date.now() * 0.00005;

            camera.position.x += (mouseX - camera.position.x) * 0.05;
            camera.position.y += (-mouseY - camera.position.y) * 0.05;

            camera.lookAt(scene.position);

            for (let i = 0; i < scene.children.length; i++) {
              const object = scene.children[i];

              if (object instanceof THREE.Points) {
                object.rotation.y = time * (i < 4 ? i + 1 : -(i + 1));
              }
            }

            for (let i = 0; i < materials.length; i++) {
              const color = parameters[i][0];

              const h = ((360 * (color[0] + time)) % 360) / 360;
              materials[i].color.setHSL(h, color[1], color[2]);
            }

            renderer.render(scene, camera);
          }

          //#endregion
        },
      }).apply({
        layoutConfig: layoutConfig().just(),
        width: 300,
        height: 300,
      })
    );
  }
}
