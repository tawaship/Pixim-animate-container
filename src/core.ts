import { Content as PiximContent } from '@tawaship/pixim.js';
import { CreatejsMovieClip } from './MovieClip';
import { ContentAnimateManifest } from './ContentAnimateManifest';
import { createjs } from '@tawaship/pixi-animate-core';
export { createjs, ILoadAssetOption, IAnimateLibrary } from '@tawaship/pixi-animate-core';

PiximContent.registerManifest('animate', ContentAnimateManifest);

namespace Pixim {
	declare class Content extends PiximContent {
		declare hoge: number;
	}
}

// overrides
createjs.MovieClip = CreatejsMovieClip;