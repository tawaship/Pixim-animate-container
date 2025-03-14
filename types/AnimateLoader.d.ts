import { IAnimateLibrary, IAnimateLoadAssetOption, IAnimateManifest, IAnimatePrepareTarget } from '@tawaship/pixi-animate-container';
import { ILoaderOption, LoaderBase, LoaderResource } from '@tawaship/pixim.js';
export type TAnimateLoaderRawResource = IAnimateLibrary;
export declare class AnimateLoaderResource extends LoaderResource<TAnimateLoaderRawResource> {
    destroy(): void;
}
export interface IAnimateLoaderTarget extends IAnimatePrepareTarget {
    /**
     * Javascript file path of Animate content.
     */
    filepath?: string;
    options?: IAnimateLoadAssetOption & {
        /**
         * Additional processing handlers for lib.properties.manifest.
         *
         * Changes made by this process are temporary and will only be reflected in the current load process.
         */
        handleManifest?: (manifests: IAnimateManifest[]) => Promise<void>;
    };
}
export type TAnimateLoaderTarget = IAnimateLoaderTarget;
export interface IAnimateLoaderOption extends ILoaderOption, IAnimateLoadAssetOption {
    /**
     * Animate javascript file version.
     */
    fileVersion?: string | number;
    /**
     * Animate assets version.
     */
    assetVersion?: string | number;
}
export declare class AnimateLoader extends LoaderBase<TAnimateLoaderTarget, TAnimateLoaderRawResource, AnimateLoaderResource> {
    protected _loadAsync(target: TAnimateLoaderTarget, options?: IAnimateLoaderOption): Promise<AnimateLoaderResource>;
    private _loadJsAsync;
    private _prepareAssetsAsync;
}
