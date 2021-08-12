import { Content as PiximContent, IManifestDictionary } from '@tawaship/pixim.js';
import { CreatejsMovieClip } from './MovieClip';
import { ContentAnimateManifest, IContentAnimateManifestData } from './ContentAnimateManifest';
import { createjs } from '@tawaship/pixi-animate-core';
export { createjs, ILoadAssetOption, IAnimateLibrary } from '@tawaship/pixi-animate-core';

PiximContent.registerManifest('animates', ContentAnimateManifest);

/**
 * This class is declared for documentation.<br />
 * By loading the plugin, the following functions will be added to [[https://tawaship.github.io/Pixim.js/classes/content.html | Pixim.Content]].
 * 
 * See also below for argument types.
 * 
 * [[https://tawaship.github.io/Pixim.js/interfaces/imanifestdictionary.html | Pixim.IManifestDictionary]]
 */
export declare class Content {
	/**
	 * Define animate assets for class.
	 */
	static defineAnimates(data: IManifestDictionary<IContentAnimateManifestData>): typeof Content;
	
	/**
	 * Define animate assets for instance.
	 */
	addAnimates(data: IManifestDictionary<IContentAnimateManifestData>): this;
}

// @ts-ignore
PiximContent.defineAnimates = function(data) {
	return this.defineManifests('animates', data, {});
}

// @ts-ignore
PiximContent.prototype.addAnimates = function(data) {
	return this.addManifests('animates', data, {});
}

// overrides
createjs.MovieClip = CreatejsMovieClip;