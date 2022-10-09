import {
  Panel,
  Group,
  vlayout,
  layoutConfig,
  Gravity,
  navbar,
  stack,
  GestureContainer,
  gestureContainer,
  text,
  Color,
  hlayout,
  Text,
} from "doric";
import { dangleView, DangleWebGLRenderingContext, vsync } from "dangle";

import * as THREE from "three";

@Entry
class games_crossy_road extends Panel {
  private w?: GestureContainer;
  private a?: GestureContainer;
  private s?: GestureContainer;
  private d?: GestureContainer;

  private end?: Text;
  private counter?: Text;

  onShow() {
    navbar(context).setTitle("games_crossy_road");
  }
  build(rootView: Group) {
    let self = this;
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

              const requestAnimationFrame =
                vsync(context).requestAnimationFrame;

              //#region code to impl

              // const counterDOM = document.getElementById('counter');
              // const endDOM = document.getElementById('end');

              const scene = new THREE.Scene();

              const distance = 500;
              const camera = new THREE.OrthographicCamera(
                window.innerWidth / -2,
                window.innerWidth / 2,
                window.innerHeight / 2,
                window.innerHeight / -2,
                0.1,
                10000
              );

              camera.rotation.x = (50 * Math.PI) / 180;
              camera.rotation.y = (20 * Math.PI) / 180;
              camera.rotation.z = (10 * Math.PI) / 180;

              const initialCameraPositionY =
                -Math.tan(camera.rotation.x) * distance;
              const initialCameraPositionX =
                Math.tan(camera.rotation.y) *
                Math.sqrt(distance ** 2 + initialCameraPositionY ** 2);
              camera.position.y = initialCameraPositionY;
              camera.position.x = initialCameraPositionX;
              camera.position.z = distance;

              const zoom = 2;

              const chickenSize = 15;

              const positionWidth = 42;
              const columns = 17;
              const boardWidth = positionWidth * columns;

              const stepTime = 200; // Miliseconds it takes for the chicken to take a step forward, backward, left or right

              let lanes;
              let currentLane;
              let currentColumn;

              let previousTimestamp;
              let startMoving;
              let moves;
              let stepStartTimestamp;

              //@ts-ignore
              const carFrontTexture = new Texture(40, 80, [
                { x: 0, y: 10, w: 30, h: 60 },
              ]);
              //@ts-ignore
              const carBackTexture = new Texture(40, 80, [
                { x: 10, y: 10, w: 30, h: 60 },
              ]);
              //@ts-ignore
              const carRightSideTexture = new Texture(110, 40, [
                { x: 10, y: 0, w: 50, h: 30 },
                { x: 70, y: 0, w: 30, h: 30 },
              ]);
              //@ts-ignore
              const carLeftSideTexture = new Texture(110, 40, [
                { x: 10, y: 10, w: 50, h: 30 },
                { x: 70, y: 10, w: 30, h: 30 },
              ]);

              //@ts-ignore
              const truckFrontTexture = new Texture(30, 30, [
                { x: 15, y: 0, w: 10, h: 30 },
              ]);
              //@ts-ignore
              const truckRightSideTexture = new Texture(25, 30, [
                { x: 0, y: 15, w: 10, h: 10 },
              ]);
              //@ts-ignore
              const truckLeftSideTexture = new Texture(25, 30, [
                { x: 0, y: 5, w: 10, h: 10 },
              ]);

              const generateLanes = () =>
                [
                  -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8,
                  9,
                ]
                  .map((index) => {
                    const lane = new Lane(index);
                    lane.mesh.position.y = index * positionWidth * zoom;
                    scene.add(lane.mesh);
                    return lane;
                  })
                  .filter((lane) => lane.index >= 0);

              const addLane = () => {
                const index = lanes.length;
                const lane = new Lane(index);
                lane.mesh.position.y = index * positionWidth * zoom;
                scene.add(lane.mesh);
                lanes.push(lane);
              };

              //@ts-ignore
              const chicken = new Chicken();
              scene.add(chicken);

              let hemiLight = new THREE.HemisphereLight(
                0xffffff,
                0xffffff,
                0.6
              );
              scene.add(hemiLight);

              const initialDirLightPositionX = -100;
              const initialDirLightPositionY = -100;
              let dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
              dirLight.position.set(
                initialDirLightPositionX,
                initialDirLightPositionY,
                200
              );
              dirLight.castShadow = true;
              dirLight.target = chicken;
              scene.add(dirLight);

              dirLight.shadow.mapSize.width = 2048;
              dirLight.shadow.mapSize.height = 2048;
              var d = 500;
              dirLight.shadow.camera.left = -d;
              dirLight.shadow.camera.right = d;
              dirLight.shadow.camera.top = d;
              dirLight.shadow.camera.bottom = -d;

              // var helper = new THREE.CameraHelper( dirLight.shadow.camera );
              // var helper = new THREE.CameraHelper( camera );
              // scene.add(helper)

              let backLight = new THREE.DirectionalLight(0x000000, 0.4);
              backLight.position.set(200, 200, 50);
              backLight.castShadow = true;
              scene.add(backLight);

              const laneTypes = ["car", "truck", "forest"];
              const laneSpeeds = [2, 2.5, 3];
              const vechicleColors = [0xa52523, 0xbdb638, 0x78b14b];
              const threeHeights = [20, 45, 60];

              const initaliseValues = () => {
                lanes = generateLanes();

                currentLane = 0;
                currentColumn = Math.floor(columns / 2);

                previousTimestamp = null;

                startMoving = false;
                moves = [];
                stepStartTimestamp;

                chicken.position.x = 0;
                chicken.position.y = 0;

                camera.position.y = initialCameraPositionY;
                camera.position.x = initialCameraPositionX;

                dirLight.position.x = initialDirLightPositionX;
                dirLight.position.y = initialDirLightPositionY;
              };

              initaliseValues();

              const renderer = new THREE.WebGLRenderer({
                alpha: true,
                antialias: true,
                canvas: inputCanvas,
              });
              renderer.shadowMap.enabled = true;
              renderer.shadowMap.type = THREE.PCFSoftShadowMap;
              renderer.setSize(window.innerWidth, window.innerHeight);
              // document.body.appendChild( renderer.domElement );

              function Texture(width, height, rects) {
                const size = width * height;
                const data = new Uint8Array(4 * size);
                const color = new THREE.Color(0xffffff);

                const r = Math.floor(color.r * 255);
                const g = Math.floor(color.g * 255);
                const b = Math.floor(color.b * 255);

                for (let i = 0; i < size; i++) {
                  const stride = i * 4;

                  data[stride] = r;
                  data[stride + 1] = g;
                  data[stride + 2] = b;
                  data[stride + 3] = 255;
                }

                rects.forEach((rect) => {
                  for (let i = 0; i < size; i++) {
                    let xCoord = Math.floor(i / width);
                    let yCoord = i % width;
                    if (
                      xCoord >= rect.x &&
                      xCoord < rect.x + width &&
                      yCoord >= rect.y &&
                      yCoord < rect.y + height
                    ) {
                      const stride = i * 4;

                      data[stride] = 0;
                      data[stride + 1] = 0;
                      data[stride + 2] = 0;
                      data[stride + 3] = 255 * 0.6;
                    }
                  }
                });

                // used the buffer to create a DataTexture

                const texture = new THREE.DataTexture(
                  data,
                  width,
                  height,
                  THREE.RGBAFormat
                );
                texture.needsUpdate = true;

                // const canvas = document.createElement( "canvas" );
                // canvas.width = width;
                // canvas.height = height;
                // const context = canvas.getContext( "2d" );
                // context.fillStyle = "#ffffff";
                // context.fillRect( 0, 0, width, height );
                // context.fillStyle = "rgba(0,0,0,0.6)";
                // rects.forEach(rect => {
                //   context.fillRect(rect.x, rect.y, rect.w, rect.h);
                // });
                // return new THREE.CanvasTexture(canvas);
                return texture;
              }

              function Wheel() {
                const wheel = new THREE.Mesh(
                  new THREE.BoxGeometry(12 * zoom, 33 * zoom, 12 * zoom),
                  new THREE.MeshPhongMaterial({
                    color: 0x333333,
                    flatShading: true,
                  })
                );
                wheel.position.z = 6 * zoom;
                return wheel;
              }

              function Car() {
                const car = new THREE.Group();
                const color =
                  vechicleColors[
                  Math.floor(Math.random() * vechicleColors.length)
                  ];

                const main = new THREE.Mesh(
                  new THREE.BoxGeometry(60 * zoom, 30 * zoom, 15 * zoom),
                  new THREE.MeshPhongMaterial({ color, flatShading: true })
                );
                main.position.z = 12 * zoom;
                main.castShadow = true;
                main.receiveShadow = true;
                car.add(main);

                const cabin = new THREE.Mesh(
                  new THREE.BoxGeometry(33 * zoom, 24 * zoom, 12 * zoom),
                  [
                    new THREE.MeshPhongMaterial({
                      color: 0xcccccc,
                      flatShading: true,
                      map: carBackTexture,
                    }),
                    new THREE.MeshPhongMaterial({
                      color: 0xcccccc,
                      flatShading: true,
                      map: carFrontTexture,
                    }),
                    new THREE.MeshPhongMaterial({
                      color: 0xcccccc,
                      flatShading: true,
                      map: carRightSideTexture,
                    }),
                    new THREE.MeshPhongMaterial({
                      color: 0xcccccc,
                      flatShading: true,
                      map: carLeftSideTexture,
                    }),
                    new THREE.MeshPhongMaterial({
                      color: 0xcccccc,
                      flatShading: true,
                    }), // top
                    new THREE.MeshPhongMaterial({
                      color: 0xcccccc,
                      flatShading: true,
                    }), // bottom
                  ]
                );
                cabin.position.x = 6 * zoom;
                cabin.position.z = 25.5 * zoom;
                cabin.castShadow = true;
                cabin.receiveShadow = true;
                car.add(cabin);

                //@ts-ignore
                const frontWheel = new Wheel();
                frontWheel.position.x = -18 * zoom;
                car.add(frontWheel);

                //@ts-ignore
                const backWheel = new Wheel();
                backWheel.position.x = 18 * zoom;
                car.add(backWheel);

                car.castShadow = true;
                car.receiveShadow = false;

                return car;
              }

              function Truck() {
                const truck = new THREE.Group();
                const color =
                  vechicleColors[
                  Math.floor(Math.random() * vechicleColors.length)
                  ];

                const base = new THREE.Mesh(
                  new THREE.BoxGeometry(100 * zoom, 25 * zoom, 5 * zoom),
                  new THREE.MeshPhongMaterial({
                    color: 0xb4c6fc,
                    flatShading: true,
                  })
                );
                base.position.z = 10 * zoom;
                truck.add(base);

                const cargo = new THREE.Mesh(
                  new THREE.BoxGeometry(75 * zoom, 35 * zoom, 40 * zoom),
                  new THREE.MeshPhongMaterial({
                    color: 0xb4c6fc,
                    flatShading: true,
                  })
                );
                cargo.position.x = 15 * zoom;
                cargo.position.z = 30 * zoom;
                cargo.castShadow = true;
                cargo.receiveShadow = true;
                truck.add(cargo);

                const cabin = new THREE.Mesh(
                  new THREE.BoxGeometry(25 * zoom, 30 * zoom, 30 * zoom),
                  [
                    new THREE.MeshPhongMaterial({ color, flatShading: true }), // back
                    new THREE.MeshPhongMaterial({
                      color,
                      flatShading: true,
                      map: truckFrontTexture,
                    }),
                    new THREE.MeshPhongMaterial({
                      color,
                      flatShading: true,
                      map: truckRightSideTexture,
                    }),
                    new THREE.MeshPhongMaterial({
                      color,
                      flatShading: true,
                      map: truckLeftSideTexture,
                    }),
                    new THREE.MeshPhongMaterial({ color, flatShading: true }), // top
                    new THREE.MeshPhongMaterial({ color, flatShading: true }), // bottom
                  ]
                );
                cabin.position.x = -40 * zoom;
                cabin.position.z = 20 * zoom;
                cabin.castShadow = true;
                cabin.receiveShadow = true;
                truck.add(cabin);

                //@ts-ignore
                const frontWheel = new Wheel();
                frontWheel.position.x = -38 * zoom;
                truck.add(frontWheel);

                //@ts-ignore
                const middleWheel = new Wheel();
                middleWheel.position.x = -10 * zoom;
                truck.add(middleWheel);

                //@ts-ignore
                const backWheel = new Wheel();
                backWheel.position.x = 30 * zoom;
                truck.add(backWheel);

                return truck;
              }

              function Three() {
                const three = new THREE.Group();

                const trunk = new THREE.Mesh(
                  new THREE.BoxGeometry(15 * zoom, 15 * zoom, 20 * zoom),
                  new THREE.MeshPhongMaterial({
                    color: 0x4d2926,
                    flatShading: true,
                  })
                );
                trunk.position.z = 10 * zoom;
                trunk.castShadow = true;
                trunk.receiveShadow = true;
                three.add(trunk);

                let height =
                  threeHeights[Math.floor(Math.random() * threeHeights.length)];

                const crown = new THREE.Mesh(
                  new THREE.BoxGeometry(
                    30 * zoom,
                    30 * zoom,
                    height * zoom
                  ),
                  new THREE.MeshPhongMaterial({
                    color: 0x7aa21d,
                    flatShading: true,
                  })
                );
                crown.position.z = (height / 2 + 20) * zoom;
                crown.castShadow = true;
                crown.receiveShadow = false;
                three.add(crown);

                return three;
              }

              function Chicken() {
                const chicken = new THREE.Group();

                const body = new THREE.Mesh(
                  new THREE.BoxGeometry(
                    chickenSize * zoom,
                    chickenSize * zoom,
                    20 * zoom
                  ),
                  new THREE.MeshPhongMaterial({
                    color: 0xffffff,
                    flatShading: true,
                  })
                );
                body.position.z = 10 * zoom;
                body.castShadow = true;
                body.receiveShadow = true;
                chicken.add(body);

                const rowel = new THREE.Mesh(
                  new THREE.BoxGeometry(2 * zoom, 4 * zoom, 2 * zoom),
                  new THREE.MeshPhongMaterial({
                    color: 0xf0619a,
                    flatShading: true,
                  })
                );
                rowel.position.z = 21 * zoom;
                rowel.castShadow = true;
                rowel.receiveShadow = false;
                chicken.add(rowel);

                return chicken;
              }

              function Road() {
                const road = new THREE.Group();

                const createSection = (color) =>
                  new THREE.Mesh(
                    new THREE.PlaneGeometry(
                      boardWidth * zoom,
                      positionWidth * zoom
                    ),
                    new THREE.MeshPhongMaterial({ color })
                  );

                const middle = createSection(0x454a59);
                middle.receiveShadow = true;
                road.add(middle);

                const left = createSection(0x393d49);
                left.position.x = -boardWidth * zoom;
                road.add(left);

                const right = createSection(0x393d49);
                right.position.x = boardWidth * zoom;
                road.add(right);

                return road;
              }

              function Grass() {
                const grass = new THREE.Group();

                const createSection = (color) =>
                  new THREE.Mesh(
                    new THREE.BoxGeometry(
                      boardWidth * zoom,
                      positionWidth * zoom,
                      3 * zoom
                    ),
                    new THREE.MeshPhongMaterial({ color })
                  );

                const middle = createSection(0xbaf455);
                middle.receiveShadow = true;
                grass.add(middle);

                const left = createSection(0x99c846);
                left.position.x = -boardWidth * zoom;
                grass.add(left);

                const right = createSection(0x99c846);
                right.position.x = boardWidth * zoom;
                grass.add(right);

                grass.position.z = 1.5 * zoom;
                return grass;
              }

              function Lane(index) {
                //@ts-ignore
                this.index = index;
                //@ts-ignore
                this.type =
                  index <= 0
                    ? "field"
                    : laneTypes[Math.floor(Math.random() * laneTypes.length)];

                //@ts-ignore
                switch (this.type) {
                  case "field": {
                    //@ts-ignore
                    this.type = "field";
                    //@ts-ignore
                    this.mesh = new Grass();
                    break;
                  }
                  case "forest": {
                    //@ts-ignore
                    this.mesh = new Grass();

                    //@ts-ignore
                    this.occupiedPositions = new Set();
                    //@ts-ignore
                    this.threes = [1, 2, 3, 4].map(() => {
                      //@ts-ignore
                      const three = new Three();
                      let position;
                      do {
                        position = Math.floor(Math.random() * columns);
                        //@ts-ignore
                      } while (this.occupiedPositions.has(position));
                      //@ts-ignore
                      this.occupiedPositions.add(position);
                      three.position.x =
                        (position * positionWidth + positionWidth / 2) * zoom -
                        (boardWidth * zoom) / 2;
                      //@ts-ignore
                      this.mesh.add(three);
                      return three;
                    });
                    break;
                  }
                  case "car": {
                    //@ts-ignore
                    this.mesh = new Road();
                    //@ts-ignore
                    this.direction = Math.random() >= 0.5;

                    const occupiedPositions = new Set();
                    //@ts-ignore
                    this.vechicles = [1, 2, 3].map(() => {
                      //@ts-ignore
                      const vechicle = new Car();
                      let position;
                      do {
                        position = Math.floor((Math.random() * columns) / 2);
                      } while (occupiedPositions.has(position));
                      occupiedPositions.add(position);
                      vechicle.position.x =
                        (position * positionWidth * 2 + positionWidth / 2) *
                        zoom -
                        (boardWidth * zoom) / 2;
                      //@ts-ignore
                      if (!this.direction) vechicle.rotation.z = Math.PI;
                      //@ts-ignore
                      this.mesh.add(vechicle);
                      return vechicle;
                    });

                    //@ts-ignore
                    this.speed =
                      laneSpeeds[Math.floor(Math.random() * laneSpeeds.length)];
                    break;
                  }
                  case "truck": {
                    //@ts-ignore
                    this.mesh = new Road();
                    //@ts-ignore
                    this.direction = Math.random() >= 0.5;

                    const occupiedPositions = new Set();
                    //@ts-ignore
                    this.vechicles = [1, 2].map(() => {
                      //@ts-ignore
                      const vechicle = new Truck();
                      let position;
                      do {
                        position = Math.floor((Math.random() * columns) / 3);
                      } while (occupiedPositions.has(position));
                      occupiedPositions.add(position);
                      vechicle.position.x =
                        (position * positionWidth * 3 + positionWidth / 2) *
                        zoom -
                        (boardWidth * zoom) / 2;
                      //@ts-ignore
                      if (!this.direction) vechicle.rotation.z = Math.PI;
                      //@ts-ignore
                      this.mesh.add(vechicle);
                      return vechicle;
                    });

                    //@ts-ignore
                    this.speed =
                      laneSpeeds[Math.floor(Math.random() * laneSpeeds.length)];
                    break;
                  }
                }
              }

              // document.querySelector("#retry").addEventListener("click", () => {
              //   lanes.forEach(lane => scene.remove( lane.mesh ));
              //   initaliseValues();
              //   endDOM.style.visibility = 'hidden';
              // });
              self.end!!.onClick = () => {
                lanes.forEach((lane) => scene.remove(lane.mesh));
                initaliseValues();
                self.end!!.hidden = true;
              };

              // document.getElementById('forward').addEventListener("click", () => move('forward'));
              self.w!!.onTouchDown = () => {
                move("forward");
              };

              // document.getElementById('backward').addEventListener("click", () => move('backward'));
              self.s!!.onTouchDown = () => {
                move("backward");
              };

              // document.getElementById('left').addEventListener("click", () => move('left'));
              self.a!!.onTouchDown = () => {
                move("left");
              };

              // document.getElementById('right').addEventListener("click", () => move('right'));
              self.d!!.onTouchDown = () => {
                move("right");
              };

              window.addEventListener("keydown", (event) => {
                if (event.keyCode == "38") {
                  // up arrow
                  move("forward");
                } else if (event.keyCode == "40") {
                  // down arrow
                  move("backward");
                } else if (event.keyCode == "37") {
                  // left arrow
                  move("left");
                } else if (event.keyCode == "39") {
                  // right arrow
                  move("right");
                }
              });

              function move(direction) {
                const finalPositions = moves.reduce(
                  (position, move) => {
                    if (move === "forward")
                      return {
                        lane: position.lane + 1,
                        column: position.column,
                      };
                    if (move === "backward")
                      return {
                        lane: position.lane - 1,
                        column: position.column,
                      };
                    if (move === "left")
                      return {
                        lane: position.lane,
                        column: position.column - 1,
                      };
                    if (move === "right")
                      return {
                        lane: position.lane,
                        column: position.column + 1,
                      };
                  },
                  { lane: currentLane, column: currentColumn }
                );

                if (direction === "forward") {
                  if (
                    lanes[finalPositions.lane + 1].type === "forest" &&
                    lanes[finalPositions.lane + 1].occupiedPositions.has(
                      finalPositions.column
                    )
                  )
                    return;
                  if (!stepStartTimestamp) startMoving = true;
                  addLane();
                } else if (direction === "backward") {
                  if (finalPositions.lane === 0) return;
                  if (
                    lanes[finalPositions.lane - 1].type === "forest" &&
                    lanes[finalPositions.lane - 1].occupiedPositions.has(
                      finalPositions.column
                    )
                  )
                    return;
                  if (!stepStartTimestamp) startMoving = true;
                } else if (direction === "left") {
                  if (finalPositions.column === 0) return;
                  if (
                    lanes[finalPositions.lane].type === "forest" &&
                    lanes[finalPositions.lane].occupiedPositions.has(
                      finalPositions.column - 1
                    )
                  )
                    return;
                  if (!stepStartTimestamp) startMoving = true;
                } else if (direction === "right") {
                  if (finalPositions.column === columns - 1) return;
                  if (
                    lanes[finalPositions.lane].type === "forest" &&
                    lanes[finalPositions.lane].occupiedPositions.has(
                      finalPositions.column + 1
                    )
                  )
                    return;
                  if (!stepStartTimestamp) startMoving = true;
                }
                moves.push(direction);
              }

              function animate(timestamp) {
                requestAnimationFrame(animate);

                if (!previousTimestamp) previousTimestamp = timestamp;
                const delta = timestamp - previousTimestamp;
                previousTimestamp = timestamp;

                // Animate cars and trucks moving on the lane
                lanes.forEach((lane) => {
                  if (lane.type === "car" || lane.type === "truck") {
                    const aBitBeforeTheBeginingOfLane =
                      (-boardWidth * zoom) / 2 - positionWidth * 2 * zoom;
                    const aBitAfterTheEndOFLane =
                      (boardWidth * zoom) / 2 + positionWidth * 2 * zoom;
                    lane.vechicles.forEach((vechicle) => {
                      if (lane.direction) {
                        vechicle.position.x =
                          vechicle.position.x < aBitBeforeTheBeginingOfLane
                            ? aBitAfterTheEndOFLane
                            : (vechicle.position.x -=
                              (lane.speed / 16) * delta);
                      } else {
                        vechicle.position.x =
                          vechicle.position.x > aBitAfterTheEndOFLane
                            ? aBitBeforeTheBeginingOfLane
                            : (vechicle.position.x +=
                              (lane.speed / 16) * delta);
                      }
                    });
                  }
                });

                if (startMoving) {
                  stepStartTimestamp = timestamp;
                  startMoving = false;
                }

                if (stepStartTimestamp) {
                  const moveDeltaTime = timestamp - stepStartTimestamp;
                  const moveDeltaDistance =
                    Math.min(moveDeltaTime / stepTime, 1) *
                    positionWidth *
                    zoom;
                  const jumpDeltaDistance =
                    Math.sin(Math.min(moveDeltaTime / stepTime, 1) * Math.PI) *
                    8 *
                    zoom;
                  switch (moves[0]) {
                    case "forward": {
                      const positionY =
                        currentLane * positionWidth * zoom + moveDeltaDistance;
                      camera.position.y = initialCameraPositionY + positionY;
                      dirLight.position.y =
                        initialDirLightPositionY + positionY;
                      chicken.position.y = positionY; // initial chicken position is 0

                      chicken.position.z = jumpDeltaDistance;
                      break;
                    }
                    case "backward": {
                      let positionY =
                        currentLane * positionWidth * zoom - moveDeltaDistance;
                      camera.position.y = initialCameraPositionY + positionY;

                      dirLight.position.y =
                        initialDirLightPositionY + positionY;
                      chicken.position.y = positionY;

                      chicken.position.z = jumpDeltaDistance;
                      break;
                    }
                    case "left": {
                      const positionX =
                        (currentColumn * positionWidth + positionWidth / 2) *
                        zoom -
                        (boardWidth * zoom) / 2 -
                        moveDeltaDistance;
                      camera.position.x = initialCameraPositionX + positionX;
                      dirLight.position.x =
                        initialDirLightPositionX + positionX;
                      chicken.position.x = positionX; // initial chicken position is 0
                      chicken.position.z = jumpDeltaDistance;
                      break;
                    }
                    case "right": {
                      const positionX =
                        (currentColumn * positionWidth + positionWidth / 2) *
                        zoom -
                        (boardWidth * zoom) / 2 +
                        moveDeltaDistance;
                      camera.position.x = initialCameraPositionX + positionX;
                      dirLight.position.x =
                        initialDirLightPositionX + positionX;
                      chicken.position.x = positionX;

                      chicken.position.z = jumpDeltaDistance;
                      break;
                    }
                  }
                  // Once a step has ended
                  if (moveDeltaTime > stepTime) {
                    switch (moves[0]) {
                      case "forward": {
                        currentLane++;
                        // counterDOM.innerHTML = currentLane;
                        self.counter!!.text = "" + currentLane;
                        break;
                      }
                      case "backward": {
                        currentLane--;
                        // counterDOM.innerHTML = currentLane;
                        self.counter!!.text = "" + currentLane;
                        break;
                      }
                      case "left": {
                        currentColumn--;
                        break;
                      }
                      case "right": {
                        currentColumn++;
                        break;
                      }
                    }
                    moves.shift();
                    // If more steps are to be taken then restart counter otherwise stop stepping
                    stepStartTimestamp = moves.length === 0 ? null : timestamp;
                  }
                }

                // Hit test
                if (
                  lanes[currentLane].type === "car" ||
                  lanes[currentLane].type === "truck"
                ) {
                  const chickenMinX =
                    chicken.position.x - (chickenSize * zoom) / 2;
                  const chickenMaxX =
                    chicken.position.x + (chickenSize * zoom) / 2;
                  const vechicleLength = { car: 60, truck: 105 }[
                    lanes[currentLane].type
                  ];
                  lanes[currentLane].vechicles.forEach((vechicle) => {
                    const carMinX =
                      vechicle.position.x - (vechicleLength * zoom) / 2;
                    const carMaxX =
                      vechicle.position.x + (vechicleLength * zoom) / 2;
                    if (chickenMaxX > carMinX && chickenMinX < carMaxX) {
                      // endDOM.style.visibility = 'visible';
                      self.end!!.hidden = false;
                    }
                  });
                }
                renderer.render(scene, camera);

                (gl as any).endFrame();
              }

              requestAnimationFrame(animate);

              //#endregion
            },
          }).apply({
            layoutConfig: layoutConfig().just(),
            width: 300,
            height: 300,
          }),
          (this.end = text({
            text: "Retry",
            width: 100,
            height: 60,
            backgroundColor: Color.RED,
            layoutConfig: layoutConfig().just().configAlignment(Gravity.Center),
          })),
          (this.counter = text({
            text: "0",
            width: 50,
            height: 20,
            backgroundColor: Color.WHITE,
            layoutConfig: layoutConfig().just().configAlignment(Gravity.Right),
          })),
        ],
        {
          layoutConfig: layoutConfig().just(),
          width: 300,
          height: 300,
        }
      ),
      (this.w = gestureContainer([
        text({
          width: 50,
          height: 50,
          text: "W",
          textSize: 30,
          textAlignment: new Gravity().center(),
          backgroundColor: Color.parse("#ffff00"),
          layoutConfig: layoutConfig().just(),
        }),
      ])),
      hlayout([
        (this.a = gestureContainer([
          text({
            width: 50,
            height: 50,
            text: "A",
            textSize: 30,
            textAlignment: new Gravity().center(),
            backgroundColor: Color.parse("#ffff00"),
            layoutConfig: layoutConfig().just(),
          }),
        ])),
        gestureContainer([
          text({
            width: 50,
            height: 50,
            text: "",
            textSize: 30,
            textAlignment: new Gravity().center(),
            layoutConfig: layoutConfig().just(),
          }),
        ]),
        (this.d = gestureContainer([
          text({
            width: 50,
            height: 50,
            text: "D",
            textSize: 30,
            textAlignment: new Gravity().center(),
            backgroundColor: Color.parse("#ffff00"),
            layoutConfig: layoutConfig().just(),
          }),
        ])),
      ]).also((it) => {
        it.space = 10;
      }),
      (this.s = gestureContainer([
        text({
          width: 50,
          height: 50,
          text: "S",
          textSize: 30,
          textAlignment: new Gravity().center(),
          backgroundColor: Color.parse("#ffff00"),
          layoutConfig: layoutConfig().just(),
        }),
      ])),
    ])
      .apply({
        layoutConfig: layoutConfig().fit().configAlignment(Gravity.Center),
        space: 20,
        gravity: Gravity.Center,
      })
      .in(rootView);

    this.end.hidden = true;
  }
}
