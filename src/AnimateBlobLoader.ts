import { ILoaderOption, ILoaderResourceDictionary, ILoaderTargetDictionary, LoaderBase, LoaderResource } from "@tawaship/pixim.js";

export type TAnimateBlobLoaderRawResource = { src: string; type: string; } | null;

export class AnimateBlobLoaderResource extends LoaderResource<TAnimateBlobLoaderRawResource> {
	destroy() {
		if (this._data) {
			(window.URL || window.webkitURL).revokeObjectURL(this._data.src);
		}
		
		this._data = null;
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
		return (() => {
			const data = this._resolveParams(target, options);
			const src = data.src;
			const xhr = data.xhr;
			
			if (!xhr) {
				return fetch(src);
			}
			
			return fetch(src, xhr.requestOptions || {});
		})()
		.then(res => {
			if (!res.ok) {
				throw res.statusText;
			}
			
			return res.blob();
		})
		.then(blob => {
			return { src: (window.URL || window.webkitURL).createObjectURL(blob), type: blob.type };
		})
		.then(data => new AnimateBlobLoaderResource(data, null))
		.catch((e: any) => new AnimateBlobLoaderResource(null, e));
	}
}