import { AssetsResource, imageDecoder, resourceLoader } from "doric";
import * as THREE from "three";
import { Loader } from "three";

class TextureLoader extends Loader {
  constructor(manager) {
    super(manager);
  }

  load(url, onLoad, onProgress, onError) {
    let texture = new THREE.DataTexture();
    texture.format = THREE.RGBAFormat;

    let link;
    if (this.path !== "" && this.path !== undefined) {
      link = this.path + url;
    } else {
      link = url;
    }

    const assetsResource = new AssetsResource(link);
    resourceLoader(context)
      .load(assetsResource)
      .then(async (arrayBuffer) => {
        const imageInfo = await imageDecoder(context).getImageInfo(
          assetsResource
        );
        const imagePixels = await imageDecoder(context).decodeToPixels(
          assetsResource
        );

        texture.image = {
          data: new Uint8ClampedArray(imagePixels),
          width: imageInfo.width,
          height: imageInfo.height,
          colorSpace: "srgb",
        };

        texture.needsUpdate = true;

        if (onLoad !== undefined) {
          onLoad(texture);
        }
      })
      .catch((reason) => {
        onError();
      });

    return texture;
  }
}

export { TextureLoader };
