import { ManifestBase } from '@tawaship/pixim.js';
import { AnimateLoader, AnimateLoaderResource, TAnimateLoaderRawResource, TAnimateLoaderTarget } from './AnimateLoader';
export declare class AnimateManifest extends ManifestBase<TAnimateLoaderTarget, TAnimateLoaderRawResource, AnimateLoaderResource> {
    protected _createLoader(): AnimateLoader;
}
