import {
  Panel,
  Group,
  vlayout,
  layoutConfig,
  Gravity,
  navbar,
  stack,
  imageDecoder,
  Color,
  AssetsResource,
} from "doric";
import { dangleView, DangleWebGLRenderingContext, vsync } from "dangle";

import * as THREE from "three";

@Entry
class webgl_geometry_cube extends Panel {
  onShow() {
    navbar(context).setTitle("webgl_geometry_cube");
  }
  build(rootView: Group) {
    vlayout([
      stack(
        [
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

              const requestAnimationFrame =
                vsync(context).requestAnimationFrame;

              //#region code to impl

              let camera, scene, renderer;
              let mesh;

              await init();
              animate();

              async function init() {
                camera = new THREE.PerspectiveCamera(
                  70,
                  window.innerWidth / window.innerHeight,
                  1,
                  1000
                );
                camera.position.z = 400;

                scene = new THREE.Scene();

                // const texture = new THREE.TextureLoader().load( 'textures/crate.gif' );
                const assetsResource = new AssetsResource("threejs/crate.gif");
                const imageInfo = await imageDecoder(context).getImageInfo(
                  assetsResource
                );
                const imagePixels = await imageDecoder(context).decodeToPixels(
                  assetsResource
                );

                const texture = new THREE.DataTexture(
                  imagePixels,
                  imageInfo.width,
                  imageInfo.height,
                  THREE.RGBAFormat
                );

                const geometry = new THREE.BoxGeometry(200, 200, 200);
                const material = new THREE.MeshBasicMaterial({ map: texture });

                mesh = new THREE.Mesh(geometry, material);
                scene.add(mesh);

                renderer = new THREE.WebGLRenderer({
                  antialias: true,
                  canvas: inputCanvas,
                });
                renderer.setPixelRatio(window.devicePixelRatio);
                renderer.setSize(window.innerWidth, window.innerHeight);
                // document.body.appendChild( renderer.domElement );

                //

                window.addEventListener("resize", onWindowResize);
              }

              function onWindowResize() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();

                renderer.setSize(window.innerWidth, window.innerHeight);
              }

              function animate() {
                requestAnimationFrame(animate);

                mesh.rotation.x += 0.005;
                mesh.rotation.y += 0.01;

                renderer.render(scene, camera);

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
