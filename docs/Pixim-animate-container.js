/*!
 * Pixim-animate-container - v2.5.0
 * 
 * @require pixi.js v^5.3.2
 * @require @tawaship/pixim.js vundefined
 * @author tawaship (makazu.mori@gmail.com)
 * @license MIT
 */
this.Pixim = this.Pixim || {}, function(exports, PIXI, createjs, pixim_js) {
    "use strict";
    function _interopNamespaceDefault(e) {
        var n = Object.create(null);
        return e && Object.keys(e).forEach(function(k) {
            if ("default" !== k) {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: !0,
                    get: function() {
                        return e[k];
                    }
                });
            }
        }), n.default = e, Object.freeze(n);
    }
    var PIXI__namespace = _interopNamespaceDefault(PIXI), DEG_TO_RAD = Math.PI / 180;
    /*!
     * pixi-animate-container - v2.5.0
     * 
     * @require pixi.js v^5.3.2
     * @author tawaship (makazu.mori@gmail.com)
     * @license MIT
     */    function createPixiData(pixi, regObj) {
        return {
            regObj: regObj,
            instance: pixi,
            reservedBlendMode: PIXI.BLEND_MODES.NORMAL,
            mask: null,
            colorFilters: null
        };
    }
    var pixiDataStore = new WeakMap;
    function registerPixiData(cjs, data) {
        pixiDataStore.set(cjs, data);
    }
    function setMaskForPixi(data, value) {
        value ? (value.masked.push(data.instance), data.instance.mask = value.pixi, data.instance.once("added", function() {
            data.instance.parent && data.instance.parent.addChild(value.pixi);
        })) : data.instance.mask = null, data.mask = value;
    }
    function syncToPixi(root) {
        syncNode(root);
    }
    function syncNode(cjs) {
        var data = pixiDataStore.get(cjs);
        if (data) {
            var pixi = data.instance;
            pixi.x = cjs.x, pixi.y = cjs.y, pixi.scale.x = cjs.scaleX, pixi.scale.y = cjs.scaleY, 
            pixi.skew.x = -cjs.skewX * DEG_TO_RAD, pixi.skew.y = cjs.skewY * DEG_TO_RAD, pixi.rotation = cjs.rotation * DEG_TO_RAD, 
            data.regObj.x = cjs.regX, data.regObj.y = cjs.regY, pixi.visible = !!cjs.visible, 
            pixi.alpha = cjs.alpha, pixi.renderable = !cjs._off;
            var colorFilters = data.colorFilters;
            if (colorFilters) {
                for (var i = 0; i < colorFilters.length; i++) {
                    var source = colorFilters[i].source, matrix = colorFilters[i].matrix;
                    matrix[0] = source.redMultiplier, matrix[6] = source.greenMultiplier, matrix[12] = source.blueMultiplier, 
                    matrix[18] = source.alphaMultiplier, matrix[4] = source.redOffset / 255, matrix[9] = source.greenOffset / 255, 
                    matrix[14] = source.blueOffset / 255, matrix[19] = source.alphaOffset / 255;
                }
            }
            data.mask && syncNode(data.mask);
        }
        var children = cjs.children;
        if (children) {
            for (var i$1 = 0; i$1 < children.length; i$1++) {
                syncNode(children[i$1]);
            }
        }
    }
    var PixiColorMatrixFilter = function(superclass) {
        function PixiColorMatrixFilter(cjs) {
            superclass.call(this), this._createjs = cjs;
        }
        superclass && (PixiColorMatrixFilter.__proto__ = superclass), PixiColorMatrixFilter.prototype = Object.create(superclass && superclass.prototype), 
        PixiColorMatrixFilter.prototype.constructor = PixiColorMatrixFilter;
        var prototypeAccessors = {
            createjs: {
                configurable: !0
            }
        };
        return prototypeAccessors.createjs.get = function() {
            return this._createjs;
        }, Object.defineProperties(PixiColorMatrixFilter.prototype, prototypeAccessors), 
        PixiColorMatrixFilter;
    }(PIXI.filters.ColorMatrixFilter), ColorFilterBase = createjs.ColorFilter, pixiFilterStore = new WeakMap;
    function getPixiColorMatrixFilter(filter) {
        var pixi = pixiFilterStore.get(filter);
        return pixi || (function(filter, pixi) {
            var matrix = pixi.matrix;
            matrix[0] = filter.redMultiplier, matrix[6] = filter.greenMultiplier, matrix[12] = filter.blueMultiplier, 
            matrix[18] = filter.alphaMultiplier, matrix[4] = filter.redOffset / 255, matrix[9] = filter.greenOffset / 255, 
            matrix[14] = filter.blueOffset / 255, matrix[19] = filter.alphaOffset / 255;
        }(filter, pixi = new PixiColorMatrixFilter(filter)), pixiFilterStore.set(filter, pixi)), 
        pixi;
    }
    var createjsInteractionEvents, CreatejsColorFilter = function(ColorFilterBase) {
        function CreatejsColorFilter() {
            for (var args = [], len = arguments.length; len--; ) {
                args[len] = arguments[len];
            }
            ColorFilterBase.apply(this, args);
        }
        ColorFilterBase && (CreatejsColorFilter.__proto__ = ColorFilterBase), CreatejsColorFilter.prototype = Object.create(ColorFilterBase && ColorFilterBase.prototype), 
        CreatejsColorFilter.prototype.constructor = CreatejsColorFilter;
        var prototypeAccessors$1 = {
            pixi: {
                configurable: !0
            }
        };
        return prototypeAccessors$1.pixi.get = function() {
            return getPixiColorMatrixFilter(this);
        }, Object.defineProperties(CreatejsColorFilter.prototype, prototypeAccessors$1), 
        CreatejsColorFilter;
    }(ColorFilterBase), CreatejsButtonHelper = function(superclass) {
        function CreatejsButtonHelper() {
            for (var args = [], len = arguments.length; len--; ) {
                args[len] = arguments[len];
            }
            superclass.apply(this, args);
            var createjs = args[0], pixi = createjs.pixi, baseFrame = args[1], overFrame = args[2], downFrame = args[3], hit = arguments[5], hitFrame = args[6];
            hit.gotoAndStop(hitFrame), syncToPixi(hit);
            var hitPixi = pixi.addChild(hit.pixi);
            hitPixi.alpha = 1e-5;
            var isOver = !1, isDown = !1;
            hitPixi.on("pointerover", function() {
                isOver = !0, isDown ? createjs.gotoAndStop(downFrame) : createjs.gotoAndStop(overFrame);
            }), hitPixi.on("pointerout", function() {
                isOver = !1, isDown ? createjs.gotoAndStop(overFrame) : createjs.gotoAndStop(baseFrame);
            }), hitPixi.on("pointerdown", function() {
                isDown = !0, createjs.gotoAndStop(downFrame);
            }), hitPixi.on("pointerup", function() {
                isDown = !1, isOver ? createjs.gotoAndStop(overFrame) : createjs.gotoAndStop(baseFrame);
            }), hitPixi.on("pointerupoutside", function() {
                isDown = !1, isOver ? createjs.gotoAndStop(overFrame) : createjs.gotoAndStop(baseFrame);
            }), hitPixi.interactive = !0, hitPixi.cursor = "pointer";
        }
        return superclass && (CreatejsButtonHelper.__proto__ = superclass), CreatejsButtonHelper.prototype = Object.create(superclass && superclass.prototype), 
        CreatejsButtonHelper.prototype.constructor = CreatejsButtonHelper, CreatejsButtonHelper;
    }(createjs.ButtonHelper);
    !function(createjsInteractionEvents) {
        createjsInteractionEvents.mousedown = "mousedown", createjsInteractionEvents.pressmove = "pressmove", 
        createjsInteractionEvents.pressup = "pressup", createjsInteractionEvents.rollover = "rollover", 
        createjsInteractionEvents.rollout = "rollout", createjsInteractionEvents.click = "click";
    }(createjsInteractionEvents || (createjsInteractionEvents = {}));
    var CreatejsEventManager = function(cjs) {
        this._downTarget = null, this._cjs = cjs, this._emitter = new PIXI.utils.EventEmitter, 
        cjs.pixi.on("pointerdown", this._onPointerDown, this).on("pointermove", this._onPointerMove, this).on("pointerup", this._onPointerUp, this).on("pointerupoutside", this._onPointerUpOutside, this).on("pointertap", this._onPointerTap, this).on("pointerover", this._onPointerOver, this).on("pointerout", this._onPointerOut, this);
    };
    CreatejsEventManager.prototype._onPointerDown = function(e) {
        var ev = {
            type: createjsInteractionEvents.mousedown,
            currentTarget: e.currentTarget.createjs,
            target: e.target.createjs,
            rawX: e.data.global.x,
            rawY: e.data.global.y
        };
        this._downTarget = e.target.createjs, this._emitter.emit("mousedown", ev);
    }, CreatejsEventManager.prototype._onPointerMove = function(e) {
        if (this._downTarget) {
            var ev = {
                type: createjsInteractionEvents.pressmove,
                currentTarget: e.currentTarget.createjs,
                target: this._downTarget,
                rawX: e.data.global.x,
                rawY: e.data.global.y
            };
            this._emitter.emit("pressmove", ev);
        }
    }, CreatejsEventManager.prototype._onPointerUp = function(e) {
        var ev = {
            type: createjsInteractionEvents.pressup,
            currentTarget: e.currentTarget.createjs,
            target: this._downTarget,
            rawX: e.data.global.x,
            rawY: e.data.global.y
        };
        this._downTarget = null, this._emitter.emit("pressup", ev);
    }, CreatejsEventManager.prototype._onPointerUpOutside = function(e) {
        var ev = {
            type: createjsInteractionEvents.pressup,
            currentTarget: e.currentTarget.createjs,
            target: this._downTarget,
            rawX: e.data.global.x,
            rawY: e.data.global.y
        };
        this._downTarget = null, this._emitter.emit("pressup", ev);
    }, CreatejsEventManager.prototype._onPointerTap = function(e) {
        var ev = {
            type: createjsInteractionEvents.click,
            currentTarget: e.currentTarget.createjs,
            target: e.target.createjs,
            rawX: e.data.global.x,
            rawY: e.data.global.y
        };
        this._emitter.emit("click", ev);
    }, CreatejsEventManager.prototype._onPointerOver = function(e) {
        var ev = {
            type: createjsInteractionEvents.rollover,
            currentTarget: e.currentTarget.createjs,
            target: e.currentTarget.createjs,
            rawX: e.data.global.x,
            rawY: e.data.global.y
        };
        this._emitter.emit("rollover", ev);
    }, CreatejsEventManager.prototype._onPointerOut = function(e) {
        var ev = {
            type: createjsInteractionEvents.rollout,
            currentTarget: e.currentTarget.createjs,
            target: e.currentTarget.createjs,
            rawX: e.data.global.x,
            rawY: e.data.global.y
        };
        this._emitter.emit("rollout", ev);
    }, CreatejsEventManager.prototype.add = function(type, cb) {
        type in createjsInteractionEvents && (this._emitter.on(type, cb), this._emitter.eventNames().length > 0 && (this._cjs.pixi.interactive = !0));
    }, CreatejsEventManager.prototype.remove = function(type, cb) {
        type in createjsInteractionEvents && (this._emitter.off(type, cb), 0 === this._emitter.eventNames().length && (this._cjs.pixi.interactive = !1));
    }, CreatejsEventManager.prototype.removeAll = function(type) {
        type && !(type in createjsInteractionEvents) || (this._emitter.removeAllListeners(type), 
        0 === this._emitter.eventNames().length && (this._cjs.pixi.interactive = !1));
    };
    var eventManagerStore = new WeakMap;
    function addInteractionListener(cjs, type, cb) {
        type in createjsInteractionEvents && function(cjs) {
            var manager = eventManagerStore.get(cjs);
            return manager || (manager = new CreatejsEventManager(cjs), eventManagerStore.set(cjs, manager)), 
            manager;
        }(cjs).add(type, cb);
    }
    function removeInteractionListener(cjs, type, cb) {
        var manager = eventManagerStore.get(cjs);
        manager && manager.remove(type, cb);
    }
    function removeAllInteractionListeners(cjs, type) {
        var manager = eventManagerStore.get(cjs);
        manager && manager.removeAll(type);
    }
    var CompositeOperations, PixiMovieClip = function(Container$1) {
        function PixiMovieClip(cjs) {
            Container$1.call(this), this._filterContainer = null, this._createjs = cjs;
        }
        Container$1 && (PixiMovieClip.__proto__ = Container$1), PixiMovieClip.prototype = Object.create(Container$1 && Container$1.prototype), 
        PixiMovieClip.prototype.constructor = PixiMovieClip;
        var prototypeAccessors$2 = {
            filterContainer: {
                configurable: !0
            },
            createjs: {
                configurable: !0
            }
        };
        return prototypeAccessors$2.filterContainer.get = function() {
            return this._filterContainer;
        }, prototypeAccessors$2.filterContainer.set = function(value) {
            this._filterContainer = value;
        }, prototypeAccessors$2.createjs.get = function() {
            return this._createjs;
        }, Object.defineProperties(PixiMovieClip.prototype, prototypeAccessors$2), PixiMovieClip;
    }(PIXI.Container), AnimateEvent = function(superclass) {
        function AnimateEvent(type) {
            superclass.call(this, type);
        }
        return superclass && (AnimateEvent.__proto__ = superclass), AnimateEvent.prototype = Object.create(superclass && superclass.prototype), 
        AnimateEvent.prototype.constructor = AnimateEvent, AnimateEvent;
    }(createjs.Event), AnimateReachLabelEvent = function(AnimateEvent) {
        function AnimateReachLabelEvent(type, label) {
            AnimateEvent.call(this, type), this.data = label;
        }
        return AnimateEvent && (AnimateReachLabelEvent.__proto__ = AnimateEvent), AnimateReachLabelEvent.prototype = Object.create(AnimateEvent && AnimateEvent.prototype), 
        AnimateReachLabelEvent.prototype.constructor = AnimateReachLabelEvent, AnimateReachLabelEvent;
    }(AnimateEvent), MovieClipBase = createjs.MovieClip;
    !function(CompositeOperations) {
        CompositeOperations.Lighter = "lighter", CompositeOperations.Multiply = "multiply", 
        CompositeOperations.Screen = "screen";
    }(CompositeOperations || (CompositeOperations = {}));
    var blendModes = {};
    blendModes[CompositeOperations.Lighter] = PIXI.BLEND_MODES.ADD, blendModes[CompositeOperations.Multiply] = PIXI.BLEND_MODES.MULTIPLY, 
    blendModes[CompositeOperations.Screen] = PIXI.BLEND_MODES.SCREEN;
    var dataStore$5 = new WeakMap;
    function resetData$5(cjs) {
        var data = function(cjs) {
            var pixi = new PixiMovieClip(cjs);
            return Object.assign(createPixiData(pixi, pixi.pivot), {
                subInstance: pixi,
                listenFrameEvents: {},
                filters: null,
                compositeOperation: null
            });
        }(cjs);
        return dataStore$5.set(cjs, data), registerPixiData(cjs, data), data;
    }
    function ensureData$5(cjs) {
        var data = dataStore$5.get(cjs);
        return data || resetData$5(cjs);
    }
    var CreatejsMovieClip$1 = function(MovieClipBase) {
        function CreatejsMovieClip() {
            for (var args = [], len = arguments.length; len--; ) {
                args[len] = arguments[len];
            }
            MovieClipBase.apply(this, args), ensureData$5(this).listenFrameEvents = Object.assign({}, this._listenFrameEventsBase || {});
        }
        MovieClipBase && (CreatejsMovieClip.__proto__ = MovieClipBase), CreatejsMovieClip.prototype = Object.create(MovieClipBase && MovieClipBase.prototype), 
        CreatejsMovieClip.prototype.constructor = CreatejsMovieClip;
        var prototypeAccessors$3 = {
            pixi: {
                configurable: !0
            },
            framerate: {
                configurable: !0
            },
            fps: {
                configurable: !0
            },
            compositeOperation: {
                configurable: !0
            },
            filters: {
                configurable: !0
            },
            mask: {
                configurable: !0
            }
        };
        return CreatejsMovieClip.prototype.endAnimation = function(e) {}, CreatejsMovieClip.prototype.reachLabel = function(e) {}, 
        CreatejsMovieClip.prototype.initialize = function() {
            for (var args = [], len = arguments.length; len--; ) {
                args[len] = arguments[len];
            }
            return resetData$5(this).listenFrameEvents = Object.assign({}, this._listenFrameEventsBase || {}), 
            MovieClipBase.prototype.initialize.apply(this, args);
        }, prototypeAccessors$3.pixi.get = function() {
            return ensureData$5(this).instance;
        }, prototypeAccessors$3.framerate.get = function() {
            return -1;
        }, prototypeAccessors$3.framerate.set = function(value) {}, prototypeAccessors$3.fps.get = function() {
            return this._fps;
        }, CreatejsMovieClip.prototype.listenCustomFrameEvent = function(type, value) {
            ensureData$5(this).listenFrameEvents[type] = value;
        }, CreatejsMovieClip.prototype.advance = function(time) {
            var beforeFrame = this.currentFrame;
            if (MovieClipBase.prototype.advance.call(this, time), this.currentFrame !== beforeFrame) {
                var listen = ensureData$5(this).listenFrameEvents;
                if (listen.endAnimation && this.currentFrame === this.totalFrames - 1 && this.dispatchEvent(new AnimateEvent("endAnimation")), 
                listen.reachLabel) {
                    for (var i = 0; i < this.labels.length; i++) {
                        var label = this.labels[i];
                        if (this.currentFrame === label.position) {
                            this.dispatchEvent(new AnimateReachLabelEvent("reachLabel", label));
                            break;
                        }
                    }
                }
            }
        }, CreatejsMovieClip.prototype.updateStateForPixi = function() {
            this._updateState();
            for (var children = this.children, i = children.length - 1; i >= 0; i--) {
                var child = children[i];
                child instanceof CreatejsMovieClip && child.updateStateForPixi();
            }
        }, CreatejsMovieClip.prototype.updateBlendModeForPixi = function(mode) {
            var data = ensureData$5(this);
            if (!data.compositeOperation || blendModes[data.compositeOperation] !== mode) {
                data.reservedBlendMode = mode;
                for (var i = 0; i < this.children.length; i++) {
                    this.children[i].updateBlendModeForPixi(mode);
                }
            }
        }, prototypeAccessors$3.compositeOperation.get = function() {
            return ensureData$5(this).compositeOperation;
        }, prototypeAccessors$3.compositeOperation.set = function(value) {
            var data = ensureData$5(this);
            if (data.compositeOperation !== value) {
                var blendMode = value && blendModes[value] || data.reservedBlendMode;
                this.updateBlendModeForPixi(blendMode), data.compositeOperation = value;
            }
        }, prototypeAccessors$3.filters.get = function() {
            return ensureData$5(this).filters;
        }, prototypeAccessors$3.filters.set = function(value) {
            var data = ensureData$5(this), list = [], pairs = [];
            if (value && value.length > 0) {
                for (var i = 0; i < value.length; i++) {
                    var f = value[i];
                    if (f instanceof CreatejsColorFilter) {
                        var pixiFilter = getPixiColorMatrixFilter(f);
                        list.push(pixiFilter), pairs.push({
                            source: f,
                            matrix: pixiFilter.matrix
                        });
                    }
                }
            }
            data.instance.filters = list, data.colorFilters = pairs.length ? pairs : null, data.filters = value;
        }, prototypeAccessors$3.mask.get = function() {
            return ensureData$5(this).mask;
        }, prototypeAccessors$3.mask.set = function(value) {
            setMaskForPixi(ensureData$5(this), value);
        }, CreatejsMovieClip.prototype._updateChildrenBlendModeForPixi = function(child) {
            var data = ensureData$5(this), blendMode = data.compositeOperation && blendModes[data.compositeOperation] || data.reservedBlendMode;
            blendMode && child.updateBlendModeForPixi(blendMode);
        }, CreatejsMovieClip.prototype.addChild = function(child) {
            return ensureData$5(this).subInstance.addChild(child.pixi), this._updateChildrenBlendModeForPixi(child), 
            MovieClipBase.prototype.addChild.call(this, child);
        }, CreatejsMovieClip.prototype.addChildAt = function(child, index) {
            return ensureData$5(this).subInstance.addChildAt(child.pixi, index), this._updateChildrenBlendModeForPixi(child), 
            MovieClipBase.prototype.addChildAt.call(this, child, index);
        }, CreatejsMovieClip.prototype.removeChild = function(child) {
            return ensureData$5(this).subInstance.removeChild(child.pixi), MovieClipBase.prototype.removeChild.call(this, child);
        }, CreatejsMovieClip.prototype.removeChildAt = function(index) {
            return ensureData$5(this).subInstance.removeChildAt(index), MovieClipBase.prototype.removeChildAt.call(this, index);
        }, CreatejsMovieClip.prototype.removeAllChldren = function() {
            return ensureData$5(this).subInstance.removeChildren(), MovieClipBase.prototype.removeAllChildren.call(this);
        }, CreatejsMovieClip.prototype.addEventListener = function(type, cb, useCapture) {
            var p = MovieClipBase.prototype.addEventListener.call(this, type, cb, useCapture);
            return cb instanceof CreatejsButtonHelper || addInteractionListener(this, type, cb), 
            p;
        }, CreatejsMovieClip.prototype.removeEventListener = function(type, cb, useCapture) {
            MovieClipBase.prototype.removeEventListener.call(this, type, cb, useCapture), removeInteractionListener(this, type, cb);
        }, CreatejsMovieClip.prototype.removeAllEventListeners = function(type) {
            MovieClipBase.prototype.removeAllEventListeners.call(this, type), removeAllInteractionListeners(this, type);
        }, Object.defineProperties(CreatejsMovieClip.prototype, prototypeAccessors$3), CreatejsMovieClip;
    }(MovieClipBase);
    delete CreatejsMovieClip$1.prototype.endAnimation, delete CreatejsMovieClip$1.prototype.reachLabel;
    var PixiSprite = function(Sprite) {
        function PixiSprite(cjs) {
            Sprite.call(this), this._createjs = cjs;
        }
        Sprite && (PixiSprite.__proto__ = Sprite), PixiSprite.prototype = Object.create(Sprite && Sprite.prototype), 
        PixiSprite.prototype.constructor = PixiSprite;
        var prototypeAccessors$4 = {
            createjs: {
                configurable: !0
            }
        };
        return prototypeAccessors$4.createjs.get = function() {
            return this._createjs;
        }, Object.defineProperties(PixiSprite.prototype, prototypeAccessors$4), PixiSprite;
    }(PIXI.Sprite), SpriteBase = createjs.Sprite;
    var dataStore$4 = new WeakMap;
    function resetData$4(cjs) {
        var data = function(cjs) {
            var pixi = new PixiSprite(cjs);
            return createPixiData(pixi, pixi.anchor);
        }(cjs);
        return dataStore$4.set(cjs, data), registerPixiData(cjs, data), data;
    }
    function ensureData$4(cjs) {
        var data = dataStore$4.get(cjs);
        return data || resetData$4(cjs);
    }
    var CreatejsSprite$1 = function(SpriteBase) {
        function CreatejsSprite() {
            for (var args = [], len = arguments.length; len--; ) {
                args[len] = arguments[len];
            }
            SpriteBase.apply(this, args), ensureData$4(this);
        }
        SpriteBase && (CreatejsSprite.__proto__ = SpriteBase), CreatejsSprite.prototype = Object.create(SpriteBase && SpriteBase.prototype), 
        CreatejsSprite.prototype.constructor = CreatejsSprite;
        var prototypeAccessors$5 = {
            pixi: {
                configurable: !0
            },
            mask: {
                configurable: !0
            }
        };
        return CreatejsSprite.prototype.initialize = function() {
            for (var args = [], len = arguments.length; len--; ) {
                args[len] = arguments[len];
            }
            return resetData$4(this), SpriteBase.prototype.initialize.apply(this, args);
        }, prototypeAccessors$5.pixi.get = function() {
            return ensureData$4(this).instance;
        }, CreatejsSprite.prototype.advance = function(time) {}, CreatejsSprite.prototype.updateBlendModeForPixi = function(mode) {
            ensureData$4(this).instance.blendMode = mode;
        }, CreatejsSprite.prototype.gotoAndStop = function(frameOrAnimation) {
            SpriteBase.prototype.gotoAndStop.call(this, frameOrAnimation);
            var frame = this.spriteSheet.getFrame(this.currentFrame), baseTexture = PIXI.BaseTexture.from(frame.image), texture = new PIXI.Texture(baseTexture, frame.rect);
            ensureData$4(this).instance.texture = texture;
        }, prototypeAccessors$5.mask.get = function() {
            return ensureData$4(this).mask;
        }, prototypeAccessors$5.mask.set = function(value) {
            setMaskForPixi(ensureData$4(this), value);
        }, CreatejsSprite.prototype.addEventListener = function(type, cb, useCapture) {
            var p = SpriteBase.prototype.addEventListener.call(this, type, cb, useCapture);
            return cb instanceof CreatejsButtonHelper || addInteractionListener(this, type, cb), 
            p;
        }, CreatejsSprite.prototype.removeEventListener = function(type, cb, useCapture) {
            SpriteBase.prototype.removeEventListener.call(this, type, cb, useCapture), removeInteractionListener(this, type, cb);
        }, CreatejsSprite.prototype.removeAllEventListeners = function(type) {
            SpriteBase.prototype.removeAllEventListeners.call(this, type), removeAllInteractionListeners(this, type);
        }, Object.defineProperties(CreatejsSprite.prototype, prototypeAccessors$5), CreatejsSprite;
    }(SpriteBase), PixiShape = function(Container$1) {
        function PixiShape(cjs) {
            Container$1.call(this), this._createjs = cjs;
        }
        Container$1 && (PixiShape.__proto__ = Container$1), PixiShape.prototype = Object.create(Container$1 && Container$1.prototype), 
        PixiShape.prototype.constructor = PixiShape;
        var prototypeAccessors$6 = {
            createjs: {
                configurable: !0
            }
        };
        return prototypeAccessors$6.createjs.get = function() {
            return this._createjs;
        }, Object.defineProperties(PixiShape.prototype, prototypeAccessors$6), PixiShape;
    }(PIXI.Container), ShapeBase = createjs.Shape;
    var dataStore$3 = new WeakMap;
    function resetData$3(cjs) {
        var data = function(cjs) {
            var pixi = new PixiShape(cjs);
            return Object.assign(createPixiData(pixi, pixi.pivot), {
                masked: [],
                graphics: null
            });
        }(cjs);
        return dataStore$3.set(cjs, data), registerPixiData(cjs, data), data;
    }
    function ensureData$3(cjs) {
        var data = dataStore$3.get(cjs);
        return data || resetData$3(cjs);
    }
    var CreatejsShape = function(ShapeBase) {
        function CreatejsShape() {
            for (var args = [], len = arguments.length; len--; ) {
                args[len] = arguments[len];
            }
            ShapeBase.apply(this, args), ensureData$3(this);
        }
        ShapeBase && (CreatejsShape.__proto__ = ShapeBase), CreatejsShape.prototype = Object.create(ShapeBase && ShapeBase.prototype), 
        CreatejsShape.prototype.constructor = CreatejsShape;
        var prototypeAccessors$7 = {
            pixi: {
                configurable: !0
            },
            graphics: {
                configurable: !0
            },
            masked: {
                configurable: !0
            },
            mask: {
                configurable: !0
            }
        };
        return CreatejsShape.prototype.initialize = function() {
            for (var args = [], len = arguments.length; len--; ) {
                args[len] = arguments[len];
            }
            return resetData$3(this), ShapeBase.prototype.initialize.apply(this, args);
        }, prototypeAccessors$7.pixi.get = function() {
            return ensureData$3(this).instance;
        }, CreatejsShape.prototype.updateBlendModeForPixi = function(mode) {
            var _a, data = ensureData$3(this);
            data.reservedBlendMode = mode, null === (_a = data.graphics) || void 0 === _a || _a.updateBlendModeForPixi(mode);
        }, prototypeAccessors$7.graphics.get = function() {
            return ensureData$3(this).graphics;
        }, prototypeAccessors$7.graphics.set = function(value) {
            var data = ensureData$3(this);
            if (data.masked.length) {
                if (data.instance.removeChildren(), value) {
                    for (var i = 0; i < data.masked.length; i++) {
                        data.masked[i].mask = data.instance;
                    }
                } else {
                    for (var i$1 = 0; i$1 < data.masked.length; i$1++) {
                        data.masked[i$1].mask = null;
                    }
                }
            }
            value && data.instance.addChild(value.pixi), data.graphics = value;
        }, prototypeAccessors$7.masked.get = function() {
            return ensureData$3(this).masked;
        }, prototypeAccessors$7.mask.get = function() {
            return ensureData$3(this).mask;
        }, prototypeAccessors$7.mask.set = function(value) {
            setMaskForPixi(ensureData$3(this), value);
        }, CreatejsShape.prototype.addEventListener = function(type, cb, useCapture) {
            var p = ShapeBase.prototype.addEventListener.call(this, type, cb, useCapture);
            return cb instanceof CreatejsButtonHelper || addInteractionListener(this, type, cb), 
            p;
        }, CreatejsShape.prototype.removeEventListener = function(type, cb, useCapture) {
            ShapeBase.prototype.removeEventListener.call(this, type, cb, useCapture), removeInteractionListener(this, type, cb);
        }, CreatejsShape.prototype.removeAllEventListeners = function(type) {
            ShapeBase.prototype.removeAllEventListeners.call(this, type), removeAllInteractionListeners(this, type);
        }, Object.defineProperties(CreatejsShape.prototype, prototypeAccessors$7), CreatejsShape;
    }(ShapeBase), PixiBitmap = function(Sprite) {
        function PixiBitmap(cjs) {
            Sprite.call(this), this._createjs = cjs;
        }
        Sprite && (PixiBitmap.__proto__ = Sprite), PixiBitmap.prototype = Object.create(Sprite && Sprite.prototype), 
        PixiBitmap.prototype.constructor = PixiBitmap;
        var prototypeAccessors$8 = {
            createjs: {
                configurable: !0
            }
        };
        return prototypeAccessors$8.createjs.get = function() {
            return this._createjs;
        }, Object.defineProperties(PixiBitmap.prototype, prototypeAccessors$8), PixiBitmap;
    }(PIXI.Sprite), BitmapBase = createjs.Bitmap;
    var dataStore$2 = new WeakMap;
    function resetData$2(cjs) {
        var data = function(cjs) {
            var pixi = new PixiBitmap(cjs);
            return createPixiData(pixi, pixi.anchor);
        }(cjs);
        return dataStore$2.set(cjs, data), registerPixiData(cjs, data), data;
    }
    function ensureData$2(cjs) {
        var data = dataStore$2.get(cjs);
        return data || resetData$2(cjs);
    }
    var CreatejsBitmap$1 = function(BitmapBase) {
        function CreatejsBitmap() {
            for (var args = [], len = arguments.length; len--; ) {
                args[len] = arguments[len];
            }
            BitmapBase.apply(this, args), ensureData$2(this);
        }
        BitmapBase && (CreatejsBitmap.__proto__ = BitmapBase), CreatejsBitmap.prototype = Object.create(BitmapBase && BitmapBase.prototype), 
        CreatejsBitmap.prototype.constructor = CreatejsBitmap;
        var prototypeAccessors$9 = {
            pixi: {
                configurable: !0
            },
            mask: {
                configurable: !0
            }
        };
        return CreatejsBitmap.prototype.initialize = function() {
            for (var args = [], len = arguments.length; len--; ) {
                args[len] = arguments[len];
            }
            var data = resetData$2(this), res = BitmapBase.prototype.initialize.apply(this, args);
            return data.instance.texture = PIXI.Texture.from(this.image), res;
        }, prototypeAccessors$9.pixi.get = function() {
            return ensureData$2(this).instance;
        }, CreatejsBitmap.prototype.updateBlendModeForPixi = function(mode) {
            ensureData$2(this).instance.blendMode = mode;
        }, prototypeAccessors$9.mask.get = function() {
            return ensureData$2(this).mask;
        }, prototypeAccessors$9.mask.set = function(value) {
            setMaskForPixi(ensureData$2(this), value);
        }, CreatejsBitmap.prototype.addEventListener = function(type, cb, useCapture) {
            var p = BitmapBase.prototype.addEventListener.call(this, type, cb, useCapture);
            return cb instanceof CreatejsButtonHelper || addInteractionListener(this, type, cb), 
            p;
        }, CreatejsBitmap.prototype.removeEventListener = function(type, cb, useCapture) {
            BitmapBase.prototype.removeEventListener.call(this, type, cb, useCapture), removeInteractionListener(this, type, cb);
        }, CreatejsBitmap.prototype.removeAllEventListeners = function(type) {
            BitmapBase.prototype.removeAllEventListeners.call(this, type), removeAllInteractionListeners(this, type);
        }, Object.defineProperties(CreatejsBitmap.prototype, prototypeAccessors$9), CreatejsBitmap;
    }(BitmapBase), PixiGraphics = function(Graphics) {
        function PixiGraphics(cjs) {
            Graphics.call(this), this._createjs = cjs;
        }
        Graphics && (PixiGraphics.__proto__ = Graphics), PixiGraphics.prototype = Object.create(Graphics && Graphics.prototype), 
        PixiGraphics.prototype.constructor = PixiGraphics;
        var prototypeAccessors$10 = {
            createjs: {
                configurable: !0
            }
        };
        return prototypeAccessors$10.createjs.get = function() {
            return this._createjs;
        }, Object.defineProperties(PixiGraphics.prototype, prototypeAccessors$10), PixiGraphics;
    }(PIXI.Graphics), GraphicsBase = createjs.Graphics;
    var dataStore$1 = new WeakMap;
    function resetData$1(cjs) {
        var data = function(cjs) {
            var pixi = new PixiGraphics(cjs);
            return Object.assign(createPixiData(pixi, pixi.pivot), {
                strokeFill: 0,
                strokeAlpha: 1
            });
        }(cjs);
        return dataStore$1.set(cjs, data), registerPixiData(cjs, data), data;
    }
    function ensureData$1(cjs) {
        var data = dataStore$1.get(cjs);
        return data || resetData$1(cjs);
    }
    var LineCap = {
        0: PIXI.LINE_CAP.BUTT,
        1: PIXI.LINE_CAP.ROUND,
        2: PIXI.LINE_CAP.SQUARE
    }, LineJoin = {
        0: PIXI.LINE_JOIN.MITER,
        1: PIXI.LINE_JOIN.ROUND,
        2: PIXI.LINE_JOIN.BEVEL
    }, CreatejsGraphics = function(GraphicsBase) {
        function CreatejsGraphics() {
            for (var args = [], len = arguments.length; len--; ) {
                args[len] = arguments[len];
            }
            GraphicsBase.apply(this, args);
            var data = ensureData$1(this);
            data.instance.beginFill(16772846, 1), data.strokeFill = 0, data.strokeAlpha = 1;
        }
        GraphicsBase && (CreatejsGraphics.__proto__ = GraphicsBase), CreatejsGraphics.prototype = Object.create(GraphicsBase && GraphicsBase.prototype), 
        CreatejsGraphics.prototype.constructor = CreatejsGraphics;
        var prototypeAccessors$11 = {
            pixi: {
                configurable: !0
            },
            mask: {
                configurable: !0
            }
        };
        return CreatejsGraphics.prototype.initialize = function() {
            for (var args = [], len = arguments.length; len--; ) {
                args[len] = arguments[len];
            }
            return resetData$1(this), GraphicsBase.prototype.initialize.apply(this, args);
        }, prototypeAccessors$11.pixi.get = function() {
            return ensureData$1(this).instance;
        }, CreatejsGraphics.prototype.updateBlendModeForPixi = function(mode) {
            mode && (ensureData$1(this).instance.blendMode = mode);
        }, CreatejsGraphics.prototype.moveTo = function(x, y) {
            var pixi = ensureData$1(this).instance;
            return pixi.clone().endFill().containsPoint({
                x: x,
                y: y
            }) ? pixi.beginHole() : pixi.endHole(), pixi.moveTo(x, y), GraphicsBase.prototype.moveTo.call(this, x, y);
        }, CreatejsGraphics.prototype.mt = function(x, y) {
            return this.moveTo(x, y);
        }, CreatejsGraphics.prototype.lineTo = function(x, y) {
            return ensureData$1(this).instance.lineTo(x, y), GraphicsBase.prototype.lineTo.call(this, x, y);
        }, CreatejsGraphics.prototype.lt = function(x, y) {
            return this.lineTo(x, y);
        }, CreatejsGraphics.prototype.arcTo = function(x1, y1, x2, y2, radius) {
            return ensureData$1(this).instance.arcTo(x1, y1, x2, y2, radius), GraphicsBase.prototype.arcTo.call(this, x1, y1, x2, y2, radius);
        }, CreatejsGraphics.prototype.at = function(x1, y1, x2, y2, radius) {
            return this.arcTo(x1, y1, x2, y2, radius);
        }, CreatejsGraphics.prototype.arc = function(x, y, radius, startAngle, endAngle, anticlockwise) {
            return ensureData$1(this).instance.arc(x, y, radius, startAngle, endAngle, anticlockwise), 
            GraphicsBase.prototype.arc.call(this, x, y, radius, startAngle, endAngle, anticlockwise);
        }, CreatejsGraphics.prototype.a = function(x, y, radius, startAngle, endAngle, anticlockwise) {
            return this.arc(x, y, radius, startAngle, endAngle, anticlockwise);
        }, CreatejsGraphics.prototype.quadraticCurveTo = function(cpx, cpy, x, y) {
            return ensureData$1(this).instance.quadraticCurveTo(cpx, cpy, x, y), GraphicsBase.prototype.quadraticCurveTo.call(this, cpx, cpy, x, y);
        }, CreatejsGraphics.prototype.qt = function(cpx, cpy, x, y) {
            return this.quadraticCurveTo(cpx, cpy, x, y);
        }, CreatejsGraphics.prototype.curveTo = function(cpx, cpy, x, y) {
            return this.quadraticCurveTo(cpx, cpy, x, y);
        }, CreatejsGraphics.prototype.bezierCurveTo = function(cp1x, cp1y, cp2x, cp2y, x, y) {
            return ensureData$1(this).instance.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y), 
            GraphicsBase.prototype.bezierCurveTo.call(this, cp1x, cp1y, cp2x, cp2y, x, y);
        }, CreatejsGraphics.prototype.bt = function(cp1x, cp1y, cp2x, cp2y, x, y) {
            return this.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
        }, CreatejsGraphics.prototype.rect = function(x, y, w, h) {
            return ensureData$1(this).instance.drawRect(x, y, w, h), GraphicsBase.prototype.rect.call(this, x, y, w, h);
        }, CreatejsGraphics.prototype.r = function(x, y, w, h) {
            return this.rect(x, y, w, h);
        }, CreatejsGraphics.prototype.drawRect = function(x, y, w, h) {
            return this.rect(x, y, w, h);
        }, CreatejsGraphics.prototype.dr = function(x, y, w, h) {
            return this.rect(x, y, w, h);
        }, CreatejsGraphics.prototype.closePath = function() {
            return ensureData$1(this).instance.closePath(), GraphicsBase.prototype.closePath.call(this);
        }, CreatejsGraphics.prototype.cp = function() {
            return this.closePath();
        }, CreatejsGraphics.prototype.clear = function() {
            return ensureData$1(this).instance.clear(), GraphicsBase.prototype.clear.call(this);
        }, CreatejsGraphics.prototype.c = function() {
            return this.clear();
        }, CreatejsGraphics.prototype._parseColor = function(color) {
            var res = {
                color: 0,
                alpha: 1
            };
            if (!color) {
                return res.alpha = 0, res;
            }
            if ("#" === color.charAt(0)) {
                return res.color = parseInt(color.slice(1), 16), res;
            }
            var colors = color.replace(/rgba|\(|\)|\s/g, "").split(",");
            return res.color = 65536 * Number(colors[0]) + 256 * Number(colors[1]) + Number(colors[2]), 
            res.alpha = Number(colors[3]), res;
        }, CreatejsGraphics.prototype.beginFill = function(color) {
            var c = this._parseColor(color);
            return ensureData$1(this).instance.beginFill(c.color, c.alpha), GraphicsBase.prototype.beginFill.call(this, color);
        }, CreatejsGraphics.prototype.f = function(color) {
            return this.beginFill(color);
        }, CreatejsGraphics.prototype.endFill = function() {
            return ensureData$1(this).instance.endFill(), GraphicsBase.prototype.endFill.call(this);
        }, CreatejsGraphics.prototype.ef = function() {
            return this.endFill();
        }, CreatejsGraphics.prototype.setStrokeStyle = function(thickness, caps, joints, miterLimit, ignoreScale) {
            var data = ensureData$1(this);
            return data.instance.lineTextureStyle({
                width: thickness,
                color: data.strokeFill,
                alpha: data.strokeAlpha,
                cap: caps in LineCap ? LineCap[caps] : LineCap[0],
                join: joints in LineJoin ? LineJoin[joints] : LineJoin[0],
                miterLimit: miterLimit
            }), GraphicsBase.prototype.setStrokeStyle.call(this, thickness, caps, joints, miterLimit, ignoreScale);
        }, CreatejsGraphics.prototype.ss = function(thickness, caps, joints, miterLimit, ignoreScale) {
            return this.setStrokeStyle(thickness, caps, joints, miterLimit, ignoreScale);
        }, CreatejsGraphics.prototype.beginStroke = function(color) {
            var data = ensureData$1(this), c = this._parseColor(color);
            return data.strokeFill = c.color, data.strokeAlpha = c.alpha, GraphicsBase.prototype.beginStroke.call(this, color);
        }, CreatejsGraphics.prototype.s = function(color) {
            return this.beginStroke(color);
        }, CreatejsGraphics.prototype.drawRoundRect = function(x, y, w, h, radius) {
            return ensureData$1(this).instance.drawRoundedRect(x, y, w, h, radius), GraphicsBase.prototype.drawRoundRect.call(this, x, y, w, h, radius);
        }, CreatejsGraphics.prototype.rr = function(x, y, w, h, radius) {
            return this.drawRoundRect(x, y, w, h, radius);
        }, CreatejsGraphics.prototype.drawCircle = function(x, y, radius) {
            return ensureData$1(this).instance.drawCircle(x, y, radius), GraphicsBase.prototype.drawCircle.call(this, x, y, radius);
        }, CreatejsGraphics.prototype.dc = function(x, y, radius) {
            return this.drawCircle(x, y, radius);
        }, CreatejsGraphics.prototype.drawEllipse = function(x, y, w, h) {
            return ensureData$1(this).instance.drawEllipse(x, y, w, h), GraphicsBase.prototype.drawEllipse.call(this, x, y, w, h);
        }, CreatejsGraphics.prototype.de = function(x, y, w, h) {
            return this.drawEllipse(x, y, w, h);
        }, CreatejsGraphics.prototype.drawPolyStar = function(x, y, radius, sides, pointSize, angle) {
            return ensureData$1(this).instance.drawRegularPolygon(x, y, radius, sides, angle * DEG_TO_RAD), 
            GraphicsBase.prototype.drawPolyStar.call(this, x, y, radius, sides, pointSize, angle);
        }, CreatejsGraphics.prototype.dp = function(x, y, radius, sides, pointSize, angle) {
            return this.drawPolyStar(x, y, radius, sides, pointSize, angle);
        }, prototypeAccessors$11.mask.get = function() {
            return ensureData$1(this).mask;
        }, prototypeAccessors$11.mask.set = function(value) {
            setMaskForPixi(ensureData$1(this), value);
        }, CreatejsGraphics.prototype.addEventListener = function(type, cb, useCapture) {
            var p = GraphicsBase.prototype.addEventListener.call(this, type, cb, useCapture);
            return cb instanceof CreatejsButtonHelper || addInteractionListener(this, type, cb), 
            p;
        }, CreatejsGraphics.prototype.removeEventListener = function(type, cb, useCapture) {
            GraphicsBase.prototype.removeEventListener.call(this, type, cb, useCapture), removeInteractionListener(this, type, cb);
        }, CreatejsGraphics.prototype.removeAllEventListeners = function(type) {
            GraphicsBase.prototype.removeAllEventListeners.call(this, type), removeAllInteractionListeners(this, type);
        }, Object.defineProperties(CreatejsGraphics.prototype, prototypeAccessors$11), CreatejsGraphics;
    }(GraphicsBase), PixiText = function(Text) {
        function PixiText() {
            Text.apply(this, arguments);
        }
        return Text && (PixiText.__proto__ = Text), PixiText.prototype = Object.create(Text && Text.prototype), 
        PixiText.prototype.constructor = PixiText, PixiText;
    }(PIXI.Text), PixiTextContainer = function(Container$1) {
        function PixiTextContainer(cjs, text) {
            Container$1.call(this), this._createjs = cjs, this._text = text;
        }
        Container$1 && (PixiTextContainer.__proto__ = Container$1), PixiTextContainer.prototype = Object.create(Container$1 && Container$1.prototype), 
        PixiTextContainer.prototype.constructor = PixiTextContainer;
        var prototypeAccessors$12 = {
            createjs: {
                configurable: !0
            },
            text: {
                configurable: !0
            }
        };
        return prototypeAccessors$12.createjs.get = function() {
            return this._createjs;
        }, prototypeAccessors$12.text.get = function() {
            return this._text;
        }, Object.defineProperties(PixiTextContainer.prototype, prototypeAccessors$12), 
        PixiTextContainer;
    }(PIXI.Container), TextBase = createjs.Text;
    var dataStore = new WeakMap;
    function resetData(cjs) {
        var data = function(cjs) {
            var text = new PixiText("", {
                wordWrap: !0
            }), pixi = new PixiTextContainer(cjs, text);
            return pixi.addChild(text), Object.assign(createPixiData(pixi, pixi.pivot), {
                text: "",
                font: "",
                color: "",
                textAlign: "left",
                lineHeight: 0,
                lineWidth: 0
            });
        }(cjs);
        return dataStore.set(cjs, data), registerPixiData(cjs, data), data;
    }
    function ensureData(cjs) {
        var data = dataStore.get(cjs);
        return data || resetData(cjs);
    }
    var CreatejsText = function(TextBase) {
        function CreatejsText(text, font, color) {
            void 0 === color && (color = "#000000"), TextBase.call(this, text, font, color), 
            ensureData(this);
        }
        TextBase && (CreatejsText.__proto__ = TextBase), CreatejsText.prototype = Object.create(TextBase && TextBase.prototype), 
        CreatejsText.prototype.constructor = CreatejsText;
        var prototypeAccessors$13 = {
            pixi: {
                configurable: !0
            },
            text: {
                configurable: !0
            },
            font: {
                configurable: !0
            },
            color: {
                configurable: !0
            },
            textAlign: {
                configurable: !0
            },
            lineHeight: {
                configurable: !0
            },
            lineWidth: {
                configurable: !0
            },
            mask: {
                configurable: !0
            }
        };
        return prototypeAccessors$13.pixi.get = function() {
            return ensureData(this).instance;
        }, CreatejsText.prototype.updateBlendModeForPixi = function(mode) {
            ensureData(this).instance.text.blendMode = mode;
        }, prototypeAccessors$13.text.get = function() {
            return ensureData(this).text;
        }, prototypeAccessors$13.text.set = function(text) {
            var data = ensureData(this);
            data.instance.text.text = text, this._align(data.textAlign), data.text = text;
        }, CreatejsText.prototype._parseFont = function(font) {
            var p = font.split(" "), w = "normal", s = p.shift() || "";
            return -1 === s.indexOf("px") && (w = s, s = p.shift() || ""), {
                fontWeight: w,
                fontSize: Number((s || "0px").replace("px", "")),
                fontFamily: p.join(" ").replace(/'/g, "")
            };
        }, prototypeAccessors$13.font.get = function() {
            return ensureData(this).font;
        }, prototypeAccessors$13.font.set = function(font) {
            var data = ensureData(this), _font = this._parseFont(font);
            data.instance.text.style.fontWeight = _font.fontWeight, data.instance.text.style.fontSize = _font.fontSize, 
            data.instance.text.style.fontFamily = _font.fontFamily, data.font = font;
        }, CreatejsText.prototype._parseColor = function(color) {
            return parseInt(color.slice(1), 16);
        }, prototypeAccessors$13.color.get = function() {
            return ensureData(this).color;
        }, prototypeAccessors$13.color.set = function(color) {
            var data = ensureData(this);
            data.instance.text.style.fill = this._parseColor(color), data.color = color;
        }, CreatejsText.prototype._align = function(align) {
            var pixiText = ensureData(this).instance.text;
            "left" !== align ? "center" !== align ? "right" !== align || (pixiText.x = -pixiText.width) : pixiText.x = -pixiText.width / 2 : pixiText.x = 0;
        }, prototypeAccessors$13.textAlign.get = function() {
            return ensureData(this).textAlign;
        }, prototypeAccessors$13.textAlign.set = function(align) {
            var data = ensureData(this);
            data.instance.text.style.align = align, this._align(align), data.textAlign = align;
        }, prototypeAccessors$13.lineHeight.get = function() {
            return ensureData(this).lineHeight;
        }, prototypeAccessors$13.lineHeight.set = function(height) {
            var data = ensureData(this);
            data.instance.text.style.lineHeight = height, data.lineHeight = height;
        }, prototypeAccessors$13.lineWidth.get = function() {
            return ensureData(this).lineWidth;
        }, prototypeAccessors$13.lineWidth.set = function(width) {
            var data = ensureData(this);
            data.instance.text.style.wordWrapWidth = width, this._align(data.textAlign), data.lineWidth = width;
        }, prototypeAccessors$13.mask.get = function() {
            return ensureData(this).mask;
        }, prototypeAccessors$13.mask.set = function(value) {
            setMaskForPixi(ensureData(this), value);
        }, CreatejsText.prototype.addEventListener = function(type, cb, useCapture) {
            var p = TextBase.prototype.addEventListener.call(this, type, cb, useCapture);
            return cb instanceof CreatejsButtonHelper || addInteractionListener(this, type, cb), 
            p;
        }, CreatejsText.prototype.removeEventListener = function(type, cb, useCapture) {
            TextBase.prototype.removeEventListener.call(this, type, cb, useCapture), removeInteractionListener(this, type, cb);
        }, CreatejsText.prototype.removeAllEventListeners = function(type) {
            TextBase.prototype.removeAllEventListeners.call(this, type), removeAllInteractionListeners(this, type);
        }, Object.defineProperties(CreatejsText.prototype, prototypeAccessors$13), CreatejsText;
    }(TextBase);
    function playSound(id, loop, offset) {
        return createjs.Sound.play(id, {
            interrupt: createjs.Sound.INTERRUPT_EARLY,
            loop: loop,
            offset: offset
        });
    }
    function loadAssetAsync(targets) {
        var _a, _b;
        Array.isArray(targets) || (targets = [ targets ]);
        for (var promises = [], loop = function(i) {
            var target = targets[i];
            (null === (_a = target.options) || void 0 === _a ? void 0 : _a.useSound) && (window.playSound = playSound);
            var comp = AdobeAn.getComposition(target.id);
            if (!comp) {
                throw new Error("no composition: " + target.id);
            }
            for (var lib = comp.getLibrary(), manifests = lib.properties.manifest.map(function(v) {
                return JSON.parse(JSON.stringify(v));
            }), crossOrigin = "boolean" != typeof (null === (_b = target.options) || void 0 === _b ? void 0 : _b.crossOrigin) || target.options.crossOrigin, i$1 = 0; i$1 < manifests.length; i$1++) {
                var manifest = manifests[i$1];
                if (0 === manifest.src.indexOf("data:image")) {
                    manifest.type = createjs.Types.IMAGE;
                } else {
                    if (0 === manifest.src.indexOf("data:audio")) {
                        throw new Error("data URL formatted sound is not supported.");
                    }
                    0 === manifest.src.indexOf("blob:") || 0 === manifest.src.indexOf("file:") || (manifest.src = PIXI__namespace.utils.url.resolve(target.basepath, manifest.src));
                }
            }
            if (crossOrigin) {
                for (var i$2 = 0; i$2 < manifests.length; i$2++) {
                    manifests[i$2].crossOrigin = !0;
                }
            }
            var loadPromise = new Promise(function(resolve, reject) {
                var _a;
                0 === manifests.length && resolve({});
                var loader = new createjs.LoadQueue(!1);
                (null === (_a = target.options) || void 0 === _a ? void 0 : _a.useSound) && loader.installPlugin(createjs.Sound);
                var errors = [];
                loader.addEventListener("fileload", function(evt) {
                    !function(evt, comp) {
                        var images = comp.getImages();
                        evt && "image" == evt.item.type && (images[evt.item.id] = evt.result);
                    }(evt, comp);
                }), loader.addEventListener("complete", function(evt) {
                    errors.length ? reject(errors) : resolve(evt);
                }), loader.addEventListener("error", function(evt) {
                    errors.push(evt.data);
                }), loader.loadManifest(manifests || []);
            }).then(function(evt) {
                for (var ss = comp.getSpriteSheet(), queue = evt.target, ssMetadata = lib.ssMetadata, i = 0; i < ssMetadata.length; i++) {
                    ss[ssMetadata[i].name] = new createjs.SpriteSheet({
                        images: [ queue.getResult(ssMetadata[i].name) ],
                        frames: ssMetadata[i].frames
                    });
                }
                return lib;
            });
            promises.push(loadPromise.then(function(lib) {
                var _a;
                for (var i in lib) {
                    lib[i].prototype instanceof CreatejsMovieClip$1 && (lib[i].prototype._fps = lib.properties.fps, 
                    lib[i].prototype._listenFrameEventsBase = null === (_a = target.options) || void 0 === _a ? void 0 : _a.listenFrameEvents);
                }
                return lib;
            }));
        }, i = 0; i < targets.length; i++) {
            loop(i);
        }
        return Promise.all(promises).then(function(resolvers) {
            return 1 === resolvers.length ? resolvers[0] : resolvers;
        });
    }
    var CreatejsEvent = createjs.Event, CreatejsController = function(container) {
        this._speed = 1, this._overSpeed = !0, this._createjsData = {
            id: 0,
            targets: {},
            container: container
        };
    }, prototypeAccessors$14 = {
        speed: {
            configurable: !0
        },
        overSpeed: {
            configurable: !0
        }
    };
    prototypeAccessors$14.speed.get = function() {
        return this._speed;
    }, prototypeAccessors$14.speed.set = function(value) {
        this._speed = value;
    }, prototypeAccessors$14.overSpeed.get = function() {
        return this._overSpeed;
    }, prototypeAccessors$14.overSpeed.set = function(value) {
        this._overSpeed = value;
    }, CreatejsController.prototype.handleTick = function(delta) {
        var d = delta * this._speed, targets = this._createjsData.targets;
        for (var i in targets) {
            var target = targets[i];
            target.t += d * target.cjs.fps / 60;
            var p = 0 | target.t, frame = this._overSpeed ? p : Math.min(p, 1);
            if (target.isFirst) {
                target.isFirst = !1, target.cjs.updateStateForPixi(), syncToPixi(target.cjs);
            } else {
                target.t -= p;
                for (var f = 0; f < frame; f++) {
                    target.cjs._tick(new CreatejsEvent("tick")), target.cjs.updateStateForPixi();
                }
                syncToPixi(target.cjs);
            }
        }
    }, CreatejsController.prototype._addCreatejs = function(cjs) {
        var this$1$1 = this;
        if (cjs instanceof CreatejsMovieClip$1) {
            var p = cjs.pixi.parent;
            cjs.pixi.once("added", function() {
                cjs.pixi.parent !== p && cjs.gotoAndPlay(0);
                var id = this$1$1._createjsData.id++;
                this$1$1._createjsData.targets[id] = {
                    cjs: cjs,
                    t: 0,
                    isFirst: !0
                }, cjs.pixi.once("removed", function() {
                    delete this$1$1._createjsData.targets[id];
                });
            });
        }
    }, CreatejsController.prototype.addCreatejs = function(cjs) {
        return this._addCreatejs(cjs), this._createjsData.container.addChild(cjs.pixi), 
        cjs;
    }, CreatejsController.prototype.addCreatejsAt = function(cjs, index) {
        return this._addCreatejs(cjs), this._createjsData.container.addChildAt(cjs.pixi, index), 
        cjs;
    }, CreatejsController.prototype.removeCreatejs = function(cjs) {
        return this._createjsData.container.removeChild(cjs.pixi), cjs;
    }, Object.defineProperties(CreatejsController.prototype, prototypeAccessors$14);
    var Container$1 = function(Container$1) {
        function Container() {
            Container$1.call(this), this._createjsData = {
                controller: new CreatejsController(this)
            };
        }
        Container$1 && (Container.__proto__ = Container$1), Container.prototype = Object.create(Container$1 && Container$1.prototype), 
        Container.prototype.constructor = Container;
        var prototypeAccessors$15 = {
            createjsSpeed: {
                configurable: !0
            },
            createjsOverSpeed: {
                configurable: !0
            }
        };
        return prototypeAccessors$15.createjsSpeed.get = function() {
            return this._createjsData.controller.speed;
        }, prototypeAccessors$15.createjsSpeed.set = function(value) {
            this._createjsData.controller.speed = value;
        }, prototypeAccessors$15.createjsOverSpeed.get = function() {
            return this._createjsData.controller.overSpeed;
        }, prototypeAccessors$15.createjsOverSpeed.set = function(value) {
            this._createjsData.controller.overSpeed = value;
        }, Container.prototype.handleTick = function(delta) {
            return this._createjsData.controller.handleTick(delta);
        }, Container.prototype.addCreatejs = function(cjs) {
            return this._createjsData.controller.addCreatejs(cjs);
        }, Container.prototype.addCreatejsAt = function(cjs, index) {
            return this._createjsData.controller.addCreatejsAt(cjs, index);
        }, Container.prototype.removeCreatejs = function(cjs) {
            return this._createjsData.controller.removeCreatejs(cjs);
        }, Object.defineProperties(Container.prototype, prototypeAccessors$15), Container;
    }(PIXI.Container);
    createjs.MovieClip = CreatejsMovieClip$1, createjs.Sprite = CreatejsSprite$1, createjs.Shape = CreatejsShape, 
    createjs.Bitmap = CreatejsBitmap$1, createjs.Graphics = CreatejsGraphics, createjs.Text = CreatejsText, 
    createjs.ButtonHelper = CreatejsButtonHelper, createjs.ColorFilter = CreatejsColorFilter, 
    createjs.MotionGuidePlugin.install();
    var pixiAnimateContainer_esm = Object.freeze({
        __proto__: null,
        AnimateEvent: AnimateEvent,
        AnimateReachLabelEvent: AnimateReachLabelEvent,
        get CompositeOperations() {
            return CompositeOperations;
        },
        Container: Container$1,
        CreatejsBitmap: CreatejsBitmap$1,
        CreatejsButtonHelper: CreatejsButtonHelper,
        CreatejsColorFilter: CreatejsColorFilter,
        CreatejsController: CreatejsController,
        CreatejsEventManager: CreatejsEventManager,
        CreatejsGraphics: CreatejsGraphics,
        CreatejsMovieClip: CreatejsMovieClip$1,
        CreatejsShape: CreatejsShape,
        CreatejsSprite: CreatejsSprite$1,
        CreatejsText: CreatejsText,
        PixiBitmap: PixiBitmap,
        PixiColorMatrixFilter: PixiColorMatrixFilter,
        PixiGraphics: PixiGraphics,
        PixiMovieClip: PixiMovieClip,
        PixiShape: PixiShape,
        PixiSprite: PixiSprite,
        PixiText: PixiText,
        PixiTextContainer: PixiTextContainer,
        addInteractionListener: addInteractionListener,
        createPixiData: createPixiData,
        get createjsInteractionEvents() {
            return createjsInteractionEvents;
        },
        findPixiData: function(cjs) {
            var data = pixiDataStore.get(cjs);
            return data || null;
        },
        getPixiColorMatrixFilter: getPixiColorMatrixFilter,
        loadAssetAsync: loadAssetAsync,
        registerPixiData: registerPixiData,
        removeAllInteractionListeners: removeAllInteractionListeners,
        removeInteractionListener: removeInteractionListener,
        setMaskForPixi: setMaskForPixi,
        syncToPixi: syncToPixi
    });
    var CreatejsMovieClip = function(_CreatejsMovieClip) {
        function CreatejsMovieClip() {
            _CreatejsMovieClip.apply(this, arguments);
        }
        return _CreatejsMovieClip && (CreatejsMovieClip.__proto__ = _CreatejsMovieClip), 
        CreatejsMovieClip.prototype = Object.create(_CreatejsMovieClip && _CreatejsMovieClip.prototype), 
        CreatejsMovieClip.prototype.constructor = CreatejsMovieClip, CreatejsMovieClip.prototype.replaceInstance = function(name, cls) {
            var old = function(target, name) {
                return Reflect.get(target, name);
            }(this, name);
            if (!old) {
                throw console.warn("instance '" + name + "' was not found."), new Error("instance '" + name + "' was not found.");
            }
            var instance = new cls(old.mode, old.startPosition, old.loop, old.timeline.reversed);
            Reflect.set(this, name, instance);
            for (var tweens = this.timeline.tweens, i = 0; i < tweens.length; i++) {
                var target = tweens[i].target;
                if (Array.isArray(target.state)) {
                    for (var j = 0; j < target.state.length; j++) {
                        target.state[j].t === old && (target.state[j].t = instance);
                    }
                } else {
                    target === old && (tweens[i].target = instance);
                }
            }
            if (instance.x = old.x, instance.y = old.y, instance.scaleX = old.scaleX, instance.scaleY = old.scaleY, 
            instance.rotation = old.rotation, instance.skewX = old.skewX, instance.skewY = old.skewY, 
            instance.regX = old.regX, instance.regY = old.regY, instance._off = old._off, instance.alpha = old.alpha, 
            old.mask && (instance.mask = old.mask, old.mask = null), old.filters) {
                instance.filters = old.filters, old.filters = null;
                var nominalBounds = instance.nominalBounds;
                instance.cache(nominalBounds.x - 2, nominalBounds.y - 2, nominalBounds.width + 4, nominalBounds.height + 4);
            }
            return this.removeChild(old), instance;
        }, CreatejsMovieClip;
    }(CreatejsMovieClip$1), CreatejsSprite = function(_CreatejsSprite) {
        function CreatejsSprite() {
            _CreatejsSprite.apply(this, arguments);
        }
        return _CreatejsSprite && (CreatejsSprite.__proto__ = _CreatejsSprite), CreatejsSprite.prototype = Object.create(_CreatejsSprite && _CreatejsSprite.prototype), 
        CreatejsSprite.prototype.constructor = CreatejsSprite, CreatejsSprite.prototype.replaceTexture = function(texture) {
            this.pixi.texture = texture;
        }, CreatejsSprite;
    }(CreatejsSprite$1), CreatejsBitmap = function(_CreatejsBitmap) {
        function CreatejsBitmap() {
            _CreatejsBitmap.apply(this, arguments);
        }
        return _CreatejsBitmap && (CreatejsBitmap.__proto__ = _CreatejsBitmap), CreatejsBitmap.prototype = Object.create(_CreatejsBitmap && _CreatejsBitmap.prototype), 
        CreatejsBitmap.prototype.constructor = CreatejsBitmap, CreatejsBitmap.prototype.replaceTexture = function(texture) {
            this.pixi.texture = texture;
        }, CreatejsBitmap;
    }(CreatejsBitmap$1), AnimateBlobLoaderResource = function(LoaderResource) {
        function AnimateBlobLoaderResource() {
            LoaderResource.apply(this, arguments);
        }
        return LoaderResource && (AnimateBlobLoaderResource.__proto__ = LoaderResource), 
        AnimateBlobLoaderResource.prototype = Object.create(LoaderResource && LoaderResource.prototype), 
        AnimateBlobLoaderResource.prototype.constructor = AnimateBlobLoaderResource, AnimateBlobLoaderResource.prototype.destroy = function() {
            this._data && (window.URL || window.webkitURL).revokeObjectURL(this._data.src), 
            this._data = null;
        }, AnimateBlobLoaderResource;
    }(pixim_js.LoaderResource), AnimateBlobLoader = function(LoaderBase) {
        function AnimateBlobLoader() {
            LoaderBase.apply(this, arguments);
        }
        return LoaderBase && (AnimateBlobLoader.__proto__ = LoaderBase), AnimateBlobLoader.prototype = Object.create(LoaderBase && LoaderBase.prototype), 
        AnimateBlobLoader.prototype.constructor = AnimateBlobLoader, AnimateBlobLoader.prototype._loadAsync = function(target, options) {
            var data, src, xhr;
            return void 0 === options && (options = {}), (data = this._resolveParams(target, options), 
            src = data.src, xhr = data.xhr, xhr ? fetch(src, xhr.requestOptions || {}) : fetch(src)).then(function(res) {
                if (!res.ok) {
                    throw res.statusText || "error";
                }
                return res.blob();
            }).then(function(blob) {
                return {
                    src: (window.URL || window.webkitURL).createObjectURL(blob),
                    type: blob.type
                };
            }).then(function(data) {
                return new AnimateBlobLoaderResource(data, null);
            }).catch(function(e) {
                return new AnimateBlobLoaderResource(null, e);
            });
        }, AnimateBlobLoader;
    }(pixim_js.LoaderBase), AnimateLoaderResource = function(LoaderResource) {
        function AnimateLoaderResource() {
            LoaderResource.apply(this, arguments);
        }
        return LoaderResource && (AnimateLoaderResource.__proto__ = LoaderResource), AnimateLoaderResource.prototype = Object.create(LoaderResource && LoaderResource.prototype), 
        AnimateLoaderResource.prototype.constructor = AnimateLoaderResource, AnimateLoaderResource.prototype.destroy = function() {}, 
        AnimateLoaderResource;
    }(pixim_js.LoaderResource), AnimateLoader = function(LoaderBase) {
        function AnimateLoader() {
            LoaderBase.apply(this, arguments);
        }
        return LoaderBase && (AnimateLoader.__proto__ = LoaderBase), AnimateLoader.prototype = Object.create(LoaderBase && LoaderBase.prototype), 
        AnimateLoader.prototype.constructor = AnimateLoader, AnimateLoader.prototype._loadAsync = function(target, options) {
            var this$1$1 = this;
            return void 0 === options && (options = {}), this._loadJsAsync(target, options).then(function() {
                var _a, comp = AdobeAn.getComposition(target.id);
                if (!comp) {
                    throw new Error("no composition: " + target.id);
                }
                var lib = comp.getLibrary(), originalManifests = lib.properties.manifest, manifests = lib.properties.manifest = originalManifests.map(function(v) {
                    return JSON.parse(JSON.stringify(v));
                });
                return ((null === (_a = target.options) || void 0 === _a ? void 0 : _a.handleManifest) ? target.options.handleManifest(manifests) : Promise.resolve()).then(function() {
                    var _target = Object.assign({}, target);
                    return _target.basepath = pixim_js.utils.resolvePath(options.basepath || "", target.basepath), 
                    this$1$1._prepareAssetsAsync(_target.basepath || "", manifests, options).then(function() {
                        for (var version = options.assetVersion || options.version || "", i = 0; i < manifests.length; i++) {
                            var manifest = manifests[i];
                            manifest.src = pixim_js.utils.resolveUri("", manifest.src, version);
                        }
                        return loadAssetAsync(_target);
                    }).then(function(_lib) {
                        return lib.properties.manifest = originalManifests, _lib;
                    });
                });
            }).then(function(lib) {
                return new AnimateLoaderResource(lib, null);
            }).catch(function(e) {
                return new AnimateLoaderResource({}, e);
            });
        }, AnimateLoader.prototype._loadJsAsync = function(target, options) {
            if (!target.filepath) {
                return Promise.resolve();
            }
            var filepath = pixim_js.utils.resolveUri(target.basepath, target.filepath);
            return (new pixim_js.JsLoader).loadAsync(filepath, Object.assign({}, options, {
                version: options.fileVersion || options.version
            })).then(function(resource) {
                if (resource.error) {
                    throw resource.error;
                }
                resource.ref();
            });
        }, AnimateLoader.prototype._prepareAssetsAsync = function(basepath, manifests, options) {
            var targets = {};
            if (!options.xhr) {
                return Promise.resolve();
            }
            for (var i = 0; i < manifests.length; i++) {
                var manifest = manifests[i];
                pixim_js.utils.isUrl(manifest.src) && (targets[i] = pixim_js.utils.resolveUri(basepath, manifest.src));
            }
            return 0 === Object.keys(targets).length ? Promise.resolve() : (new AnimateBlobLoader).loadAllAsync(targets, Object.assign({}, options, {
                version: options.assetVersion || options.version
            })).then(function(resources) {
                for (var i in resources) {
                    var resource = resources[i];
                    if (resource.error) {
                        throw resource.error;
                    }
                    if (!resource.data) {
                        throw "invalid resource";
                    }
                    var _i = Number(i);
                    manifests[_i] && (manifests[_i].src = resource.data.src, manifests[_i].type = resource.data.type.split("/")[0]);
                }
            });
        }, AnimateLoader;
    }(pixim_js.LoaderBase), AnimateManifest = function(ManifestBase) {
        function AnimateManifest() {
            ManifestBase.apply(this, arguments);
        }
        return ManifestBase && (AnimateManifest.__proto__ = ManifestBase), AnimateManifest.prototype = Object.create(ManifestBase && ManifestBase.prototype), 
        AnimateManifest.prototype.constructor = AnimateManifest, AnimateManifest.prototype._createLoader = function() {
            return new AnimateLoader;
        }, AnimateManifest;
    }(pixim_js.ManifestBase);
    pixim_js.Content.registerManifest("animates", AnimateManifest);
    var Container = function(PiximContainer) {
        function Container() {
            var this$1$1 = this;
            PiximContainer.call(this), this._createjsData = {
                controller: new CreatejsController(this),
                task: new pixim_js.Task([], this)
            }, this._createjsData.task.add(function(e) {
                this$1$1.handleTick(e.delta);
            }), this._createjsData.task.first();
        }
        PiximContainer && (Container.__proto__ = PiximContainer), Container.prototype = Object.create(PiximContainer && PiximContainer.prototype), 
        Container.prototype.constructor = Container;
        var prototypeAccessors = {
            createjsSpeed: {
                configurable: !0
            },
            createjsOverSpeed: {
                configurable: !0
            }
        };
        return prototypeAccessors.createjsSpeed.get = function() {
            return this._createjsData.controller.speed;
        }, prototypeAccessors.createjsSpeed.set = function(value) {
            this._createjsData.controller.speed = value;
        }, prototypeAccessors.createjsOverSpeed.get = function() {
            return this._createjsData.controller.overSpeed;
        }, prototypeAccessors.createjsOverSpeed.set = function(value) {
            this._createjsData.controller.overSpeed = value;
        }, Container.prototype.updateTask = function(e) {
            PiximContainer.prototype.updateTask.call(this, e);
            var task = this._createjsData.task;
            this.taskEnabled && task.done(e);
        }, Container.prototype.handleTick = function(delta) {
            return this._createjsData.controller.handleTick(delta);
        }, Container.prototype.addCreatejs = function(cjs) {
            return this._createjsData.controller.addCreatejs(cjs);
        }, Container.prototype.addCreatejsAt = function(cjs, index) {
            return this._createjsData.controller.addCreatejsAt(cjs, index);
        }, Container.prototype.removeCreatejs = function(cjs) {
            return this._createjsData.controller.removeCreatejs(cjs);
        }, Object.defineProperties(Container.prototype, prototypeAccessors), Container;
    }(pixim_js.Container);
    createjs.MovieClip = CreatejsMovieClip, createjs.Bitmap = CreatejsBitmap, createjs.Sprite = CreatejsSprite, 
    exports.AnimateBlobLoader = AnimateBlobLoader, exports.AnimateBlobLoaderResource = AnimateBlobLoaderResource, 
    exports.AnimateLoader = AnimateLoader, exports.AnimateLoaderResource = AnimateLoaderResource, 
    exports.AnimateManifest = AnimateManifest, exports.Container = Container, exports.CreatejsBitmap = CreatejsBitmap, 
    exports.CreatejsMovieClip = CreatejsMovieClip, exports.CreatejsSprite = CreatejsSprite, 
    exports.addAnimatesTo = function(content, data, options) {
        content.addTargets("animates", data, {});
    }, exports.core = pixiAnimateContainer_esm, exports.defineAnimatesTo = function(Content, data, options) {
        Content.defineTargets("animates", data, {});
    };
}(this.Pixim.animate = this.Pixim.animate || {}, PIXI, createjs, Pixim);
//# sourceMappingURL=Pixim-animate-container.js.map
