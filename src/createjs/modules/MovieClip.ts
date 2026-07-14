import { CreatejsMovieClip as _CreatejsMovieClip } from '@tawaship/pixi-animate-container';

/**
 * Named instances are stamped onto the MovieClip by publish output, so they
 * can only be reached by dynamic key access.
 *
 * @ignore
 */
function getNamedInstance(target: object, name: string): CreatejsMovieClip | undefined {
	return Reflect.get(target, name);
}

/**
 * inherited {@link https://tawaship.github.io/pixi-animate-container/docs/classes/CreatejsMovieClip.html | CreatejsMovieClip}
 */
export class CreatejsMovieClip extends _CreatejsMovieClip {
	// Stamped onto published symbol prototypes by Adobe Animate's publish
	// output (the same mechanism as named child instances) - not a createjs
	// API member, so the createjs types cannot declare it. replaceInstance
	// operates on published symbols, which always carry it. `declare` emits
	// no code, so the runtime object is untouched.
	declare nominalBounds: createjs.Rectangle;

	/**
	 * Replace child instance
	 *
	 * @param name Name of old instancee.
	 * @param cls Class of new instance.
	 */
	replaceInstance(name: string, cls: typeof CreatejsMovieClip) {
		const old = getNamedInstance(this, name);

		if (!old) {
			console.warn(`instance '${name}' was not found.`);
			throw new Error(`instance '${name}' was not found.`);
		}

		const instance = new cls(old.mode, old.startPosition, old.loop, old.timeline.reversed);
		Reflect.set(this, name, instance);

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

		instance.x = old.x;
		instance.y = old.y;
		instance.scaleX = old.scaleX;
		instance.scaleY = old.scaleY;
		instance.rotation = old.rotation;
		instance.skewX = old.skewX;
		instance.skewY = old.skewY;
		instance.regX = old.regX;
		instance.regY = old.regY;
		instance._off = old._off;
		instance.alpha = old.alpha;

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
