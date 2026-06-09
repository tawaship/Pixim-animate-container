/*!
 * Pixim-animate-container - v2.4.2
 * 
 * @require pixi.js v^5.3.2
 * @require @tawaship/pixim.js vundefined
 * @author tawaship (makazu.mori@gmail.com)
 * @license MIT
 */

import { CreatejsMovieClip as CreatejsMovieClip$1, CreatejsSprite as CreatejsSprite$1, CreatejsBitmap as CreatejsBitmap$1, loadAssetAsync, CreatejsController } from '@tawaship/pixi-animate-container';
import * as pixiAnimateContainer from '@tawaship/pixi-animate-container';
export { pixiAnimateContainer as core };
import createjs from '@tawaship/createjs-module';
import { LoaderResource, LoaderBase, utils, JsLoader, ManifestBase, Content, Container as Container$1, Task } from '@tawaship/pixim.js';

/**
 * inherited {@link https://tawaship.github.io/pixi-animate-container/docs/classes/CreatejsMovieClip.html | CreatejsMovieClip}
 */
class CreatejsMovieClip extends CreatejsMovieClip$1 {
    /**
     * Replace child instance
     *
     * @param name Name of old instancee.
     * @param cls Class of new instance.
     */
    replaceInstance(name, cls) {
        const old = this[name];
        if (!old) {
            console.warn(`instance '${name}' was not found.`);
        }
        const props = ['x', 'y', 'scaleX', 'scaleY', 'rotation', 'skewX', 'skewY', 'regX', 'regY', '_off', 'alpha'];
        const instance = this[name] = new cls(old.mode, old.startPosition, old.loop, old.timeline.reversed);
        const tweens = this.timeline.tweens;
        for (let i = 0; i < tweens.length; i++) {
            const target = tweens[i].target;
            if (Array.isArray(target.state)) {
                for (let j = 0; j < target.state.length; j++) {
                    if (target.state[j].t === old) {
                        target.state[j].t = instance;
                    }
                }
            }
            else if (target === old) {
                tweens[i].target = instance;
            }
        }
        for (let i = 0; i < props.length; i++) {
            instance[props[i]] = old[props[i]];
        }
        if (old.mask) {
            instance.mask = old.mask;
            old.mask = null;
        }
        if (old.filters) {
            instance.filters = old.filters;
            old.filters = null;
            const nominalBounds = instance.nominalBounds;
            instance.cache(nominalBounds.x - 2, nominalBounds.y - 2, nominalBounds.width + 4, nominalBounds.height + 4);
        }
        this.removeChild(old);
        return instance;
    }
}

/**
 * inherited {@link https://tawaship.github.io/pixi-animate-container/docs/classes/CreatejsSprite.html | CreatejsSprite}
 */
class CreatejsSprite extends CreatejsSprite$1 {
    /**
     * Replace texture.
     *
     * @param texture Texture to replace.
     */
    replaceTexture(texture) {
        this._pixiData.instance.texture = texture;
    }
}

/**
 * inherited {@link https://tawaship.github.io/pixi-animate-container/docs/classes/CreatejsBitmap.html | CreatejsBitmap}
 */
class CreatejsBitmap extends CreatejsBitmap$1 {
    /**
     * Replace texture.
     *
     * @param texture Texture to replace.
     */
    replaceTexture(texture) {
        this._pixiData.instance.texture = texture;
    }
}

class AnimateBlobLoaderResource extends LoaderResource {
    destroy() {
        if (this._data) {
            (window.URL || window.webkitURL).revokeObjectURL(this._data.src);
        }
        this._data = null;
    }
}
class AnimateBlobLoader extends LoaderBase {
    _loadAsync(target, options = {}) {
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
                throw res.statusText || "error";
            }
            return res.blob();
        })
            .then(blob => {
            return { src: (window.URL || window.webkitURL).createObjectURL(blob), type: blob.type };
        })
            .then(data => new AnimateBlobLoaderResource(data, null))
            .catch((e) => new AnimateBlobLoaderResource(null, e));
    }
}

