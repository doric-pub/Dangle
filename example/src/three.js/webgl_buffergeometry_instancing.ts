import {
  Panel,
  Group,
  vlayout,
  layoutConfig,
  Gravity,
  navbar,
  stack,
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
class webgl_buffergeometry_instancing extends Panel {
  private vlayoutView?: VLayout;
  private modifyCountValue?: Stack;

  onShow() {
    navbar(context).setTitle("webgl_buffergeometry_instancing");
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

              let camera, scene, renderer;

              init();
              animate();

              function init() {
                camera = new THREE.PerspectiveCamera(
                  50,
                  window.innerWidth / window.innerHeight,
                  1,
                  10
                );
                camera.position.z = 2;

                scene = new THREE.Scene();

                // geometry

                const vector = new THREE.Vector4();

                const instances = 50000;

                const positions: any[] = [];
                const offsets: any[] = [];
                const colors: any[] = [];
                const orientationsStart: any[] = [];
                const orientationsEnd: any[] = [];

                positions.push(0.025, -0.025, 0);
                positions.push(-0.025, 0.025, 0);
                positions.push(0, 0, 0.025);

                // instanced attributes

                for (let i = 0; i < instances; i++) {
                  // offsets

                  offsets.push(
                    Math.random() - 0.5,
                    Math.random() - 0.5,
                    Math.random() - 0.5
                  );

                  // colors

                  colors.push(
                    Math.random(),
                    Math.random(),
                    Math.random(),
                    Math.random()
                  );

                  // orientation start

                  vector.set(
                    Math.random() * 2 - 1,
                    Math.random() * 2 - 1,
                    Math.random() * 2 - 1,
                    Math.random() * 2 - 1
                  );
                  vector.normalize();

                  orientationsStart.push(
                    vector.x,
                    vector.y,
                    vector.z,
                    vector.w
                  );

                  // orientation end

                  vector.set(
                    Math.random() * 2 - 1,
                    Math.random() * 2 - 1,
                    Math.random() * 2 - 1,
                    Math.random() * 2 - 1
                  );
                  vector.normalize();

                  orientationsEnd.push(vector.x, vector.y, vector.z, vector.w);
                }

                const geometry = new THREE.InstancedBufferGeometry();
                geometry.instanceCount = instances; // set so its initalized for dat.GUI, will be set in first draw otherwise

                geometry.setAttribute(
                  "position",
                  new THREE.Float32BufferAttribute(positions, 3)
                );

                geometry.setAttribute(
                  "offset",
                  new THREE.InstancedBufferAttribute(
                    new Float32Array(offsets),
                    3
                  )
                );
                geometry.setAttribute(
                  "color",
                  new THREE.InstancedBufferAttribute(
                    new Float32Array(colors),
                    4
                  )
                );
                geometry.setAttribute(
                  "orientationStart",
                  new THREE.InstancedBufferAttribute(
                    new Float32Array(orientationsStart),
                    4
                  )
                );
                geometry.setAttribute(
                  "orientationEnd",
                  new THREE.InstancedBufferAttribute(
                    new Float32Array(orientationsEnd),
                    4
                  )
                );

                // material

                const material = new THREE.RawShaderMaterial({
                  uniforms: {
                    time: { value: 1.0 },
                    sineTime: { value: 1.0 },
                  },
                  vertexShader: `
                    precision highp float;

                    uniform float sineTime;

                    uniform mat4 modelViewMatrix;
                    uniform mat4 projectionMatrix;

                    attribute vec3 position;
                    attribute vec3 offset;
                    attribute vec4 color;
                    attribute vec4 orientationStart;
                    attribute vec4 orientationEnd;

                    varying vec3 vPosition;
                    varying vec4 vColor;

                    void main(){

                      vPosition = offset * max( abs( sineTime * 2.0 + 1.0 ), 0.5 ) + position;
                      vec4 orientation = normalize( mix( orientationStart, orientationEnd, sineTime ) );
                      vec3 vcV = cross( orientation.xyz, vPosition );
                      vPosition = vcV * ( 2.0 * orientation.w ) + ( cross( orientation.xyz, vcV ) * 2.0 + vPosition );

                      vColor = color;

                      gl_Position = projectionMatrix * modelViewMatrix * vec4( vPosition, 1.0 );

                    }
                  `,
                  fragmentShader: `
                    precision highp float;

                    uniform float time;

                    varying vec3 vPosition;
                    varying vec4 vColor;

                    void main() {

                      vec4 color = vec4( vColor );
                      color.r += sin( vPosition.x * 10.0 + time ) * 0.5;

                      gl_FragColor = color;

                    }
                  `,
                  side: THREE.DoubleSide,
                  transparent: true,
                });

                //

                const mesh = new THREE.Mesh(geometry, material);
                scene.add(mesh);

                //

                renderer = new THREE.WebGLRenderer({ canvas: inputCanvas });
                renderer.setPixelRatio(window.devicePixelRatio);
                renderer.setSize(window.innerWidth, window.innerHeight);

                // if ( renderer.capabilities.isWebGL2 === false && renderer.extensions.has( 'ANGLE_instanced_arrays' ) === false ) {

                //   document.getElementById( 'notSupported' ).style.display = '';
                //   return;

                // }

                //

                // const gui = new GUI( { width: 350 } );
                // gui.add( geometry, 'instanceCount', 0, instances );
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
                            x: (50000 * 135) / 50000 - 135,
                            backgroundColor: Color.parse("#2FA1D6"),
                          })),
                        ],
                        {
                          onPan: (dx, dy) => {
                            self.modifyCountValue!!.x -= dx;
                            if (
                              self.modifyCountValue!!.x <=
                              (0 * 135) / 50000 - 135
                            ) {
                              self.modifyCountValue!!.x =
                                (0 * 135) / 50000 - 135;
                            } else if (self.modifyCountValue!!.x >= 0) {
                              self.modifyCountValue!!.x = 0;
                            }
                            let value =
                              ((self.modifyCountValue!!.x + 135) * 50000) / 135;

                            geometry.instanceCount = value;
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

                // stats = new Stats();
                // container.appendChild( stats.dom );

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
                const time = Date.now();

                const object = scene.children[0];

                object.rotation.y = time * 0.0005;
                object.material.uniforms["time"].value = time * 0.005;
                object.material.uniforms["sineTime"].value = Math.sin(
                  object.material.uniforms["time"].value * 0.05
                );

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
