import {
  Panel,
  Group,
  vlayout,
  layoutConfig,
  Gravity,
  navbar,
  GestureContainer,
  gestureContainer,
  Color,
  hlayout,
  text,
  Text,
} from "doric";
import { dangleView, DangleWebGLRenderingContext, vsync } from "dangle";

import * as THREE from "three";

let lastTime = Date.now();

@Entry
class misc_lookat_instanced_mesh extends Panel {
  private fpsText?: Text;
  private gestureView?: GestureContainer;

  onShow() {
    navbar(context).setTitle("misc_lookat_instanced_mesh");
  }
  build(rootView: Group) {
    vlayout([
      hlayout([text({ text: "fps: " }), (this.fpsText = text({}))], {
        space: 20,
      }),
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
    this.gestureView?.addChild(
      dangleView({
        onReady: (gl: DangleWebGLRenderingContext) => {
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
          let camera, scene, renderer, mesh;
          let positions: any[] = [];

          let sphere;

          let mouseX = 0,
            mouseY = 0;

          let windowHalfX = window.innerWidth / 2;
          let windowHalfY = window.innerHeight / 2;

          // document.addEventListener( 'mousemove', onDocumentMouseMove );
          self.gestureView!!.onTouchMove = ({ x, y }) => {
            onDocumentMouseMove({
              clientX: x * Environment.screenScale,
              clientY: y * Environment.screenScale,
            });
          };

          init();
          animate();

          function init() {
            camera = new THREE.PerspectiveCamera(
              40,
              window.innerWidth / window.innerHeight,
              1,
              15000
            );
            camera.position.z = 3200;

            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xffffff);

            sphere = new THREE.Mesh(
              new THREE.SphereGeometry(100, 20, 20),
              new THREE.MeshNormalMaterial()
            );
            scene.add(sphere);

            const geometry = new THREE.CylinderGeometry(0, 10, 100, 12);
            geometry.rotateX(Math.PI / 2);

            const material = new THREE.MeshNormalMaterial();

            mesh = new THREE.InstancedMesh(geometry, material, 1000);

            for (let i = 0; i < 1000; i++) {
              const matrix = new THREE.Matrix4();
              const scale = Math.random() * 4 + 2;
              const quaternion = new THREE.Quaternion();
              let position = new THREE.Vector3(
                Math.random() * 4000 - 2000,
                Math.random() * 4000 - 2000,
                Math.random() * 4000 - 2000
              );
              positions.push(position);
              matrix.compose(
                position,
                quaternion,
                new THREE.Vector3(scale, scale, scale)
              );
              mesh.setMatrixAt(i, matrix);
            }
            scene.add(mesh);

            renderer = new THREE.WebGLRenderer({
              antialias: true,
              canvas: inputCanvas,
            });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);

            window.addEventListener("resize", onWindowResize);
          }

          function onWindowResize() {
            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);
          }

          function onDocumentMouseMove(event) {
            mouseX = (event.clientX - windowHalfX) * 10;
            mouseY = (event.clientY - windowHalfY) * 10;
          }

          function animate() {
            let current = Date.now();
            let diff = current - lastTime;
            self.fpsText!!.text = Math.ceil(1000 / diff).toString();
            lastTime = current;

            requestAnimationFrame(animate);

            render();

            gl.endFrame();
          }

          function render() {
            const time = Date.now() * 0.0005;

            sphere.position.x = Math.sin(time * 0.7) * 2000;
            sphere.position.y = Math.cos(time * 0.5) * 2000;
            sphere.position.z = Math.cos(time * 0.3) * 2000;

            const meshInstanced = mesh as THREE.InstancedMesh;
            for (let i = 0; i < 1000; i++) {
              const matrix = new THREE.Matrix4();
              meshInstanced.getMatrixAt(i, matrix);
              var postion = new THREE.Vector3();
              postion = postion.setFromMatrixPosition(matrix);

              var scale = new THREE.Vector3();
              scale = scale.setFromMatrixScale(matrix);

              const myDirectionVector = new THREE.Vector3(
                sphere.position.x - positions[i].x,
                sphere.position.y - positions[i].y,
                sphere.position.z - positions[i].z
              );
              var mx = new THREE.Matrix4().lookAt(
                myDirectionVector,
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(0, 1, 0)
              );
              var qt = new THREE.Quaternion().setFromRotationMatrix(mx);

              const newMatrix = matrix.compose(postion, qt, scale);

              meshInstanced.setMatrixAt(i, newMatrix);
            }
            meshInstanced.instanceMatrix.needsUpdate = true;

            camera.position.x += (mouseX - camera.position.x) * 0.05;
            camera.position.y += (-mouseY - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

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
