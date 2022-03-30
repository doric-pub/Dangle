import { GltfObject } from "./gltf_object";

class gltfBufferView extends GltfObject {
  buffer;
  private byteOffset: number;
  byteLength;
  private byteStride: number;
  target;
  name;

  constructor() {
    super();
    this.buffer = undefined;
    this.byteOffset = 0;
    this.byteLength = undefined;
    this.byteStride = 0;
    this.target = undefined;
    this.name = undefined;
  }
}

export { gltfBufferView };
