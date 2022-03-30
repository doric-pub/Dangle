import { GltfObject } from "./gltf_object";

class gltfAnimationChannel extends GltfObject {
  private target;
  private sampler;

  constructor() {
    super();
    this.target = { node: undefined, path: undefined };
    this.sampler = undefined;
  }
}

const InterpolationPath = {
  TRANSLATION: "translation",
  ROTATION: "rotation",
  SCALE: "scale",
  WEIGHTS: "weights",
};

export { gltfAnimationChannel, InterpolationPath };
