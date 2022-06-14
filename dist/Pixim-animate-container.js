/*!
 * Pixim-animate-container - v1.3.1
 * 
 * @require pixi.js v^5.3.2
 * @require @tawaship/pixim.js v1.13.2
 * @author tawaship (makazu.mori@gmail.com)
 * @license MIT
 */
this.Pixim = this.Pixim || {}, function(exports, Pixim, createjs, pixi_js) {
    "use strict";
    /*!
     * @tawaship/pixi-animate-core - v3.2.0
     * 
     * @require pixi.js v^5.3.2
     * @author tawaship (makazu.mori@gmail.com)
     * @license MIT
     */
    var CreatejsButtonHelper = function(superclass) {
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
    }((createjs = createjs && Object.prototype.hasOwnProperty.call(createjs, "default") ? createjs.default : createjs).ButtonHelper);
    function createObject(proto) {
        return Object.create(proto);
    }
    var DEG_TO_RAD = Math.PI / 180;
    function createPixiData(pixi, regObj) {
        return {
            regObj: regObj,
            instance: pixi
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
                return cb instanceof CreatejsButtonHelper || this._createjsEventManager.add(type, cb), 
                superClass.prototype.addEventListener.apply(this, [ type, cb ].concat(args));
            }, C.prototype.removeEventListener = function(type, cb) {
                for (var args = [], len = arguments.length - 2; len-- > 0; ) {
                    args[len] = arguments[len + 2];
                }
                return cb instanceof CreatejsButtonHelper || this._createjsEventManager.remove(type, cb), 
                superClass.prototype.removeEventListener.apply(this, [ type, cb ].concat(args));
            }, C.prototype.removeAllEventListeners = function(type) {
                for (var args = [], len = arguments.length - 1; len-- > 0; ) {
                    args[len] = arguments[len + 1];
                }
                return this._createjsEventManager.removeAll(type), superClass.prototype.removeAllEventListeners.apply(this, [ type ].concat(args));
            }, prototypeAccessors.mask.get = function() {
                return this._createjsParams.mask;
            }, prototypeAccessors.mask.set = function(value) {
                var this$1 = this;
                value ? (value.masked.push(this._pixiData.instance), this._pixiData.instance.mask = value.pixi, 
                this._pixiData.instance.once("added", (function() {
                    this$1._pixiData.instance.parent.addChild(value.pixi);
                }))) : this._pixiData.instance.mask = null, this._createjsParams.mask = value;
            }, Object.defineProperties(C.prototype, prototypeAccessors), C;
        }(superClass);
        return C;
    }
    var CreatejsStage = function(superclass) {
        function CreatejsStage() {
            superclass.apply(this, arguments);
        }
        return superclass && (CreatejsStage.__proto__ = superclass), CreatejsStage.prototype = Object.create(superclass && superclass.prototype), 
        CreatejsStage.prototype.constructor = CreatejsStage, CreatejsStage.prototype.updateForPixi = function(props) {
            return this.tickOnUpdate && this.tick(props), this.dispatchEvent("drawstart"), updateDisplayObjectChildren(this, props), 
            this.dispatchEvent("drawend"), !0;
        }, CreatejsStage;
    }(createjs.Stage), CreatejsStageGL = function(superclass) {
        function CreatejsStageGL() {
            superclass.apply(this, arguments);
        }
        return superclass && (CreatejsStageGL.__proto__ = superclass), CreatejsStageGL.prototype = Object.create(superclass && superclass.prototype), 
        CreatejsStageGL.prototype.constructor = CreatejsStageGL, CreatejsStageGL.prototype.updateForPixi = function(props) {
            return this.tickOnUpdate && this.tick(props), this.dispatchEvent("drawstart"), updateDisplayObjectChildren(this, props), 
            this.dispatchEvent("drawend"), !0;
        }, CreatejsStageGL;
    }(createjs.StageGL), createjsInteractionEvents = {
        mousedown: !0,
        pressmove: !0,
        pressup: !0,
        rollover: !0,
        rollout: !0,
        click: !0
    }, EventManager = function(cjs) {
        this._isDown = !1, this._cjs = cjs, this._emitter = new pixi_js.utils.EventEmitter, 
        cjs.pixi.on("pointerdown", this._onPointerDown, this).on("pointermove", this._onPointerMove, this).on("pointerup", this._onPointerUp, this).on("pointerupoutside", this._onPointerUpOutside, this).on("pointertap", this._onPointerTap, this).on("pointerover", this._onPointerOver, this).on("pointerout", this._onPointerOut, this);
    };
    EventManager.prototype._onPointerDown = function(e) {
        e.currentTarget = e.currentTarget.createjs, e.target = e.target.createjs;
        var ev = e.data;
        e.rawX = ev.global.x, e.rawY = ev.global.y, this._isDown = !0, this._emitter.emit("mousedown", e);
    }, EventManager.prototype._onPointerMove = function(e) {
        if (this._isDown) {
            e.currentTarget = this._cjs, e.target = e.target && e.target.createjs;
            var ev = e.data;
            e.rawX = ev.global.x, e.rawY = ev.global.y, this._emitter.emit("pressmove", e);
        }
    }, EventManager.prototype._onPointerUp = function(e) {
        e.currentTarget = this._cjs, e.target = e.target && e.target.createjs;
        var ev = e.data;
        e.rawX = ev.global.x, e.rawY = ev.global.y, this._isDown = !1, this._emitter.emit("pressup", e);
    }, EventManager.prototype._onPointerUpOutside = function(e) {
        e.currentTarget = this._cjs, e.target = e.target && e.target.createjs;
        var ev = e.data;
        e.rawX = ev.global.x, e.rawY = ev.global.y, this._isDown = !1, this._emitter.emit("pressup", e);
    }, EventManager.prototype._onPointerTap = function(e) {
        e.currentTarget = this._cjs, e.target = e.target && e.target.createjs;
        var ev = e.data;
        e.rawX = ev.global.x, e.rawY = ev.global.y, this._emitter.emit("click", e);
    }, EventManager.prototype._onPointerOver = function(e) {
        e.currentTarget = e.currentTarget.createjs, e.target = e.currentTarget.createjs;
        var ev = e.data;
        e.rawX = ev.global.x, e.rawY = ev.global.y, this._emitter.emit("rollover", e);
    }, EventManager.prototype._onPointerOut = function(e) {
        e.currentTarget = e.currentTarget.createjs, e.target = e.currentTarget.createjs;
        var ev = e.data;
        e.rawX = ev.global.x, e.rawY = ev.global.y, this._emitter.emit("rollout", e);
    }, EventManager.prototype.add = function(type, cb) {
        type in createjsInteractionEvents && (this._emitter.off(type, cb), this._emitter.on(type, cb), 
        this._emitter.eventNames().length > 0 && (this._cjs.pixi.interactive = !0));
    }, EventManager.prototype.remove = function(type, cb) {
        type in createjsInteractionEvents && (this._emitter.off(type, cb), 0 === this._emitter.eventNames().length && (this._cjs.pixi.interactive = !1));
    }, EventManager.prototype.removeAll = function(type) {
        type && !(type in createjsInteractionEvents) || (this._emitter.removeAllListeners(type), 
        0 === this._emitter.eventNames().length && (this._cjs.pixi.interactive = !1));
    };
    var PixiMovieClip = function(Container) {
        function PixiMovieClip(cjs) {
            Container.call(this), this._filterContainer = null, this._createjs = cjs;
        }
        Container && (PixiMovieClip.__proto__ = Container), PixiMovieClip.prototype = Object.create(Container && Container.prototype), 
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
    }(pixi_js.Container);
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
            filters: null
        });
    }
    function createPixiMovieClipData(cjs) {
        var pixi = new PixiMovieClip(cjs);
        return Object.assign(createPixiData(pixi, pixi.pivot), {
            subInstance: pixi
        });
    }
    var P = createjs.MovieClip, CreatejsMovieClip = function(superclass) {
        function CreatejsMovieClip() {
            for (var args = [], len = arguments.length; len--; ) {
                args[len] = arguments[len];
            }
            superclass.call(this), this._pixiData = createPixiMovieClipData(this), this._createjsParams = createCreatejsMovieClipParams(), 
            this._createjsEventManager = new EventManager(this), P.apply(this, args);
        }
        superclass && (CreatejsMovieClip.__proto__ = superclass), CreatejsMovieClip.prototype = Object.create(superclass && superclass.prototype), 
        CreatejsMovieClip.prototype.constructor = CreatejsMovieClip;
        var prototypeAccessors$1 = {
            filters: {
                configurable: !0
            }
        };
        return CreatejsMovieClip.prototype.initialize = function() {
            for (var args = [], len = arguments.length; len--; ) {
                args[len] = arguments[len];
            }
            return this._pixiData = createPixiMovieClipData(this), this._createjsParams = createCreatejsMovieClipParams(), 
            this._createjsEventManager = new EventManager(this), superclass.prototype.initialize.apply(this, args);
        }, CreatejsMovieClip.prototype.updateForPixi = function(e) {
            return this._updateState(), updateDisplayObjectChildren(this, e);
        }, prototypeAccessors$1.filters.get = function() {
            return this._createjsParams.filters;
        }, prototypeAccessors$1.filters.set = function(value) {
            if (value) {
                for (var list = [], i = 0; i < value.length; i++) {
                    var f = value[i];
                    if (!(f instanceof createjs.ColorMatrixFilter)) {
                        var m = new pixi_js.filters.ColorMatrixFilter;
                        m.matrix = [ f.redMultiplier, 0, 0, 0, f.redOffset / 255, 0, f.greenMultiplier, 0, 0, f.greenOffset / 255, 0, 0, f.blueMultiplier, 0, f.blueOffset / 255, 0, 0, 0, f.alphaMultiplier, f.alphaOffset / 255, 0, 0, 0, 0, 1 ], 
                        list.push(m);
                    }
                }
                for (var o = this._pixiData.instance, c = o.children, n = new pixi_js.Container, nc = this._pixiData.subInstance = n.addChild(new pixi_js.Container); c.length; ) {
                    nc.addChild(c[0]);
                }
                o.addChild(n), o.filterContainer = nc, nc.updateTransform(), nc.calculateBounds();
                var b = nc.getLocalBounds(), x = b.x, y = b.y;
                for (i = 0; i < nc.children.length; i++) {
                    var child = nc.children[i];
                    if (child.x -= x, child.y -= y, child instanceof PixiMovieClip) {
                        var fc = child.filterContainer;
                        fc && (fc.cacheAsBitmap = !1);
                    }
                }
                n.x = x, n.y = y, nc.filters = list, nc.cacheAsBitmap = !0;
            } else {
                var o$1 = this._pixiData.instance;
                if (o$1.filterContainer) {
                    var nc$1 = this._pixiData.subInstance, n$1 = nc$1.parent, c$1 = nc$1.children;
                    for (o$1.removeChildren(), o$1.filterContainer = null; c$1.length; ) {
                        var v = o$1.addChild(c$1[0]);
                        v.x += n$1.x, v.y += n$1.y;
                    }
                    nc$1.filters = [], nc$1.cacheAsBitmap = !1, this._pixiData.subInstance = o$1;
                }
            }
            this._createjsParams.filters = value;
        }, CreatejsMovieClip.prototype.addChild = function(child) {
            return this._pixiData.subInstance.addChild(child.pixi), superclass.prototype.addChild.call(this, child);
        }, CreatejsMovieClip.prototype.addChildAt = function(child, index) {
            return this._pixiData.subInstance.addChildAt(child.pixi, index), superclass.prototype.addChildAt.call(this, child, index);
        }, CreatejsMovieClip.prototype.removeChild = function(child) {
            return this._pixiData.subInstance.removeChild(child.pixi), superclass.prototype.removeChild.call(this, child);
        }, CreatejsMovieClip.prototype.removeChildAt = function(index) {
            return this._pixiData.subInstance.removeChildAt(index), superclass.prototype.removeChildAt.call(this, index);
        }, CreatejsMovieClip.prototype.removeAllChldren = function() {
            return this._pixiData.subInstance.removeChildren(), superclass.prototype.removeAllChldren.call(this);
        }, Object.defineProperties(CreatejsMovieClip.prototype, prototypeAccessors$1), CreatejsMovieClip;
    }(mixinCreatejsDisplayObject(createjs.MovieClip));
    Object.defineProperties(CreatejsMovieClip.prototype, {
        _createjsParams: {
            value: createCreatejsMovieClipParams(),
            writable: !0
        },
        _pixiData: {
            value: createPixiMovieClipData(createObject(CreatejsMovieClip.prototype)),
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
    }(pixi_js.Sprite);
    function createPixiSpriteData(cjs) {
        var pixi = new PixiSprite(cjs);
        return createPixiData(pixi, pixi.anchor);
    }
    var P$1 = createjs.Sprite, CreatejsSprite = function(superclass) {
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
            }, this._createjsEventManager = new EventManager(this), P$1.apply(this, args);
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
            }, this._createjsEventManager = new EventManager(this), superclass.prototype.initialize.apply(this, args);
        }, CreatejsSprite.prototype.updateForPixi = function(e) {
            return !0;
        }, CreatejsSprite.prototype.gotoAndStop = function() {
            for (var args = [], len = arguments.length; len--; ) {
                args[len] = arguments[len];
            }
            superclass.prototype.gotoAndStop.apply(this, args);
            var frame = this.spriteSheet.getFrame(this.currentFrame), baseTexture = pixi_js.BaseTexture.from(frame.image), texture = new pixi_js.Texture(baseTexture, frame.rect);
            this._pixiData.instance.texture = texture;
        }, CreatejsSprite;
    }(mixinCreatejsDisplayObject(createjs.Sprite));
    Object.defineProperties(CreatejsSprite.prototype, {
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
            value: createPixiSpriteData(createObject(CreatejsSprite.prototype)),
            writable: !0
        }
    });
    var PixiShape = function(Container) {
        function PixiShape(cjs) {
            Container.call(this), this._createjs = cjs;
        }
        Container && (PixiShape.__proto__ = Container), PixiShape.prototype = Object.create(Container && Container.prototype), 
        PixiShape.prototype.constructor = PixiShape;
        var prototypeAccessors$3 = {
            createjs: {
                configurable: !0
            }
        };
        return prototypeAccessors$3.createjs.get = function() {
            return this._createjs;
        }, Object.defineProperties(PixiShape.prototype, prototypeAccessors$3), PixiShape;
    }(pixi_js.Container);
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
    var P$2 = createjs.Shape, CreatejsShape = function(superclass) {
        function CreatejsShape() {
            for (var args = [], len = arguments.length; len--; ) {
                args[len] = arguments[len];
            }
            superclass.apply(this, args), this._pixiData = createPixiShapeData(this), this._createjsParams = createCreatejsShapeParams(null), 
            this._createjsEventManager = new EventManager(this), P$2.apply(this, args);
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
            this._createjsEventManager = new EventManager(this), superclass.prototype.initialize.apply(this, args);
        }, CreatejsShape.prototype.updateForPixi = function(e) {
            return !0;
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
    }(pixi_js.Sprite);
    function createPixiBitmapData(cjs) {
        var pixi = new PixiBitmap(cjs);
        return createPixiData(pixi, pixi.anchor);
    }
    var P$3 = createjs.Bitmap, CreatejsBitmap = function(superclass) {
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
            }, this._createjsEventManager = new EventManager(this), P$3.apply(this, args);
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
            }, this._createjsEventManager = new EventManager(this);
            var res = superclass.prototype.initialize.apply(this, args), texture = pixi_js.Texture.from(this.image);
            return this._pixiData.instance.texture = texture, res;
        }, CreatejsBitmap.prototype.updateForPixi = function(e) {
            return !0;
        }, CreatejsBitmap;
    }(mixinCreatejsDisplayObject(createjs.Bitmap));
    Object.defineProperties(CreatejsBitmap.prototype, {
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
            value: createPixiBitmapData(createObject(CreatejsBitmap.prototype)),
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
    }(pixi_js.Graphics);
    function createPixiGraphicsData(cjs) {
        var pixi = new PixiGraphics(cjs);
        return Object.assign(createPixiData(pixi, pixi.pivot), {
            strokeFill: 0,
            strokeAlpha: 1
        });
    }
    var LineCap = {
        0: pixi_js.LINE_CAP.BUTT,
        1: pixi_js.LINE_CAP.ROUND,
        2: pixi_js.LINE_CAP.SQUARE
    }, LineJoin = {
        0: pixi_js.LINE_JOIN.MITER,
        1: pixi_js.LINE_JOIN.ROUND,
        2: pixi_js.LINE_JOIN.BEVEL
    }, P$4 = createjs.Graphics, CreatejsGraphics = function(superclass) {
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
            }, this._createjsEventManager = new EventManager(this), P$4.apply(this, args), this._pixiData.instance.beginFill(16772846, 1), 
            this._pixiData.strokeFill = 0, this._pixiData.strokeAlpha = 1;
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
            }, this._createjsEventManager = new EventManager(this), superclass.prototype.initialize.apply(this, args);
        }, CreatejsGraphics.prototype.updateForPixi = function(e) {
            return !0;
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
    }(pixi_js.Text), PixiTextContainer = function(Container) {
        function PixiTextContainer(cjs, text) {
            Container.call(this), this._createjs = cjs, this._text = text;
        }
        Container && (PixiTextContainer.__proto__ = Container), PixiTextContainer.prototype = Object.create(Container && Container.prototype), 
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
    }(pixi_js.Container);
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
    var P$5 = createjs.Text, CreatejsText = function(superclass) {
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
            this._createjsEventManager = new EventManager(this), P$5.call.apply(P$5, [ this, text, font, color ].concat(args));
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
    function resolvePath(path, basepath) {
        return pixi_js.utils.url.resolve(basepath, path);
    }
    Object.defineProperties(CreatejsText.prototype, {
        _createjsParams: {
            value: createCreatejsTextParams("", "", ""),
            writable: !0
        },
        _pixiData: {
            value: createPixiTextData(createObject(CreatejsText.prototype), new PixiText("")),
            writable: !0
        }
    }), createjs.Stage = CreatejsStage, createjs.StageGL = CreatejsStageGL, createjs.MovieClip = CreatejsMovieClip, 
    createjs.Sprite = CreatejsSprite, createjs.Shape = CreatejsShape, createjs.Bitmap = CreatejsBitmap, 
    createjs.Graphics = CreatejsGraphics, createjs.Text = CreatejsText, createjs.ButtonHelper = CreatejsButtonHelper, 
    createjs.MotionGuidePlugin.install();
    var AnimateEvent = function(superclass) {
        function AnimateEvent(type) {
            superclass.call(this, type);
        }
        return superclass && (AnimateEvent.__proto__ = superclass), AnimateEvent.prototype = Object.create(superclass && superclass.prototype), 
        AnimateEvent.prototype.constructor = AnimateEvent, AnimateEvent;
    }(createjs.Event), ReachLabelEvent = function(AnimateEvent) {
        function ReachLabelEvent(type, label) {
            AnimateEvent.call(this, type), this.data = label;
        }
        return AnimateEvent && (ReachLabelEvent.__proto__ = AnimateEvent), ReachLabelEvent.prototype = Object.create(AnimateEvent && AnimateEvent.prototype), 
        ReachLabelEvent.prototype.constructor = ReachLabelEvent, ReachLabelEvent;
    }(AnimateEvent), CreatejsMovieClip$1 = function(_CreatejsMovieClip) {
        function CreatejsMovieClip() {
            for (var args = [], len = arguments.length; len--; ) {
                args[len] = arguments[len];
            }
            _CreatejsMovieClip.apply(this, args), this.framerate = this._framerateBase;
        }
        return _CreatejsMovieClip && (CreatejsMovieClip.__proto__ = _CreatejsMovieClip), 
        CreatejsMovieClip.prototype = Object.create(_CreatejsMovieClip && _CreatejsMovieClip.prototype), 
        CreatejsMovieClip.prototype.constructor = CreatejsMovieClip, CreatejsMovieClip.prototype.endAnimation = function(e) {}, 
        CreatejsMovieClip.prototype.reachLabel = function(e) {}, CreatejsMovieClip.prototype.initialize = function() {
            for (var args = [], len = arguments.length; len--; ) {
                args[len] = arguments[len];
            }
            _CreatejsMovieClip.prototype.initialize.apply(this, args), this.framerate = this._framerateBase;
        }, CreatejsMovieClip.prototype.updateForPixi = function(e) {
            var currentFrame = this.currentFrame;
            if (this.advance(16.666666666666668 * e.delta), currentFrame !== this.currentFrame) {
                this.currentFrame === this.totalFrames - 1 && this.dispatchEvent(new AnimateEvent("endAnimation"));
                for (var i = 0; i < this.labels.length; i++) {
                    var label = this.labels[i];
                    if (this.currentFrame === label.position) {
                        this.dispatchEvent(new ReachLabelEvent("reachLabel", label));
                        break;
                    }
                }
            }
            return _CreatejsMovieClip.prototype.updateForPixi.call(this, e);
        }, CreatejsMovieClip.prototype.replaceInstance = function(name, cls) {
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
    }(CreatejsMovieClip);
    delete CreatejsMovieClip$1.prototype.endAnimation, delete CreatejsMovieClip$1.prototype.reachLabel;
    var CreatejsBitmap$1 = function(_CreatejsBitmap) {
        function CreatejsBitmap() {
            _CreatejsBitmap.apply(this, arguments);
        }
        return _CreatejsBitmap && (CreatejsBitmap.__proto__ = _CreatejsBitmap), CreatejsBitmap.prototype = Object.create(_CreatejsBitmap && _CreatejsBitmap.prototype), 
        CreatejsBitmap.prototype.constructor = CreatejsBitmap, CreatejsBitmap.prototype.replaceTexture = function(texture) {
            this._pixiData.instance.texture = texture;
        }, CreatejsBitmap;
    }(CreatejsBitmap), CreatejsSprite$1 = function(_CreatejsSprite) {
        function CreatejsSprite() {
            _CreatejsSprite.apply(this, arguments);
        }
        return _CreatejsSprite && (CreatejsSprite.__proto__ = _CreatejsSprite), CreatejsSprite.prototype = Object.create(_CreatejsSprite && _CreatejsSprite.prototype), 
        CreatejsSprite.prototype.constructor = CreatejsSprite, CreatejsSprite.prototype.replaceTexture = function(texture) {
            this._pixiData.instance.texture = texture;
        }, CreatejsSprite;
    }(CreatejsSprite);
    var AnimateLoaderResource = function(superclass) {
        function AnimateLoaderResource() {
            superclass.apply(this, arguments);
        }
        return superclass && (AnimateLoaderResource.__proto__ = superclass), AnimateLoaderResource.prototype = Object.create(superclass && superclass.prototype), 
        AnimateLoaderResource.prototype.constructor = AnimateLoaderResource, AnimateLoaderResource.prototype.destroy = function() {}, 
        AnimateLoaderResource;
    }(Pixim.LoaderResource), AnimateLoader = function(superclass) {
        function AnimateLoader() {
            superclass.apply(this, arguments);
        }
        return superclass && (AnimateLoader.__proto__ = superclass), AnimateLoader.prototype = Object.create(superclass && superclass.prototype), 
        AnimateLoader.prototype.constructor = AnimateLoader, AnimateLoader.prototype.loadAsync = function(target, options) {
            var this$1 = this;
            return void 0 === options && (options = {}), this._loadAsync(target, options).then((function(resource) {
                return resource.error || this$1.emit(Pixim.EVENT_LOADER_ASSET_LOADED, {
                    target: target,
                    resource: resource
                }), resource;
            }));
        }, AnimateLoader.prototype.loadAllAsync = function(targets, options) {
            var this$1 = this;
            void 0 === options && (options = {});
            var res = {};
            if (0 === Object.keys(targets).length) {
                return Promise.resolve(res);
            }
            var promises = [], loop = function(i) {
                promises.push(this$1.loadAsync(targets[i], options).then((function(resource) {
                    res[i] = resource;
                })));
            };
            for (var i in targets) {
                loop(i);
            }
            return Promise.all(promises).then((function() {
                return res;
            }));
        }, AnimateLoader.prototype._loadAsync = function(target, options) {
            var this$1 = this;
            void 0 === options && (options = {});
            var src, filepath, url;
            this._resolveBasepath(options.basepath), this._resolveVersion(options.version);
            return (target.filepath ? (filepath = Pixim.utils.resolvePath(target.filepath, target.basepath), 
            url = this$1._resolveUrl(filepath, options), (src = url, new Promise((function(resolve, reject) {
                var script = document.createElement("script");
                script.src = src, script.addEventListener("load", (function() {
                    document.body.removeChild(script), resolve();
                })), script.addEventListener("error", (function(e) {
                    document.body.removeChild(script), reject(e);
                })), document.body.appendChild(script);
            }))).catch((function(e) {
                throw "Animate: '" + filepath + "' cannot load.";
            }))) : Promise.resolve()).then((function() {
                var comp = AdobeAn.getComposition(target.id);
                if (!comp) {
                    throw new Error("no composition: " + target.id);
                }
                for (var origin = comp.getLibrary().properties.manifest, i = 0; i < origin.length; i++) {
                    var o = origin[i], filepath = Pixim.utils.resolvePath(o.src, target.basepath);
                    o.src = this$1._resolveUrl(filepath, options);
                }
                return function(comp, basepath, options) {
                    if (void 0 === options && (options = {}), !comp) {
                        throw new Error("no composition");
                    }
                    var lib = comp.getLibrary();
                    return new Promise((function(resolve, reject) {
                        0 === lib.properties.manifest.length && resolve({}), basepath && (basepath = basepath.replace(/([^\/])$/, "$1/"));
                        var loader = new createjs.LoadQueue(!1);
                        loader.installPlugin(createjs.Sound);
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
                        }));
                        for (var manifests = [], origin = lib.properties.manifest, i = 0; i < origin.length; i++) {
                            var o = origin[i], m = {
                                src: resolvePath(o.src, basepath),
                                id: o.id
                            };
                            for (var i$1 in o) {
                                m[i$1] || (m[i$1] = o[i$1]);
                            }
                            options.crossOrigin && (m.crossOrigin = !0), 0 === o.src.indexOf("data:") && (m.type = "image"), 
                            manifests.push(m);
                        }
                        loader.loadManifest(manifests);
                    })).then((function(evt) {
                        for (var ss = comp.getSpriteSheet(), queue = evt.target, ssMetadata = lib.ssMetadata, i = 0; i < ssMetadata.length; i++) {
                            ss[ssMetadata[i].name] = new createjs.SpriteSheet({
                                images: [ queue.getResult(ssMetadata[i].name) ],
                                frames: ssMetadata[i].frames
                            });
                        }
                        return lib;
                    }));
                }(comp, "", target.options);
            })).then((function(lib) {
                for (var i in lib) {
                    lib[i].prototype instanceof CreatejsMovieClip$1 && (lib[i].prototype._framerateBase = lib.properties.fps);
                }
                return new AnimateLoaderResource(lib, null);
            })).catch((function(e) {
                return new AnimateLoaderResource({}, e);
            }));
        }, AnimateLoader;
    }(Pixim.LoaderBase), AnimateManifest = function(superclass) {
        function AnimateManifest() {
            superclass.apply(this, arguments);
        }
        return superclass && (AnimateManifest.__proto__ = superclass), AnimateManifest.prototype = Object.create(superclass && superclass.prototype), 
        AnimateManifest.prototype.constructor = AnimateManifest, AnimateManifest.prototype._loadAsync = function(targets, options) {
            void 0 === options && (options = {});
            var loader = new AnimateLoader(options);
            return this._doneLoaderAsync(loader, targets);
        }, AnimateManifest;
    }(Pixim.ManifestBase);
    Pixim.Content.registerManifest("animates", AnimateManifest), createjs.MovieClip = CreatejsMovieClip$1, 
    createjs.Bitmap = CreatejsBitmap$1, createjs.Sprite = CreatejsSprite$1;
    var Container = function(_Container) {
        function Container() {
            for (var args = [], len = arguments.length; len--; ) {
                args[len] = arguments[len];
            }
            _Container.apply(this, args), this._createjsData = {
                id: 0,
                targets: {},
                task: new Pixim.Task([], this)
            };
            var targets = this._createjsData.targets;
            this._createjsData.task.add((function(e) {
                for (var i in targets) {
                    targets[i].updateForPixi(e);
                }
            })), this._createjsData.task.first();
        }
        return _Container && (Container.__proto__ = _Container), Container.prototype = Object.create(_Container && _Container.prototype), 
        Container.prototype.constructor = Container, Container.prototype.updateTask = function(e) {
            _Container.prototype.updateTask.call(this, e);
            var task = this._createjsData.task;
            this.taskEnabled && task.done({
                delta: Math.min(e.delta, 1)
            });
        }, Container.prototype._addCreatejs = function(cjs) {
            var this$1 = this;
            if (cjs instanceof CreatejsMovieClip$1) {
                var p = cjs.pixi.parent;
                cjs.pixi.once("added", (function() {
                    cjs.pixi.parent !== p && cjs.gotoAndPlay(0);
                    var id = this$1._createjsData.id++;
                    this$1._createjsData.targets[id] = cjs, cjs.pixi.once("removed", (function() {
                        delete this$1._createjsData.targets[id];
                    }));
                }));
            }
        }, Container.prototype.addCreatejs = function(cjs) {
            return this._addCreatejs(cjs), this.addChild(cjs.pixi), cjs;
        }, Container.prototype.addCreatejsAt = function(cjs, index) {
            return this._addCreatejs(cjs), this.addChildAt(cjs.pixi, index), cjs;
        }, Container.prototype.removeCreatejs = function(cjs) {
            return this.removeChild(cjs.pixi), cjs;
        }, Container;
    }(Pixim.Container);
    exports.createjs = createjs, exports.AnimateEvent = AnimateEvent, exports.AnimateLoader = AnimateLoader, 
    exports.AnimateLoaderResource = AnimateLoaderResource, exports.AnimateManifest = AnimateManifest, 
    exports.Container = Container, exports.CreatejsBitmap = CreatejsBitmap$1, exports.CreatejsMovieClip = CreatejsMovieClip$1, 
    exports.CreatejsSprite = CreatejsSprite$1, exports.ReachLabelEvent = ReachLabelEvent, 
    exports.addAnimatesTo = function(content, data) {
        content.addTargets("animates", data, {});
    }, exports.defineAnimatesTo = function(Content, data) {
        Content.defineTargets("animates", data, {});
    };
}(this.Pixim.animate = this.Pixim.animate || {}, Pixim, createjs, PIXI);
//# sourceMappingURL=Pixim-animate-container.js.map
