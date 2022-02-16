import * as PIXI from 'pixi.js';
import * as Pixim from '@tawaship/pixim.js';
import { loadAssetAsync, ILoadAssetOption, IAnimateLibrary } from '@tawaship/pixi-animate-core';
import { CreatejsMovieClip } from './MovieClip';
import loadJS from './loadJS';

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
	 * [[https://tawaship.github.io/pixi-animate-core/interfaces/iloadassetoption.html | PixiAnimateCore.ILoadAssetOption]]
	 */
	options?: ILoadAssetOption;
	
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
	
}

export class AnimateLoader extends Pixim.LoaderBase<TAnimateLoaderTarget, TAnimateLoaderRawResource> {
	loadAsync(target: TAnimateLoaderTarget, options: IAnimateLoaderOption = {}) {
		return this._loadAsync(target, options);
	}
	
	loadAllAsync(targets: IAnimateLoaderTargetDictionary, options: IAnimateLoaderOption = {}) {
		const res: Pixim.ILoaderResourceDictionary<TAnimateLoaderRawResource>  = {};
		
		if (Object.keys(targets).length === 0) {
			return Promise.resolve(res);
		}
		
		const promises = [];
		
		for (let i in targets) {
			promises.push(
				this.loadAsync(targets[i], options)
					.then((resource: AnimateLoaderResource) => {
						res[i] = resource;
					})
			);
		}
		
		return Promise.all(promises)
			.then(() => {
				return res;
			});
	}
	
	private _loadAsync(target: TAnimateLoaderTarget, options: IAnimateLoaderOption = {}) {
		if (!AdobeAn) {
			return Promise.reject('createjs is not loaded');
		}
		
		const basepath = this._resolveBasepath(options.basepath);
		const dirpath = Pixim.utils.resolvePath(target.basepath, basepath);
		
		const p = !target.filepath
			? Promise.resolve()
			: (() => {
				const filepath = Pixim.utils.resolvePath(target.filepath, dirpath);
				
				const url = this._resolveUrl(filepath, options)
				
				return loadJS(url)
					.catch(e => {
						throw `Animate: '${url}' cannot load.`;
					});
			})();
		
		return p.then(() => {
			const comp = AdobeAn.getComposition(target.id);
			if (!comp) {
				throw new Error(`no composition: ${target.id}`);
			}
			
			const lib: IAnimateLibrary = comp.getLibrary();
			const origin = lib.properties.manifest;
			for (let i = 0; i < origin.length; i++) {
				const o = origin[i];
				o.src = this._resolveUrl(o.src, options);
			}
			
			if (target.options && !target.options.crossOrigin) {
				target.options.crossOrigin = true;
			}
			
			return loadAssetAsync(comp, dirpath, target.options);
		})
		.then((lib: IAnimateLibrary) => {
			for (let i  in lib) {
				if (lib[i].prototype instanceof CreatejsMovieClip) {
					lib[i].prototype._framerateBase = lib.properties.fps;
				}
			}
			
			return new AnimateLoaderResource(lib, null);
		})
		.catch((e: any) => {
			return new AnimateLoaderResource({}, e);
		});
	}
}