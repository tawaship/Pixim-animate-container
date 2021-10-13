import { Texture } from 'pixi.js';
import { CreatejsSprite as _CreatejsSprite } from '@tawaship/pixi-animate-core';

/**
 * \@tawaship/pixi-animate-core [[https://tawaship.github.io/pixi-animate-core/classes/createjssprite.html | CreatejsSprite]]
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