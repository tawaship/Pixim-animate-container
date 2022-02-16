import * as Pixim from '@tawaship/pixim.js';
import * as AnimateLoader from './AnimateLoader';

export interface IAnimateManifestTargetDictionary extends Pixim.IManifestTargetDictionary<AnimateLoader.TAnimateLoaderTarget> {

}

export interface IAnimateDictionary extends Pixim.IRawResourceDictionary<AnimateLoader.TAnimateLoaderRawResource> {

}

export class AnimateManifest extends Pixim.ManifestBase<AnimateLoader.TAnimateLoaderTarget, AnimateLoader.TAnimateLoaderRawResource> {
	protected _loadAsync(targets: IAnimateManifestTargetDictionary, options: AnimateLoader.IAnimateLoaderOption = {}) {
		const loader = new AnimateLoader.AnimateLoader(options);
		
		return loader.loadAllAsync(targets);
	}
}