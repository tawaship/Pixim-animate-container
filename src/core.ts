import { Content as PiximContent } from '@tawaship/pixim.js';
import { CreatejsMovieClip } from './MovieClip';
import { CreatejsBitmap } from './Bitmap';
import { CreatejsSprite } from './Sprite';
import { AnimateManifest, IAnimateManifestTargetDictionary } from './AnimateManifest';
import { createjs } from '@tawaship/pixi-animate-core';
export { createjs, ILoadAssetOption, IAnimateLibrary } from '@tawaship/pixi-animate-core';

PiximContent.registerManifest('animates', AnimateManifest);

/**
 * Define animate assets for class.
 * 
 * @param PiximContent Target [[https://tawaship.github.io/Pixim.js/classes/content.html | Pixim.Content]] class.
 */
export function defineAnimatesTo(Content: typeof PiximContent, data: IAnimateManifestTargetDictionary) {
	Content.defineTargets('animates', data, {});
}

/**
 * Define animate assets for instance.
 * 
 * @param PiximContent Target [[https://tawaship.github.io/Pixim.js/classes/content.html | Pixim.Content]] instance.
 */
export function addAnimatesTo(content: PiximContent, data: IAnimateManifestTargetDictionary) {
	content.addTargets('animates', data, {});
}

// overrides
createjs.MovieClip = CreatejsMovieClip;
createjs.Bitmap = CreatejsBitmap;
createjs.Sprite = CreatejsSprite;