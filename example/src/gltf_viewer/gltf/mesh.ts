import { gltfPrimitive } from "./primitive";
import { objectsFromJsons } from "./utils";
import { GltfObject } from "./gltf_object";

class gltfMesh extends GltfObject {
  private primitives: any[];
  private name;
  private weights: any[];

  private weightsAnimated;

  constructor() {
    super();
    this.primitives = [];
    this.name = undefined;
    this.weights = [];

    // non gltf
    this.weightsAnimated = undefined;
  }

  fromJson(jsonMesh) {
    super.fromJson(jsonMesh);

    if (jsonMesh.name !== undefined) {
      this.name = jsonMesh.name;
    }

    this.primitives = objectsFromJsons(jsonMesh.primitives, gltfPrimitive);

    if (jsonMesh.weights !== undefined) {
      this.weights = jsonMesh.weights;
    }
  }

  getWeightsAnimated() {
    return this.weightsAnimated !== undefined
      ? this.weightsAnimated
      : this.weights;
  }
}

export { gltfMesh };
