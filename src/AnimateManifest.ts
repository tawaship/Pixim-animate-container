import * as Pixim from '@tawaship/pixim.js';
import * as AnimateLoader from './AnimateLoader';
import * as utils from '../utils/index';

export interface IAnimateManifestTargetDictionary extends Pixim.IManifestTargetDictionary<AnimateLoader.TAnimateLoaderTarget> {

}

export interface IAnimateDictionary extends Pixim.IRawResourceDictionary<AnimateLoader.TAnimateLoaderRawResource> {

}

export class AnimateManifest extends Pixim.ManifestBase<AnimateLoader.TAnimateLoaderTarget, AnimateLoader.TAnimateLoaderRawResource> {
	protected _createLoader() {
		return new AnimateLoader.AnimateLoader();
	}
	
	protected _loadAsync(targets: IAnimateManifestTargetDictionary, options: AnimateLoader.IAnimateLoaderOption = {}) {
		const loader = new AnimateLoader.AnimateLoader(options);
		
		return this._doneLoaderAsync(loader, targets);
	}
	
	protected _resolveTarget(target: AnimateLoader.TAnimateLoaderTarget, options: ManifestBase.IManifestLoaderOption = {}) {
		target.basepath = utils.resolvePath(options.basepath, target.basepath);
		
		if (target.filepath) {
			const preUri = utils.resolvePath(target.basepath, target.filepath);
			target.filepath = options.version ? utils.resolveQuery(preUri, { _fv: options.version }) : preUri;
		}
		
		return target;
	}
	
	protected _getAppendOption(options: ManifestBase.IManifestLoaderOption = {}): AnimateLoader.IAnimateLoaderOption {
		return {
			version: options.version
		};
	}
}