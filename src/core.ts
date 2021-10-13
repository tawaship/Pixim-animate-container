import { Content as PiximContent, IManifestDictionary } from '@tawaship/pixim.js';
import { CreatejsMovieClip } from './MovieClip';
import { CreatejsBitmap } from './Bitmap';
import { CreatejsSprite } from './Sprite';
import { ContentAnimateManifest, IContentAnimateManifestData } from './ContentAnimateManifest';
import { createjs } from '@tawaship/pixi-animate-core';
export { createjs, ILoadAssetOption, IAnimateLibrary } from '@tawaship/pixi-animate-core';

PiximContent.registerManifest('animates', ContentAnimateManifest);

/**
 * Define animate assets for class.
 * 
 * @param PiximContent Target [[https://tawaship.github.io/Pixim.js/classes/content.html | Pixim.Content]] class.
 * @param data see also [[https://tawaship.github.io/Pixim.js/interfaces/imanifestdictionary.html | Pixim.IManifestDictionary]].
 */
export function defineAnimatesTo(Content: typeof PiximContent, data: IManifestDictionary<IContentAnimateManifestData>) {
	Content.defineManifests('animates', data, {});
}

/**
 * Define animate assets for instance.
 * 
 * @param PiximContent Target [[https://tawaship.github.io/Pixim.js/classes/content.html | Pixim.Content]] instance.
 * @param data see also [[https://tawaship.github.io/Pixim.js/interfaces/imanifestdictionary.html | Pixim.IManifestDictionary]].
 */
export function addAnimatesTo(content: PiximContent, data: IManifestDictionary<IContentAnimateManifestData>) {
	content.addManifests('animates', data, {});
}

// overrides
createjs.MovieClip = CreatejsMovieClip;
createjs.Bitmap = CreatejsBitmap;
createjs.Sprite = CreatejsSprite;