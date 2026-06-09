/*!
 * Pixim-animate-container - v2.4.2
 * 
 * @require pixi.js v^5.3.2
 * @require @tawaship/pixim.js vundefined
 * @author tawaship (makazu.mori@gmail.com)
 * @license MIT
 */

'use strict';

var pixiAnimateContainer = require('@tawaship/pixi-animate-container');
var createjs = require('@tawaship/createjs-module');
var pixim_js = require('@tawaship/pixim.js');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var pixiAnimateContainer__namespace = /*#__PURE__*/_interopNamespaceDefault(pixiAnimateContainer);

/**
 * inherited {@link https://tawaship.github.io/pixi-animate-container/docs/classes/CreatejsMovieClip.html | CreatejsMovieClip}
 */
class CreatejsMovieClip extends pixiAnimateContainer.CreatejsMovieClip {
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
class CreatejsSprite extends pixiAnimateContainer.CreatejsSprite {
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
class CreatejsBitmap extends pixiAnimateContainer.CreatejsBitmap {
    /**
     * Replace texture.
     *
     * @param texture Texture to replace.
     */
    replaceTexture(texture) {
        this._pixiData.instance.texture = texture;
    }
}

class AnimateBlobLoaderResource extends pixim_js.LoaderResource {
    destroy() {
        if (this._data) {
            (window.URL || window.webkitURL).revokeObjectURL(this._data.src);
        }
        this._data = null;
    }
}
class AnimateBlobLoader extends pixim_js.LoaderBase {
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

class AnimateLoaderResource extends pixim_js.LoaderResource {
    destroy() {
    }
}
class AnimateLoader extends pixim_js.LoaderBase {
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
                _target.basepath = pixim_js.utils.resolvePath(options.basepath || "", target.basepath);
                return this._prepareAssetsAsync(_target.basepath || "", manifests, options)
                    .then(() => {
                    const version = options.assetVersion || options.version || '';
                    for (let i = 0; i < manifests.length; i++) {
                        const manifest = manifests[i];
                        manifest.src = pixim_js.utils.resolveUri("", manifest.src, version);
                    }
                    return pixiAnimateContainer.loadAssetAsync(_target);
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
        const filepath = pixim_js.utils.resolveUri(target.basepath, target.filepath);
        const loader = new pixim_js.JsLoader();
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
            if (!pixim_js.utils.isUrl(manifest.src)) {
                continue;
            }
            targets[i] = pixim_js.utils.resolveUri(basepath, manifest.src);
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

class AnimateManifest extends pixim_js.ManifestBase {
    _createLoader() {
        return new AnimateLoader();
    }
}

pixim_js.Content.registerManifest('animates', AnimateManifest);
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
class Container extends pixim_js.Container {
    constructor() {
        super();
        this._createjsData = {
            controller: new pixiAnimateContainer.CreatejsController(this),
            task: new pixim_js.Task([], this),
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

exports.core = pixiAnimateContainer__namespace;
exports.AnimateBlobLoader = AnimateBlobLoader;
exports.AnimateBlobLoaderResource = AnimateBlobLoaderResource;
exports.AnimateLoader = AnimateLoader;
exports.AnimateLoaderResource = AnimateLoaderResource;
exports.AnimateManifest = AnimateManifest;
exports.Container = Container;
exports.CreatejsBitmap = CreatejsBitmap;
exports.CreatejsMovieClip = CreatejsMovieClip;
exports.CreatejsSprite = CreatejsSprite;
exports.addAnimatesTo = addAnimatesTo;
exports.defineAnimatesTo = defineAnimatesTo;
//# sourceMappingURL=Pixim-animate-container.cjs.js.map
