import { initGlForMembers, fromKeys } from "./utils";

// base class for all gltf objects
class GltfObject {
  protected extensions;
  private extras;

  constructor() {
    this.extensions = undefined;
    this.extras = undefined;
  }

  fromJson(json) {
    fromKeys(this, json);
  }

  initGl(gltf, webGlContext) {
    initGlForMembers(this, gltf, webGlContext);
  }
}

export { GltfObject };
