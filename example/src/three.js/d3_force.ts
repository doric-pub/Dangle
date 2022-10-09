import {
  Panel,
  Group,
  vlayout,
  layoutConfig,
  Gravity,
  navbar,
  stack,
} from "doric";
import { dangleView, DangleWebGLRenderingContext } from "dangle";

import * as THREE from "three";
import * as d3 from "d3";
import { scaleOrdinal, schemeCategory10 } from "d3";
import data from "./data.json";

@Entry
class d3_force extends Panel {
  onShow() {
    navbar(context).setTitle("d3_force");
  }
  build(rootView: Group) {
    vlayout([
      stack(
        [
          dangleView({
            onReady: (gl: DangleWebGLRenderingContext) => {
              const width = gl.drawingBufferWidth;
              const height = gl.drawingBufferHeight;

              const inputCanvas = {
                width: width,
                height: height,
                style: {},
                addEventListener: (() => { }) as any,
                removeEventListener: (() => { }) as any,
                clientHeight: height,
                getContext: (() => {
                  return gl;
                }) as any,
              } as HTMLCanvasElement;

              let window = {
                innerWidth: width,
                innerHeight: height,
                devicePixelRatio: 1,
                addEventListener: (() => { }) as any,
              };

              //#region code to impl
              const colour = (() => {
                const scale = scaleOrdinal(schemeCategory10);
                return (num: string) => parseInt(scale(num).slice(1), 16);
              })();

              const scene = new THREE.Scene();
              const camera = new THREE.OrthographicCamera(
                0,
                width,
                height,
                0,
                1,
                1000
              );
              const renderer = new THREE.WebGLRenderer({
                antialias: true,
                precision: "highp",
                alpha: true,
                canvas: inputCanvas,
              });
              renderer.setSize(width, height);
              renderer.setPixelRatio(window.devicePixelRatio);
              camera.position.z = 5;

              data.nodes.forEach((node: any) => {
                node.geometry = new THREE.CircleGeometry(5, 32);
                node.material = new THREE.MeshBasicMaterial({
                  color: colour(node.id),
                });
                node.circle = new THREE.Mesh(node.geometry, node.material);
                scene.add(node.circle);
              });

              data.links.forEach((link: any) => {
                link.material = new THREE.LineBasicMaterial({
                  color: 0xaaaaaa,
                });
                link.geometry = new THREE.BufferGeometry();
                link.line = new THREE.Line(link.geometry, link.material);
                scene.add(link.line);
              });

              const simulation = d3
                .forceSimulation()
                .force(
                  "link",
                  d3.forceLink().id((d: any) => d.id)
                )
                .force("charge", d3.forceManyBody())
                .force("center", d3.forceCenter(width / 2, height / 2));

              simulation.nodes(data.nodes as any).on("tick", ticked);

              (simulation.force("link") as any).links(data.links);

              function ticked() {
                data.nodes.forEach((node) => {
                  const { x, y, circle } = node as any;
                  circle.position.set(x, y, 0);
                });

                data.links.forEach((link) => {
                  const { source, target, line } = link as any;
                  line.geometry.verticesNeedUpdate = true;
                  const points: any = [];
                  points.push(new THREE.Vector3(source.x, source.y, -1));
                  points.push(new THREE.Vector3(target.x, target.y, -1));
                  line.geometry.setFromPoints(points);
                });

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
