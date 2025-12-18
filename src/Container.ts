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
	
	addCreatejs<T extends TCreatejsObject = TCreatejsObject>(cjs: TCreatejsObject) {
		return this._createjsData.controller.addCreatejs<T>(cjs);
	}
	
	addCreatejsAt<T extends TCreatejsObject = TCreatejsObject>(cjs: TCreatejsObject, index: number) {
		return this._createjsData.controller.addCreatejsAt<T>(cjs, index);
	}
	
	removeCreatejs(cjs: TCreatejsObject) {
		return this._createjsData.controller.removeCreatejs(cjs);
	}
}