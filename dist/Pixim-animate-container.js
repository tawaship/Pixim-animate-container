/*!
 * Pixim-animate-container - v2.1.0
 * 
 * @require pixi.js v^5.3.2
 * @require @tawaship/pixim.js v^1.14.0
 * @author tawaship (makazu.mori@gmail.com)
 * @license MIT
 */
this.Pixim = this.Pixim || {}, function(exports, createjs, PIXI$1, Pixim) {
    "use strict";
    function _interopNamespaceDefault(e) {
        var n = Object.create(null);
        return e && Object.keys(e).forEach((function(k) {
            if ("default" !== k) {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: !0,
                    get: function() {
                        return e[k];
                    }
                });
            }
        })), n.default = e, Object.freeze(n);
    }
    var PIXI$1__namespace = _interopNamespaceDefault(PIXI$1), Pixim__namespace = _interopNamespaceDefault(Pixim), CreatejsButtonHelper = function(superclass) {
        function CreatejsButtonHelper() {
            for (var args = [], len = arguments.length; len--; ) {
                args[len] = arguments[len];
            }
            superclass.apply(this, args);
            var createjs = args[0], pixi = createjs.pixi, baseFrame = args[1], overFrame = args[2], downFrame = args[3], hit = arguments[5], hitFrame = args[6];
            hit.gotoAndStop(hitFrame);
            var hitPixi = pixi.addChild(hit.pixi);
            hitPixi.alpha = 1e-5;
            var isOver = !1, isDown = !1;
            hitPixi.on("pointerover", (function() {
                isOver = !0, isDown ? createjs.gotoAndStop(downFrame) : createjs.gotoAndStop(overFrame);
            })), hitPixi.on("pointerout", (function() {
                isOver = !1, isDown ? createjs.gotoAndStop(overFrame) : createjs.gotoAndStop(baseFrame);
            })), hitPixi.on("pointerdown", (function() {
                isDown = !0, createjs.gotoAndStop(downFrame);
            })), hitPixi.on("pointerup", (function() {
                isDown = !1, isOver ? createjs.gotoAndStop(overFrame) : createjs.gotoAndStop(baseFrame);
            })), hitPixi.on("pointerupoutside", (function() {
                isDown = !1, isOver ? createjs.gotoAndStop(overFrame) : createjs.gotoAndStop(baseFrame);
            })), hitPixi.interactive = !0, hitPixi.cursor = "pointer";
        }
        return superclass && (CreatejsButtonHelper.__proto__ = superclass), CreatejsButtonHelper.prototype = Object.create(superclass && superclass.prototype), 
        CreatejsButtonHelper.prototype.constructor = CreatejsButtonHelper, CreatejsButtonHelper;
    }(createjs.ButtonHelper);
    function createObject(proto) {
        return Object.create(proto);
    }
    var DEG_TO_RAD = Math.PI / 180;
    function createPixiData(pixi, regObj) {
        return {
            regObj: regObj,
            instance: pixi,
            reservedBlendMode: PIXI.BLEND_MODES.NORMAL
        };
    }
    function createCreatejsParams() {
        return {
            x: 0,
            y: 0,
            scaleX: 0,
            scaleY: 0,
            regX: 0,
            regY: 0,
            skewX: 0,
            skewY: 0,
            rotation: 0,
            visible: !0,
            alpha: 1,
            _off: !1,
            mask: null
        };
    }
    function updateDisplayObjectChildren(cjs, e) {
        for (var list = cjs.children.slice(), i = 0, l = list.length; i < l; i++) {
            list[i].updateForPixi(e);
        }
        return !0;
    }
    function mixinCreatejsDisplayObject(superClass) {
        var C = function(superClass) {
            function C() {
                superClass.apply(this, arguments);
            }
            superClass && (C.__proto__ = superClass), C.prototype = Object.create(superClass && superClass.prototype), 
            C.prototype.constructor = C;
            var prototypeAccessors = {
                pixi: {
                    configurable: !0
                },
                x: {
                    configurable: !0
                },
                y: {
                    configurable: !0
                },
                scaleX: {
                    configurable: !0
                },
                scaleY: {
                    configurable: !0
                },
                skewX: {
                    configurable: !0
                },
                skewY: {
                    configurable: !0
                },
                regX: {
                    configurable: !0
                },
                regY: {
                    configurable: !0
                },
                rotation: {
                    configurable: !0
                },
                visible: {
                    configurable: !0
                },
                alpha: {
                    configurable: !0
                },
                _off: {
                    configurable: !0
                },
                mask: {
                    configurable: !0
                }
            };
            return prototypeAccessors.pixi.get = function() {
                return this._pixiData.instance;
            }, prototypeAccessors.x.get = function() {
                return this._createjsParams.x;
            }, prototypeAccessors.x.set = function(value) {
                this._pixiData.instance.x = value, this._createjsParams.x = value;
            }, prototypeAccessors.y.get = function() {
                return this._createjsParams.y;
            }, prototypeAccessors.y.set = function(value) {
                this._pixiData.instance.y = value, this._createjsParams.y = value;
            }, prototypeAccessors.scaleX.get = function() {
                return this._createjsParams.scaleX;
            }, prototypeAccessors.scaleX.set = function(value) {
                this._pixiData.instance.scale.x = value, this._createjsParams.scaleX = value;
            }, prototypeAccessors.scaleY.get = function() {
                return this._createjsParams.scaleY;
            }, prototypeAccessors.scaleY.set = function(value) {
                this._pixiData.instance.scale.y = value, this._createjsParams.scaleY = value;
            }, prototypeAccessors.skewX.get = function() {
                return this._createjsParams.skewX;
            }, prototypeAccessors.skewX.set = function(value) {
                this._pixiData.instance.skew.x = -value * DEG_TO_RAD, this._createjsParams.skewX = value;
            }, prototypeAccessors.skewY.get = function() {
                return this._createjsParams.skewY;
            }, prototypeAccessors.skewY.set = function(value) {
                this._pixiData.instance.skew.y = value * DEG_TO_RAD, this._createjsParams.skewY = value;
            }, prototypeAccessors.regX.get = function() {
                return this._createjsParams.regX;
            }, prototypeAccessors.regX.set = function(value) {
                this._pixiData.regObj.x = value, this._createjsParams.regX = value;
            }, prototypeAccessors.regY.get = function() {
                return this._createjsParams.regY;
            }, prototypeAccessors.regY.set = function(value) {
                this._pixiData.regObj.y = value, this._createjsParams.regY = value;
            }, prototypeAccessors.rotation.get = function() {
                return this._createjsParams.rotation;
            }, prototypeAccessors.rotation.set = function(value) {
                this._pixiData.instance.rotation = value * DEG_TO_RAD, this._createjsParams.rotation = value;
            }, prototypeAccessors.visible.get = function() {
                return this._createjsParams.visible;
            }, prototypeAccessors.visible.set = function(value) {
                value = !!value, this._pixiData.instance.visible = value, this._createjsParams.visible = value;
            }, prototypeAccessors.alpha.get = function() {
                return this._createjsParams.alpha;
            }, prototypeAccessors.alpha.set = function(value) {
                this._pixiData.instance.alpha = value, this._createjsParams.alpha = value;
            }, prototypeAccessors._off.get = function() {
                return this._createjsParams._off;
            }, prototypeAccessors._off.set = function(value) {
                this._pixiData.instance.renderable = !value, this._createjsParams._off = value;
            }, C.prototype.addEventListener = function(type, cb) {
                for (var args = [], len = arguments.length - 2; len-- > 0; ) {
                    args[len] = arguments[len + 2];
                }
                var p = superClass.prototype.addEventListener.apply(this, [ type, cb ].concat(args));
                return cb instanceof CreatejsButtonHelper || this._createjsEventManager.add(type, cb), 
                p;
            }, C.prototype.removeEventListener = function(type, cb) {
                for (var args = [], len = arguments.length - 2; len-- > 0; ) {
                    args[len] = arguments[len + 2];
                }
                var p = superClass.prototype.removeEventListener.apply(this, [ type, cb ].concat(args));
                return cb instanceof CreatejsButtonHelper || this._createjsEventManager.remove(type, cb), 
                p;
            }, C.prototype.removeAllEventListeners = function(type) {
                for (var args = [], len = arguments.length - 1; len-- > 0; ) {
                    args[len] = arguments[len + 1];
                }
                var p = superClass.prototype.removeAllEventListeners.apply(this, [ type ].concat(args));
                return this._createjsEventManager.removeAll(type), p;
            }, prototypeAccessors.mask.get = function() {
                return this._createjsParams.mask;
            }, prototypeAccessors.mask.set = function(value) {
                var this$1$1 = this;
                value ? (value.masked.push(this._pixiData.instance), this._pixiData.instance.mask = value.pixi, 
                this._pixiData.instance.once("added", (function() {
                    this$1$1._pixiData.instance.parent.addChild(value.pixi);
                }))) : this._pixiData.instance.mask = null, this._createjsParams.mask = value;
            }, Object.defineProperties(C.prototype, prototypeAccessors), C;
        }(superClass);
        return C;
    }
    var createjsInteractionEvents, CreatejsStage = function(superclass) {
        function CreatejsStage() {
            superclass.apply(this, arguments);
        }
        return superclass && (CreatejsStage.__proto__ = superclass), CreatejsStage.prototype = Object.create(superclass && superclass.prototype), 
        CreatejsStage.prototype.constructor = CreatejsStage, CreatejsStage.prototype.updateForPixi = function(props) {
            return this.tickOnUpdate && this.tick(props), this.dispatchEvent("drawstart"), updateDisplayObjectChildren(this, props), 
            this.dispatchEvent("drawend"), !0;
        }, CreatejsStage.prototype.updateBlendModeForPixi = function(mode) {}, CreatejsStage;
    }(createjs.Stage), CreatejsStageGL = function(superclass) {
        function CreatejsStageGL() {
            superclass.apply(this, arguments);
        }
        return superclass && (CreatejsStageGL.__proto__ = superclass), CreatejsStageGL.prototype = Object.create(superclass && superclass.prototype), 
        CreatejsStageGL.prototype.constructor = CreatejsStageGL, CreatejsStageGL.prototype.updateForPixi = function(props) {
            return this.tickOnUpdate && this.tick(props), this.dispatchEvent("drawstart"), updateDisplayObjectChildren(this, props), 
            this.dispatchEvent("drawend"), !0;
        }, CreatejsStageGL.prototype.updateBlendModeForPixi = function(mode) {}, CreatejsStageGL;
    }(createjs.StageGL);
    !function(createjsInteractionEvents) {
        createjsInteractionEvents.mousedown = "mousedown", createjsInteractionEvents.pressmove = "pressmove", 
        createjsInteractionEvents.pressup = "pressup", createjsInteractionEvents.rollover = "rollover", 
        createjsInteractionEvents.rollout = "rollout", createjsInteractionEvents.click = "click";
    }(createjsInteractionEvents || (createjsInteractionEvents = {}));
    var CreatejsEventManager = function(cjs) {
        this._downTarget = null, this._cjs = cjs, this._emitter = new PIXI$1.utils.EventEmitter, 
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
    var PixiMovieClip = function(Container$1) {
        function PixiMovieClip(cjs) {
            Container$1.call(this), this._filterContainer = null, this._createjs = cjs;
        }
        Container$1 && (PixiMovieClip.__proto__ = Container$1), PixiMovieClip.prototype = Object.create(Container$1 && Container$1.prototype), 
        PixiMovieClip.prototype.constructor = PixiMovieClip;
        var prototypeAccessors = {
            filterContainer: {
                configurable: !0
            },
            createjs: {
                configurable: !0
            }
        };
        return prototypeAccessors.filterContainer.get = function() {
            return this._filterContainer;
        }, prototypeAccessors.filterContainer.set = function(value) {
            this._filterContainer = value;
        }, prototypeAccessors.createjs.get = function() {
            return this._createjs;
        }, Object.defineProperties(PixiMovieClip.prototype, prototypeAccessors), PixiMovieClip;
    }(PIXI$1.Container);
    function createCreatejsMovieClipParams() {
        return Object.assign({
            x: 0,
            y: 0,
            scaleX: 0,
            scaleY: 0,
            regX: 0,
            regY: 0,
            skewX: 0,
            skewY: 0,
            rotation: 0,
            visible: !0,
            alpha: 1,
            _off: !1,
            mask: null
        }, {
            filters: null,
            compositeOperation: null
        });
    }
    function createPixiMovieClipData(cjs) {
        var pixi = new PixiMovieClip(cjs);
        return Object.assign(createPixiData(pixi, pixi.pivot), {
            subInstance: pixi
        });
    }
    var CompositeOpeations, AnimateEvent = function(superclass) {
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
    }(AnimateEvent), P$6 = createjs.MovieClip;
    !function(CompositeOpeations) {
        CompositeOpeations.Lighter = "lighter", CompositeOpeations.Multiply = "multiply", 
        CompositeOpeations.Screen = "screen";
    }(CompositeOpeations || (CompositeOpeations = {}));
    var blendModes = {};
    blendModes[CompositeOpeations.Lighter] = PIXI.BLEND_MODES.ADD, blendModes[CompositeOpeations.Multiply] = PIXI.BLEND_MODES.MULTIPLY, 
    blendModes[CompositeOpeations.Screen] = PIXI.BLEND_MODES.SCREEN;
    var T = 1e3 / 60, CreatejsMovieClip$1 = function(superclass) {
        function CreatejsMovieClip() {
            for (var args = [], len = arguments.length; len--; ) {
                args[len] = arguments[len];
            }
            superclass.call(this), this._pixiData = createPixiMovieClipData(this), this._createjsParams = createCreatejsMovieClipParams(), 
            this._createjsEventManager = new CreatejsEventManager(this), P$6.apply(this, args), 
            this.framerate = this._framerateBase;
        }
        superclass && (CreatejsMovieClip.__proto__ = superclass), CreatejsMovieClip.prototype = Object.create(superclass && superclass.prototype), 
        CreatejsMovieClip.prototype.constructor = CreatejsMovieClip;
        var prototypeAccessors$1 = {
            compositeOperation: {
                configurable: !0
            },
            filters: {
                configurable: !0
            }
        };
        return CreatejsMovieClip.prototype.endAnimation = function(e) {}, CreatejsMovieClip.prototype.reachLabel = function(e) {}, 
        CreatejsMovieClip.prototype.initialize = function() {
            for (var args = [], len = arguments.length; len--; ) {
                args[len] = arguments[len];
            }
            this._pixiData = createPixiMovieClipData(this), this._createjsParams = createCreatejsMovieClipParams(), 
            this._createjsEventManager = new CreatejsEventManager(this), superclass.prototype.initialize.apply(this, args), 
            this.framerate = this._framerateBase;
        }, CreatejsMovieClip.prototype.updateForPixi = function(e) {
            var currentFrame = this.currentFrame;
            if (!this.paused) {
                if (this.advance(T * e.delta), this._listenFrameEvents && currentFrame !== this.currentFrame && (this._listenFrameEvents.endAnimation && this.currentFrame === this.totalFrames - 1 && this.dispatchEvent(new AnimateEvent("endAnimation")), 
                this._listenFrameEvents.reachLabel)) {
                    for (var i = 0; i < this.labels.length; i++) {
                        var label = this.labels[i];
                        if (this.currentFrame === label.position) {
                            this.dispatchEvent(new AnimateReachLabelEvent("reachLabel", label));
                            break;
                        }
                    }
                }
                this._updateState();
            }
            return updateDisplayObjectChildren(this, e);
        }, CreatejsMovieClip.prototype.updateBlendModeForPixi = function(mode) {
            if (!this._createjsParams.compositeOperation || blendModes[this._createjsParams.compositeOperation] !== mode) {
                this._pixiData.reservedBlendMode = mode;
                for (var i = 0; i < this.children.length; i++) {
                    this.children[i].updateBlendModeForPixi(mode);
                }
            }
        }, prototypeAccessors$1.compositeOperation.get = function() {
            return this._createjsParams.compositeOperation;
        }, prototypeAccessors$1.compositeOperation.set = function(value) {
            if (this._createjsParams.compositeOperation !== value) {
                var blendMode = value && blendModes[value] || this._pixiData.reservedBlendMode;
                this.updateBlendModeForPixi(blendMode), this._createjsParams.compositeOperation = value;
            }
        }, prototypeAccessors$1.filters.get = function() {
            return this._createjsParams.filters;
        }, prototypeAccessors$1.filters.set = function(value) {
            var list = [];
            if (value && value.length > 0) {
                for (var i = 0; i < value.length; i++) {
                    var f = value[i];
                    f instanceof createjs.ColorFilter && list.push(f.pixi);
                }
            }
            this._pixiData.instance.filters = list, this._createjsParams.filters = value;
        }, CreatejsMovieClip.prototype._updateChildrenBlendModeForPixi = function(child) {
            var blendMode = this._createjsParams.compositeOperation && blendModes[this._createjsParams.compositeOperation] || this._pixiData.reservedBlendMode;
            blendMode && child.updateBlendModeForPixi(blendMode);
        }, CreatejsMovieClip.prototype.addChild = function(child) {
            return this._pixiData.subInstance.addChild(child.pixi), this._updateChildrenBlendModeForPixi(child), 
            superclass.prototype.addChild.call(this, child);
        }, CreatejsMovieClip.prototype.addChildAt = function(child, index) {
            return this._pixiData.subInstance.addChildAt(child.pixi, index), this._updateChildrenBlendModeForPixi(child), 
            superclass.prototype.addChildAt.call(this, child, index);
        }, CreatejsMovieClip.prototype.removeChild = function(child) {
            return this._pixiData.subInstance.removeChild(child.pixi), superclass.prototype.removeChild.call(this, child);
        }, CreatejsMovieClip.prototype.removeChildAt = function(index) {
            return this._pixiData.subInstance.removeChildAt(index), superclass.prototype.removeChildAt.call(this, index);
        }, CreatejsMovieClip.prototype.removeAllChldren = function() {
            return this._pixiData.subInstance.removeChildren(), superclass.prototype.removeAllChldren.call(this);
        }, Object.defineProperties(CreatejsMovieClip.prototype, prototypeAccessors$1), CreatejsMovieClip;
    }(mixinCreatejsDisplayObject(createjs.MovieClip));
    delete CreatejsMovieClip$1.prototype.endAnimation, delete CreatejsMovieClip$1.prototype.reachLabel, 
    Object.defineProperties(CreatejsMovieClip$1.prototype, {
        _createjsParams: {
            value: createCreatejsMovieClipParams(),
            writable: !0
        },
        _pixiData: {
            value: createPixiMovieClipData(createObject(CreatejsMovieClip$1.prototype)),
            writable: !0
        }
    });
    var PixiSprite = function(Sprite) {
        function PixiSprite(cjs) {
            Sprite.call(this), this._createjs = cjs;
        }
        Sprite && (PixiSprite.__proto__ = Sprite), PixiSprite.prototype = Object.create(Sprite && Sprite.prototype), 
        PixiSprite.prototype.constructor = PixiSprite;
        var prototypeAccessors$2 = {
            createjs: {
                configurable: !0
            }
        };
        return prototypeAccessors$2.createjs.get = function() {
            return this._createjs;
        }, Object.defineProperties(PixiSprite.prototype, prototypeAccessors$2), PixiSprite;
    }(PIXI$1.Sprite);
    function createPixiSpriteData(cjs) {
        var pixi = new PixiSprite(cjs);
        return createPixiData(pixi, pixi.anchor);
    }
    var P$5 = createjs.Sprite, CreatejsSprite$1 = function(superclass) {
        function CreatejsSprite() {
            for (var args = [], len = arguments.length; len--; ) {
                args[len] = arguments[len];
            }
            superclass.apply(this, args), this._pixiData = createPixiSpriteData(this), this._createjsParams = {
                x: 0,
                y: 0,
                scaleX: 0,
                scaleY: 0,
                regX: 0,
                regY: 0,
                skewX: 0,
                skewY: 0,
                rotation: 0,
                visible: !0,
                alpha: 1,
                _off: !1,
                mask: null
            }, this._createjsEventManager = new CreatejsEventManager(this), P$5.apply(this, args);
        }
        return superclass && (CreatejsSprite.__proto__ = superclass), CreatejsSprite.prototype = Object.create(superclass && superclass.prototype), 
        CreatejsSprite.prototype.constructor = CreatejsSprite, CreatejsSprite.prototype.initialize = function() {
            for (var args = [], len = arguments.length; len--; ) {
                args[len] = arguments[len];
            }
            return this._pixiData = createPixiSpriteData(this), this._createjsParams = {
                x: 0,
                y: 0,
                scaleX: 0,
                scaleY: 0,
                regX: 0,
                regY: 0,
                skewX: 0,
                skewY: 0,
                rotation: 0,
                visible: !0,
                alpha: 1,
                _off: !1,
                mask: null
            }, this._createjsEventManager = new CreatejsEventManager(this), superclass.prototype.initialize.apply(this, args);
        }, CreatejsSprite.prototype.updateForPixi = function(e) {
            return !0;
        }, CreatejsSprite.prototype.updateBlendModeForPixi = function(mode) {
            this._pixiData.instance.blendMode = mode;
        }, CreatejsSprite.prototype.gotoAndStop = function() {
            for (var args = [], len = arguments.length; len--; ) {
                args[len] = arguments[len];
            }
            superclass.prototype.gotoAndStop.apply(this, args);
            var frame = this.spriteSheet.getFrame(this.currentFrame), baseTexture = PIXI$1.BaseTexture.from(frame.image), texture = new PIXI$1.Texture(baseTexture, frame.rect);
            this._pixiData.instance.texture = texture;
        }, CreatejsSprite;
    }(mixinCreatejsDisplayObject(createjs.Sprite));
    Object.defineProperties(CreatejsSprite$1.prototype, {
        _createjsParams: {
            value: {
                x: 0,
                y: 0,
                scaleX: 0,
                scaleY: 0,
                regX: 0,
                regY: 0,
                skewX: 0,
                skewY: 0,
                rotation: 0,
                visible: !0,
                alpha: 1,
                _off: !1,
                mask: null
            },
            writable: !0
        },
        _pixiData: {
            value: createPixiSpriteData(createObject(CreatejsSprite$1.prototype)),
            writable: !0
        }
    });
    var PixiShape = function(Container$1) {
        function PixiShape(cjs) {
            Container$1.call(this), this._createjs = cjs;
        }
        Container$1 && (PixiShape.__proto__ = Container$1), PixiShape.prototype = Object.create(Container$1 && Container$1.prototype), 
        PixiShape.prototype.constructor = PixiShape;
        var prototypeAccessors$3 = {
            createjs: {
                configurable: !0
            }
        };
        return prototypeAccessors$3.createjs.get = function() {
            return this._createjs;
        }, Object.defineProperties(PixiShape.prototype, prototypeAccessors$3), PixiShape;
    }(PIXI$1.Container);
    function createCreatejsShapeParams(graphics) {
        return Object.assign({
            x: 0,
            y: 0,
            scaleX: 0,
            scaleY: 0,
            regX: 0,
            regY: 0,
            skewX: 0,
            skewY: 0,
            rotation: 0,
            visible: !0,
            alpha: 1,
            _off: !1,
            mask: null
        }, {
            graphics: graphics
        });
    }
    function createPixiShapeData(cjs) {
        var pixi = new PixiShape(cjs);
        return Object.assign(createPixiData(pixi, pixi.pivot), {
            masked: []
        });
    }
    var P$4 = createjs.Shape, CreatejsShape = function(superclass) {
        function CreatejsShape() {
            for (var args = [], len = arguments.length; len--; ) {
                args[len] = arguments[len];
            }
            superclass.apply(this, args), this._pixiData = createPixiShapeData(this), this._createjsParams = createCreatejsShapeParams(null), 
            this._createjsEventManager = new CreatejsEventManager(this), P$4.apply(this, args);
        }
        superclass && (CreatejsShape.__proto__ = superclass), CreatejsShape.prototype = Object.create(superclass && superclass.prototype), 
        CreatejsShape.prototype.constructor = CreatejsShape;
        var prototypeAccessors$4 = {
            graphics: {
                configurable: !0
            },
            masked: {
                configurable: !0
            }
        };
        return CreatejsShape.prototype.initialize = function() {
            for (var args = [], len = arguments.length; len--; ) {
                args[len] = arguments[len];
            }
            return this._pixiData = createPixiShapeData(this), this._createjsParams = createCreatejsShapeParams(null), 
            this._createjsEventManager = new CreatejsEventManager(this), superclass.prototype.initialize.apply(this, args);
        }, CreatejsShape.prototype.updateForPixi = function(e) {
            return !0;
        }, CreatejsShape.prototype.updateBlendModeForPixi = function(mode) {
            var _a;
            this._pixiData.reservedBlendMode = mode, null === (_a = this._createjsParams.graphics) || void 0 === _a || _a.updateBlendModeForPixi(mode);
        }, prototypeAccessors$4.graphics.get = function() {
            return this._createjsParams.graphics;
        }, prototypeAccessors$4.graphics.set = function(value) {
            if (this._pixiData.masked.length) {
                if (this._pixiData.instance.removeChildren(), value) {
                    for (var i = 0; i < this._pixiData.masked.length; i++) {
                        this._pixiData.masked[i].mask = this._pixiData.instance;
                    }
                } else {
                    for (var i$1 = 0; i$1 < this._pixiData.masked.length; i$1++) {
                        this._pixiData.masked[i$1].mask = null;
                    }
                }
            }
            value && this._pixiData.instance.addChild(value.pixi), this._createjsParams.graphics = value;
        }, prototypeAccessors$4.masked.get = function() {
            return this._pixiData.masked;
        }, Object.defineProperties(CreatejsShape.prototype, prototypeAccessors$4), CreatejsShape;
    }(mixinCreatejsDisplayObject(createjs.Shape));
    Object.defineProperties(CreatejsShape.prototype, {
        _createjsParams: {
            value: createCreatejsShapeParams(null),
            writable: !0
        },
        _pixiData: {
            value: createPixiShapeData(createObject(CreatejsShape.prototype)),
            writable: !0
        }
    });
    var PixiBitmap = function(Sprite) {
        function PixiBitmap(cjs) {
            Sprite.call(this), this._createjs = cjs;
        }
        Sprite && (PixiBitmap.__proto__ = Sprite), PixiBitmap.prototype = Object.create(Sprite && Sprite.prototype), 
        PixiBitmap.prototype.constructor = PixiBitmap;
        var prototypeAccessors$5 = {
            createjs: {
                configurable: !0
            }
        };
        return prototypeAccessors$5.createjs.get = function() {
            return this._createjs;
        }, Object.defineProperties(PixiBitmap.prototype, prototypeAccessors$5), PixiBitmap;
    }(PIXI$1.Sprite);
    function createPixiBitmapData(cjs) {
        var pixi = new PixiBitmap(cjs);
        return createPixiData(pixi, pixi.anchor);
    }
    var P$3 = createjs.Bitmap, CreatejsBitmap$1 = function(superclass) {
        function CreatejsBitmap() {
            for (var args = [], len = arguments.length; len--; ) {
                args[len] = arguments[len];
            }
            superclass.apply(this, args), this._pixiData = createPixiBitmapData(this), this._createjsParams = {
                x: 0,
                y: 0,
                scaleX: 0,
                scaleY: 0,
                regX: 0,
                regY: 0,
                skewX: 0,
                skewY: 0,
                rotation: 0,
                visible: !0,
                alpha: 1,
                _off: !1,
                mask: null
            }, this._createjsEventManager = new CreatejsEventManager(this), P$3.apply(this, args);
        }
        return superclass && (CreatejsBitmap.__proto__ = superclass), CreatejsBitmap.prototype = Object.create(superclass && superclass.prototype), 
        CreatejsBitmap.prototype.constructor = CreatejsBitmap, CreatejsBitmap.prototype.initialize = function() {
            for (var args = [], len = arguments.length; len--; ) {
                args[len] = arguments[len];
            }
            this._pixiData = createPixiBitmapData(this), this._createjsParams = {
                x: 0,
                y: 0,
                scaleX: 0,
                scaleY: 0,
                regX: 0,
                regY: 0,
                skewX: 0,
                skewY: 0,
                rotation: 0,
                visible: !0,
                alpha: 1,
                _off: !1,
                mask: null
            }, this._createjsEventManager = new CreatejsEventManager(this);
            var res = superclass.prototype.initialize.apply(this, args), texture = PIXI$1.Texture.from(this.image);
            return this._pixiData.instance.texture = texture, res;
        }, CreatejsBitmap.prototype.updateForPixi = function(e) {
            return !0;
        }, CreatejsBitmap.prototype.updateBlendModeForPixi = function(mode) {
            this._pixiData.instance.blendMode = mode;
        }, CreatejsBitmap;
    }(mixinCreatejsDisplayObject(createjs.Bitmap));
    Object.defineProperties(CreatejsBitmap$1.prototype, {
        _createjsParams: {
            value: {
                x: 0,
                y: 0,
                scaleX: 0,
                scaleY: 0,
                regX: 0,
                regY: 0,
                skewX: 0,
                skewY: 0,
                rotation: 0,
                visible: !0,
                alpha: 1,
                _off: !1,
                mask: null
            },
            writable: !0
        },
        _pixiData: {
            value: createPixiBitmapData(createObject(CreatejsBitmap$1.prototype)),
            writable: !0
        }
    });
    var PixiGraphics = function(Graphics) {
        function PixiGraphics(cjs) {
            Graphics.call(this), this._createjs = cjs;
        }
        Graphics && (PixiGraphics.__proto__ = Graphics), PixiGraphics.prototype = Object.create(Graphics && Graphics.prototype), 
        PixiGraphics.prototype.constructor = PixiGraphics;
        var prototypeAccessors$6 = {
            createjs: {
                configurable: !0
            }
        };
        return prototypeAccessors$6.createjs.get = function() {
            return this._createjs;
        }, Object.defineProperties(PixiGraphics.prototype, prototypeAccessors$6), PixiGraphics;
    }(PIXI$1.Graphics);
    function createPixiGraphicsData(cjs) {
        var pixi = new PixiGraphics(cjs);
        return Object.assign(createPixiData(pixi, pixi.pivot), {
            strokeFill: 0,
            strokeAlpha: 1
        });
    }
    var LineCap = {
        0: PIXI$1.LINE_CAP.BUTT,
        1: PIXI$1.LINE_CAP.ROUND,
        2: PIXI$1.LINE_CAP.SQUARE
    }, LineJoin = {
        0: PIXI$1.LINE_JOIN.MITER,
        1: PIXI$1.LINE_JOIN.ROUND,
        2: PIXI$1.LINE_JOIN.BEVEL
    }, P$2 = createjs.Graphics, CreatejsGraphics = function(superclass) {
        function CreatejsGraphics() {
            for (var args = [], len = arguments.length; len--; ) {
                args[len] = arguments[len];
            }
            superclass.apply(this, args), this._pixiData = createPixiGraphicsData(this), this._createjsParams = {
                x: 0,
                y: 0,
                scaleX: 0,
                scaleY: 0,
                regX: 0,
                regY: 0,
                skewX: 0,
                skewY: 0,
                rotation: 0,
                visible: !0,
                alpha: 1,
                _off: !1,
                mask: null
            }, this._createjsEventManager = new CreatejsEventManager(this), P$2.apply(this, args), 
            this._pixiData.instance.beginFill(16772846, 1), this._pixiData.strokeFill = 0, this._pixiData.strokeAlpha = 1;
        }
        return superclass && (CreatejsGraphics.__proto__ = superclass), CreatejsGraphics.prototype = Object.create(superclass && superclass.prototype), 
        CreatejsGraphics.prototype.constructor = CreatejsGraphics, CreatejsGraphics.prototype.initialize = function() {
            for (var args = [], len = arguments.length; len--; ) {
                args[len] = arguments[len];
            }
            return this._pixiData = createPixiGraphicsData(this), this._createjsParams = {
                x: 0,
                y: 0,
                scaleX: 0,
                scaleY: 0,
                regX: 0,
                regY: 0,
                skewX: 0,
                skewY: 0,
                rotation: 0,
                visible: !0,
                alpha: 1,
                _off: !1,
                mask: null
            }, this._createjsEventManager = new CreatejsEventManager(this), superclass.prototype.initialize.apply(this, args);
        }, CreatejsGraphics.prototype.updateForPixi = function(e) {
            return !0;
        }, CreatejsGraphics.prototype.updateBlendModeForPixi = function(mode) {
            mode && (this._pixiData.instance.blendMode = mode);
        }, CreatejsGraphics.prototype.moveTo = function(x, y) {
            return this._pixiData.instance.clone().endFill().containsPoint({
                x: x,
                y: y
            }) ? this._pixiData.instance.beginHole() : this._pixiData.instance.endHole(), this._pixiData.instance.moveTo(x, y), 
            superclass.prototype.moveTo.call(this, x, y);
        }, CreatejsGraphics.prototype.mt = function(x, y) {
            return this.moveTo(x, y);
        }, CreatejsGraphics.prototype.lineTo = function(x, y) {
            return this._pixiData.instance.lineTo(x, y), superclass.prototype.lineTo.call(this, x, y);
        }, CreatejsGraphics.prototype.lt = function(x, y) {
            return this.lineTo(x, y);
        }, CreatejsGraphics.prototype.arcTo = function(x1, y1, x2, y2, radius) {
            return this._pixiData.instance.arcTo(x1, y1, x2, y2, radius), superclass.prototype.arcTo.call(this, x1, y1, x2, y2, radius);
        }, CreatejsGraphics.prototype.at = function(x1, y1, x2, y2, radius) {
            return this.arcTo(x1, y1, x2, y2, radius);
        }, CreatejsGraphics.prototype.arc = function(x, y, radius, startAngle, endAngle, anticlockwise) {
            return this._pixiData.instance.arc(x, y, radius, startAngle, endAngle, anticlockwise), 
            superclass.prototype.arc.call(this, x, y, radius, startAngle, endAngle, anticlockwise);
        }, CreatejsGraphics.prototype.a = function(x, y, radius, startAngle, endAngle, anticlockwise) {
            return this.arc(x, y, radius, startAngle, endAngle, anticlockwise);
        }, CreatejsGraphics.prototype.quadraticCurveTo = function(cpx, cpy, x, y) {
            return this._pixiData.instance.quadraticCurveTo(cpx, cpy, x, y), superclass.prototype.quadraticCurveTo.call(this, cpx, cpy, x, y);
        }, CreatejsGraphics.prototype.qt = function(cpx, cpy, x, y) {
            return this.quadraticCurveTo(cpx, cpy, x, y);
        }, CreatejsGraphics.prototype.curveTo = function(cpx, cpy, x, y) {
            return this.quadraticCurveTo(cpx, cpy, x, y);
        }, CreatejsGraphics.prototype.bezierCurveTo = function(cp1x, cp1y, cp2x, cp2y, x, y) {
            return this._pixiData.instance.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y), superclass.prototype.bezierCurveTo.call(this, cp1x, cp1y, cp2x, cp2y, x, y);
        }, CreatejsGraphics.prototype.bt = function(cp1x, cp1y, cp2x, cp2y, x, y) {
            return this.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
        }, CreatejsGraphics.prototype.rect = function(x, y, w, h) {
            return this._pixiData.instance.drawRect(x, y, w, h), superclass.prototype.rect.call(this, x, y, w, h);
        }, CreatejsGraphics.prototype.r = function(x, y, w, h) {
            return this.rect(x, y, w, h);
        }, CreatejsGraphics.prototype.drawRect = function(x, y, w, h) {
            return this.rect(x, y, w, h);
        }, CreatejsGraphics.prototype.dr = function(x, y, w, h) {
            return this.rect(x, y, w, h);
        }, CreatejsGraphics.prototype.closePath = function() {
            return this._pixiData.instance.closePath(), superclass.prototype.closePath.call(this);
        }, CreatejsGraphics.prototype.cp = function() {
            return this.closePath();
        }, CreatejsGraphics.prototype.clear = function() {
            return this._pixiData.instance.clear(), superclass.prototype.clear.call(this);
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
            return this._pixiData.instance.beginFill(c.color, c.alpha), superclass.prototype.beginFill.call(this, color);
        }, CreatejsGraphics.prototype.f = function(color) {
            return this.beginFill(color);
        }, CreatejsGraphics.prototype.endFill = function() {
            return this._pixiData.instance.endFill(), superclass.prototype.endFill.call(this);
        }, CreatejsGraphics.prototype.ef = function() {
            return this.endFill();
        }, CreatejsGraphics.prototype.setStrokeStyle = function(thickness, caps, joints, miterLimit, ignoreScale) {
            return this._pixiData.instance.lineTextureStyle({
                width: thickness,
                color: this._pixiData.strokeFill,
                alpha: this._pixiData.strokeAlpha,
                cap: caps in LineCap ? LineCap[caps] : LineCap[0],
                join: joints in LineJoin ? LineJoin[joints] : LineJoin[0],
                miterLimit: miterLimit
            }), superclass.prototype.setStrokeStyle.call(this, thickness, caps, joints, miterLimit, ignoreScale);
        }, CreatejsGraphics.prototype.ss = function(thickness, caps, joints, miterLimit, ignoreScale) {
            return this.setStrokeStyle(thickness, caps, joints, miterLimit, ignoreScale);
        }, CreatejsGraphics.prototype.beginStroke = function(color) {
            var c = this._parseColor(color);
            return this._pixiData.strokeFill = c.color, this._pixiData.strokeAlpha = c.alpha, 
            superclass.prototype.beginStroke.call(this, color);
        }, CreatejsGraphics.prototype.s = function(color) {
            return this.beginStroke(color);
        }, CreatejsGraphics.prototype.drawRoundRect = function(x, y, w, h, radius) {
            return this._pixiData.instance.drawRoundedRect(x, y, w, h, radius), superclass.prototype.drawRoundRect.call(this, x, y, w, h, radius);
        }, CreatejsGraphics.prototype.rr = function(x, y, w, h, radius) {
            return this.drawRoundRect(x, y, w, h, radius);
        }, CreatejsGraphics.prototype.drawCircle = function(x, y, radius) {
            return this._pixiData.instance.drawCircle(x, y, radius), superclass.prototype.drawCircle.call(this, x, y, radius);
        }, CreatejsGraphics.prototype.dc = function(x, y, radius) {
            return this.drawCircle(x, y, radius);
        }, CreatejsGraphics.prototype.drawEllipse = function(x, y, w, h) {
            return this._pixiData.instance.drawEllipse(x, y, w, h), superclass.prototype.drawEllipse.call(this, x, y, w, h);
        }, CreatejsGraphics.prototype.de = function(x, y, w, h) {
            return this.drawEllipse(x, y, w, h);
        }, CreatejsGraphics.prototype.drawPolyStar = function(x, y, radius, sides, pointSize, angle) {
            return this._pixiData.instance.drawRegularPolygon(x, y, radius, sides, angle * DEG_TO_RAD), 
            superclass.prototype.drawPolyStar.call(this, x, y, radius, sides, pointSize, angle);
        }, CreatejsGraphics.prototype.dp = function(x, y, radius, sides, pointSize, angle) {
            return this.drawPolyStar(x, y, radius, sides, pointSize, angle);
        }, CreatejsGraphics;
    }(mixinCreatejsDisplayObject(createjs.Graphics));
    Object.defineProperties(CreatejsGraphics.prototype, {
        _createjsParams: {
            value: {
                x: 0,
                y: 0,
                scaleX: 0,
                scaleY: 0,
                regX: 0,
                regY: 0,
                skewX: 0,
                skewY: 0,
                rotation: 0,
                visible: !0,
                alpha: 1,
                _off: !1,
                mask: null
            },
            writable: !0
        },
        _pixiData: {
            value: createPixiGraphicsData(createObject(CreatejsGraphics.prototype)),
            writable: !0
        }
    });
    var PixiText = function(Text) {
        function PixiText() {
            Text.apply(this, arguments);
        }
        return Text && (PixiText.__proto__ = Text), PixiText.prototype = Object.create(Text && Text.prototype), 
        PixiText.prototype.constructor = PixiText, PixiText;
    }(PIXI$1.Text), PixiTextContainer = function(Container$1) {
        function PixiTextContainer(cjs, text) {
            Container$1.call(this), this._createjs = cjs, this._text = text;
        }
        Container$1 && (PixiTextContainer.__proto__ = Container$1), PixiTextContainer.prototype = Object.create(Container$1 && Container$1.prototype), 
        PixiTextContainer.prototype.constructor = PixiTextContainer;
        var prototypeAccessors$7 = {
            createjs: {
                configurable: !0
            },
            text: {
                configurable: !0
            }
        };
        return prototypeAccessors$7.createjs.get = function() {
            return this._createjs;
        }, prototypeAccessors$7.text.get = function() {
            return this._text;
        }, Object.defineProperties(PixiTextContainer.prototype, prototypeAccessors$7), PixiTextContainer;
    }(PIXI$1.Container);
    function createCreatejsTextParams(text, font, color) {
        return Object.assign({
            x: 0,
            y: 0,
            scaleX: 0,
            scaleY: 0,
            regX: 0,
            regY: 0,
            skewX: 0,
            skewY: 0,
            rotation: 0,
            visible: !0,
            alpha: 1,
            _off: !1,
            mask: null
        }, {
            text: text,
            font: font,
            color: color,
            textAlign: "left",
            lineHeight: 0,
            lineWidth: 0
        });
    }
    function createPixiTextData(cjs, text) {
        var pixi = new PixiTextContainer(cjs, text);
        return createPixiData(pixi, pixi.pivot);
    }
    var P$1 = createjs.Text, CreatejsText = function(superclass) {
        function CreatejsText(text, font, color) {
            void 0 === color && (color = "#000000");
            for (var args = [], len = arguments.length - 3; len-- > 0; ) {
                args[len] = arguments[len + 3];
            }
            superclass.apply(this, [ text, font, color ].concat(args)), this._createjsParams = createCreatejsTextParams(text, font, color);
            var _font = this._parseFont(font), t = new PixiText(text, {
                fontWeight: _font.fontWeight,
                fontSize: _font.fontSize,
                fontFamily: _font.fontFamily,
                fill: this._parseColor(color),
                wordWrap: !0
            });
            this._pixiData = createPixiTextData(this, t), this._pixiData.instance.addChild(t), 
            this._createjsEventManager = new CreatejsEventManager(this), P$1.call.apply(P$1, [ this, text, font, color ].concat(args));
        }
        superclass && (CreatejsText.__proto__ = superclass), CreatejsText.prototype = Object.create(superclass && superclass.prototype), 
        CreatejsText.prototype.constructor = CreatejsText;
        var prototypeAccessors$8 = {
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
            }
        };
        return CreatejsText.prototype.updateForPixi = function(e) {
            return !0;
        }, CreatejsText.prototype.updateBlendModeForPixi = function(mode) {
            this._pixiData.instance.text.blendMode = mode;
        }, prototypeAccessors$8.text.get = function() {
            return this._createjsParams.text;
        }, prototypeAccessors$8.text.set = function(text) {
            this._pixiData.instance.text.text = text, this._align(this.textAlign), this._createjsParams.text = text;
        }, CreatejsText.prototype._parseFont = function(font) {
            var p = font.split(" "), w = "normal", s = p.shift() || "";
            return -1 === s.indexOf("px") && (w = s, s = p.shift() || ""), {
                fontWeight: w,
                fontSize: Number((s || "0px").replace("px", "")),
                fontFamily: p.join(" ").replace(/'/g, "")
            };
        }, prototypeAccessors$8.font.get = function() {
            return this._createjsParams.font;
        }, prototypeAccessors$8.font.set = function(font) {
            var _font = this._parseFont(font);
            this._pixiData.instance.text.style.fontSize = _font.fontSize, this._pixiData.instance.text.style.fontFamily = _font.fontFamily, 
            this._createjsParams.font = font;
        }, CreatejsText.prototype._parseColor = function(color) {
            return parseInt(color.slice(1), 16);
        }, prototypeAccessors$8.color.get = function() {
            return this._createjsParams.color;
        }, prototypeAccessors$8.color.set = function(color) {
            this._pixiData.instance.text.style.fill = this._parseColor(color), this._createjsParams.color = color;
        }, CreatejsText.prototype._align = function(align) {
            "left" !== align ? "center" !== align ? "right" !== align || (this._pixiData.instance.text.x = -this._pixiData.instance.text.width) : this._pixiData.instance.text.x = -this._pixiData.instance.text.width / 2 : this._pixiData.instance.text.x = 0;
        }, prototypeAccessors$8.textAlign.get = function() {
            return this._createjsParams.textAlign;
        }, prototypeAccessors$8.textAlign.set = function(align) {
            this._pixiData.instance.text.style.align = align, this._align(align), this._createjsParams.textAlign = align;
        }, prototypeAccessors$8.lineHeight.get = function() {
            return this._createjsParams.lineHeight;
        }, prototypeAccessors$8.lineHeight.set = function(height) {
            this._pixiData.instance.text.style.lineHeight = height, this._createjsParams.lineHeight = height;
        }, prototypeAccessors$8.lineWidth.get = function() {
            return this._createjsParams.lineWidth;
        }, prototypeAccessors$8.lineWidth.set = function(width) {
            this._pixiData.instance.text.style.wordWrapWidth = width, this._align(this.textAlign), 
            this._createjsParams.lineWidth = width;
        }, Object.defineProperties(CreatejsText.prototype, prototypeAccessors$8), CreatejsText;
    }(mixinCreatejsDisplayObject(createjs.Text));
    Object.defineProperties(CreatejsText.prototype, {
        _createjsParams: {
            value: createCreatejsTextParams("", "", ""),
            writable: !0
        },
        _pixiData: {
            value: createPixiTextData(createObject(CreatejsText.prototype), new PixiText("")),
            writable: !0
        }
    });
    var PixiColorMatrixFilter = function(superclass) {
        function PixiColorMatrixFilter(cjs) {
            superclass.call(this), this._createjs = cjs;
        }
        superclass && (PixiColorMatrixFilter.__proto__ = superclass), PixiColorMatrixFilter.prototype = Object.create(superclass && superclass.prototype), 
        PixiColorMatrixFilter.prototype.constructor = PixiColorMatrixFilter;
        var prototypeAccessors$9 = {
            createjs: {
                configurable: !0
            }
        };
        return prototypeAccessors$9.createjs.get = function() {
            return this._createjs;
        }, Object.defineProperties(PixiColorMatrixFilter.prototype, prototypeAccessors$9), 
        PixiColorMatrixFilter;
    }(PIXI$1.filters.ColorMatrixFilter);
    function createPixiColorMatrixFilterData(cjs) {
        return {
            instance: new PixiColorMatrixFilter(cjs)
        };
    }
    function createCreatejsColorFilterParams() {
        return Object.assign({
            x: 0,
            y: 0,
            scaleX: 0,
            scaleY: 0,
            regX: 0,
            regY: 0,
            skewX: 0,
            skewY: 0,
            rotation: 0,
            visible: !0,
            alpha: 1,
            _off: !1,
            mask: null
        }, {
            redMultiplier: 1,
            greenMultiplier: 1,
            blueMultiplier: 1,
            alphaMultiplier: 1,
            redOffset: 0,
            greenOffset: 0,
            blueOffset: 0,
            alphaOffset: 0
        });
    }
    var P = createjs.ColorFilter, CreatejsColorFilter = function(superclass) {
        function CreatejsColorFilter() {
            for (var args = [], len = arguments.length; len--; ) {
                args[len] = arguments[len];
            }
            superclass.call(this, args);
            var pixiData = this._pixiData = createPixiColorMatrixFilterData(this), createjsParams = this._createjsParams = createCreatejsColorFilterParams();
            Object.defineProperties(this, {
                _pixiData: {
                    enumerable: !1,
                    value: pixiData
                },
                _createjsParams: {
                    enumerable: !1,
                    value: createjsParams
                },
                redMultiplier: {
                    get: function() {
                        return this._createjsParams.redMultiplier;
                    },
                    set: function(value) {
                        this._pixiData.instance.matrix[0] = value, this._createjsParams.redMultiplier = value;
                    }
                },
                greenMultiplier: {
                    get: function() {
                        return this._createjsParams.greenMultiplier;
                    },
                    set: function(value) {
                        this._pixiData.instance.matrix[6] = value, this._createjsParams.greenMultiplier = value;
                    }
                },
                blueMultiplier: {
                    get: function() {
                        return this._createjsParams.blueMultiplier;
                    },
                    set: function(value) {
                        this._pixiData.instance.matrix[12] = value, this._createjsParams.blueMultiplier = value;
                    }
                },
                alphaMultiplier: {
                    get: function() {
                        return this._createjsParams.alphaMultiplier;
                    },
                    set: function(value) {
                        this._pixiData.instance.matrix[18] = value, this._createjsParams.alphaMultiplier = value;
                    }
                },
                redOffset: {
                    get: function() {
                        return this._createjsParams.redOffset;
                    },
                    set: function(value) {
                        this._pixiData.instance.matrix[4] = value / 255, this._createjsParams.redOffset = value;
                    }
                },
                greenOffset: {
                    get: function() {
                        return this._createjsParams.greenOffset;
                    },
                    set: function(value) {
                        this._pixiData.instance.matrix[9] = value / 255, this._createjsParams.greenOffset = value;
                    }
                },
                blueOffset: {
                    get: function() {
                        return this._createjsParams.blueOffset;
                    },
                    set: function(value) {
                        this._pixiData.instance.matrix[14] = value / 255, this._createjsParams.blueOffset = value;
                    }
                },
                alphaOffset: {
                    get: function() {
                        return this._createjsParams.alphaOffset;
                    },
                    set: function(value) {
                        this._pixiData.instance.matrix[19] = value / 255, this._createjsParams.alphaOffset = value;
                    }
                }
            }), P.apply(this, args);
        }
        superclass && (CreatejsColorFilter.__proto__ = superclass), CreatejsColorFilter.prototype = Object.create(superclass && superclass.prototype), 
        CreatejsColorFilter.prototype.constructor = CreatejsColorFilter;
        var prototypeAccessors$10 = {
            pixi: {
                configurable: !0
            }
        };
        return prototypeAccessors$10.pixi.get = function() {
            return this._pixiData.instance;
        }, Object.defineProperties(CreatejsColorFilter.prototype, prototypeAccessors$10), 
        CreatejsColorFilter;
    }(createjs.ColorFilter);
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
            for (var lib = comp.getLibrary(), manifests = lib.properties.manifest.map((function(v) {
                return JSON.parse(JSON.stringify(v));
            })), crossOrigin = "boolean" != typeof (null === (_b = target.options) || void 0 === _b ? void 0 : _b.crossOrigin) || target.options.crossOrigin, i$1 = 0; i$1 < manifests.length; i$1++) {
                var manifest = manifests[i$1];
                if (0 === manifest.src.indexOf("data:image")) {
                    manifest.type = createjs.Types.IMAGE;
                } else {
                    if (0 === manifest.src.indexOf("data:audio")) {
                        throw new Error("data URL formatted sound is not supported.");
                    }
                    0 === manifest.src.indexOf("blob:") || 0 === manifest.src.indexOf("file:") || (manifest.src = PIXI$1__namespace.utils.url.resolve(target.basepath, manifest.src));
                }
            }
            if (crossOrigin) {
                for (var i$2 = 0; i$2 < manifests.length; i$2++) {
                    manifests[i$2].crossOrigin = !0;
                }
            }
            var loadPromise = new Promise((function(resolve, reject) {
                var _a;
                0 === manifests.length && resolve({});
                var loader = new createjs.LoadQueue(!1);
                (null === (_a = target.options) || void 0 === _a ? void 0 : _a.useSound) && loader.installPlugin(createjs.Sound);
                var errors = [];
                loader.addEventListener("fileload", (function(evt) {
                    !function(evt, comp) {
                        var images = comp.getImages();
                        evt && "image" == evt.item.type && (images[evt.item.id] = evt.result);
                    }(evt, comp);
                })), loader.addEventListener("complete", (function(evt) {
                    errors.length ? reject(errors) : resolve(evt);
                })), loader.addEventListener("error", (function(evt) {
                    errors.push(evt.data);
                })), loader.loadManifest(manifests || []);
            })).then((function(evt) {
                for (var ss = comp.getSpriteSheet(), queue = evt.target, ssMetadata = lib.ssMetadata, i = 0; i < ssMetadata.length; i++) {
                    ss[ssMetadata[i].name] = new createjs.SpriteSheet({
                        images: [ queue.getResult(ssMetadata[i].name) ],
                        frames: ssMetadata[i].frames
                    });
                }
                return lib;
            }));
            promises.push(loadPromise.then((function(lib) {
                var _a;
                for (var i in lib) {
                    lib[i].prototype instanceof CreatejsMovieClip$1 && (lib[i].prototype._framerateBase = lib.properties.fps, 
                    lib[i].prototype._listenFrameEvents = null === (_a = target.options) || void 0 === _a ? void 0 : _a.listenFrameEvents);
                }
                return lib;
            })));
        }, i = 0; i < targets.length; i++) {
            loop(i);
        }
        return Promise.all(promises).then((function(resolvers) {
            return 1 === resolvers.length ? resolvers[0] : resolvers;
        }));
    }
    Object.defineProperties(CreatejsColorFilter.prototype, {
        _createjsParams: {
            value: createCreatejsColorFilterParams(),
            writable: !0
        },
        _pixiData: {
            value: createPixiColorMatrixFilterData(createObject(CreatejsColorFilter.prototype)),
            writable: !0
        }
    });
    var CreatejsController = function(container) {
        this._createjsData = {
            id: 0,
            targets: {},
            container: container
        };
    };
    CreatejsController.prototype.handleTick = function(delta) {
        var e = {
            delta: Math.min(delta, 1)
        }, targets = this._createjsData.targets;
        for (var i in targets) {
            targets[i].updateForPixi(e);
        }
    }, CreatejsController.prototype._addCreatejs = function(cjs) {
        var this$1$1 = this;
        if (cjs instanceof CreatejsMovieClip$1) {
            var p = cjs.pixi.parent;
            cjs.pixi.once("added", (function() {
                cjs.pixi.parent !== p && cjs.gotoAndPlay(0);
                var id = this$1$1._createjsData.id++;
                this$1$1._createjsData.targets[id] = cjs, cjs.pixi.once("removed", (function() {
                    delete this$1$1._createjsData.targets[id];
                }));
            }));
        }
    }, CreatejsController.prototype.addCreatejs = function(cjs) {
        return this._addCreatejs(cjs), this._createjsData.container.addChild(cjs.pixi), 
        cjs;
    }, CreatejsController.prototype.addCreatejsAt = function(cjs, index) {
        return this._addCreatejs(cjs), this._createjsData.container.addChildAt(cjs.pixi, index), 
        cjs;
    }, CreatejsController.prototype.removeCreatejs = function(cjs) {
        return this._createjsData.container.removeChild(cjs.pixi), cjs;
    };
    var Container$1 = function(Container$1) {
        function Container() {
            Container$1.call(this), this._createjsData = {
                controller: new CreatejsController(this)
            };
        }
        return Container$1 && (Container.__proto__ = Container$1), Container.prototype = Object.create(Container$1 && Container$1.prototype), 
        Container.prototype.constructor = Container, Container.prototype.handleTick = function(delta) {
            return this._createjsData.controller.handleTick(delta);
        }, Container.prototype.addCreatejs = function(cjs) {
            return this._createjsData.controller.addCreatejs(cjs);
        }, Container.prototype.addCreatejsAt = function(cjs, index) {
            return this._createjsData.controller.addCreatejsAt(cjs, index);
        }, Container.prototype.removeCreatejs = function(cjs) {
            return this._createjsData.controller.removeCreatejs(cjs);
        }, Container;
    }(PIXI$1.Container);
    createjs.Stage = CreatejsStage, createjs.StageGL = CreatejsStageGL, createjs.MovieClip = CreatejsMovieClip$1, 
    createjs.Sprite = CreatejsSprite$1, createjs.Shape = CreatejsShape, createjs.Bitmap = CreatejsBitmap$1, 
    createjs.Graphics = CreatejsGraphics, createjs.Text = CreatejsText, createjs.ButtonHelper = CreatejsButtonHelper, 
    createjs.ColorFilter = CreatejsColorFilter, createjs.MotionGuidePlugin.install();
    var pixiAnimateContainer_esm = Object.freeze({
        __proto__: null,
        AnimateEvent: AnimateEvent,
        AnimateReachLabelEvent: AnimateReachLabelEvent,
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
        CreatejsStage: CreatejsStage,
        CreatejsStageGL: CreatejsStageGL,
        CreatejsText: CreatejsText,
        PixiBitmap: PixiBitmap,
        PixiColorMatrixFilter: PixiColorMatrixFilter,
        PixiGraphics: PixiGraphics,
        PixiMovieClip: PixiMovieClip,
        PixiShape: PixiShape,
        PixiSprite: PixiSprite,
        PixiText: PixiText,
        PixiTextContainer: PixiTextContainer,
        createCreatejsParams: createCreatejsParams,
        createPixiData: createPixiData,
        get createjsInteractionEvents() {
            return createjsInteractionEvents;
        },
        loadAssetAsync: loadAssetAsync,
        mixinCreatejsDisplayObject: mixinCreatejsDisplayObject,
        updateDisplayObjectChildren: updateDisplayObjectChildren
    }), CreatejsMovieClip = function(_CreatejsMovieClip) {
        function CreatejsMovieClip() {
            _CreatejsMovieClip.apply(this, arguments);
        }
        return _CreatejsMovieClip && (CreatejsMovieClip.__proto__ = _CreatejsMovieClip), 
        CreatejsMovieClip.prototype = Object.create(_CreatejsMovieClip && _CreatejsMovieClip.prototype), 
        CreatejsMovieClip.prototype.constructor = CreatejsMovieClip, CreatejsMovieClip.prototype.replaceInstance = function(name, cls) {
            var old = this[name];
            old || console.warn("instance '" + name + "' was not found.");
            for (var props = [ "x", "y", "scaleX", "scaleY", "rotation", "skewX", "skewY", "regX", "regY", "_off", "alpha" ], instance = this[name] = new cls(old.mode, old.startPosition, old.loop, old.timeline.reversed), tweens = this.timeline.tweens, i = 0; i < tweens.length; i++) {
                var target = tweens[i].target;
                if (Array.isArray(target.state)) {
                    for (var j = 0; j < target.state.length; j++) {
                        target.state[j].t === old && (target.state[j].t = instance);
                    }
                } else {
                    target === old && (tweens[i].target = instance);
                }
            }
            for (var i$1 = 0; i$1 < props.length; i$1++) {
                instance[props[i$1]] = old[props[i$1]];
            }
            if (old.mask && (instance.mask = old.mask, old.mask = null), old.filters) {
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
            this._pixiData.instance.texture = texture;
        }, CreatejsSprite;
    }(CreatejsSprite$1), CreatejsBitmap = function(_CreatejsBitmap) {
        function CreatejsBitmap() {
            _CreatejsBitmap.apply(this, arguments);
        }
        return _CreatejsBitmap && (CreatejsBitmap.__proto__ = _CreatejsBitmap), CreatejsBitmap.prototype = Object.create(_CreatejsBitmap && _CreatejsBitmap.prototype), 
        CreatejsBitmap.prototype.constructor = CreatejsBitmap, CreatejsBitmap.prototype.replaceTexture = function(texture) {
            this._pixiData.instance.texture = texture;
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
    }(Pixim.LoaderResource), AnimateBlobLoader = function(LoaderBase) {
        function AnimateBlobLoader() {
            LoaderBase.apply(this, arguments);
        }
        return LoaderBase && (AnimateBlobLoader.__proto__ = LoaderBase), AnimateBlobLoader.prototype = Object.create(LoaderBase && LoaderBase.prototype), 
        AnimateBlobLoader.prototype.constructor = AnimateBlobLoader, AnimateBlobLoader.prototype._loadAsync = function(target, options) {
            var data, src, xhr;
            return void 0 === options && (options = {}), (data = this._resolveParams(target, options), 
            src = data.src, xhr = data.xhr, xhr ? fetch(src, xhr.requestOptions || {}) : fetch(src)).then((function(res) {
                if (!res.ok) {
                    throw res.statusText;
                }
                return res.blob();
            })).then((function(blob) {
                return {
                    src: (window.URL || window.webkitURL).createObjectURL(blob),
                    type: blob.type
                };
            })).then((function(data) {
                return new AnimateBlobLoaderResource(data, null);
            })).catch((function(e) {
                return new AnimateBlobLoaderResource(null, e);
            }));
        }, AnimateBlobLoader;
    }(Pixim.LoaderBase), AnimateLoaderResource = function(superclass) {
        function AnimateLoaderResource() {
            superclass.apply(this, arguments);
        }
        return superclass && (AnimateLoaderResource.__proto__ = superclass), AnimateLoaderResource.prototype = Object.create(superclass && superclass.prototype), 
        AnimateLoaderResource.prototype.constructor = AnimateLoaderResource, AnimateLoaderResource.prototype.destroy = function() {}, 
        AnimateLoaderResource;
    }(Pixim__namespace.LoaderResource), AnimateLoader = function(superclass) {
        function AnimateLoader() {
            superclass.apply(this, arguments);
        }
        return superclass && (AnimateLoader.__proto__ = superclass), AnimateLoader.prototype = Object.create(superclass && superclass.prototype), 
        AnimateLoader.prototype.constructor = AnimateLoader, AnimateLoader.prototype._loadAsync = function(target, options) {
            var this$1$1 = this;
            return void 0 === options && (options = {}), this._loadJsAsync(target, options).then((function() {
                var _a, comp = AdobeAn.getComposition(target.id);
                if (!comp) {
                    throw new Error("no composition: " + target.id);
                }
                var lib = comp.getLibrary(), originalManifests = lib.properties.manifest, manifests = lib.properties.manifest = originalManifests.map((function(v) {
                    return JSON.parse(JSON.stringify(v));
                }));
                return ((null === (_a = target.options) || void 0 === _a ? void 0 : _a.handleManifest) ? target.options.handleManifest(manifests) : Promise.resolve()).then((function() {
                    var _target = Object.assign({}, target);
                    return _target.basepath = Pixim__namespace.utils.resolvePath(options.basepath || "", target.basepath), 
                    this$1$1._prepareAssetsAsync(_target.basepath || "", manifests, options).then((function() {
                        for (var version = options.assetVersion || options.version || "", i = 0; i < manifests.length; i++) {
                            var manifest = manifests[i];
                            manifest.src = Pixim__namespace.utils.resolveUri("", manifest.src, version);
                        }
                        return loadAssetAsync(_target);
                    })).then((function(_lib) {
                        return lib.properties.manifest = originalManifests, _lib;
                    }));
                }));
            })).then((function(lib) {
                return new AnimateLoaderResource(lib, null);
            })).catch((function(e) {
                return new AnimateLoaderResource({}, e);
            }));
        }, AnimateLoader.prototype._loadJsAsync = function(target, options) {
            if (!target.filepath) {
                return Promise.resolve();
            }
            var filepath = Pixim__namespace.utils.resolveUri(target.basepath, target.filepath);
            return (new Pixim__namespace.JsLoader).loadAsync(filepath, Object.assign({}, options, {
                version: options.fileVersion || options.version
            })).then((function(resource) {
                if (resource.error) {
                    throw resource.error;
                }
                resource.ref();
            }));
        }, AnimateLoader.prototype._prepareAssetsAsync = function(basepath, manifests, options) {
            var targets = {};
            if (!options.xhr) {
                return Promise.resolve();
            }
            for (var i = 0; i < manifests.length; i++) {
                var manifest = manifests[i];
                Pixim__namespace.utils.isUrl(manifest.src) && (targets[i] = Pixim__namespace.utils.resolveUri(basepath, manifest.src));
            }
            return 0 === Object.keys(targets).length ? Promise.resolve() : (new AnimateBlobLoader).loadAllAsync(targets, Object.assign({}, options, {
                version: options.assetVersion || options.version
            })).then((function(resources) {
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
            }));
        }, AnimateLoader;
    }(Pixim__namespace.LoaderBase), AnimateManifest = function(superclass) {
        function AnimateManifest() {
            superclass.apply(this, arguments);
        }
        return superclass && (AnimateManifest.__proto__ = superclass), AnimateManifest.prototype = Object.create(superclass && superclass.prototype), 
        AnimateManifest.prototype.constructor = AnimateManifest, AnimateManifest.prototype._createLoader = function() {
            return new AnimateLoader;
        }, AnimateManifest;
    }(Pixim__namespace.ManifestBase);
    Pixim.Content.registerManifest("animates", AnimateManifest);
    var Container = function(PiximContainer) {
        function Container() {
            var this$1$1 = this;
            PiximContainer.call(this), this._createjsData = {
                controller: new CreatejsController(this),
                task: new Pixim.Task([], this)
            }, this._createjsData.task.add((function(e) {
                this$1$1.handleTick(e.delta);
            })), this._createjsData.task.first();
        }
        return PiximContainer && (Container.__proto__ = PiximContainer), Container.prototype = Object.create(PiximContainer && PiximContainer.prototype), 
        Container.prototype.constructor = Container, Container.prototype.updateTask = function(e) {
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
        }, Container;
    }(Pixim.Container);
    createjs.MovieClip = CreatejsMovieClip, createjs.Bitmap = CreatejsBitmap, createjs.Sprite = CreatejsSprite, 
    exports.AnimateBlobLoader = AnimateBlobLoader, exports.AnimateBlobLoaderResource = AnimateBlobLoaderResource, 
    exports.AnimateLoader = AnimateLoader, exports.AnimateLoaderResource = AnimateLoaderResource, 
    exports.AnimateManifest = AnimateManifest, exports.Container = Container, exports.CreatejsBitmap = CreatejsBitmap, 
    exports.CreatejsMovieClip = CreatejsMovieClip, exports.CreatejsSprite = CreatejsSprite, 
    exports.addAnimatesTo = function(content, data) {
        content.addTargets("animates", data, {});
    }, exports.core = pixiAnimateContainer_esm, exports.defineAnimatesTo = function(Content, data) {
        Content.defineTargets("animates", data, {});
    };
}(this.Pixim.animate = this.Pixim.animate || {}, createjs, PIXI, Pixim);
//# sourceMappingURL=Pixim-animate-container.js.map
