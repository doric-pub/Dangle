import {
  Panel,
  Group,
  vlayout,
  layoutConfig,
  Gravity,
  navbar,
  gestureContainer,
  GestureContainer,
  modal,
  loge,
  hlayout,
  text,
  Color,
  LayoutSpec,
  Text,
} from "doric";
import { dangleView, DangleWebGLRenderingContext, vsync } from "dangle";

import * as THREE from "three";

import { GLTFLoader } from "./jsm/loaders/GLTFLoader";

@Entry
class chess extends Panel {
  private gestureView?: GestureContainer;

  private left?: GestureContainer;
  private right?: GestureContainer;

  onShow() {
    navbar(context).setTitle("chess");
  }
  build(rootView: Group) {
    vlayout([
      (this.gestureView = gestureContainer([], {
        layoutConfig: layoutConfig().just(),
        width: Environment.screenWidth - 3,
        height: Environment.screenWidth - 3,
      })),
      hlayout(
        [
          gestureContainer([
            text({
              width: 50,
              height: 50,
              text: "←",
              textSize: 30,
              textAlignment: new Gravity().center(),
              backgroundColor: Color.parse("#ffff00"),
              layoutConfig: {
                widthSpec: LayoutSpec.JUST,
                heightSpec: LayoutSpec.JUST,
              },
            }),
          ]).also((it) => (this.left = it)),
          gestureContainer([
            text({
              width: 50,
              height: 50,
              text: "→",
              textSize: 30,
              textAlignment: new Gravity().center(),
              backgroundColor: Color.parse("#ffff00"),
              layoutConfig: {
                widthSpec: LayoutSpec.JUST,
                heightSpec: LayoutSpec.JUST,
              },
            }),
          ]).also((it) => (this.right = it)),
        ],
        {
          space: 40,
        }
      ),
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

          // This function combines each piece with the right function to calculate the moves based on the type contained in the id
          function pieceMove(mesh) {
            if (mesh.identity.substring(0, 1) == turn && !changeViewpoint) {
              // Any moves of other pieces are hidden
              for (var i = 0; i < 8; i++)
                for (var j = 0; j < 8; j++) {
                  moves[i][j].name = "0";
                  scene.remove(moves[i][j]);
                }
              actual = mesh;
              switch (mesh.identity.substring(2, 3)) {
                case "p":
                  pawnGo(mesh);
                  break;
                case "r":
                  rookGo(mesh);
                  break;
                case "b":
                  bishopGo(mesh);
                  break;
                case "n":
                  knightGo(mesh);
                  break;
                case "q":
                  queenGo(mesh);
                  break;
                case "k":
                  kingGo(mesh);
                  break;
              }
              // If the piece is not active, I make it so that clicking on it moves us to the square on which it is located
            } else if (
              parseInt(
                moves[parseInt(mesh.name.substring(0, 1))][
                  parseInt(mesh.name.substring(1, 2))
                ].name
              ) == 1
            )
              moveTo(
                moves[parseInt(mesh.name.substring(0, 1))][
                  parseInt(mesh.name.substring(1, 2))
                ]
              );
          }

          // Calculate the moves of the rook
          function rookGo(rook) {
            var x = parseInt(rook.name.substring(0, 1));
            var z = parseInt(rook.name.substring(1, 2));
            var v, f;
            if (rook.identity.substring(0, 1) == "b") f = 1;
            else f = -1;
            v = z;
            while (v - 1 >= 0 && f * parseInt(plane[x][v - 1].name) >= 0) {
              moves[x][v - 1].name = "1";
              scene.add(moves[x][v - 1]);
              if (f * parseInt(plane[x][v - 1].name) > 0) break;
              v = v - 1;
            }
            v = z;
            while (v + 1 < 8 && f * parseInt(plane[x][v + 1].name) >= 0) {
              moves[x][v + 1].name = "1";
              scene.add(moves[x][v + 1]);
              if (f * parseInt(plane[x][v + 1].name) > 0) break;
              v = v + 1;
            }
            v = x;
            while (v - 1 >= 0 && f * parseInt(plane[v - 1][z].name) >= 0) {
              moves[v - 1][z].name = "1";
              scene.add(moves[v - 1][z]);
              if (f * parseInt(plane[v - 1][z].name) > 0) break;
              v = v - 1;
            }
            v = x;
            while (v + 1 < 8 && f * parseInt(plane[v + 1][z].name) >= 0) {
              moves[v + 1][z].name = "1";
              scene.add(moves[v + 1][z]);
              if (f * parseInt(plane[v + 1][z].name) > 0) break;
              v = v + 1;
            }
          }

          // Calculate the moves of the queens
          function queenGo(queen) {
            var x = parseInt(queen.name.substring(0, 1));
            var z = parseInt(queen.name.substring(1, 2));
            var v, w, f;
            if (queen.identity.substring(0, 1) == "b") f = 1;
            else f = -1;
            v = z;
            w = x;
            while (
              v - 1 >= 0 &&
              w - 1 >= 0 &&
              f * parseInt(plane[w - 1][v - 1].name) >= 0
            ) {
              moves[w - 1][v - 1].name = "1";
              scene.add(moves[w - 1][v - 1]);
              if (f * parseInt(plane[w - 1][v - 1].name) > 0) break;
              v = v - 1;
              w = w - 1;
            }
            v = z;
            w = x;
            while (
              v + 1 < 8 &&
              w - 1 >= 0 &&
              f * parseInt(plane[w - 1][v + 1].name) >= 0
            ) {
              moves[w - 1][v + 1].name = "1";
              scene.add(moves[w - 1][v + 1]);
              if (f * parseInt(plane[w - 1][v + 1].name) > 0) break;
              v = v + 1;
              w = w - 1;
            }
            v = z;
            w = x;
            while (
              v + 1 < 8 &&
              w + 1 < 8 &&
              f * parseInt(plane[w + 1][v + 1].name) >= 0
            ) {
              moves[w + 1][v + 1].name = "1";
              scene.add(moves[w + 1][v + 1]);
              if (f * parseInt(plane[w + 1][v + 1].name) > 0) break;
              w = w + 1;
              v = v + 1;
            }
            v = z;
            w = x;
            while (
              v - 1 >= 0 &&
              w + 1 < 8 &&
              f * parseInt(plane[w + 1][v - 1].name) >= 0
            ) {
              moves[w + 1][v - 1].name = "1";
              scene.add(moves[w + 1][v - 1]);
              if (f * parseInt(plane[w + 1][v - 1].name) > 0) break;
              w = w + 1;
              v = v - 1;
            }
            v = z;
            while (v - 1 >= 0 && f * parseInt(plane[x][v - 1].name) >= 0) {
              moves[x][v - 1].name = "1";
              scene.add(moves[x][v - 1]);
              if (f * parseInt(plane[x][v - 1].name) > 0) break;
              v = v - 1;
            }
            v = z;
            while (v + 1 < 8 && f * parseInt(plane[x][v + 1].name) >= 0) {
              moves[x][v + 1].name = "1";
              scene.add(moves[x][v + 1]);
              if (f * parseInt(plane[x][v + 1].name) > 0) break;
              v = v + 1;
            }
            v = x;
            while (v - 1 >= 0 && f * parseInt(plane[v - 1][z].name) >= 0) {
              moves[v - 1][z].name = "1";
              scene.add(moves[v - 1][z]);
              if (f * parseInt(plane[v - 1][z].name) > 0) break;
              v = v - 1;
            }
            v = x;
            while (v + 1 < 8 && f * parseInt(plane[v + 1][z].name) >= 0) {
              moves[v + 1][z].name = "1";
              scene.add(moves[v + 1][z]);
              if (f * parseInt(plane[v + 1][z].name) > 0) break;
              v = v + 1;
            }
          }

          // Calculate the bishops' moves
          function bishopGo(bishop) {
            var x = parseInt(bishop.name.substring(0, 1));
            var z = parseInt(bishop.name.substring(1, 2));
            var v, w, f;
            if (bishop.identity.substring(0, 1) == "b") f = 1;
            else f = -1;
            v = z;
            w = x;
            while (
              v - 1 >= 0 &&
              w - 1 >= 0 &&
              f * parseInt(plane[w - 1][v - 1].name) >= 0
            ) {
              moves[w - 1][v - 1].name = "1";
              scene.add(moves[w - 1][v - 1]);
              if (f * parseInt(plane[w - 1][v - 1].name) > 0) break;
              v = v - 1;
              w = w - 1;
            }
            v = z;
            w = x;
            while (
              v + 1 < 8 &&
              w - 1 >= 0 &&
              f * parseInt(plane[w - 1][v + 1].name) >= 0
            ) {
              moves[w - 1][v + 1].name = "1";
              scene.add(moves[w - 1][v + 1]);
              if (f * parseInt(plane[w - 1][v + 1].name) > 0) break;
              v = v + 1;
              w = w - 1;
            }
            v = z;
            w = x;
            while (
              v + 1 < 8 &&
              w + 1 < 8 &&
              f * parseInt(plane[w + 1][v + 1].name) >= 0
            ) {
              moves[w + 1][v + 1].name = "1";
              scene.add(moves[w + 1][v + 1]);
              if (f * parseInt(plane[w + 1][v + 1].name) > 0) break;
              w = w + 1;
              v = v + 1;
            }
            v = z;
            w = x;
            while (
              v - 1 >= 0 &&
              w + 1 < 8 &&
              f * parseInt(plane[w + 1][v - 1].name) >= 0
            ) {
              moves[w + 1][v - 1].name = "1";
              scene.add(moves[w + 1][v - 1]);
              if (f * parseInt(plane[w + 1][v - 1].name) > 0) break;
              w = w + 1;
              v = v - 1;
            }
          }

          // Calculate the knight's moves
          function knightGo(knight) {
            var x = parseInt(knight.name.substring(0, 1));
            var z = parseInt(knight.name.substring(1, 2));
            var f;
            if (knight.identity.substring(0, 1) == "b") f = 1;
            else f = -1;
            if (
              x + 1 < 8 &&
              z + 2 < 8 &&
              f * parseInt(plane[x + 1][z + 2].name) >= 0
            ) {
              moves[x + 1][z + 2].name = "1";
              scene.add(moves[x + 1][z + 2]);
            }
            if (
              x + 1 < 8 &&
              z - 2 >= 0 &&
              f * parseInt(plane[x + 1][z - 2].name) >= 0
            ) {
              moves[x + 1][z - 2].name = "1";
              scene.add(moves[x + 1][z - 2]);
            }
            if (
              x - 1 >= 0 &&
              z + 2 < 8 &&
              f * parseInt(plane[x - 1][z + 2].name) >= 0
            ) {
              moves[x - 1][z + 2].name = "1";
              scene.add(moves[x - 1][z + 2]);
            }
            if (
              x - 1 >= 0 &&
              z - 2 >= 0 &&
              f * parseInt(plane[x - 1][z - 2].name) >= 0
            ) {
              moves[x - 1][z - 2].name = "1";
              scene.add(moves[x - 1][z - 2]);
            }
            if (
              x + 2 < 8 &&
              z + 1 < 8 &&
              f * parseInt(plane[x + 2][z + 1].name) >= 0
            ) {
              moves[x + 2][z + 1].name = "1";
              scene.add(moves[x + 2][z + 1]);
            }
            if (
              x + 2 < 8 &&
              z - 1 >= 0 &&
              f * parseInt(plane[x + 2][z - 1].name) >= 0
            ) {
              moves[x + 2][z - 1].name = "1";
              scene.add(moves[x + 2][z - 1]);
            }
            if (
              x - 2 >= 0 &&
              z + 1 < 8 &&
              f * parseInt(plane[x - 2][z + 1].name) >= 0
            ) {
              moves[x - 2][z + 1].name = "1";
              scene.add(moves[x - 2][z + 1]);
            }
            if (
              x - 2 >= 0 &&
              z - 1 >= 0 &&
              f * parseInt(plane[x - 2][z - 1].name) >= 0
            ) {
              moves[x - 2][z - 1].name = "1";
              scene.add(moves[x - 2][z - 1]);
            }
          }

          // Calculate the moves of the pawns
          function pawnGo(pawn) {
            var x = parseInt(pawn.name.substring(0, 1));
            var z = parseInt(pawn.name.substring(1, 2));
            var f;
            if (pawn.identity.substring(0, 1) == "b") f = 1;
            else f = -1;
            if (z - f >= 0 && parseInt(plane[x][z - f].name) == 0) {
              moves[x][z - f].name = "1";
              scene.add(moves[x][z - f]);
              if (
                (z == 6 || z == 1) &&
                parseInt(plane[x][z - 2 * f].name) == 0
              ) {
                moves[x][z - 2 * f].name = "1";
                scene.add(moves[x][z - 2 * f]);
              }
            }
            if (
              z - f >= 0 &&
              x - 1 >= 0 &&
              f * parseInt(plane[x - 1][z - f].name) > 0
            ) {
              moves[x - 1][z - f].name = "1";
              scene.add(moves[x - 1][z - f]);
            }
            if (
              z - f >= 0 &&
              x + 1 < 8 &&
              f * parseInt(plane[x + 1][z - f].name) > 0
            ) {
              moves[x + 1][z - f].name = "1";
              scene.add(moves[x + 1][z - f]);
            }
          }

          // Calculate the kings' moves
          function kingGo(king) {
            var x = parseInt(king.name.substring(0, 1));
            var z = parseInt(king.name.substring(1, 2));
            var f;
            if (king.identity.substring(0, 1) == "b") f = 1;
            else f = -1;
            if (
              z - 1 >= 0 &&
              x - 1 >= 0 &&
              f * parseInt(plane[x - 1][z - 1].name) >= 0
            ) {
              moves[x - 1][z - 1].name = "1";
              scene.add(moves[x - 1][z - 1]);
            }
            if (
              z + 1 < 8 &&
              x - 1 >= 0 &&
              f * parseInt(plane[x - 1][z + 1].name) >= 0
            ) {
              moves[x - 1][z + 1].name = "1";
              scene.add(moves[x - 1][z + 1]);
            }
            if (
              z + 1 < 8 &&
              x + 1 < 8 &&
              f * parseInt(plane[x + 1][z + 1].name) >= 0
            ) {
              moves[x + 1][z + 1].name = "1";
              scene.add(moves[x + 1][z + 1]);
            }
            if (
              z - 1 >= 0 &&
              x + 1 < 8 &&
              f * parseInt(plane[x + 1][z - 1].name) >= 0
            ) {
              moves[x + 1][z - 1].name = "1";
              scene.add(moves[x + 1][z - 1]);
            }
            if (z - 1 >= 0 && f * parseInt(plane[x][z - 1].name) >= 0) {
              moves[x][z - 1].name = "1";
              scene.add(moves[x][z - 1]);
            }
            if (z + 1 < 8 && f * parseInt(plane[x][z + 1].name) >= 0) {
              moves[x][z + 1].name = "1";
              scene.add(moves[x][z + 1]);
            }
            if (x - 1 >= 0 && f * parseInt(plane[x - 1][z].name) >= 0) {
              moves[x - 1][z].name = "1";
              scene.add(moves[x - 1][z]);
            }
            if (x + 1 < 8 && f * parseInt(plane[x + 1][z].name) >= 0) {
              moves[x + 1][z].name = "1";
              scene.add(moves[x + 1][z]);
            }
          }

          // This function moves the selected piece to the chosen square and eventually eats the opponent's piece
          function moveTo(piece) {
            if (
              parseInt(
                moves[3.5 - piece.position.x][3.5 - piece.position.z].name
              ) == 1
            ) {
              var end = 0;
              // I check if I'm eating a piece, in which case I release the event and remove it from the scene
              if (
                parseInt(
                  plane[3.5 - piece.position.x][3.5 - piece.position.z].name
                ) != 0
              ) {
                var killed = scene.getObjectByName(
                  3.5 - piece.position.x + "" + (3.5 - piece.position.z)
                ).identity;
                var name = parseInt(killed.substring(1, 2));
                if (killed.substring(2, 3) != "p") name = name + 8;
                if (actual.identity.substring(0, 1) == "b") {
                  scene.remove(white[name]);
                  // If the piece eaten is a king, the game is over
                  if (killed.substring(2, 3) == "k") end = -1;
                } else {
                  scene.remove(black[name]);
                  if (killed.substring(2, 3) == "k") end = 1;
                }
              }
              // I check if the piece is a pawn and has reached the bottom, and I change it to queen
              if (
                actual.identity.substring(2, 3) == "p" &&
                (3.5 - piece.position.z == 7 || 3.5 - piece.position.z == 0)
              ) {
                actual.identity = actual.identity.substring(0, 2) + "q";
                if (actual.identity.substring(0, 1) == "b") {
                  //@ts-ignore
                  loader.load(
                    "threejs/chess/Queen/Queen.gltf",
                    function (object) {
                      black[actual.identity.substring(1, 2)] = object.scene;
                      black[actual.identity.substring(1, 2)].position =
                        actual.position;
                      black[actual.identity.substring(1, 2)].scale.set(
                        0.7,
                        0.7,
                        0.7
                      );
                      black[actual.identity.substring(1, 2)].identity =
                        "b" + actual.identity.substring(1, 2) + "q";
                      black[actual.identity.substring(1, 2)].name = actual.name;
                      plane[3.5 - actual.position.x][
                        3.5 - actual.position.z
                      ].name = "-90";

                      scene.add(black[actual.identity.substring(1, 2)]);
                      var temp = actual;
                      actual = black[actual.identity.substing(1, 2)];
                      scene.remove(temp);
                    }
                  );
                } else {
                  //@ts-ignore
                  loader.load(
                    "threejs/chess/Queen/Queen.gltf",
                    function (object) {
                      black[actual.identity.substring(1, 2)] = object.scene;
                      black[actual.identity.substring(1, 2)].position =
                        actual.position;
                      black[actual.identity.substring(1, 2)].scale.set(
                        0.7,
                        0.7,
                        0.7
                      );
                      black[actual.identity.substring(1, 2)].identity =
                        "w" + actual.identity.substring(1, 2) + "q";
                      black[actual.identity.substring(1, 2)].name = actual.name;
                      plane[3.5 - actual.position.x][
                        3.5 - actual.position.z
                      ].name = "90";

                      scene.add(black[actual.identity.substring(1, 2)]);
                      var temp = actual;
                      actual = black[actual.identity.substing(1, 2)];
                      scene.remove(temp);
                    }
                  );
                }
              }
              // I move the value of the moved piece on the board
              plane[3.5 - piece.position.x][3.5 - piece.position.z].name =
                plane[3.5 - actual.position.x][3.5 - actual.position.z].name;
              plane[3.5 - actual.position.x][3.5 - actual.position.z].name =
                "0";
              actual.position.set(
                piece.position.x,
                actual.position.y,
                piece.position.z
              );
              for (var i = 0; i < 8; i++)
                for (var j = 0; j < 8; j++) {
                  moves[i][j].name = "0";
                  scene.remove(moves[i][j]);
                }
              actual.name =
                3.5 - piece.position.x + "" + (3.5 - piece.position.z);
              // If the game is over I go back to the first scene, otherwise I change my turn and turn the camera around
              if (end != 0) {
                if (end == -1) modal(context).alert("Black is the winner!");
                else modal(context).alert("White is the winner!");
                location.reload();
              } else {
                if (turn == "b") {
                  turn = "w";
                } else {
                  turn = "b";
                }
                changeViewpoint = true;
              }
              camera.lookAt(scene.position);
            }
          }

          self.left!!.onTouchDown = () => {
            rotateLeft = true;
          };
          self.left!!.onTouchCancel = () => {
            rotateLeft = false;
          };
          self.left!!.onTouchUp = () => {
            rotateLeft = false;
          };

          self.right!!.onTouchDown = () => {
            rotateRight = true;
          };
          self.right!!.onTouchCancel = () => {
            rotateRight = false;
          };
          self.right!!.onTouchUp = () => {
            rotateRight = false;
          };

          // The function actually updates the camera position
          function update() {
            // Check if an end-of-shift rotation is taking place
            if (changeViewpoint) {
              if (turn == "b") {
                if (change != Math.PI) {
                  change += Math.PI / 8;
                  camera.position.x = Math.sin(change) * 10;
                  camera.position.z = Math.cos(change) * 10;
                  camera.lookAt(scene.position);
                } else {
                  rotation = Math.PI;
                  changeViewpoint = false;
                }
              } else {
                if (change != 0) {
                  change -= Math.PI / 8;
                  camera.position.x = Math.sin(change) * 10;
                  camera.position.z = Math.cos(change) * 10;
                  camera.lookAt(scene.position);
                } else {
                  rotation = 0;
                  changeViewpoint = false;
                }
              }
              // Otherwise I check if I am rotating by hand
            } else {
              if (rotateRight) {
                rotation += 0.1;
                camera.position.x = Math.sin(rotation) * 10;
                camera.position.z = Math.cos(rotation) * 10;
                camera.lookAt(scene.position);
              }
              if (rotateLeft) {
                rotation -= 0.1;
                camera.position.x = Math.sin(rotation) * 10;
                camera.position.z = Math.cos(rotation) * 10;
                camera.lookAt(scene.position);
              }
            }
          }

          /* The scene, camera and renderer variables respectively contain the three objects needed by three.js to manage the 3D environment */
          var scene, camera, renderer;
          var raycaster = new THREE.Raycaster();
          // This variable contains the JSON loader to load the models made in blender

          //@ts-ignore
          const loader = new GLTFLoader();
          // These variables tell me at each call to render () in which direction to rotate the camera
          var rotateRight = false,
            rotateLeft = false,
            changeViewpoint = false;
          // These variables contain the chessboard, the move boxes and the black and white pieces respectively
          var plane = new Array(8);
          var moves = new Array(8);
          var white = new Array(16);
          var black = new Array(16);
          // actual indicates the last piece selected and turn indicates the turn of the board
          var actual,
            turn = "w";
          // I keep track of the rotation of the camera
          var rotation = 0,
            change = 0;

          // Start the game and render the scene
          init();
          render();

          bindClick();

          // This function creates the scene
          function init() {
            // Prepare the scene, the camera and the renderer
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(
              45,
              window.innerWidth / window.innerHeight,
              1,
              1000
            );
            camera.position.set(0, 10, 10);
            camera.lookAt(scene.position);
            scene.add(camera);
            renderer = new THREE.WebGLRenderer({
              antialias: true,
              canvas: inputCanvas,
            });
            renderer.setSize(window.innerWidth, window.innerHeight);

            renderer.setClearColor(new THREE.Color(0x999999), 1.0);

            // Create the edge of the chessboard
            var border = new THREE.Mesh(
              new THREE.PlaneGeometry(8.5, 8.5),
              new THREE.MeshBasicMaterial({ color: 0xcc9900 })
            );
            border.position.set(0, -0.01, 0);
            border.rotation.x = -90 * (Math.PI / 180);
            scene.add(border);
            // Create the squares of the board, marking the piece on top of it in the name
            var plane_geometry = new THREE.PlaneGeometry(1, 1);
            var white_material = new THREE.MeshBasicMaterial({
              color: "white",
            });
            var black_material = new THREE.MeshBasicMaterial({
              color: "black",
            });
            for (var i = 0; i < 8; i++) {
              plane[i] = new Array(8);
              for (var j = 0; j < 8; j++) {
                if ((i + j) % 2 == 0)
                  plane[i][j] = new THREE.Mesh(plane_geometry, white_material);
                else
                  plane[i][j] = new THREE.Mesh(plane_geometry, black_material);
                plane[i][j].position.set(3.5 - i, 0, 3.5 - j);
                plane[i][j].rotation.x = -90 * (Math.PI / 180);
                plane[i][j].name = "0";
                scene.add(plane[i][j]);
              }
            }
            // I create the squares of the moves, I hook the event to move the pieces but I don't show them, marking in the name if they are active or not
            var small_plane_geometry = new THREE.PlaneGeometry(0.9, 0.9);
            var red_material = new THREE.MeshBasicMaterial({
              color: "red",
            });
            for (var i = 0; i < 8; i++) {
              moves[i] = new Array(8);
              for (var j = 0; j < 8; j++) {
                moves[i][j] = new THREE.Mesh(
                  small_plane_geometry,
                  red_material
                );
                moves[i][j].position.set(3.5 - i, 0.001, 3.5 - j);
                moves[i][j].rotation.x = -90 * (Math.PI / 180);
                moves[i][j].name = "0";
              }
            }
            // I create four lights on the sides of the board
            var light1 = new THREE.DirectionalLight(0xffffff);
            light1.position.set(0, 20, 25);
            light1.target.position.set(0, 0, 0);
            scene.add(light1);
            var light2 = new THREE.DirectionalLight(0xffffff);
            light2.position.set(0, 20, -25);
            light2.target.position.set(0, 0, 0);
            scene.add(light2);
            var light3 = new THREE.DirectionalLight(0xffffff);
            light3.position.set(25, 20, 0);
            light3.target.position.set(0, 0, 0);
            scene.add(light3);
            var light4 = new THREE.DirectionalLight(0xffffff);
            light4.position.set(-25, 20, 0);
            light4.target.position.set(0, 0, 0);
            scene.add(light4);

            // This function populates the board
            function fillBoard() {
              /* I create the white pieces, arrange them on the board and hook the events to move them
               * From 0 to 7 are the pawns, 8 and 15 the towers, 9 and 14 the knights, 10 and 13 the bishops, 12 the king and 11 the queen
               * In the name I memorize their position x-z ​​on the board, while in id I have color-position in the array-piece */

              const wMaterial = new THREE.MeshStandardMaterial({
                color: 0xb8b8b8,
              });
              const bMaterial = new THREE.MeshStandardMaterial({
                color: 0x141414,
              });

              //@ts-ignore
              loader.load("threejs/chess/Pawn/Pawn.gltf", function (object) {
                white[0] = object.scene;
                white[0].position.set(
                  plane[0][1].position.x,
                  plane[0][1].position.y,
                  plane[0][1].position.z
                );
                white[0].scale.set(0.6, 0.6, 0.6);
                white[0].identity = "w0p";
                white[0].name = "01";
                plane[0][1].name = "10";

                white[0].traverse((child, i) => {
                  if (child.isMesh) {
                    child.material = wMaterial;
                    child.material.side = THREE.DoubleSide;
                  }
                });
                scene.add(white[0]);
              });
              //@ts-ignore
              loader.load("threejs/chess/Pawn/Pawn.gltf", function (object) {
                white[1] = object.scene;
                white[1].position.set(
                  plane[1][1].position.x,
                  plane[1][1].position.y,
                  plane[1][1].position.z
                );
                white[1].scale.set(0.6, 0.6, 0.6);
                white[1].identity = "w1p";
                white[1].name = "11";
                plane[1][1].name = "10";

                white[1].traverse((child, i) => {
                  if (child.isMesh) {
                    child.material = wMaterial;
                    child.material.side = THREE.DoubleSide;
                  }
                });
                scene.add(white[1]);
              });
              //@ts-ignore
              loader.load("threejs/chess/Pawn/Pawn.gltf", function (object) {
                white[2] = object.scene;
                white[2].position.set(
                  plane[2][1].position.x,
                  plane[2][1].position.y,
                  plane[2][1].position.z
                );
                white[2].scale.set(0.6, 0.6, 0.6);
                white[2].identity = "w2p";
                white[2].name = "21";
                plane[2][1].name = "10";

                white[2].traverse((child, i) => {
                  if (child.isMesh) {
                    child.material = wMaterial;
                    child.material.side = THREE.DoubleSide;
                  }
                });
                scene.add(white[2]);
              });
              //@ts-ignore
              loader.load("threejs/chess/Pawn/Pawn.gltf", function (object) {
                white[3] = object.scene;
                white[3].position.set(
                  plane[3][1].position.x,
                  plane[3][1].position.y,
                  plane[3][1].position.z
                );
                white[3].scale.set(0.6, 0.6, 0.6);
                white[3].identity = "w3p";
                white[3].name = "31";
                plane[3][1].name = "10";

                white[3].traverse((child, i) => {
                  if (child.isMesh) {
                    child.material = wMaterial;
                    child.material.side = THREE.DoubleSide;
                  }
                });
                scene.add(white[3]);
              });
              //@ts-ignore
              loader.load("threejs/chess/Pawn/Pawn.gltf", function (object) {
                white[4] = object.scene;
                white[4].position.set(
                  plane[4][1].position.x,
                  plane[4][1].position.y,
                  plane[4][1].position.z
                );
                white[4].scale.set(0.6, 0.6, 0.6);
                white[4].identity = "w4p";
                white[4].name = "41";
                plane[4][1].name = "10";

                white[4].traverse((child, i) => {
                  if (child.isMesh) {
                    child.material = wMaterial;
                    child.material.side = THREE.DoubleSide;
                  }
                });
                scene.add(white[4]);
              });
              //@ts-ignore
              loader.load("threejs/chess/Pawn/Pawn.gltf", function (object) {
                white[5] = object.scene;
                white[5].position.set(
                  plane[5][1].position.x,
                  plane[5][1].position.y,
                  plane[5][1].position.z
                );
                white[5].scale.set(0.6, 0.6, 0.6);
                white[5].identity = "w5p";
                white[5].name = "51";
                plane[5][1].name = "10";

                white[5].traverse((child, i) => {
                  if (child.isMesh) {
                    child.material = wMaterial;
                    child.material.side = THREE.DoubleSide;
                  }
                });
                scene.add(white[5]);
              });
              //@ts-ignore
              loader.load("threejs/chess/Pawn/Pawn.gltf", function (object) {
                white[6] = object.scene;
                white[6].position.set(
                  plane[6][1].position.x,
                  plane[6][1].position.y,
                  plane[6][1].position.z
                );
                white[6].scale.set(0.6, 0.6, 0.6);
                white[6].identity = "w6p";
                white[6].name = "61";
                plane[6][1].name = "10";

                white[6].traverse((child, i) => {
                  if (child.isMesh) {
                    child.material = wMaterial;
                    child.material.side = THREE.DoubleSide;
                  }
                });
                scene.add(white[6]);
              });
              //@ts-ignore
              loader.load("threejs/chess/Pawn/Pawn.gltf", function (object) {
                white[7] = object.scene;
                white[7].position.set(
                  plane[7][1].position.x,
                  plane[7][1].position.y,
                  plane[7][1].position.z
                );
                white[7].scale.set(0.6, 0.6, 0.6);
                white[7].identity = "w7p";
                white[7].name = "71";
                plane[7][1].name = "10";

                white[7].traverse((child, i) => {
                  if (child.isMesh) {
                    child.material = wMaterial;
                    child.material.side = THREE.DoubleSide;
                  }
                });
                scene.add(white[7]);
              });
              //@ts-ignore
              loader.load("threejs/chess/Rook/Rook.gltf", function (object) {
                white[8] = object.scene;
                white[8].position.set(
                  plane[0][0].position.x,
                  plane[0][0].position.y,
                  plane[0][0].position.z
                );
                white[8].scale.set(0.7, 0.7, 0.7);
                white[8].identity = "w0r";
                white[8].name = "00";
                plane[0][0].name = "50";

                white[8].traverse((child, i) => {
                  if (child.isMesh) {
                    child.material = wMaterial;
                    child.material.side = THREE.DoubleSide;
                  }
                });
                scene.add(white[8]);
              });
              //@ts-ignore
              loader.load("threejs/chess/Rook/Rook.gltf", function (object) {
                white[15] = object.scene;
                white[15].position.set(
                  plane[7][0].position.x,
                  plane[7][0].position.y,
                  plane[7][0].position.z
                );
                white[15].scale.set(0.7, 0.7, 0.7);
                white[15].identity = "w7r";
                white[15].name = "70";
                plane[7][0].name = "50";

                white[15].traverse((child, i) => {
                  if (child.isMesh) {
                    child.material = wMaterial;
                    child.material.side = THREE.DoubleSide;
                  }
                });
                scene.add(white[15]);
              });
              //@ts-ignore
              loader.load(
                "threejs/chess/Knight/Knight.gltf",
                function (object) {
                  white[9] = object.scene;
                  white[9].position.set(
                    plane[1][0].position.x,
                    plane[1][0].position.y,
                    plane[1][0].position.z
                  );
                  white[9].scale.set(0.7, 0.7, 0.7);
                  white[9].identity = "w1n";
                  white[9].name = "10";
                  plane[1][0].name = "30";

                  white[9].traverse((child, i) => {
                    if (child.isMesh) {
                      child.material = wMaterial;
                      child.material.side = THREE.DoubleSide;
                    }
                  });
                  scene.add(white[9]);
                }
              );
              //@ts-ignore
              loader.load(
                "threejs/chess/Knight/Knight.gltf",
                function (object) {
                  white[14] = object.scene;
                  white[14].position.set(
                    plane[6][0].position.x,
                    plane[6][0].position.y,
                    plane[6][0].position.z
                  );
                  white[14].scale.set(0.7, 0.7, 0.7);
                  white[14].identity = "w6n";
                  white[14].name = "60";
                  plane[6][0].name = "30";

                  white[14].traverse((child, i) => {
                    if (child.isMesh) {
                      child.material = wMaterial;
                      child.material.side = THREE.DoubleSide;
                    }
                  });
                  scene.add(white[14]);
                }
              );
              //@ts-ignore
              loader.load(
                "threejs/chess/Bishop/Bishop.gltf",
                function (object) {
                  white[10] = object.scene;
                  white[10].position.set(
                    plane[2][0].position.x,
                    plane[2][0].position.y,
                    plane[2][0].position.z
                  );
                  white[10].scale.set(0.7, 0.8, 0.7);
                  white[10].identity = "w2b";
                  white[10].name = "20";
                  plane[2][0].name = "31";

                  white[10].traverse((child, i) => {
                    if (child.isMesh) {
                      child.material = wMaterial;
                      child.material.side = THREE.DoubleSide;
                    }
                  });
                  scene.add(white[10]);
                }
              );
              //@ts-ignore
              loader.load(
                "threejs/chess/Bishop/Bishop.gltf",
                function (object) {
                  white[13] = object.scene;
                  white[13].position.set(
                    plane[5][0].position.x,
                    plane[5][0].position.y,
                    plane[5][0].position.z
                  );
                  white[13].scale.set(0.7, 0.8, 0.7);
                  white[13].identity = "w5b";
                  white[13].name = "50";
                  plane[5][0].name = "31";

                  white[13].traverse((child, i) => {
                    if (child.isMesh) {
                      child.material = wMaterial;
                      child.material.side = THREE.DoubleSide;
                    }
                  });
                  scene.add(white[13]);
                }
              );
              //@ts-ignore
              loader.load("threejs/chess/King/King.gltf", function (object) {
                white[12] = object.scene;
                white[12].position.set(
                  plane[4][0].position.x,
                  plane[4][0].position.y,
                  plane[4][0].position.z
                );
                white[12].scale.set(0.7, 0.7, 0.7);
                white[12].identity = "w4k";
                white[12].name = "40";
                plane[4][0].name = "100";

                white[12].traverse((child, i) => {
                  if (child.isMesh) {
                    child.material = wMaterial;
                    child.material.side = THREE.DoubleSide;
                  }
                });
                scene.add(white[12]);
              });
              //@ts-ignore
              loader.load("threejs/chess/Queen/Queen.gltf", function (object) {
                white[11] = object.scene;
                white[11].position.set(
                  plane[3][0].position.x,
                  plane[3][0].position.y,
                  plane[3][0].position.z
                );
                white[11].scale.set(0.7, 0.7, 0.7);
                white[11].identity = "w3q";
                white[11].name = "30";
                plane[3][0].name = "90";

                white[11].traverse((child, i) => {
                  if (child.isMesh) {
                    child.material = wMaterial;
                    child.material.side = THREE.DoubleSide;
                  }
                });
                scene.add(white[11]);
              });
              // Creo i pezzi neri, per cui vale quando detto per i bianchi
              //@ts-ignore
              loader.load("threejs/chess/Pawn/Pawn.gltf", function (object) {
                black[0] = object.scene;
                black[0].position.set(
                  plane[0][6].position.x,
                  plane[0][6].position.y,
                  plane[0][6].position.z
                );
                black[0].scale.set(0.6, 0.6, 0.6);
                black[0].identity = "b0p";
                black[0].name = "06";
                plane[0][6].name = "-10";

                black[0].traverse((child, i) => {
                  if (child.isMesh) {
                    child.material = bMaterial;
                    child.material.side = THREE.DoubleSide;
                  }
                });
                scene.add(black[0]);
              });
              //@ts-ignore
              loader.load("threejs/chess/Pawn/Pawn.gltf", function (object) {
                black[1] = object.scene;
                black[1].position.set(
                  plane[1][6].position.x,
                  plane[1][6].position.y,
                  plane[1][6].position.z
                );
                black[1].scale.set(0.6, 0.6, 0.6);
                black[1].identity = "b1p";
                black[1].name = "16";
                plane[1][6].name = "-10";

                black[1].traverse((child, i) => {
                  if (child.isMesh) {
                    child.material = bMaterial;
                    child.material.side = THREE.DoubleSide;
                  }
                });
                scene.add(black[1]);
              });
              //@ts-ignore
              loader.load("threejs/chess/Pawn/Pawn.gltf", function (object) {
                black[2] = object.scene;
                black[2].position.set(
                  plane[2][6].position.x,
                  plane[2][6].position.y,
                  plane[2][6].position.z
                );
                black[2].scale.set(0.6, 0.6, 0.6);
                black[2].identity = "b2p";
                black[2].name = "26";
                plane[2][6].name = "-10";

                black[2].traverse((child, i) => {
                  if (child.isMesh) {
                    child.material = bMaterial;
                    child.material.side = THREE.DoubleSide;
                  }
                });
                scene.add(black[2]);
              });
              //@ts-ignore
              loader.load("threejs/chess/Pawn/Pawn.gltf", function (object) {
                black[3] = object.scene;
                black[3].position.set(
                  plane[3][6].position.x,
                  plane[3][6].position.y,
                  plane[3][6].position.z
                );
                black[3].scale.set(0.6, 0.6, 0.6);
                black[3].identity = "b3p";
                black[3].name = "36";
                plane[3][6].name = "-10";

                black[3].traverse((child, i) => {
                  if (child.isMesh) {
                    child.material = bMaterial;
                    child.material.side = THREE.DoubleSide;
                  }
                });
                scene.add(black[3]);
              });
              //@ts-ignore
              loader.load("threejs/chess/Pawn/Pawn.gltf", function (object) {
                black[4] = object.scene;
                black[4].position.set(
                  plane[4][6].position.x,
                  plane[4][6].position.y,
                  plane[4][6].position.z
                );
                black[4].scale.set(0.6, 0.6, 0.6);
                black[4].identity = "b4p";
                black[4].name = "46";
                plane[4][6].name = "-10";

                black[4].traverse((child, i) => {
                  if (child.isMesh) {
                    child.material = bMaterial;
                    child.material.side = THREE.DoubleSide;
                  }
                });
                scene.add(black[4]);
              });
              //@ts-ignore
              loader.load("threejs/chess/Pawn/Pawn.gltf", function (object) {
                black[5] = object.scene;
                black[5].position.set(
                  plane[5][6].position.x,
                  plane[5][6].position.y,
                  plane[5][6].position.z
                );
                black[5].scale.set(0.6, 0.6, 0.6);
                black[5].identity = "b5p";
                black[5].name = "56";
                plane[5][6].name = "-10";

                black[5].traverse((child, i) => {
                  if (child.isMesh) {
                    child.material = bMaterial;
                    child.material.side = THREE.DoubleSide;
                  }
                });
                scene.add(black[5]);
              });
              //@ts-ignore
              loader.load("threejs/chess/Pawn/Pawn.gltf", function (object) {
                black[6] = object.scene;
                black[6].position.set(
                  plane[6][6].position.x,
                  plane[6][6].position.y,
                  plane[6][6].position.z
                );
                black[6].scale.set(0.6, 0.6, 0.6);
                black[6].identity = "b6p";
                black[6].name = "66";
                plane[6][6].name = "-10";

                black[6].traverse((child, i) => {
                  if (child.isMesh) {
                    child.material = bMaterial;
                    child.material.side = THREE.DoubleSide;
                  }
                });
                scene.add(black[6]);
              });
              //@ts-ignore
              loader.load("threejs/chess/Pawn/Pawn.gltf", function (object) {
                black[7] = object.scene;
                black[7].position.set(
                  plane[7][6].position.x,
                  plane[7][6].position.y,
                  plane[7][6].position.z
                );
                black[7].scale.set(0.6, 0.6, 0.6);
                black[7].identity = "b7p";
                black[7].name = "76";
                plane[7][6].name = "-10";

                black[7].traverse((child, i) => {
                  if (child.isMesh) {
                    child.material = bMaterial;
                    child.material.side = THREE.DoubleSide;
                  }
                });
                scene.add(black[7]);
              });
              //@ts-ignore
              loader.load("threejs/chess/Rook/Rook.gltf", function (object) {
                black[8] = object.scene;
                black[8].position.set(
                  plane[0][7].position.x,
                  plane[0][7].position.y,
                  plane[0][7].position.z
                );
                black[8].scale.set(0.7, 0.7, 0.7);
                black[8].identity = "b0r";
                black[8].name = "07";
                plane[0][7].name = "-50";

                black[8].traverse((child, i) => {
                  if (child.isMesh) {
                    child.material = bMaterial;
                    child.material.side = THREE.DoubleSide;
                  }
                });
                scene.add(black[8]);
              });
              //@ts-ignore
              loader.load("threejs/chess/Rook/Rook.gltf", function (object) {
                black[15] = object.scene;
                black[15].position.set(
                  plane[7][7].position.x,
                  plane[7][7].position.y,
                  plane[7][7].position.z
                );
                black[15].scale.set(0.7, 0.7, 0.7);
                black[15].identity = "b7r";
                black[15].name = "77";
                plane[7][7].name = "-50";

                black[15].traverse((child, i) => {
                  if (child.isMesh) {
                    child.material = bMaterial;
                    child.material.side = THREE.DoubleSide;
                  }
                });
                scene.add(black[15]);
              });
              //@ts-ignore
              loader.load(
                "threejs/chess/Knight/Knight.gltf",
                function (object) {
                  black[9] = object.scene;
                  black[9].position.set(
                    plane[1][7].position.x,
                    plane[1][7].position.y,
                    plane[1][7].position.z
                  );
                  black[9].scale.set(0.7, 0.7, 0.7);
                  black[9].identity = "b1n";
                  black[9].name = "17";
                  plane[1][7].name = "-30";

                  black[9].traverse((child, i) => {
                    if (child.isMesh) {
                      child.material = bMaterial;
                      child.material.side = THREE.DoubleSide;
                    }
                  });
                  scene.add(black[9]);
                }
              );
              //@ts-ignore
              loader.load(
                "threejs/chess/Knight/Knight.gltf",
                function (object) {
                  black[14] = object.scene;
                  black[14].position.set(
                    plane[6][7].position.x,
                    plane[6][7].position.y,
                    plane[6][7].position.z
                  );
                  black[14].scale.set(0.7, 0.7, 0.7);
                  black[14].identity = "b6n";
                  black[14].name = "67";
                  plane[6][7].name = "-30";

                  black[14].traverse((child, i) => {
                    if (child.isMesh) {
                      child.material = bMaterial;
                      child.material.side = THREE.DoubleSide;
                    }
                  });
                  scene.add(black[14]);
                }
              );
              //@ts-ignore
              loader.load(
                "threejs/chess/Bishop/Bishop.gltf",
                function (object) {
                  black[10] = object.scene;
                  black[10].position.set(
                    plane[2][7].position.x,
                    plane[2][7].position.y,
                    plane[2][7].position.z
                  );
                  black[10].scale.set(0.7, 0.8, 0.7);
                  black[10].identity = "b2b";
                  black[10].name = "27";
                  plane[2][7].name = "-31";

                  black[10].traverse((child, i) => {
                    if (child.isMesh) {
                      child.material = bMaterial;
                      child.material.side = THREE.DoubleSide;
                    }
                  });
                  scene.add(black[10]);
                }
              );
              //@ts-ignore
              loader.load(
                "threejs/chess/Bishop/Bishop.gltf",
                function (object) {
                  black[13] = object.scene;
                  black[13].position.set(
                    plane[5][7].position.x,
                    plane[5][7].position.y,
                    plane[5][7].position.z
                  );
                  black[13].scale.set(0.7, 0.8, 0.7);
                  black[13].identity = "b5b";
                  black[13].name = "57";
                  plane[5][7].name = "-31";

                  black[13].traverse((child, i) => {
                    if (child.isMesh) {
                      child.material = bMaterial;
                      child.material.side = THREE.DoubleSide;
                    }
                  });
                  scene.add(black[13]);
                }
              );
              //@ts-ignore
              loader.load("threejs/chess/King/King.gltf", function (object) {
                black[12] = object.scene;
                black[12].position.set(
                  plane[4][7].position.x,
                  plane[4][7].position.y,
                  plane[4][7].position.z
                );
                black[12].scale.set(0.7, 0.7, 0.7);
                black[12].identity = "b4k";
                black[12].name = "47";
                plane[4][7].name = "-100";

                black[12].traverse((child, i) => {
                  if (child.isMesh) {
                    child.material = bMaterial;
                    child.material.side = THREE.DoubleSide;
                  }
                });
                scene.add(black[12]);
              });
              //@ts-ignore
              loader.load("threejs/chess/Queen/Queen.gltf", function (object) {
                black[11] = object.scene;
                black[11].position.set(
                  plane[3][7].position.x,
                  plane[3][7].position.y,
                  plane[3][7].position.z
                );
                black[11].scale.set(0.7, 0.7, 0.7);
                black[11].identity = "b3q";
                black[11].name = "37";
                plane[3][7].name = "-90";

                black[11].traverse((child, i) => {
                  if (child.isMesh) {
                    child.material = bMaterial;
                    child.material.side = THREE.DoubleSide;
                  }
                });
                scene.add(black[11]);
              });
            }

            fillBoard();
          }
          // This function that renders the scene
          function render() {
            requestAnimationFrame(render);
            update();
            renderer.render(scene, camera);

            gl.endFrame();
          }

          function bindClick() {
            self.gestureView!!.onTouchDown = (event) => {
              const mouse = new THREE.Vector2();

              mouse.x =
                ((event.x * Environment.screenScale) / window.innerWidth) * 2 -
                1;
              mouse.y =
                -((event.y * Environment.screenScale) / window.innerHeight) *
                  2 +
                1;

              raycaster.setFromCamera(mouse, camera);

              for (let index = 0; index < black.length; index++) {
                var intersects = raycaster.intersectObjects(
                  black[index].children,
                  true
                );

                if (intersects.length > 0) {
                  pieceMove(black[index]);
                }
              }

              for (let index = 0; index < white.length; index++) {
                var intersects = raycaster.intersectObjects(
                  white[index].children,
                  true
                );

                if (intersects.length > 0) {
                  pieceMove(white[index]);
                }
              }

              for (var i = 0; i < 8; i++) {
                for (var j = 0; j < 8; j++) {
                  var intersects = raycaster.intersectObject(moves[i][j], true);
                  if (intersects.length > 0) {
                    moveTo(moves[i][j]);
                  } else {
                    loge("no move touch");
                  }
                }
              }
            };
          }
          //#endregion
        },
      }).apply({
        layoutConfig: layoutConfig().just(),
        width: Environment.screenWidth - 3,
        height: Environment.screenWidth - 3,
      })
    );
  }
}
