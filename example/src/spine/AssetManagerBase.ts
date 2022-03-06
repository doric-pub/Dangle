/******************************************************************************
 * Spine Runtimes License Agreement
 * Last updated January 1, 2020. Replaces all prior versions.
 *
 * Copyright (c) 2013-2020, Esoteric Software LLC
 *
 * Integration of the Spine Runtimes into software or otherwise creating
 * derivative works of the Spine Runtimes is permitted under the terms and
 * conditions of Section 2 of the Spine Editor License Agreement:
 * http://esotericsoftware.com/spine-editor-license
 *
 * Otherwise, it is permitted to integrate the Spine Runtimes into software
 * or otherwise create derivative works of the Spine Runtimes (collectively,
 * "Products"), provided that each user of the Products must obtain their own
 * Spine Editor license and redistribution of the Products in any form must
 * include this license and copyright notice.
 *
 * THE SPINE RUNTIMES ARE PROVIDED BY ESOTERIC SOFTWARE LLC "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ESOTERIC SOFTWARE LLC BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES,
 * BUSINESS INTERRUPTION, OR LOSS OF USE, DATA, OR PROFITS) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THE SPINE RUNTIMES, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *****************************************************************************/

import { Texture, TextureAtlas, Disposable, StringMap } from "@esotericsoftware/spine-core";
import { AssetsResource, imageDecoder, resourceLoader } from "doric";

export class AssetManagerBase implements Disposable {
	private pathPrefix: string | null = null;
	private textureLoader: (imagePixels: ArrayBuffer, width: number, height: number) => Texture;
	private downloader: Downloader;
	private assets: StringMap<any> = {};
	private errors: StringMap<string> = {};
	private toLoad = 0;
	private loaded = 0;

	constructor (textureLoader: (imagePixels: ArrayBuffer, width: number, height: number) => Texture, pathPrefix: string = "", downloader: Downloader | null = null) {
		this.textureLoader = textureLoader;
		this.pathPrefix = pathPrefix;
		this.downloader = downloader || new Downloader();
	}

	private start (path: string): string {
		this.toLoad++;
		return this.pathPrefix + path;
	}

	private success (callback: (path: string, data: any) => void, path: string, asset: any) {
		this.toLoad--;
		this.loaded++;
		this.assets[path] = asset;
		if (callback) callback(path, asset);
	}

	private error (callback: (path: string, message: string) => void, path: string, message: string) {
		this.toLoad--;
		this.loaded++;
		this.errors[path] = message;
		if (callback) callback(path, message);
	}

	setRawDataURI (path: string, data: string) {
		this.downloader.rawDataUris[this.pathPrefix + path] = data;
	}

	loadBinary (path: string,
		success: ((path: string, binary: Uint8Array) => void) | null = null,
		error: ((path: string, message: string) => void) | null = null) {
		path = this.start(path);

		this.downloader.downloadBinary(path, (data: Uint8Array): void => {
			//@ts-ignore
			this.success(success, path, data);
		}, (status: number, responseText: string): void => {
			//@ts-ignore
			this.error(error, path, `Couldn't load binary ${path}: status ${status}, ${responseText}`);
		});
	}

	loadText (path: string,
		success: ((path: string, text: string) => void) | null = null,
		error: ((path: string, message: string) => void) | null = null) {
		path = this.start(path);

		this.downloader.downloadText(path, (data: string): void => {
			//@ts-ignore
			this.success(success, path, data);
		}, (status: number, responseText: string): void => {
			//@ts-ignore
			this.error(error, path, `Couldn't load text ${path}: status ${status}, ${responseText}`);
		});
	}

	loadJson (path: string,
		success: ((path: string, object: object) => void) | null = null,
		error: ((path: string, message: string) => void) | null = null) {
		path = this.start(path);

		this.downloader.downloadJson(path, (data: object): void => {
			//@ts-ignore
			this.success(success, path, data);
		}, (status: number, responseText: string): void => {
			//@ts-ignore
			this.error(error, path, `Couldn't load JSON ${path}: status ${status}, ${responseText}`);
		});
	}

	loadTexture (path: string,
		success: ((path: string, texture: Texture) => void) | null = null,
		error: ((path: string, message: string) => void) | null = null) {
		path = this.start(path);

		const assetsResource = new AssetsResource(path)
		imageDecoder(context).getImageInfo(assetsResource)
		.then(({width, height}) => {
			imageDecoder(context).decodeToPixels(assetsResource)
			.then((imagePixels) => {
				//@ts-ignore
				this.success(success, path, this.textureLoader(imagePixels, width, height));
			})
		})
	}

