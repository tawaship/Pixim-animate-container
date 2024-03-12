import * as PA from './createjs/modules';
import createjs from '@tawaship/createjs-module';

// overrides
createjs.MovieClip = PA.CreatejsMovieClip;
createjs.Bitmap = PA.CreatejsBitmap;
createjs.Sprite = PA.CreatejsSprite;

export * from './core';
export * from './Container';
export * from './AnimateManifest';
export * from './AnimateLoader';
export * from './AnimateBlobLoader';