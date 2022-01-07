import { AssetsResource, resourceLoader } from 'doric';
import { Cache, Loader } from 'three';

const loading = {};

class FileLoader extends Loader {

	constructor( manager ) {

		super( manager );

	}

	load( url, onLoad, onProgress, onError ) {

		if ( url === undefined ) url = '';

		if ( this.path !== undefined ) url = this.path + url;

		url = this.manager.resolveURL( url );

		const cached = Cache.get( url );

		if ( cached !== undefined ) {

			this.manager.itemStart( url );

			setTimeout( () => {

				if ( onLoad ) onLoad( cached );

				this.manager.itemEnd( url );

			}, 0 );

			return cached;

		}

		// Check if request is duplicate

		if ( loading[ url ] !== undefined ) {

			loading[ url ].push( {

				onLoad: onLoad,
				onProgress: onProgress,
				onError: onError

			} );

			return;

		}

		// Initialise array for duplicate requests
		loading[ url ] = [];

		loading[ url ].push( {
			onLoad: onLoad,
			onProgress: onProgress,
			onError: onError,
		} );

		// start the fetch
		const assetsResource = new AssetsResource(url)
		resourceLoader(context).load(assetsResource)
			.then((data) => {
				// Add to cache only on HTTP success, so that we do not cache
				// error response bodies as proper responses to requests.
				Cache.add( url, data );

				const callbacks = loading[ url ];
				delete loading[ url ];

				for ( let i = 0, il = callbacks.length; i < il; i ++ ) {

					const callback = callbacks[ i ];
					if ( callback.onLoad ) callback.onLoad( data );

				}

				this.manager.itemEnd( url );
			})
			.catch((reason) => {
				// Abort errors and other errors are handled the same

				const callbacks = loading[ url ];
				delete loading[ url ];

				for ( let i = 0, il = callbacks.length; i < il; i ++ ) {

					const callback = callbacks[ i ];
					if ( callback.onError ) callback.onError( reason );

				}

				this.manager.itemError( url );
				this.manager.itemEnd( url );
			})

		this.manager.itemStart( url );

	}

	setResponseType( value ) {
		//@ts-ignore
		this.responseType = value;
		return this;

	}

	setMimeType( value ) {
		//@ts-ignore
		this.mimeType = value;
		return this;

	}

}


export { FileLoader };