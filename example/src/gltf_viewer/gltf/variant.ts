import { GltfObject } from "./gltf_object";

class gltfVariant extends GltfObject {
  private name;

  constructor() {
    super();
    this.name = undefined;
  }

  fromJson(jsonVariant) {
    if (jsonVariant.name !== undefined) {
      this.name = jsonVariant.name;
    }
  }
}

export { gltfVariant as gltfVariant };