	loadTextureAtlas (path: string,
		success: ((path: string, atlas: TextureAtlas) => void) | null = null,
		error: ((path: string, message: string) => void) | null = null,
		fileAlias: { [keyword: string]: string } | null = null
	) {
		let index = path.lastIndexOf("/");
		let parent = index >= 0 ? path.substring(0, index + 1) : "";
		path = this.start(path);

		this.downloader.downloadText(path, (atlasText: string): void => {
			try {
				let atlas = new TextureAtlas(atlasText);
				let toLoad = atlas.pages.length, abort = false;
				for (let page of atlas.pages) {
					this.loadTexture(fileAlias == null ? parent + page.name : fileAlias[page.name],
						(imagePath: string, texture: Texture) => {
							if (!abort) {
								page.setTexture(texture);
								//@ts-ignore
								if (--toLoad == 0) this.success(success, path, atlas);
							}
						},
						(imagePath: string, message: string) => {
							//@ts-ignore
							if (!abort) this.error(error, path, `Couldn't load texture atlas ${path} page image: ${imagePath}`);
							abort = true;
						}
					);
				}
			} catch (e) {
				//@ts-ignore
				this.error(error, path, `Couldn't parse texture atlas ${path}: ${e.message}`);
			}
		}, (status: number, responseText: string): void => {
			//@ts-ignore
			this.error(error, path, `Couldn't load texture atlas ${path}: status ${status}, ${responseText}`);
		});
	}

	get (path: string) {
		return this.assets[this.pathPrefix + path];
	}

	require (path: string) {
		path = this.pathPrefix + path;
		let asset = this.assets[path];
		if (asset) return asset;
		let error = this.errors[path];
		throw Error("Asset not found: " + path + (error ? "\n" + error : ""));
	}

	remove (path: string) {
		path = this.pathPrefix + path;
		let asset = this.assets[path];
		if ((<any>asset).dispose) (<any>asset).dispose();
		delete this.assets[path];
		return asset;
	}

	removeAll () {
		for (let key in this.assets) {
			let asset = this.assets[key];
			if ((<any>asset).dispose) (<any>asset).dispose();
		}
		this.assets = {};
	}

	isLoadingComplete (): boolean {
		return this.toLoad == 0;
	}

	getToLoad (): number {
		return this.toLoad;
	}

	getLoaded (): number {
		return this.loaded;
	}

	dispose () {
		this.removeAll();
	}

	hasErrors () {
		return Object.keys(this.errors).length > 0;
	}

	getErrors () {
		return this.errors;
	}
}

export class Downloader {
	private callbacks: StringMap<Array<Function>> = {};
	rawDataUris: StringMap<string> = {};

	dataUriToString (dataUri: string) {
		if (!dataUri.startsWith("data:")) {
			throw new Error("Not a data URI.");
		}

		let base64Idx = dataUri.indexOf("base64,");
		if (base64Idx != -1) {
			base64Idx += "base64,".length;
			return atob(dataUri.substr(base64Idx));
		} else {
			return dataUri.substr(dataUri.indexOf(",") + 1);
		}
	}

	base64ToUint8Array (base64: string) {
		var binary_string = window.atob(base64);
		var len = binary_string.length;
		var bytes = new Uint8Array(len);
		for (var i = 0; i < len; i++) {
			bytes[i] = binary_string.charCodeAt(i);
		}
		return bytes;
	}

	dataUriToUint8Array (dataUri: string) {
		if (!dataUri.startsWith("data:")) {
			throw new Error("Not a data URI.");
		}

		let base64Idx = dataUri.indexOf("base64,");
		if (base64Idx == -1) throw new Error("Not a binary data URI.");
		base64Idx += "base64,".length;
		return this.base64ToUint8Array(dataUri.substr(base64Idx));
	}

	downloadText (url: string, success: (data: string) => void, error: (status: number, responseText: string) => void) {
		if (this.start(url, success, error)) return;
		if (this.rawDataUris[url]) {
			try {
				let dataUri = this.rawDataUris[url];
				this.finish(url, 200, this.dataUriToString(dataUri));
			} catch (e) {
				this.finish(url, 400, JSON.stringify(e));
			}
			return;
		}

		const assetsResource = new AssetsResource(url)
		resourceLoader(context).load(assetsResource).then((value) => {
			const array = new Uint8Array(value);
			let text = "";
			for (let index = 0; index < array.length; index++) {
				text += String.fromCharCode(array[index]);
			}
			this.finish(url, 200, text);
		})
	}

	downloadJson (url: string, success: (data: object) => void, error: (status: number, responseText: string) => void) {
		this.downloadText(url, (data: string): void => {
			success(JSON.parse(data));
		}, error);
	}

	downloadBinary (url: string, success: (data: Uint8Array) => void, error: (status: number, responseText: string) => void) {
		if (this.start(url, success, error)) return;
		if (this.rawDataUris[url]) {
			try {
				let dataUri = this.rawDataUris[url];
				this.finish(url, 200, this.dataUriToUint8Array(dataUri));
			} catch (e) {
				this.finish(url, 400, JSON.stringify(e));
			}
			return;
		}

		const assetsResource = new AssetsResource(url)
		resourceLoader(context).load(assetsResource).then((value) => {
			this.finish(url, 200, new Uint8Array(value));
		})
	}

	private start (url: string, success: any, error: any) {
		let callbacks = this.callbacks[url];
		try {
			if (callbacks) return true;
			this.callbacks[url] = callbacks = [];
		} finally {
			callbacks.push(success, error);
		}
	}

	private finish (url: string, status: number, data: any) {
		let callbacks = this.callbacks[url];
		delete this.callbacks[url];
		let args = status == 200 || status == 0 ? [data] : [status, data];
		for (let i = args.length - 1, n = callbacks.length; i < n; i += 2)
			callbacks[i].apply(null, args);
	}
}
