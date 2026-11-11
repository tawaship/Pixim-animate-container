import { Container as PiximContainer, Task, ITickerData } from '@tawaship/pixim.js';
import { Container as _PixiAnimateContainer, CreatejsController, CreatejsMovieClip, IAnimateContainer, TCreatejsObject } from '@tawaship/pixi-animate-container';

/**
 * inherited {@link https://tawaship.github.io/Pixim.js/docs/classes/Container.html | Pixim.Container}
 */
export class Container extends PiximContainer implements IAnimateContainer {
	private _createjsData: {
		controller: CreatejsController;
		task: Task;
	};

	constructor() {
		super();
		
		this._createjsData = {
			controller: new CreatejsController(this),
			task: new Task([], this),
		};

		this._createjsData.task.add((e: ITickerData) => {
			this.handleTick(e.delta);
		});
		this._createjsData.task.first();
	}

    get createjsSpeed() {
        return this._createjsData.controller.speed;
    }
    set createjsSpeed(value: number) {
        this._createjsData.controller.speed = value;
    }

    get createjsOverSpeed() {
        return this._createjsData.controller.overSpeed;
    }
    set createjsOverSpeed(value: boolean) {
        this._createjsData.controller.overSpeed = value;
    }

    get createjsSmooth() {
        return this._createjsData.controller.smooth;
    }
    set createjsSmooth(value: boolean) {
        this._createjsData.controller.smooth = value;
    }

	updateTask(e: ITickerData) {
		super.updateTask(e);
		
		const task = this._createjsData.task;
		
		if (!this.taskEnabled) {
			return;
		}
		
		task.done(e);
	}

	handleTick(delta: number) {
		return this._createjsData.controller.handleTick(delta);
	}

	/**
	 * Pixi calls this on the tree before drawing: the createjs content is
	 * brought up to date first (CreatejsController.flushForRender), so that
	 * what is drawn is what createjs would draw at that moment, whenever the
	 * render comes.
	 */
	updateTransform() {
		this._createjsData.controller.flushForRender();
		super.updateTransform();
	}

	addCreatejs<T extends TCreatejsObject = TCreatejsObject>(cjs: T) {
		return this._createjsData.controller.addCreatejs(cjs);
	}

	addCreatejsAt<T extends TCreatejsObject = TCreatejsObject>(cjs: T, index: number) {
		return this._createjsData.controller.addCreatejsAt(cjs, index);
	}
	
	removeCreatejs(cjs: TCreatejsObject) {
		return this._createjsData.controller.removeCreatejs(cjs);
	}
}