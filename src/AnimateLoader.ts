import * as Pixim from '@tawaship/pixim.js';
import { loadAssetAsync, IAnimateLibrary } from '@tawaship/pixi-animate-core';
import { CreatejsMovieClip } from './MovieClip';
import { AnimateBlobLoader, TAnimateBlobLoaderTarget, IAnimateBlobLoaderOption } from './AnimateBlobLoader';

/**
 * @ignore
 */
declare const AdobeAn: any;

export type TAnimateLoaderRawResource = IAnimateLibrary;

export class AnimateLoaderResource extends Pixim.LoaderResource<TAnimateLoaderRawResource> {
	destroy() {
		
	}
}

export interface IAnimateLoaderTarget {
	/**
	 * "lib.properties.id" in Animate content.
	 */
	id: string;
	
	/**
	 * Directory path of Animate content.
	 */
	basepath: string;
	
	/**
	 * Javascript file path of Animate content.
	 */
	filepath?: string;
};

export type TAnimateLoaderTarget = IAnimateLoaderTarget;

export interface IAnimateLoaderTargetDictionary extends Pixim.ILoaderTargetDictionary<TAnimateLoaderTarget> {

}

export interface IAnimateLoaderResourceDictionary extends Pixim.ILoaderResourceDictionary<TAnimateLoaderRawResource> {

}

export interface IAnimateLoaderOption extends Pixim.ILoaderOption {
	/**
	 * Animate javascript file version.
	 */
	fileVersion?: string | number;
	
	/**
	 * Animate assets version.
	 */
	assetVersion?: string | number;
	
	/**
	 * Whether use cross-origin flag.<br />
	 * Default is `true`.
	 * 
	 */
	crossOrigin?: boolean;
}

export interface IAnimateManifest {
	src: string;
	id: string;
	type?: string;
	crossOrigin?: boolean;
	[key: string]: any;
}

export class AnimateLoader extends Pixim.LoaderBase<TAnimateLoaderTarget, TAnimateLoaderRawResource, AnimateLoaderResource> {
	protected _loadAsync(target: TAnimateLoaderTarget, options: IAnimateLoaderOption = {}) {
		return this._loadJsAsync(target, options)
			.then(() => {
				const comp = AdobeAn.getComposition(target.id);
				if (!comp) {
					throw new Error(`no composition: ${target.id}`);
				}
				
				const lib: IAnimateLibrary = comp.getLibrary();
				const manifests: IAnimateManifest[] = lib.properties.manifest;
				const version = options.assetVersion || '';
				
				for (let i = 0; i < manifests.length; i++) {
					const manifest = manifests[i];
					
					manifest.src = Pixim.utils.resolveUri(target.basepath, manifest.src, version);
				}
				
				return this._prepareImagesAsync(manifests, options)
					.then(() => {
						const crossOrigin = typeof(options.crossOrigin) === 'boolean' ? options.crossOrigin : true;
						
						for (let i = 0; i < manifests.length; i++) {
							const manifest = manifests[i];
							
							if (crossOrigin) {
								manifest.crossOrigin = true;
							}
							
							if (!Pixim.utils.isUrl(manifest.src)) {
								manifest.type = 'image';
							}
						}
						
						return loadAssetAsync(comp);
					});
			})
			.then(lib => {
				for (let i  in lib) {
					if (lib[i].prototype instanceof CreatejsMovieClip) {
						lib[i].prototype._framerateBase = lib.properties.fps;
					}
				}
				
				return new AnimateLoaderResource(lib, null);
			})
			.catch(e => new AnimateLoaderResource({}, e));
	}
	
	private _loadJsAsync(target: TAnimateLoaderTarget, options: IAnimateLoaderOption) {
		if (!target.filepath) {
			return Promise.resolve();
		}
		
		const filepath = Pixim.utils.resolveUri(target.basepath, target.filepath);
		
		const loader = new Pixim.JsLoader();
		
		return loader.loadAsync(filepath, Object.assign({}, options, { version: options.fileVersion || options.version }))
			.then(resource => {
				if (resource.error) {
					throw resource.error;
				}
				
				resource.ref();
			});
	}
	
	private _prepareImagesAsync(manifests: IAnimateManifest[], options: IAnimateLoaderOption) {
		const targets: Pixim.ILoaderTargetDictionary<TAnimateBlobLoaderTarget> = {};
		
		for (let i = 0; i < manifests.length; i++) {
			const manifest = manifests[i];
			
			if (!Pixim.utils.isUrl(manifest.src)) {
				continue;
			}
			
			targets[i] = manifest.src;
		}
		
		if (Object.keys(targets).length === 0) {
			return Promise.resolve();
		}
		
		const loader = new AnimateBlobLoader();
		
		return loader.loadAllAsync(targets, Object.assign({}, options, { version: options.assetVersion || options.version }))
			.then(resources => {
				for (let i in resources) {
					const resource = resources[i];
					
					if (resource.error) {
						throw resource.error;
					}
					
					if (!resource.data) {
						throw 'invalid resource';
					}
					
					const _i = Number(i);
					
					if (!manifests[_i]) {
						continue;
					}
					
					manifests[_i].src = resources[i].data.src;
				}
			});
	}
}