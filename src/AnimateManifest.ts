import * as Pixim from '@tawaship/pixim.js';
import * as AnimateLoader from './AnimateLoader';

export interface IAnimateManifestTargetDictionary extends Pixim.IManifestTargetDictionary<AnimateLoader.TAnimateLoaderTarget> {

}

export interface IAnimateDictionary extends Pixim.IRawResourceDictionary<AnimateLoader.TAnimateLoaderRawResource> {

}

export class AnimateManifest extends Pixim.ManifestBase<AnimateLoader.TAnimateLoaderTarget, AnimateLoader.TAnimateLoaderRawResource, AnimateLoader.AnimateLoaderResource> {
	protected _createLoader() {
		return new AnimateLoader.AnimateLoader();
	}
}