import { Content as PiximContent } from '@tawaship/pixim.js';
import { AnimateManifest, IAnimateManifestTargetDictionary } from './AnimateManifest';

PiximContent.registerManifest('animates', AnimateManifest);

/**
 * Define animate assets for class.
 * 
 * @param Content Target {@link https://tawaship.github.io/Pixim.js/classes/content.html | Pixim.Content} class.
 */
export function defineAnimatesTo(Content: typeof PiximContent, data: IAnimateManifestTargetDictionary) {
	Content.defineTargets('animates', data, {});
}

/**
 * Define animate assets for instance.
 * 
 * @param content Target {@link https://tawaship.github.io/Pixim.js/classes/content.html | Pixim.Content} instance.
 */
export function addAnimatesTo(content: PiximContent, data: IAnimateManifestTargetDictionary) {
	content.addTargets('animates', data, {});
}