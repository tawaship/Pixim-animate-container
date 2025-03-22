import { IManifestOption, Content as PiximContent } from '@tawaship/pixim.js';
import { TAnimateLoaderTarget } from './AnimateLoader';
/**
 * Define animate assets for class.
 *
 * @param Content Target {@link https://tawaship.github.io/Pixim.js/docs/classes/Content.html | Pixim.Content} class.
 */
export declare function defineAnimatesTo(Content: typeof PiximContent, data: Record<string, TAnimateLoaderTarget>, options?: IManifestOption): void;
/**
 * Define animate assets for instance.
 *
 * @param content Target {@link https://tawaship.github.io/Pixim.js/docs/classes/Content.html | Pixim.Content} instance.
 */
export declare function addAnimatesTo(content: PiximContent, data: Record<string, TAnimateLoaderTarget>, options?: IManifestOption): void;
