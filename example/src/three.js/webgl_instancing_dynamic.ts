import {
  Panel,
  Group,
  vlayout,
  layoutConfig,
  Gravity,
  navbar,
  stack,
  RemoteResource,
  resourceLoader,
  Stack,
  VLayout,
  hlayout,
  gestureContainer,
  text,
  Color,
} from "doric";
import { dangleView, DangleWebGLRenderingContext, vsync } from "dangle";

import * as THREE from "three";

@Entry
class webgl_instancing_dynamic extends Panel {
  private vlayoutView?: VLayout;
  private modifyCountValue?: Stack;

  onShow() {
    navbar(context).setTitle("webgl_instancing_dynamic");
  }
  build(rootView: Group) {
    let self = this;
    this.vlayoutView = vlayout([
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

              let camera, scene, renderer, stats;

              let mesh;
              const amount = 10;
              const count = Math.pow(amount, 3);
              const dummy = new THREE.Object3D();

              await init();
              animate();

              async function init() {
                camera = new THREE.PerspectiveCamera(
                  60,
                  window.innerWidth / window.innerHeight,
                  0.1,
                  100
                );
                camera.position.set(amount * 0.9, amount * 0.9, amount * 0.9);
                camera.lookAt(0, 0, 0);

                scene = new THREE.Scene();

                const remoteResource = new RemoteResource(
                  "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/json/suzanne_buffergeometry.json"
                );
                const arrayBuffer = await resourceLoader(context).load(
                  remoteResource
                );

                const array = new Uint8Array(arrayBuffer);
                let result = "";
                for (let index = 0; index < array.length; index++) {
                  result += String.fromCharCode(array[index]);
                }

                const loader = new THREE.BufferGeometryLoader();
                let geometry = loader.parse(JSON.parse(result));
                geometry.computeVertexNormals();
                geometry.scale(0.5, 0.5, 0.5);

                const material = new THREE.MeshNormalMaterial();
                // check overdraw
                // let material = new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.1, transparent: true } );

                mesh = new THREE.InstancedMesh(geometry, material, count);
                mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage); // will be updated every frame
                scene.add(mesh);

                //

                // const gui = new GUI();
                // gui.add( mesh, 'count', 0, count );

                self.vlayoutView?.addChild(
                  hlayout(
                    [
                      text({
                        text: "count",
                        layoutConfig: layoutConfig().justWidth().fitHeight(),
                        width: 60,
                      }),
                      gestureContainer(
                        [
                          (self.modifyCountValue = stack([], {
                            layoutConfig: layoutConfig().just(),
                            width: 135,
                            height: 25,
                            x: (1000 * 135) / 1000 - 135,
                            backgroundColor: Color.parse("#2FA1D6"),
                          })),
                        ],
                        {
                          onPan: (dx, dy) => {
                            self.modifyCountValue!!.x -= dx;
                            if (
                              self.modifyCountValue!!.x <=
                              (0 * 135) / 1000 - 135
                            ) {
                              self.modifyCountValue!!.x =
                                (0 * 135) / 1000 - 135;
                            } else if (self.modifyCountValue!!.x >= 0) {
                              self.modifyCountValue!!.x = 0;
                            }
                            let value =
                              ((self.modifyCountValue!!.x + 135) * 1000) / 135;

                            mesh.count = value;
                          },
                          layoutConfig: layoutConfig().just(),
                          width: 135,
                          height: 25,
                          backgroundColor: Color.parse("#303030"),
                        }
                      ),
                    ],
                    {
                      space: 10,
                      gravity: Gravity.CenterY,
                    }
                  )
                );
                //

                renderer = new THREE.WebGLRenderer({
                  antialias: true,
                  canvas: inputCanvas,
                });
                renderer.setPixelRatio(window.devicePixelRatio);
                renderer.setSize(window.innerWidth, window.innerHeight);
                // document.body.appendChild( renderer.domElement );

                //

                // stats = new Stats();
                // document.body.appendChild( stats.dom );

                //

                window.addEventListener("resize", onWindowResize);
              }

              function onWindowResize() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();

                renderer.setSize(window.innerWidth, window.innerHeight);
              }

              //

              function animate() {
                requestAnimationFrame(animate);

                render();

                // stats.update();

                gl.endFrame();
              }

              function render() {
                if (mesh) {
                  const time = Date.now() * 0.001;

                  mesh.rotation.x = Math.sin(time / 4);
                  mesh.rotation.y = Math.sin(time / 2);

                  let i = 0;
                  const offset = (amount - 1) / 2;

                  for (let x = 0; x < amount; x++) {
                    for (let y = 0; y < amount; y++) {
                      for (let z = 0; z < amount; z++) {
                        dummy.position.set(offset - x, offset - y, offset - z);
                        dummy.rotation.y =
                          Math.sin(x / 4 + time) +
                          Math.sin(y / 4 + time) +
                          Math.sin(z / 4 + time);
                        dummy.rotation.z = dummy.rotation.y * 2;

                        dummy.updateMatrix();

                        mesh.setMatrixAt(i++, dummy.matrix);
                      }
                    }
                  }

                  mesh.instanceMatrix.needsUpdate = true;
                }

                renderer.render(scene, camera);
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
