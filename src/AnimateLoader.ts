import * as Pixim from '@tawaship/pixim.js';
import { loadAssetAsync, IAnimateLibrary, IAnimateLoadAssetOption, IAnimateManifest, IAnimatePrepareTarget } from '@tawaship/pixi-animate-container';
import { AnimateBlobLoader, TAnimateBlobLoaderTarget } from './AnimateBlobLoader';

/**
 * @ignore
 */
declare const AdobeAn: any;

export type TAnimateLoaderRawResource = IAnimateLibrary;

export class AnimateLoaderResource extends Pixim.LoaderResource<TAnimateLoaderRawResource> {
	destroy() {
		
	}
}

export interface IAnimateLoaderTarget extends IAnimatePrepareTarget {
	/**
	 * Javascript file path of Animate content.
	 */
	filepath?: string;

	options?: IAnimateLoadAssetOption & {
		/**
		 * Additional processing handlers for lib.properties.manifest.
		 * 
		 * Changes made by this process are temporary and will only be reflected in the current load process.
		 */
		handleManifest?: (manifests: IAnimateManifest[]) => Promise<void>;
	};
};

export type TAnimateLoaderTarget = IAnimateLoaderTarget;

export interface IAnimateLoaderTargetDictionary extends Pixim.ILoaderTargetDictionary<TAnimateLoaderTarget> {

}

export interface IAnimateLoaderResourceDictionary extends Pixim.ILoaderResourceDictionary<TAnimateLoaderRawResource> {

}

export interface IAnimateLoaderOption extends Pixim.ILoaderOption, IAnimateLoadAssetOption {
	/**
	 * Animate javascript file version.
	 */
	fileVersion?: string | number;
	
	/**
	 * Animate assets version.
	 */
	assetVersion?: string | number;
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
				const originalManifests: IAnimateManifest[] = lib.properties.manifest;
				const manifests = lib.properties.manifest = originalManifests.map<IAnimateManifest>((v: any) => {
					return JSON.parse(JSON.stringify(v));
				});

				return (target.options?.handleManifest ? target.options.handleManifest(manifests) : Promise.resolve())
					.then(() => {
						const _target = Object.assign({}, target);
						_target.basepath = Pixim.utils.resolvePath(options.basepath || "", target.basepath);

						return this._prepareAssetsAsync(_target.basepath || "", manifests, options)
							.then(() => {
								const version = options.assetVersion || options.version || '';
								for (let i = 0; i < manifests.length; i++) {
									const manifest = manifests[i];
									manifest.src = Pixim.utils.resolveUri("", manifest.src, version);
								}

								return loadAssetAsync(_target);
							})
							.then((_lib: IAnimateLibrary) => {
								lib.properties.manifest = originalManifests;
								return _lib;
							});
					})
			})
			.then(lib => {
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
	
	private _prepareAssetsAsync(basepath: string, manifests: IAnimateManifest[], options: IAnimateLoaderOption) {
		const targets: Pixim.ILoaderTargetDictionary<TAnimateBlobLoaderTarget> = {};
		
		if (!options.xhr)  {
			return Promise.resolve();
		}
		
		for (let i = 0; i < manifests.length; i++) {
			const manifest = manifests[i];
			
			if (!Pixim.utils.isUrl(manifest.src)) {
				continue;
			}
			
			targets[i] = Pixim.utils.resolveUri(basepath, manifest.src);
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
					
					manifests[_i].src = resource.data.src;
					manifests[_i].type = resource.data.type.split("/")[0];
				}
			});
	}
}