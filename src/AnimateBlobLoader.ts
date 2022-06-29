import * as Pixim from '@tawaship/pixim.js';

export type TAnimateBlobLoaderRawResource = { isObjectURL: boolean, src: string };

export class AnimateBlobLoaderResource extends Pixim.LoaderResource<TAnimateBlobLoaderRawResource> {
	destroy() {
		if (this._data.isObjectURL) {
			(window.URL || window.webkitURL).revokeObjectURL(this._data.src);
		}
		
		this._data.src = '';
	}
}

export type TAnimateBlobLoaderTarget = string;

export interface IAnimateBlobLoaderTargetDictionary extends Pixim.ILoaderTargetDictionary<TAnimateBlobLoaderTarget> {

}

export interface IAnimateBlobLoaderResourceDictionary extends Pixim.ILoaderResourceDictionary<AnimateBlobLoaderResource> {

}

export interface IAnimateBlobLoaderOption extends Pixim.ILoaderOption {

}

export class AnimateBlobLoader extends Pixim.LoaderBase<TAnimateBlobLoaderTarget, TAnimateBlobLoaderRawResource, AnimateBlobLoaderResource> {
	protected _loadAsync(target: TAnimateBlobLoaderTarget, options: IAnimateBlobLoaderOption = {}) {
		return (() => {
			const data = this._resolveParams(target, options);
			const src = data.src;
			const xhr = data.xhr;
			
			if (!xhr) {
				return Promise.resolve({ isObjectURL: false, src });
			}
			
			return fetch(src, xhr.requestOptions || {})
				.then(res => {
					if (!res.ok) {
						throw res.statusText;
					}
					
					return res.blob();
				})
				.then(blob => {
					return (window.URL || window.webkitURL).createObjectURL(blob);
				})
				.then(uri => {
					return { isObjectURL: true, src: uri };
				});
		})()
		.then(data => new AnimateBlobLoaderResource(data, null))
		.catch((e: any) => new AnimateBlobLoaderResource({ isObjectURL: false, src: '' }, e));
	}
}