import {
  Panel,
  Group,
  vlayout,
  layoutConfig,
  Gravity,
  navbar,
  stack,
  Color,
  VLayout,
  Stack,
  hlayout,
  text,
  gestureContainer,
} from "doric";
import { dangleView, DangleWebGLRenderingContext, vsync } from "dangle";

import * as THREE from "three";
import { RGBELoader } from "./jsm/loaders/RGBELoader";

@Entry
class webgl_loader_texture_hdr extends Panel {
  private vlayoutView?: VLayout;
  private exposureValue?: Stack;

  onShow() {
    navbar(context).setTitle("webgl_loader_texture_hdr");
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

              const params = {
                exposure: 2.0,
              };

              let renderer, scene, camera;

              init();

              function init() {
                renderer = new THREE.WebGLRenderer({ canvas: inputCanvas });
                renderer.setPixelRatio(window.devicePixelRatio);
                renderer.setSize(window.innerWidth, window.innerHeight);

                renderer.toneMapping = THREE.ReinhardToneMapping;
                renderer.toneMappingExposure = params.exposure;

                renderer.outputEncoding = THREE.sRGBEncoding;

                scene = new THREE.Scene();

                const aspect = window.innerWidth / window.innerHeight;

                camera = new THREE.OrthographicCamera(
                  -aspect,
                  aspect,
                  1,
                  -1,
                  0,
                  1
                );

                //@ts-ignore
                new RGBELoader().load(
                  "threejs/memorial.hdr",
                  function (texture, textureData) {
                    //console.log( textureData );
                    //console.log( texture );

                    const material = new THREE.MeshBasicMaterial({
                      map: texture,
                    });

                    const quad = new THREE.PlaneGeometry(
                      (1.5 * textureData.width) / textureData.height,
                      1.5
                    );

                    const mesh = new THREE.Mesh(quad, material);

                    scene.add(mesh);

                    render();
                  }
                );

                //

                // const gui = new GUI();

                // gui.add(params, "exposure", 0, 4, 0.01).onChange(render);
                // gui.open();

                self.vlayoutView?.addChild(
                  hlayout(
                    [
                      text({
                        text: "exposure",
                        layoutConfig: layoutConfig().fitWidth().fitHeight(),
                      }),
                      gestureContainer(
                        [
                          (self.exposureValue = stack([], {
                            layoutConfig: layoutConfig().just(),
                            width: 135,
                            height: 25,
                            x: (2 * 135) / 4 - 135,
                            backgroundColor: Color.parse("#2FA1D6"),
                          })),
                        ],
                        {
                          onPan: (dx, dy) => {
                            self.exposureValue!!.x -= dx;
                            if (self.exposureValue!!.x <= (0 * 135) / 4 - 135) {
                              self.exposureValue!!.x = (0 * 135) / 4 - 135;
                            } else if (self.exposureValue!!.x >= 0) {
                              self.exposureValue!!.x = 0;
                            }
                            let value =
                              ((self.exposureValue!!.x + 135) * 4) / 135;

                            params.exposure = value;
                            render();
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

                window.addEventListener("resize", onWindowResize);
              }

              function onWindowResize() {
                const aspect = window.innerWidth / window.innerHeight;

                const frustumHeight = camera.top - camera.bottom;

                camera.left = (-frustumHeight * aspect) / 2;
                camera.right = (frustumHeight * aspect) / 2;

                camera.updateProjectionMatrix();

                renderer.setSize(window.innerWidth, window.innerHeight);

                render();
              }

              //

              function render() {
                renderer.toneMappingExposure = params.exposure;

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
