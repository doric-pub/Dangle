import { imageDecoder, RemoteResource, resourceLoader } from "doric";
import THREE, { Loader } from "three";

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

    const remoteResource = new RemoteResource(link);
    resourceLoader(context)
      .load(remoteResource)
      .then(async (arrayBuffer) => {
        const imageInfo = await imageDecoder(context).getImageInfo(
          remoteResource
        );
        const imagePixels = await imageDecoder(context).decodeToPixels(
          remoteResource
        );

        texture.image = {
          data: new Uint8ClampedArray(imagePixels),
          width: imageInfo.width,
          height: imageInfo.height,
        }

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
