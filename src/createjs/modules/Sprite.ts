import { Texture } from 'pixi.js';
import { CreatejsSprite as _CreatejsSprite } from '@tawaship/pixi-animate-container';

/**
 * inherited {@link https://tawaship.github.io/pixi-animate-container/docs/classes/CreatejsSprite.html | CreatejsSprite}
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