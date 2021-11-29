import { imageDecoder, RemoteResource, resourceLoader } from 'doric';
import THREE, {Loader } from 'three';

class TextureLoader extends Loader {

	constructor( manager ) {

		super( manager );

	}

	load( url, onLoad, onProgress, onError ) {

		let texture

        const remoteResource = new RemoteResource(url)
        resourceLoader(context).load(remoteResource)
            .then(async (arrayBuffer) => {
                const imageInfo = await imageDecoder(context).getImageInfo(remoteResource)
                const imagePixels = await imageDecoder(context).decodeToPixels(remoteResource)

                texture = new THREE.DataTexture(imagePixels, imageInfo.width, imageInfo.height, THREE.RGBAFormat,);

                texture.needsUpdate = true;

                if ( onLoad !== undefined ) {

                    onLoad( texture );

                }
            })
            .catch((reason) => {
                onError()
            })

		return texture;

	}

}


export { TextureLoader };