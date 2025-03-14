import { ILoaderOption, LoaderBase, LoaderResource } from "@tawaship/pixim.js";
export type TAnimateBlobLoaderRawResource = {
    src: string;
    type: string;
} | null;
export declare class AnimateBlobLoaderResource extends LoaderResource<TAnimateBlobLoaderRawResource> {
    destroy(): void;
}
export type TAnimateBlobLoaderTarget = string;
export interface IAnimateBlobLoaderOption extends ILoaderOption {
}
export declare class AnimateBlobLoader extends LoaderBase<TAnimateBlobLoaderTarget, TAnimateBlobLoaderRawResource, AnimateBlobLoaderResource> {
    protected _loadAsync(target: TAnimateBlobLoaderTarget, options?: IAnimateBlobLoaderOption): Promise<AnimateBlobLoaderResource>;
}
