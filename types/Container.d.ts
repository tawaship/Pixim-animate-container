import { Container as PiximContainer, ITickerData } from '@tawaship/pixim.js';
import { IAnimateContainer, TCreatejsObject } from '@tawaship/pixi-animate-container';
/**
 * inherited {@link https://tawaship.github.io/Pixim.js/docs/classes/Container.html | Pixim.Container}
 */
export declare class Container extends PiximContainer implements IAnimateContainer {
    private _createjsData;
    constructor();
    get createjsSpeed(): number;
    set createjsSpeed(value: number);
    get createjsOverSpeed(): boolean;
    set createjsOverSpeed(value: boolean);
    updateTask(e: ITickerData): void;
    handleTick(delta: number): void;
    addCreatejs<T extends TCreatejsObject = TCreatejsObject>(cjs: TCreatejsObject): T;
    addCreatejsAt<T extends TCreatejsObject = TCreatejsObject>(cjs: TCreatejsObject, index: number): T;
    removeCreatejs(cjs: TCreatejsObject): TCreatejsObject;
}
