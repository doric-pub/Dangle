import {
  Panel,
  Group,
  layoutConfig,
  Gravity,
  navbar,
  GestureContainer,
  Color,
  jsx,
  Stack,
  createRef,
  VLayout,
} from "doric";
import { DangleView, DangleWebGLRenderingContext } from "dangle";

import * as THREE from "three";
import { FontLoader } from "./jsm/loaders/FontLoader";

const ratio = Environment.screenWidth / 375;

// 第 \u7b2c
// 本 \u672c
// 日 \u65e5
// 周 \u5468
// 月 \u6708
// 年 \u5e74

@Entry
class line_chart extends Panel {
  onShow() {
    navbar(context).setTitle("line_chart");
  }
  build(rootView: Group) {
    const gestureContainerRef1 = createRef<GestureContainer>();
    const gestureContainerRef2 = createRef<GestureContainer>();

    <Stack parent={rootView} layoutConfig={layoutConfig().most()}>
      <VLayout
        layoutConfig={layoutConfig().fit().configAlignment(Gravity.Center)}
        space={30}
        border={{ width: 2, color: Color.RED }}
      >
        <GestureContainer
          ref={gestureContainerRef1}
          layoutConfig={layoutConfig().fit()}
          border={{ width: 1, color: Color.RED }}
        >
          <DangleView
            layoutConfig={layoutConfig().just()}
            width={310 * ratio}
            height={178 * ratio}
            onReady={(gl: DangleWebGLRenderingContext) => {
              const width = gl.drawingBufferWidth;
              const height = gl.drawingBufferHeight;

              const canvas = {
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

              //#region code to impl
              const xInterval = width / 7;
              const yInterval = 45 * ratio * Environment.screenScale;

              // 创建场景
              const scene = new THREE.Scene();

              // 创建正射摄像机
              const camera = new THREE.OrthographicCamera(
                -width / 2,
                width / 2,
                height / 2,
                -height / 2,
                1,
                1000
              );
              camera.position.set(0, yInterval * 1.5, 10);
              camera.lookAt(new THREE.Vector3(0, yInterval * 1.5, 0));

              // 创建渲染器
              const renderer = new THREE.WebGLRenderer({
                antialias: true,
                canvas: canvas,
                alpha: true,
              });
              renderer.setSize(width, height);
              renderer.setClearColor(0x000000, 0);

              // 创建坐标系
              {
                // 绘制坐标线
                const points = [
                  new THREE.Vector3(-3.5 * xInterval, 0, 0),
                  new THREE.Vector3(3.5 * xInterval, 0, 0),
                ];
                const geometry = new THREE.BufferGeometry().setFromPoints(
                  points
                );
                const material = new THREE.LineBasicMaterial({
                  color: 0xe7ddff,
                  linewidth: 1 * ratio * Environment.screenScale,
                });
                const line = new THREE.Line(geometry, material);
                scene.add(line);
              }

              {
                // 绘制坐标线
                const points = [
                  new THREE.Vector3(-3.5 * xInterval, yInterval, 0),
                  new THREE.Vector3(3.5 * xInterval, yInterval, 0),
                ];
                const geometry = new THREE.BufferGeometry().setFromPoints(
                  points
                );
                const material = new THREE.LineDashedMaterial({
                  color: 0xe7ddff,
                  linewidth: 1 * ratio * Environment.screenScale,
                  dashSize: 2 * ratio * Environment.screenScale,
                  gapSize: 1 * ratio * Environment.screenScale,
                });
                const line = new THREE.Line(geometry, material);
                line.computeLineDistances();
                scene.add(line);
              }

              {
                // 绘制坐标线
                const points = [
                  new THREE.Vector3(-3.5 * xInterval, 2 * yInterval, 0),
                  new THREE.Vector3(3.5 * xInterval, 2 * yInterval, 0),
                ];
                const geometry = new THREE.BufferGeometry().setFromPoints(
                  points
                );
                const material = new THREE.LineDashedMaterial({
                  color: 0xe7ddff,
                  linewidth: 1 * ratio * Environment.screenScale,
                  dashSize: 2 * ratio * Environment.screenScale,
                  gapSize: 1 * ratio * Environment.screenScale,
                });
                const line = new THREE.Line(geometry, material);
                line.computeLineDistances();
                scene.add(line);
              }

              const values = [95, 200, 230, 260, 150, 110, 130];
              const points = [
                -3 * xInterval,
                -2 * xInterval,
                -1 * xInterval,
                0,
                1 * xInterval,
                2 * xInterval,
                3 * xInterval,
              ];
              const barWidth = 18 * ratio * Environment.screenScale;

              const bars: any[] = [];

              values.forEach((value, index) => {
                const geometry = new THREE.BoxGeometry(
                  barWidth,
                  (yInterval * value) / 100,
                  0.1
                );
                const material = new THREE.MeshBasicMaterial({
                  color: "#E7DDFF",
                });
                const bar = new THREE.Mesh(geometry, material);

                bar.position.x = points[index];
                bar.position.y = (yInterval * value) / 200;

                scene.add(bar);
                bars.push(bar);
              });

              const loader = new FontLoader(undefined);
              loader.load(
                "threejs/pingfang_sc_regular.json",
                function (font) {
                  {
                    const textGroup = new THREE.Group();

                    const heightOnPoint = -10 * ratio * Environment.screenScale;

                    const textPoints = points.map((vector) => {
                      return new THREE.Vector3(vector, heightOnPoint, 0);
                    });

                    textPoints.forEach((point, index) => {
                      const matLite = new THREE.MeshBasicMaterial({
                        color: 0x666666,
                        side: THREE.DoubleSide,
                      });
                      const message = "\u7b2c" + index + "\u5468";
                      const shapes = font.generateShapes(
                        message,
                        7 * Environment.screenScale * ratio
                      );
                      const geometry = new THREE.ShapeGeometry(shapes) as any;
                      geometry.computeBoundingBox();

                      const xMid =
                        -0.5 *
                        (geometry.boundingBox.max.x -
                          geometry.boundingBox.min.x);
                      const yMid =
                        -0.5 *
                        (geometry.boundingBox.max.y -
                          geometry.boundingBox.min.y);

                      geometry.translate(xMid + point.x, yMid + point.y, 0);

                      // make shape ( N.B. edge view not visible )

                      const text = new THREE.Mesh(geometry, matLite);
                      text.position.z = 5;

                      textGroup.add(text);
                    });

                    scene.add(textGroup);
                  }

                  renderer.render(scene, camera);
                  gl.endFrame();
                },
                undefined,
                undefined
              ); //end load function

              gestureContainerRef1.current.onPan = (dx, dy) => {
                camera.left += dx * Environment.screenScale;
                camera.right += dx * Environment.screenScale;

                camera.updateProjectionMatrix();
                renderer.render(scene, camera);
                gl.endFrame();
              };

              renderer.render(scene, camera);
              gl.endFrame();

              //#endregion
            }}
          ></DangleView>
        </GestureContainer>
        <GestureContainer
          ref={gestureContainerRef2}
          layoutConfig={layoutConfig().fit().configAlignment(Gravity.Center)}
        >
          <DangleView
            layoutConfig={layoutConfig().just()}
            width={310 * ratio}
            height={(138 + 23) * ratio}
            onReady={(gl: DangleWebGLRenderingContext) => {
              const width = gl.drawingBufferWidth;
              const height = gl.drawingBufferHeight;

              const canvas = {
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

              //#region code to impl
              const xInterval = width / 7;
              const yInterval = 45 * ratio * Environment.screenScale;

              // 创建场景
              const scene = new THREE.Scene();

              // 创建正射摄像机
              const camera = new THREE.OrthographicCamera(
                -width / 2,
                width / 2,
                height / 2,
                -height / 2,
                1,
                1000
              );
              camera.position.set(0, yInterval, 10);
              camera.lookAt(new THREE.Vector3(0, yInterval, 0));

              // 创建渲染器
              const renderer = new THREE.WebGLRenderer({
                antialias: true,
                canvas: canvas,
                alpha: true,
              });
              renderer.setSize(width, height);
              renderer.setClearColor(0x000000, 0);

              // 创建坐标系
              {
                // 绘制坐标线
                const points = [
                  new THREE.Vector3(-3.5 * xInterval, 0, 0),
                  new THREE.Vector3(3.5 * xInterval, 0, 0),
                ];
                const geometry = new THREE.BufferGeometry().setFromPoints(
                  points
                );
                const material = new THREE.LineBasicMaterial({
                  color: 0xe7ddff,
                  linewidth: 1 * ratio * Environment.screenScale,
                });
                const line = new THREE.Line(geometry, material);
                scene.add(line);
              }

              {
                // 绘制坐标线
                const points = [
                  new THREE.Vector3(-3.5 * xInterval, yInterval, 0),
                  new THREE.Vector3(3.5 * xInterval, yInterval, 0),
                ];
                const geometry = new THREE.BufferGeometry().setFromPoints(
                  points
                );
                const material = new THREE.LineDashedMaterial({
                  color: 0xe7ddff,
                  linewidth: 1 * ratio * Environment.screenScale,
                  dashSize: 2 * ratio * Environment.screenScale,
                  gapSize: 1 * ratio * Environment.screenScale,
                });
                const line = new THREE.Line(geometry, material);
                line.computeLineDistances();
                scene.add(line);
              }

              {
                // 绘制坐标线
                const points = [
                  new THREE.Vector3(-3.5 * xInterval, 2 * yInterval, 0),
                  new THREE.Vector3(3.5 * xInterval, 2 * yInterval, 0),
                ];
                const geometry = new THREE.BufferGeometry().setFromPoints(
                  points
                );
                const material = new THREE.LineDashedMaterial({
                  color: 0xe7ddff,
                  linewidth: 1 * ratio * Environment.screenScale,
                  dashSize: 2 * ratio * Environment.screenScale,
                  gapSize: 1 * ratio * Environment.screenScale,
                });
                const line = new THREE.Line(geometry, material);
                line.computeLineDistances();
                scene.add(line);
              }

              {
                // 创建光滑折线几何体
                const values = [18, 23, 13, 9, 14, 12, 19];
                const points = [
                  new THREE.Vector3(-3 * xInterval, (yInterval * 18) / 10, 0),
                  new THREE.Vector3(-2 * xInterval, (yInterval * 23) / 10, 0),
                  new THREE.Vector3(-1 * xInterval, (yInterval * 13) / 10, 0),
                  new THREE.Vector3(0, (yInterval * 9) / 10, 0),
                  new THREE.Vector3(1 * xInterval, (yInterval * 14) / 10, 0),
                  new THREE.Vector3(2 * xInterval, (yInterval * 12) / 10, 0),
                  new THREE.Vector3(3 * xInterval, (yInterval * 19) / 10, 0),
                ];

                {
                  // 绘制实心紫色圆圈
                  const circleGeometry = new THREE.CircleGeometry(
                    3 * ratio * Environment.screenScale,
                    32
                  );
                  const circleMaterial = new THREE.MeshBasicMaterial({
                    color: 0x8854ff,
                  });

                  const instanceCount = points.length;
                  const instancedCircles = new THREE.InstancedMesh(
                    circleGeometry,
                    circleMaterial,
                    instanceCount
                  );

                  const matrix = new THREE.Matrix4();

                  points.forEach((point, index) => {
                    const position = point.clone();

                    matrix.compose(
                      position, // position
                      new THREE.Quaternion(), // rotation
                      new THREE.Vector3(1, 1, 1) // scale
                    );

                    instancedCircles.setMatrixAt(index, matrix);
                  });

                  scene.add(instancedCircles);
                }

                {
                  // 绘制实心白色圆圈
                  const circleGeometry = new THREE.CircleGeometry(
                    1 * ratio * Environment.screenScale,
                    32
                  );
                  const circleMaterial = new THREE.MeshBasicMaterial({
                    color: 0xffffff,
                  });

                  const instanceCount = points.length;
                  const instancedCircles = new THREE.InstancedMesh(
                    circleGeometry,
                    circleMaterial,
                    instanceCount
                  );

                  const matrix = new THREE.Matrix4();

                  points.forEach((point, index) => {
                    const position = point.clone();
                    position.z += 5; // 将圆圈沿 Z 轴向外移动一段距离，使其位于曲线之上

                    matrix.compose(
                      position, // position
                      new THREE.Quaternion(), // rotation
                      new THREE.Vector3(1, 1, 1) // scale
                    );

                    instancedCircles.setMatrixAt(index, matrix);
                  });

                  scene.add(instancedCircles);
                }

                const curve = new THREE.CatmullRomCurve3(
                  points.map((p) => new THREE.Vector3(p.x, p.y, 0)),
                  false,
                  "catmullrom"
                );
                const geometry = new THREE.TubeGeometry(
                  curve,
                  64,
                  Environment.screenScale,
                  8,
                  false
                );

                const material = new THREE.MeshBasicMaterial({
                  color: 0x8854ff,
                });
                const line = new THREE.Mesh(geometry, material);
                scene.add(line);

                const loader = new FontLoader(undefined);
                loader.load(
                  "threejs/pingfang_sc_regular.json",
                  function (font) {
                    {
                      const textGroup = new THREE.Group();

                      const heightOnPoint =
                        10 * ratio * Environment.screenScale;

                      const textPoints = points.map((vector) => {
                        return new THREE.Vector3(
                          vector.x,
                          vector.y + heightOnPoint,
                          0
                        );
                      });

                      textPoints.forEach((point, index) => {
                        const matLite = new THREE.MeshBasicMaterial({
                          color: 0x8854ff,
                          side: THREE.DoubleSide,
                        });
                        const message = values[index].toString();
                        const shapes = font.generateShapes(
                          message,
                          7 * Environment.screenScale * ratio
                        );
                        const geometry = new THREE.ShapeGeometry(shapes) as any;
                        geometry.computeBoundingBox();

                        const xMid =
                          -0.5 *
                          (geometry.boundingBox.max.x -
                            geometry.boundingBox.min.x);
                        const yMid =
                          -0.5 *
                          (geometry.boundingBox.max.y -
                            geometry.boundingBox.min.y);

                        geometry.translate(xMid + point.x, yMid + point.y, 0);

                        // make shape ( N.B. edge view not visible )

                        const text = new THREE.Mesh(geometry, matLite);
                        text.position.z = 5;

                        textGroup.add(text);
                      });

                      scene.add(textGroup);
                    }
                    {
                      const textGroup = new THREE.Group();

                      const heightOnPoint =
                        -10 * ratio * Environment.screenScale;

                      const textPoints = points.map((vector) => {
                        return new THREE.Vector3(
                          vector.x,
                          0 + heightOnPoint,
                          0
                        );
                      });

                      textPoints.forEach((point, index) => {
                        const matLite = new THREE.MeshBasicMaterial({
                          color: 0x666666,
                          side: THREE.DoubleSide,
                        });
                        const message = "\u7b2c" + index + "\u5468";
                        const shapes = font.generateShapes(
                          message,
                          7 * Environment.screenScale * ratio
                        );
                        const geometry = new THREE.ShapeGeometry(shapes) as any;
                        geometry.computeBoundingBox();

                        const xMid =
                          -0.5 *
                          (geometry.boundingBox.max.x -
                            geometry.boundingBox.min.x);
                        const yMid =
                          -0.5 *
                          (geometry.boundingBox.max.y -
                            geometry.boundingBox.min.y);

                        geometry.translate(xMid + point.x, yMid + point.y, 0);

                        // make shape ( N.B. edge view not visible )

                        const text = new THREE.Mesh(geometry, matLite);
                        text.position.z = 5;

                        textGroup.add(text);
                      });

                      scene.add(textGroup);
                    }

                    renderer.render(scene, camera);
                    gl.endFrame();
                  },
                  undefined,
                  undefined
                ); //end load function
              }

              gestureContainerRef2.current.onPan = (dx, dy) => {
                camera.left += dx * Environment.screenScale;
                camera.right += dx * Environment.screenScale;

                camera.updateProjectionMatrix();
                renderer.render(scene, camera);
                gl.endFrame();
              };

              renderer.render(scene, camera);
              gl.endFrame();

              //#endregion
            }}
          ></DangleView>
        </GestureContainer>
      </VLayout>
    </Stack>;
  }
}
