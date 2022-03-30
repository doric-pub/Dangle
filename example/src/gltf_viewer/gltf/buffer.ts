import { getContainingFolder } from "./utils";
import { GltfObject } from "./gltf_object";

class gltfBuffer extends GltfObject {
  private uri;
  byteLength;
  private name;
  buffer;

  constructor() {
    super();
    this.uri = undefined;
    this.byteLength = undefined;
    this.name = undefined;

    // non gltf
    this.buffer = undefined; // raw data blob
  }

  load(gltf, additionalFiles = undefined) {
    if (this.buffer !== undefined) {
      console.error("buffer has already been loaded");
      return;
    }

    const self = this;
    return new Promise(function (resolve) {
      if (
        !self.setBufferFromFiles(additionalFiles, resolve) &&
        !self.setBufferFromUri(gltf, resolve)
      ) {
        console.error("Was not able to resolve buffer with uri '%s'", self.uri);
        resolve();
      }
    });
  }

  setBufferFromUri(gltf, callback) {
    if (this.uri === undefined) {
      return false;
    }

    const self = this;
    axios
      .get(getContainingFolder(gltf.path) + this.uri, {
        responseType: "arraybuffer",
      })
      .then(function (response) {
        self.buffer = response.data;
        callback();
      });
    return true;
  }

  setBufferFromFiles(files, callback) {
    if (this.uri === undefined || files === undefined) {
      return false;
    }

    const self = this;
    const foundFile = files.find(function (file) {
      if (file.name === self.uri || file.fullPath === self.uri) {
        return true;
      }
    }, this);

    if (foundFile === undefined) {
      return false;
    }

    const reader = new FileReader();
    reader.onloadend = function (event) {
      self.buffer = event.target.result;
      callback();
    };
    reader.readAsArrayBuffer(foundFile);

    return true;
  }
}

export { gltfBuffer };
