import { Texture } from 'pixi.js';
import { CreatejsSprite as _CreatejsSprite } from '@tawaship/pixi-animate-container';

/**
 * \@tawaship/pixi-animate-container [[https://tawaship.github.io/pixi-animate-container/classes/createjssprite.html | CreatejsSprite]]
 */
export class CreatejsSprite extends _CreatejsSprite {
	/**
	 * Replace texture.
	 * 
	 * @param texture Texture to replace.
	 */
	replaceTexture(texture: Texture) {
		this._pixiData.instance.texture = texture;
	}
}