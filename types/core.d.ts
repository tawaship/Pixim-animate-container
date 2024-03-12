import { Content as PiximContent } from '@tawaship/pixim.js';
import { IAnimateManifestTargetDictionary } from './AnimateManifest';
export { ILoadAssetOption, IAnimateLibrary } from '@tawaship/pixi-animate-container';
/**
 * Define animate assets for class.
 *
 * @param PiximContent Target [[https://tawaship.github.io/Pixim.js/classes/content.html | Pixim.Content]] class.
 */
export declare function defineAnimatesTo(Content: typeof PiximContent, data: IAnimateManifestTargetDictionary): void;
/**
 * Define animate assets for instance.
 *
 * @param PiximContent Target [[https://tawaship.github.io/Pixim.js/classes/content.html | Pixim.Content]] instance.
 */
export declare function addAnimatesTo(content: PiximContent, data: IAnimateManifestTargetDictionary): void;
