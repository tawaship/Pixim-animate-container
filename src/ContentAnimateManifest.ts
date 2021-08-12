import { ContentManifestBase, ILoadedResourceDictionary, IResourceDictionary } from '@tawaship/pixim.js';
import { loadAssetAsync as _loadAssetAsync, ILoadAssetOption, IAnimateLibrary } from '@tawaship/pixi-animate-core';
import { CreatejsMovieClip } from './MovieClip';
import loadJS from './loadJS';

/**
 * @ignore
 */
declare const AdobeAn: any;

export interface IPrepareTarget {
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
};

/**
 * Load the assets of createjs content published by Adobe Animate.
 * If you use multiple contents, each composition ID must be unique.
 * Please run "Pixim.animate.init" before running.
 */
export function loadAssetAsync(targets: IPrepareTarget | IPrepareTarget[]) {
	if (!Array.isArray(targets)) {
		targets = [targets];
	}
	
	const promises: Promise<IAnimateLibrary>[] = [];
	
	for (let i = 0; i < targets.length; i++) {
		const target = targets[i];
		
		const comp = AdobeAn.getComposition(target.id);
		if (!comp) {
			throw new Error(`no composition: ${target.id}`);
		}
		
		promises.push(_loadAssetAsync(comp, target.basepath, target.options)
			.then((lib: IAnimateLibrary) => {
				for (let i  in lib) {
					if (lib[i].prototype instanceof CreatejsMovieClip) {
						lib[i].prototype._framerateBase = lib.properties.fps;
					}
				}
				
				return lib;
			})
		);
	}
	
	return Promise.all(promises)
		.then((resolvers: IAnimateLibrary[]) => {
			if (resolvers.length === 1) {
				return resolvers[0];
			}
			
			return resolvers;
		});
}

export interface ILoadedAnimateResourceDictionary extends ILoadedResourceDictionary<IAnimateLibrary> {
}

export interface IContentAnimateManifestData extends IPrepareTarget {
	/**
	 * Javascript file path of Animate content.
	 */
	filepath: string;
}

export class ContentAnimateManifest extends ContentManifestBase<IContentAnimateManifestData, IAnimateLibrary> {
	/**
	 * Load image resources.
	 * 
	 * @override
	 */
	protected _loadAsync(basepath: string, version: string, useCache: boolean): Promise<ILoadedAnimateResourceDictionary> {
		const manifests = this._manifests;
		
		const promises: Promise<void>[] = [];
		
		for (let i in manifests) {
			const manifest = manifests[i];
			const dirpath = this._resolvePath(manifest.data.basepath, basepath);
			const filepath = this._resolvePath(manifest.data.filepath, dirpath);
			const url =
				version
				?`${filepath}${filepath.match(/\?/) ? '&' : '?'}_fv=${version}`
				: filepath;
			
			promises.push(
				loadJS(url)
					.catch(e => {
						throw `Animate: '${i}' cannot load.`;
					})
			)
		}
		
		const keys: string[] = [];
		const res: ILoadedAnimateResourceDictionary = {};
		return Promise.all(promises)
			.then(() => {
				const targets: IPrepareTarget[] = [];
				
				for (let i in manifests) {
					const manifest = manifests[i];
					keys.push(i);
					
					targets.push({
						id: manifest.data.id,
						basepath: this._resolvePath(manifest.data.basepath, basepath),
						options: manifest.data.options
					});
				}
				
				return loadAssetAsync(targets);
			})
			.then(libs => {
				if (!Array.isArray(libs)) {
					libs = [ libs ];
				}
				
				for (let i = 0; i < libs.length; i++) {
					res[keys[i]] = {
						resource: libs[i],
						error: false
					};
				}
				
				return res;
			});
	}
	
	/**
	 * Destroy resources.
	 * 
	 * @override
	 */
	destroyResources(resources: IResourceDictionary<IAnimateLibrary>) {
		
	}
}