class AnimateLoaderResource extends LoaderResource {
    destroy() {
    }
}
class AnimateLoader extends LoaderBase {
    _loadAsync(target, options = {}) {
        return this._loadJsAsync(target, options)
            .then(() => {
            var _a;
            const comp = AdobeAn.getComposition(target.id);
            if (!comp) {
                throw new Error(`no composition: ${target.id}`);
            }
            const lib = comp.getLibrary();
            const originalManifests = lib.properties.manifest;
            const manifests = lib.properties.manifest = originalManifests.map((v) => {
                return JSON.parse(JSON.stringify(v));
            });
            return (((_a = target.options) === null || _a === void 0 ? void 0 : _a.handleManifest) ? target.options.handleManifest(manifests) : Promise.resolve())
                .then(() => {
                const _target = Object.assign({}, target);
                _target.basepath = utils.resolvePath(options.basepath || "", target.basepath);
                return this._prepareAssetsAsync(_target.basepath || "", manifests, options)
                    .then(() => {
                    const version = options.assetVersion || options.version || '';
                    for (let i = 0; i < manifests.length; i++) {
                        const manifest = manifests[i];
                        manifest.src = utils.resolveUri("", manifest.src, version);
                    }
                    return loadAssetAsync(_target);
                })
                    .then((_lib) => {
                    lib.properties.manifest = originalManifests;
                    return _lib;
                });
            });
        })
            .then(lib => {
            return new AnimateLoaderResource(lib, null);
        })
            .catch(e => new AnimateLoaderResource({}, e));
    }
    _loadJsAsync(target, options) {
        if (!target.filepath) {
            return Promise.resolve();
        }
        const filepath = utils.resolveUri(target.basepath, target.filepath);
        const loader = new JsLoader();
        return loader.loadAsync(filepath, Object.assign({}, options, { version: options.fileVersion || options.version }))
            .then(resource => {
            if (resource.error) {
                throw resource.error;
            }
            resource.ref();
        });
    }
    _prepareAssetsAsync(basepath, manifests, options) {
        const targets = {};
        if (!options.xhr) {
            return Promise.resolve();
        }
        for (let i = 0; i < manifests.length; i++) {
            const manifest = manifests[i];
            if (!utils.isUrl(manifest.src)) {
                continue;
            }
            targets[i] = utils.resolveUri(basepath, manifest.src);
        }
        if (Object.keys(targets).length === 0) {
            return Promise.resolve();
        }
        const loader = new AnimateBlobLoader();
        return loader.loadAllAsync(targets, Object.assign({}, options, { version: options.assetVersion || options.version }))
            .then(resources => {
            for (let i in resources) {
                const resource = resources[i];
                if (resource.error) {
                    throw resource.error;
                }
                if (!resource.data) {
                    throw 'invalid resource';
                }
                const _i = Number(i);
                if (!manifests[_i]) {
                    continue;
                }
                manifests[_i].src = resource.data.src;
                manifests[_i].type = resource.data.type.split("/")[0];
            }
        });
    }
}

class AnimateManifest extends ManifestBase {
    _createLoader() {
        return new AnimateLoader();
    }
}

Content.registerManifest('animates', AnimateManifest);
/**
 * Define animate assets for class.
 *
 * @param Content Target {@link https://tawaship.github.io/Pixim.js/docs/classes/Content.html | Pixim.Content} class.
 */
function defineAnimatesTo(Content, data, options = {}) {
    Content.defineTargets('animates', data, {});
}
/**
 * Define animate assets for instance.
 *
 * @param content Target {@link https://tawaship.github.io/Pixim.js/docs/classes/Content.html | Pixim.Content} instance.
 */
function addAnimatesTo(content, data, options = {}) {
    content.addTargets('animates', data, {});
}

/**
 * inherited {@link https://tawaship.github.io/Pixim.js/docs/classes/Container.html | Pixim.Container}
 */
class Container extends Container$1 {
    constructor() {
        super();
        this._createjsData = {
            controller: new CreatejsController(this),
            task: new Task([], this),
        };
        this._createjsData.task.add((e) => {
            this.handleTick(e.delta);
        });
        this._createjsData.task.first();
    }
    get createjsSpeed() {
        return this._createjsData.controller.speed;
    }
    set createjsSpeed(value) {
        this._createjsData.controller.speed = value;
    }
    get createjsOverSpeed() {
        return this._createjsData.controller.overSpeed;
    }
    set createjsOverSpeed(value) {
        this._createjsData.controller.overSpeed = value;
    }
    updateTask(e) {
        super.updateTask(e);
        const task = this._createjsData.task;
        if (!this.taskEnabled) {
            return;
        }
        task.done(e);
    }
    handleTick(delta) {
        return this._createjsData.controller.handleTick(delta);
    }
    addCreatejs(cjs) {
        return this._createjsData.controller.addCreatejs(cjs);
    }
    addCreatejsAt(cjs, index) {
        return this._createjsData.controller.addCreatejsAt(cjs, index);
    }
    removeCreatejs(cjs) {
        return this._createjsData.controller.removeCreatejs(cjs);
    }
}

// overrides
createjs.MovieClip = CreatejsMovieClip;
createjs.Bitmap = CreatejsBitmap;
createjs.Sprite = CreatejsSprite;

export { AnimateBlobLoader, AnimateBlobLoaderResource, AnimateLoader, AnimateLoaderResource, AnimateManifest, Container, CreatejsBitmap, CreatejsMovieClip, CreatejsSprite, addAnimatesTo, defineAnimatesTo };
//# sourceMappingURL=Pixim-animate-container.esm.js.map
