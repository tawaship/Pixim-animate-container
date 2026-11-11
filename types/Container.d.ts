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
    get createjsSmooth(): boolean;
    set createjsSmooth(value: boolean);
    updateTask(e: ITickerData): void;
    handleTick(delta: number): void;
    /**
     * Pixi calls this on the tree before drawing: the createjs content is
     * brought up to date first (CreatejsController.flushForRender), so that
     * what is drawn is what createjs would draw at that moment, whenever the
     * render comes.
     */
    updateTransform(): void;
    addCreatejs<T extends TCreatejsObject = TCreatejsObject>(cjs: T): T;
    addCreatejsAt<T extends TCreatejsObject = TCreatejsObject>(cjs: T, index: number): T;
    removeCreatejs(cjs: TCreatejsObject): TCreatejsObject;
}
