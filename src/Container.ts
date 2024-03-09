import { Container as _Container, Task, ITickerData } from '@tawaship/pixim.js';
import { Container as _PixiAnimateContainer, TCreatejsObject } from '@tawaship/pixi-animate-container';
import { CreatejsMovieClip } from './createjs';

export interface ICreatejsMovieClipDictionary {
	[id: number]: CreatejsMovieClip;
}

export interface ICreatejsData {
	id: number;
	targets: ICreatejsMovieClipDictionary;
	task: Task;
	container: _PixiAnimateContainer;
}

/**
 * [[https://tawaship.github.io/Pixim.js/classes/container.html | Pixim.Container]]
 */
export class Container extends _Container {
	private _createjsData: ICreatejsData;
	
	constructor(...args: any[]) {
		super(...args);
		
		this._createjsData = {
			id: 0,
			targets: {},
			task: new Task([], this),
			container: new _PixiAnimateContainer()
		};
		
		const targets = this._createjsData.targets;
		
		this._createjsData.task.add((e: ITickerData) => {
			this._createjsData.container.handleTick.call(this, e.delta);
		});
		this._createjsData.task.first();
	}
	
	/**
	 * @override
	 */
	updateTask(e: ITickerData) {
		super.updateTask(e);
		
		const task = this._createjsData.task;
		
		if (!this.taskEnabled) {
			return;
		}
		
		task.done(e);
	}
	
	addCreatejs(cjs: TCreatejsObject) {
		return this._createjsData.container.addCreatejs.call(this, cjs);
	}
	
	addCreatejsAt(cjs: TCreatejsObject, index: number) {
		return this._createjsData.container.addCreatejsAt.call(this, cjs, index);
	}
	
	removeCreatejs(cjs: TCreatejsObject) {
		return this._createjsData.container.removeCreatejs.call(this, cjs);
	}
}