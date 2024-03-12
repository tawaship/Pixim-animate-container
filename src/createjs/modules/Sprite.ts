import { Texture } from 'pixi.js';
import { CreatejsSprite as _CreatejsSprite } from '@tawaship/pixi-animate-container';

/**
 * extends {@link https://tawaship.github.io/pixi-animate-container/docs/classes/createjssprite.html | CreatejsSprite}
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