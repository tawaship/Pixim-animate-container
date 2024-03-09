import { BlobLoader, ILoaderOption, ILoaderResourceDictionary, ILoaderTargetDictionary, LoaderBase, LoaderResource } from "@tawaship/pixim.js";

export type TAnimateBlobLoaderRawResource = string;

export class AnimateBlobLoaderResource extends LoaderResource<TAnimateBlobLoaderRawResource> {
	destroy() {
		if (this._data) {
			(window.URL || window.webkitURL).revokeObjectURL(this._data);
		}
		
		this._data = '';
	}
}

export type TAnimateBlobLoaderTarget = string;

export interface IAnimateBlobLoaderTargetDictionary extends ILoaderTargetDictionary<TAnimateBlobLoaderTarget> {

}

export interface IAnimateBlobLoaderResourceDictionary extends ILoaderResourceDictionary<AnimateBlobLoaderResource> {

}

export interface IAnimateBlobLoaderOption extends ILoaderOption {

}

export class AnimateBlobLoader extends LoaderBase<TAnimateBlobLoaderTarget, TAnimateBlobLoaderRawResource, AnimateBlobLoaderResource> {
	protected _loadAsync(target: TAnimateBlobLoaderTarget, options: IAnimateBlobLoaderOption = {}) {
		return new BlobLoader()
			.loadAsync(target, options)
			.then(resource => {
				return resource.data;
			})
			.then(src => new AnimateBlobLoaderResource(src, null))
			.catch((e: any) => new AnimateBlobLoaderResource('', e));
	}
}