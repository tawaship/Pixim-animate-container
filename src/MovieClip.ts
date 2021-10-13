import { createjs, CreatejsMovieClip as _CreatejsMovieClip, ITickerData, TCreatejsObject } from '@tawaship/pixi-animate-core';

export { ITickerData } from '@tawaship/pixi-animate-core';

/**
 * @ignore
 */
const P: number = 1000 / 60;

/**
 * \@tawaship/pixi-animate-core [[https://tawaship.github.io/pixi-animate-core/classes/createjsmovieclip.html | CreatejsMovieClip]]
 */
export class CreatejsMovieClip extends _CreatejsMovieClip {
	declare _framerateBase: number;
	
	/**
	 * When the last frame of the timeline is reached.
	 * 
	 * @event
	 */
	endAnimation?(): void {}
	
	constructor(...args: any[]) {
		super(...args);
		
		this.framerate = this._framerateBase;
	}
	
	initialize(...args: any[]) {
		super.initialize(...args);
		
		this.framerate = this._framerateBase;
	}
	
	/**
	 * @override
	 */
	updateForPixi(e: ITickerData) {
		const currentFrame = this.currentFrame;
		
		// this.advance(e.delta * P);
		this.advance(P);
		
		if (currentFrame !== this.currentFrame && this.currentFrame === (this.totalFrames - 1)) {
			this.dispatchEvent(new createjs.Event('endAnimation'));
		}
		
		return super.updateForPixi(e);
	}
	
	/**
	 * Replace child instance
	 * 
	 * @param name Name of old instancee.
	 * @param cls Class of new instance.
	 */
	replaceInstance(name: string, cls: typeof CreatejsMovieClip) {
		const old = this[name];
		
		if (!old) {
			console.warn(`instance '${name}' was not found.`);
		}
		
		const props = ['x', 'y', 'scaleX', 'scaleY', 'rotation', 'skewX', 'skewY', 'regX', 'regY', '_off', 'alpha'];
		
		const instance = this[name] = new cls(old.mode, old.startPosition, old.loop, old.timeline.reversed);
		
		const tweens = this.timeline.tweens;
		for (let i = 0; i < tweens.length; i++) {
			const target = tweens[i].target;
			console.log(target)
			if (Array.isArray(target.state)) {
				for (let j = 0; j < target.state.length; j++) {
					console.log(target)
					if (target.state[j].t === old) {
						target.state[j].t = instance;
					}
				}
			} else if (target === old) {
				tweens[i].target = instance;
			}
		}
		
		for (let i = 0; i < props.length; i++) {
			instance[props[i]] = old[props[i]];
		}
		
		if (old.mask) {
			instance.mask = old.mask;
			old.mask = null;
		}
		
		if (old.filters) {
			instance.filters = old.filters;
			old.filters = null;
			
			const nominalBounds = instance.nominalBounds;
			instance.cache(nominalBounds.x - 2, nominalBounds.y - 2, nominalBounds.width + 4, nominalBounds.height + 4);
		}
		
		this.removeChild(old);
		
		return instance;
	}
}

delete(CreatejsMovieClip.prototype.endAnimation);