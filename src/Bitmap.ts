import { Texture } from 'pixi.js';
import { CreatejsBitmap as _CreatejsBitmap } from '@tawaship/pixi-animate-core';

/**
 * \@tawaship/pixi-animate-core [[https://tawaship.github.io/pixi-animate-core/classes/createjsbitmap.html | CreatejsBitmap]]
 */
export class CreatejsBitmap extends _CreatejsBitmap {
	/**
	 * Replace texture.
	 * 
	 * @param texture Texture to replace.
	 */
	replaceTexture(texture: Texture) {
		this._pixiData.instance.texture = texture;
	}
}