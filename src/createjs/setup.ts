import * as PA from './modules';
import createjs from '@tawaship/createjs-module';
import { setupCreatejs as _setupCreatejs } from '@tawaship/pixi-animate-container';

export function setupCreatejs() {
	_setupCreatejs();

	// overrides
	createjs.MovieClip = PA.CreatejsMovieClip;
	createjs.Bitmap = PA.CreatejsBitmap;
	createjs.Sprite = PA.CreatejsSprite;

	// install plugins
	createjs.MotionGuidePlugin.install();
}