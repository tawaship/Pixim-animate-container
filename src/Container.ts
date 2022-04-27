import { Container as _Container, Task, ITickerData } from '@tawaship/pixim.js';
import { TCreatejsObject } from '@tawaship/pixi-animate-core';
import { CreatejsMovieClip } from './MovieClip';

export interface ICreatejsMovieClipDictionary {
	[id: number]: CreatejsMovieClip;
}

export interface ICreatejsData {
	id: number;
	targets: ICreatejsMovieClipDictionary;
	task: Task;
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
			task: new Task([], this)
		};
		
		const targets = this._createjsData.targets;
		
		this._createjsData.task.add((e: ITickerData) => {
			for (let i in targets) {
				targets[i].updateForPixi(e);
			}
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
		
		task.done({ delta: Math.min(e.delta, 1) });
	}
	
	private _addCreatejs(cjs: TCreatejsObject) {
		if (cjs instanceof CreatejsMovieClip) {
			const p = cjs.pixi.parent;
			
			cjs.pixi.once('added', () => {
				if (cjs.pixi.parent !== p) {
					cjs.gotoAndPlay(0);
				}
				
				const id = this._createjsData.id++;
				this._createjsData.targets[id] = cjs;
				
				cjs.pixi.once('removed', () => {
					delete(this._createjsData.targets[id]);
				});
			});
		}
	}
	
	/**
	 * [[https://tawaship.github.io/pixi-animate-core/modules.html#tcreatejsobject | TCreatejsObject]]
	 */
	addCreatejs(cjs: TCreatejsObject) {
		this._addCreatejs(cjs);
		this.addChild(cjs.pixi);
		
		return cjs;
	}
	
	/**
	 * [[https://tawaship.github.io/pixi-animate-core/modules.html#tcreatejsobject | TCreatejsObject]]
	 */
	addCreatejsAt(cjs: TCreatejsObject, index: number) {
		this._addCreatejs(cjs);
		this.addChildAt(cjs.pixi, index);
		
		return cjs;
	}
	
	/**
	 * [[https://tawaship.github.io/pixi-animate-core/modules.html#tcreatejsobject | TCreatejsObject]]
	 */
	removeCreatejs(cjs: TCreatejsObject) {
		this.removeChild(cjs.pixi);
		
		return cjs;
	}
}