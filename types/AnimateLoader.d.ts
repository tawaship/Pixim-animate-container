import * as Pixim from '@tawaship/pixim.js';
import { IAnimateLibrary, ILoadAssetOption, IPrepareTarget } from '@tawaship/pixi-animate-container';
export type TAnimateLoaderRawResource = IAnimateLibrary;
export declare class AnimateLoaderResource extends Pixim.LoaderResource<TAnimateLoaderRawResource> {
    destroy(): void;
}
export interface IAnimateLoaderTarget extends IPrepareTarget {
    /**
     * Javascript file path of Animate content.
     */
    filepath?: string;
}
export type TAnimateLoaderTarget = IAnimateLoaderTarget;
export interface IAnimateLoaderTargetDictionary extends Pixim.ILoaderTargetDictionary<TAnimateLoaderTarget> {
}
export interface IAnimateLoaderResourceDictionary extends Pixim.ILoaderResourceDictionary<TAnimateLoaderRawResource> {
}
export interface IAnimateLoaderOption extends Pixim.ILoaderOption, ILoadAssetOption {
    /**
     * Animate javascript file version.
     */
    fileVersion?: string | number;
    /**
     * Animate assets version.
     */
    assetVersion?: string | number;
}
export declare class AnimateLoader extends Pixim.LoaderBase<TAnimateLoaderTarget, TAnimateLoaderRawResource, AnimateLoaderResource> {
    protected _loadAsync(target: TAnimateLoaderTarget, options?: IAnimateLoaderOption): Promise<AnimateLoaderResource>;
    private _loadJsAsync;
    private _prepareAssetsAsync;
}
