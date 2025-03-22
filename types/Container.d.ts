import { Container as PiximContainer, ITickerData } from '@tawaship/pixim.js';
import { IAnimateContainer, TCreatejsObject } from '@tawaship/pixi-animate-container';
/**
 * inherited {@link https://tawaship.github.io/Pixim.js/docs/classes/Container.html | Pixim.Container}
 */
export declare class Container extends PiximContainer implements IAnimateContainer {
    private _createjsData;
    constructor();
    updateTask(e: ITickerData): void;
    handleTick(delta: number): void;
    addCreatejs(cjs: TCreatejsObject): TCreatejsObject;
    addCreatejsAt(cjs: TCreatejsObject, index: number): TCreatejsObject;
    removeCreatejs(cjs: TCreatejsObject): TCreatejsObject;
}
