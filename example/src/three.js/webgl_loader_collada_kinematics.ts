import {
  Panel,
  Group,
  vlayout,
  layoutConfig,
  Gravity,
  navbar,
  stack,
} from "doric";
import { dangleView, DangleWebGLRenderingContext, vsync } from "dangle";

import * as THREE from "three";
import { ColladaLoader } from "./jsm/loaders/ColladaLoader";

import * as TWEEN from "@tweenjs/tween.js";

@Entry
class webgl_loader_collada_kinematics extends Panel {
  onShow() {
    navbar(context).setTitle("webgl_loader_collada_kinematics");
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
              let particleLight;
              let dae;

              let kinematics;
              let kinematicsTween;
              const tweenParameters = {};

              //@ts-ignore
              const loader = new ColladaLoader();
              // loader.load( './models/collada/kawada-hironx.dae', function ( collada ) {
              //@ts-ignore
              loader.load("threejs/abb_irb52_7_120.dae", function (collada) {
                dae = collada.scene;

                dae.traverse(function (child) {
                  if (child.isMesh) {
                    // model does not have normals
                    child.material.flatShading = true;
                  }
                });

                dae.scale.x = dae.scale.y = dae.scale.z = 10.0;
                dae.updateMatrix();

                kinematics = collada.kinematics;

                init();
                animate();
              });

              function init() {
                camera = new THREE.PerspectiveCamera(
                  45,
                  window.innerWidth / window.innerHeight,
                  1,
                  2000
                );
                camera.position.set(2, 2, 3);

                scene = new THREE.Scene();

                // Grid

                const grid = new THREE.GridHelper(20, 20, 0x888888, 0x444444);
                scene.add(grid);

                // Add the COLLADA

                scene.add(dae);

                particleLight = new THREE.Mesh(
                  new THREE.SphereGeometry(4, 8, 8),
                  new THREE.MeshBasicMaterial({ color: 0xffffff })
                );
                scene.add(particleLight);

                // Lights

                const light = new THREE.HemisphereLight(0xffeeee, 0x111122);
                scene.add(light);

                const pointLight = new THREE.PointLight(0xffffff, 0.3);
                particleLight.add(pointLight);

                renderer = new THREE.WebGLRenderer({ canvas: inputCanvas });
                renderer.outputEncoding = THREE.sRGBEncoding;
                renderer.setPixelRatio(window.devicePixelRatio);
                renderer.setSize(window.innerWidth, window.innerHeight);

                setupTween();

                //

                window.addEventListener("resize", onWindowResize);
              }

              function setupTween() {
                const duration = THREE.MathUtils.randInt(1000, 5000);

                const target = {};

                for (const prop in kinematics.joints) {
                  if (kinematics.joints.hasOwnProperty(prop)) {
                    if (!kinematics.joints[prop].static) {
                      const joint = kinematics.joints[prop];

                      const old = tweenParameters[prop];

                      const position = old ? old : joint.zeroPosition;

                      tweenParameters[prop] = position;

                      target[prop] = THREE.MathUtils.randInt(
                        joint.limits.min,
                        joint.limits.max
                      );
                    }
                  }
                }

                kinematicsTween = new TWEEN.Tween(tweenParameters)
                  .to(target, duration)
                  .easing(TWEEN.Easing.Quadratic.Out);

                kinematicsTween.onUpdate(function (object) {
                  for (const prop in kinematics.joints) {
                    if (kinematics.joints.hasOwnProperty(prop)) {
                      if (!kinematics.joints[prop].static) {
                        kinematics.setJointValue(prop, object[prop]);
                      }
                    }
                  }
                });

                kinematicsTween.start();

                setTimeout(setupTween, duration);
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
                TWEEN.update();

                gl.endFrame();
              }

              function render() {
                const timer = Date.now() * 0.0001;

                camera.position.x = Math.cos(timer) * 20;
                camera.position.y = 10;
                camera.position.z = Math.sin(timer) * 20;

                camera.lookAt(0, 5, 0);

                particleLight.position.x = Math.sin(timer * 4) * 3009;
                particleLight.position.y = Math.cos(timer * 5) * 4000;
                particleLight.position.z = Math.cos(timer * 4) * 3009;

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
