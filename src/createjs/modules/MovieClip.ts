import { CreatejsMovieClip as _CreatejsMovieClip } from '@tawaship/pixi-animate-container';

/**
 * inherited {@link https://tawaship.github.io/pixi-animate-container/docs/classes/CreatejsMovieClip.html | CreatejsMovieClip}
 */
export class CreatejsMovieClip extends _CreatejsMovieClip {
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
			
			if (Array.isArray(target.state)) {
				for (let j = 0; j < target.state.length; j++) {
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
