import { Texture } from 'pixi.js';
import { CreatejsBitmap as _CreatejsBitmap } from '@tawaship/pixi-animate-container';

/**
 * \@tawaship/pixi-animate-container [[https://tawaship.github.io/pixi-animate-container/classes/createjsbitmap.html | CreatejsBitmap]]
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