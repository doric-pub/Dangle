import { GltfObject } from "./gltf_object";
import { GL } from "../Renderer/webgl";

class gltfSampler extends GltfObject {
  private magFilter;
  private minFilter;
  private wrapS;
  private wrapT;
  private name;

  constructor(
    magFilter = GL.LINEAR,
    minFilter = GL.LINEAR_MIPMAP_LINEAR,
    wrapS = GL.REPEAT,
    wrapT = GL.REPEAT,
    name: string | undefined = undefined,
  ) {
    super();
    this.magFilter = magFilter;
    this.minFilter = minFilter;
    this.wrapS = wrapS;
    this.wrapT = wrapT;
    this.name = name;
  }

  static createDefault() {
    return new gltfSampler();
  }
}

export { gltfSampler };
