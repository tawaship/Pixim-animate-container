/*!
 * Pixim-animate-container - v2.2.1
 * 
 * @require pixi.js v^5.3.2
 * @require @tawaship/pixim.js vundefined
 * @author tawaship (makazu.mori@gmail.com)
 * @license MIT
 */

import createjs from '@tawaship/createjs-module';
import * as PIXI$1 from 'pixi.js';
import { BaseTexture, Texture, LINE_CAP, LINE_JOIN, filters, utils, Container as Container$2, Sprite, Graphics, Text } from 'pixi.js';
import { LoaderResource, LoaderBase, utils as utils$1, JsLoader, ManifestBase, Content, Container as Container$3, Task } from '@tawaship/pixim.js';

/*!
 * pixi-animate-container - v2.1.1
 * 
 * @require pixi.js v^5.3.2
 * @author tawaship (makazu.mori@gmail.com)
 * @license MIT
 */


/**
 * inherited {@link https://createjs.com/docs/easeljs/classes/ButtonHelper.html | createjs.ButtonHelper}
 */
class CreatejsButtonHelper extends createjs.ButtonHelper {
    constructor(...args) {
        super(...args);
        const createjs = args[0];
        const pixi = createjs.pixi;
        const baseFrame = args[1];
        const overFrame = args[2];
        const downFrame = args[3];
        const hit = arguments[5];
        const hitFrame = args[6];
        hit.gotoAndStop(hitFrame);
        const hitPixi = pixi.addChild(hit.pixi);
        hitPixi.alpha = 0.00001;
        let isOver = false;
        let isDown = false;
        hitPixi.on('pointerover', function () {
            isOver = true;
            if (isDown) {
                createjs.gotoAndStop(downFrame);
            }
            else {
                createjs.gotoAndStop(overFrame);
            }
        });
        hitPixi.on('pointerout', function () {
            isOver = false;
            if (isDown) {
                createjs.gotoAndStop(overFrame);
            }
            else {
                createjs.gotoAndStop(baseFrame);
            }
        });
        hitPixi.on('pointerdown', function () {
            isDown = true;
            createjs.gotoAndStop(downFrame);
        });
        hitPixi.on('pointerup', function () {
            isDown = false;
            if (isOver) {
                createjs.gotoAndStop(overFrame);
            }
            else {
                createjs.gotoAndStop(baseFrame);
            }
        });
        hitPixi.on('pointerupoutside', function () {
            isDown = false;
            if (isOver) {
                createjs.gotoAndStop(overFrame);
            }
            else {
                createjs.gotoAndStop(baseFrame);
            }
        });
        hitPixi.interactive = true;
        hitPixi.cursor = 'pointer';
    }
}

function createObject(proto) {
    return Object.create(proto);
}
/**
 * @ignore
 */
const DEG_TO_RAD = Math.PI / 180;

function createPixiData(pixi, regObj) {
    return {
        regObj,
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
        visible: true,
        alpha: 1,
        _off: false,
        mask: null
    };
}
function updateDisplayObjectChildren(cjs, e) {
    const list = cjs.children.slice();
    for (let i = 0, l = list.length; i < l; i++) {
        const child = list[i];
        child.updateForPixi(e);
    }
    return true;
}
// export type TMixinedCreatejsDisplayObjectClass = abstract new (...args: any[]) => IMixinedCreatejsDisplayObject;
function mixinCreatejsDisplayObject(superClass) {
    class C extends superClass {
        get pixi() {
            return this._pixiData.instance;
        }
        get x() {
            return this._createjsParams.x;
        }
        set x(value) {
            this._pixiData.instance.x = value;
            this._createjsParams.x = value;
        }
        get y() {
            return this._createjsParams.y;
        }
        set y(value) {
            this._pixiData.instance.y = value;
            this._createjsParams.y = value;
        }
        get scaleX() {
            return this._createjsParams.scaleX;
        }
        set scaleX(value) {
            this._pixiData.instance.scale.x = value;
            this._createjsParams.scaleX = value;
        }
        get scaleY() {
            return this._createjsParams.scaleY;
        }
        set scaleY(value) {
            this._pixiData.instance.scale.y = value;
            this._createjsParams.scaleY = value;
        }
        get skewX() {
            return this._createjsParams.skewX;
        }
        set skewX(value) {
            this._pixiData.instance.skew.x = -value * DEG_TO_RAD;
            this._createjsParams.skewX = value;
        }
        get skewY() {
            return this._createjsParams.skewY;
        }
        set skewY(value) {
            this._pixiData.instance.skew.y = value * DEG_TO_RAD;
            this._createjsParams.skewY = value;
        }
        get regX() {
            return this._createjsParams.regX;
        }
        set regX(value) {
            this._pixiData.regObj.x = value;
            this._createjsParams.regX = value;
        }
        get regY() {
            return this._createjsParams.regY;
        }
        set regY(value) {
            this._pixiData.regObj.y = value;
            this._createjsParams.regY = value;
        }
        get rotation() {
            return this._createjsParams.rotation;
        }
        set rotation(value) {
            this._pixiData.instance.rotation = value * DEG_TO_RAD;
            this._createjsParams.rotation = value;
        }
        get visible() {
            return this._createjsParams.visible;
        }
        set visible(value) {
            value = !!value;
            this._pixiData.instance.visible = value;
            this._createjsParams.visible = value;
        }
        get alpha() {
            return this._createjsParams.alpha;
        }
        set alpha(value) {
            this._pixiData.instance.alpha = value;
            this._createjsParams.alpha = value;
        }
        get _off() {
            return this._createjsParams._off;
        }
        set _off(value) {
            this._pixiData.instance.renderable = !value;
            this._createjsParams._off = value;
        }
        addEventListener(type, cb, ...args) {
            const p = super.addEventListener(type, cb, ...args);
            if (!(cb instanceof CreatejsButtonHelper)) {
                this._createjsEventManager.add(type, cb);
            }
            return p;
        }
        removeEventListener(type, cb, ...args) {
            const p = super.removeEventListener(type, cb, ...args);
            if (!(cb instanceof CreatejsButtonHelper)) {
                this._createjsEventManager.remove(type, cb);
            }
            return p;
        }
        removeAllEventListeners(type, ...args) {
            const p = super.removeAllEventListeners(type, ...args);
            this._createjsEventManager.removeAll(type);
            return p;
        }
        get mask() {
            return this._createjsParams.mask;
        }
        set mask(value) {
            if (value) {
                value.masked.push(this._pixiData.instance);
                this._pixiData.instance.mask = value.pixi;
                this._pixiData.instance.once('added', () => {
                    this._pixiData.instance.parent.addChild(value.pixi);
                });
            }
            else {
                this._pixiData.instance.mask = null;
            }
            this._createjsParams.mask = value;
        }
    }
    return C;
}

/**
 * inherited {@link https://createjs.com/docs/easeljs/classes/Stage.html | createjs.Stage}
 */
class CreatejsStage extends createjs.Stage {
    updateForPixi(props) {
        if (this.tickOnUpdate) {
            this.tick(props);
        }
        this.dispatchEvent("drawstart");
        updateDisplayObjectChildren(this, props);
        this.dispatchEvent("drawend");
        return true;
    }
    updateBlendModeForPixi(mode) {
    }
}

/**
 * inherited {@link https://createjs.com/docs/easeljs/classes/StageGL.html | createjs.StageGL}
 */
class CreatejsStageGL extends createjs.StageGL {
    updateForPixi(props) {
        if (this.tickOnUpdate) {
            this.tick(props);
        }
        this.dispatchEvent("drawstart");
        updateDisplayObjectChildren(this, props);
        this.dispatchEvent("drawend");
        return true;
    }
    updateBlendModeForPixi(mode) {
    }
}

var createjsInteractionEvents;
(function (createjsInteractionEvents) {
    createjsInteractionEvents["mousedown"] = "mousedown";
    createjsInteractionEvents["pressmove"] = "pressmove";
    createjsInteractionEvents["pressup"] = "pressup";
    createjsInteractionEvents["rollover"] = "rollover";
    createjsInteractionEvents["rollout"] = "rollout";
    createjsInteractionEvents["click"] = "click";
})(createjsInteractionEvents || (createjsInteractionEvents = {}));
class CreatejsEventManager {
    constructor(cjs) {
        this._downTarget = null;
        this._cjs = cjs;
        this._emitter = new utils.EventEmitter();
        const pixi = cjs.pixi;
        pixi
            .on('pointerdown', this._onPointerDown, this)
            .on('pointermove', this._onPointerMove, this)
            .on('pointerup', this._onPointerUp, this)
            .on('pointerupoutside', this._onPointerUpOutside, this)
            .on('pointertap', this._onPointerTap, this)
            .on('pointerover', this._onPointerOver, this)
            .on('pointerout', this._onPointerOut, this);
    }
    _onPointerDown(e) {
        const ev = {
            type: createjsInteractionEvents.mousedown,
            currentTarget: e.currentTarget.createjs,
            target: e.target.createjs,
            rawX: e.data.global.x,
            rawY: e.data.global.y,
        };
        this._downTarget = e.target.createjs;
        this._emitter.emit('mousedown', ev);
    }
    _onPointerMove(e) {
        if (!this._downTarget) {
            return;
        }
        const ev = {
            type: createjsInteractionEvents.pressmove,
            currentTarget: e.currentTarget.createjs,
            target: this._downTarget,
            rawX: e.data.global.x,
            rawY: e.data.global.y,
        };
        this._emitter.emit('pressmove', ev);
    }
    _onPointerUp(e) {
        const ev = {
            type: createjsInteractionEvents.pressup,
            currentTarget: e.currentTarget.createjs,
            target: this._downTarget,
            rawX: e.data.global.x,
            rawY: e.data.global.y,
        };
        this._downTarget = null;
        this._emitter.emit('pressup', ev);
    }
    _onPointerUpOutside(e) {
        const ev = {
            type: createjsInteractionEvents.pressup,
            currentTarget: e.currentTarget.createjs,
            target: this._downTarget,
            rawX: e.data.global.x,
            rawY: e.data.global.y,
        };
        this._downTarget = null;
        this._emitter.emit('pressup', ev);
    }
    _onPointerTap(e) {
        const ev = {
            type: createjsInteractionEvents.click,
            currentTarget: e.currentTarget.createjs,
            target: e.target.createjs,
            rawX: e.data.global.x,
            rawY: e.data.global.y,
        };
        this._emitter.emit('click', ev);
    }
    _onPointerOver(e) {
        const ev = {
            type: createjsInteractionEvents.rollover,
            currentTarget: e.currentTarget.createjs,
            target: e.currentTarget.createjs,
            rawX: e.data.global.x,
            rawY: e.data.global.y,
        };
        this._emitter.emit('rollover', ev);
    }
    _onPointerOut(e) {
        const ev = {
            type: createjsInteractionEvents.rollout,
            currentTarget: e.currentTarget.createjs,
            target: e.currentTarget.createjs,
            rawX: e.data.global.x,
            rawY: e.data.global.y,
        };
        this._emitter.emit('rollout', ev);
    }
    add(type, cb) {
        if (!(type in createjsInteractionEvents)) {
            return;
        }
        this._emitter.on(type, cb);
        if (this._emitter.eventNames().length > 0) {
            this._cjs.pixi.interactive = true;
        }
    }
    remove(type, cb) {
        if (!(type in createjsInteractionEvents)) {
            return;
        }
        this._emitter.off(type, cb);
        if (this._emitter.eventNames().length === 0) {
            this._cjs.pixi.interactive = false;
        }
    }
    removeAll(type) {
        if (type && !(type in createjsInteractionEvents)) {
            return;
        }
        this._emitter.removeAllListeners(type);
        if (this._emitter.eventNames().length === 0) {
            this._cjs.pixi.interactive = false;
        }
    }
}

/**
 * inherited {@link http://pixijs.download/v5.3.2/docs/PIXI.Container.html | PIXI.Container}
 */
class PixiMovieClip extends Container$2 {
    constructor(cjs) {
        super();
        this._filterContainer = null;
        this._createjs = cjs;
    }
    get filterContainer() {
        return this._filterContainer;
    }
    set filterContainer(value) {
        this._filterContainer = value;
    }
    get createjs() {
        return this._createjs;
    }
}
/**
 * @ignore
 */
function createCreatejsMovieClipParams() {
    return Object.assign(createCreatejsParams(), {
        filters: null,
        compositeOperation: null
    });
}
/**
 * @ignore
 */
function createPixiMovieClipData(cjs) {
    const pixi = new PixiMovieClip(cjs);
    return Object.assign(createPixiData(pixi, pixi.pivot), {
        subInstance: pixi
    });
}
class AnimateEvent extends createjs.Event {
    constructor(type) {
        super(type);
    }
}
class AnimateReachLabelEvent extends AnimateEvent {
    constructor(type, label) {
        super(type);
        this.data = label;
    }
}
/**
 * @ignore
 */
const P$6 = createjs.MovieClip;
/**
 * @ignore
 */
var CompositeOpeations;
(function (CompositeOpeations) {
    CompositeOpeations["Lighter"] = "lighter";
    CompositeOpeations["Multiply"] = "multiply";
    CompositeOpeations["Screen"] = "screen";
})(CompositeOpeations || (CompositeOpeations = {}));
/**
 * @ignore
 */
const blendModes = {
    [CompositeOpeations.Lighter]: PIXI.BLEND_MODES.ADD,
    [CompositeOpeations.Multiply]: PIXI.BLEND_MODES.MULTIPLY,
    [CompositeOpeations.Screen]: PIXI.BLEND_MODES.SCREEN,
};
/**
 * @ignore
 */
const T = 1000 / 60;
/**
 * inherited {@link https://createjs.com/docs/easeljs/classes/MovieClip.html | createjs.MovieClip}
 */
let CreatejsMovieClip$1 = class CreatejsMovieClip extends mixinCreatejsDisplayObject(createjs.MovieClip) {
    /**
     * When the last frame of the timeline is reached.
     *
     * @event
     */
    endAnimation(e) { }
    /**
     * When either labels is reached.
     *
     * @event
     */
    reachLabel(e) { }
    constructor(...args) {
        super();
        this._pixiData = createPixiMovieClipData(this);
        this._createjsParams = createCreatejsMovieClipParams();
        this._createjsEventManager = new CreatejsEventManager(this);
        P$6.apply(this, args);
        this.framerate = this._framerateBase;
    }
    initialize(...args) {
        this._pixiData = createPixiMovieClipData(this);
        this._createjsParams = createCreatejsMovieClipParams();
        this._createjsEventManager = new CreatejsEventManager(this);
        super.initialize(...args);
        this.framerate = this._framerateBase;
    }
    updateForPixi(e) {
        const currentFrame = this.currentFrame;
        // challenge
        if (!this.paused) {
            this.advance(T * e.delta);
            if (this._listenFrameEvents && currentFrame !== this.currentFrame) {
                if (this._listenFrameEvents.endAnimation && this.currentFrame === (this.totalFrames - 1)) {
                    this.dispatchEvent(new AnimateEvent('endAnimation'));
                }
                if (this._listenFrameEvents.reachLabel) {
                    for (let i = 0; i < this.labels.length; i++) {
                        const label = this.labels[i];
                        if (this.currentFrame === label.position) {
                            this.dispatchEvent(new AnimateReachLabelEvent('reachLabel', label));
                            break;
                        }
                    }
                }
            }
            this._updateState();
        }
        return updateDisplayObjectChildren(this, e);
    }
    updateBlendModeForPixi(mode) {
        if (this._createjsParams.compositeOperation && blendModes[this._createjsParams.compositeOperation] === mode)
            return;
        this._pixiData.reservedBlendMode = mode;
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].updateBlendModeForPixi(mode);
        }
    }
    get compositeOperation() {
        return this._createjsParams.compositeOperation;
    }
    set compositeOperation(value) {
        if (this._createjsParams.compositeOperation === value)
            return;
        const blendMode = (value && blendModes[value]) || this._pixiData.reservedBlendMode;
        this.updateBlendModeForPixi(blendMode);
        this._createjsParams.compositeOperation = value;
    }
    get filters() {
        return this._createjsParams.filters;
    }
    //*
    set filters(value) {
        const list = [];
        if (value && value.length > 0) {
            for (var i = 0; i < value.length; i++) {
                let f = value[i];
                if (!(f instanceof createjs.ColorFilter)) {
                    continue;
                }
                list.push(f.pixi);
            }
        }
        this._pixiData.instance.filters = list;
        this._createjsParams.filters = value;
    }
    //*/
    /*
    set filters(value: TCreatejsColorFilters) {
        if (value) {
            const list = [];
            
            for (var i = 0; i < value.length; i++) {
                const f = value[i];
                
                if (f instanceof createjs.ColorMatrixFilter) {
                    continue;
                }
                
                const m = new filters.ColorMatrixFilter();
                m.matrix = [
                    f.redMultiplier, 0, 0, 0, f.redOffset / 255,
                    0, f.greenMultiplier, 0, 0, f.greenOffset / 255,
                    0, 0, f.blueMultiplier, 0, f.blueOffset / 255,
                    0, 0, 0, f.alphaMultiplier, f.alphaOffset / 255,
                    0, 0, 0, 0, 1
                ];
                list.push(m);
            }

            for (var i = 0; i < value.length; i++) {
                let f = value[i];
                
                if (!(f instanceof createjs.ColorFilter)) {
                    continue;
                }
                
                list.push(f.pixi);
            }

            var o = this._pixiData.instance;
            var c = o.children;
            var n = new Container();
            var nc = this._pixiData.subInstance = n.addChild(new Container());
            
            while (c.length) {
                nc.addChild(c[0]);
            }
            
            o.addChild(n);
            o.filterContainer = nc;
            
            nc.updateTransform();
            nc.calculateBounds();
            
            const b = nc.getLocalBounds();
            const x = b.x;
            const y = b.y;
            
            for (var i = 0; i < nc.children.length; i++) {
                const child = nc.children[i];
                
                child.x -= x;
                child.y -= y;
                
                if (child instanceof PixiMovieClip) {
                    const fc = child.filterContainer;
                    if (fc) {
                        //fc.cacheAsBitmap = false;
                    }
                }
            }
            n.x = x;
            n.y = y;
            
            nc.filters = list;
            //nc.cacheAsBitmap = true;
        } else {
            const o = this._pixiData.instance;
            
            if (o.filterContainer) {
                const nc = this._pixiData.subInstance;
                const n = nc.parent;
                const c = nc.children;
                
                o.removeChildren();
                o.filterContainer = null;
                while (c.length) {
                    const v = o.addChild(c[0]);
                    v.x += n.x;
                    v.y += n.y;
                }
                
                nc.filters = [];
                //nc.cacheAsBitmap = false;
                
                this._pixiData.subInstance = o;
            }
        }
        
        this._createjsParams.filters = value;
    }
    //*/
    _updateChildrenBlendModeForPixi(child) {
        const blendMode = (this._createjsParams.compositeOperation && blendModes[this._createjsParams.compositeOperation]) || this._pixiData.reservedBlendMode;
        if (!blendMode)
            return;
        child.updateBlendModeForPixi(blendMode);
    }
    addChild(child) {
        this._pixiData.subInstance.addChild(child.pixi);
        this._updateChildrenBlendModeForPixi(child);
        return super.addChild(child);
    }
    addChildAt(child, index) {
        this._pixiData.subInstance.addChildAt(child.pixi, index);
        this._updateChildrenBlendModeForPixi(child);
        return super.addChildAt(child, index);
    }
    removeChild(child) {
        this._pixiData.subInstance.removeChild(child.pixi);
        return super.removeChild(child);
    }
    removeChildAt(index) {
        this._pixiData.subInstance.removeChildAt(index);
        return super.removeChildAt(index);
    }
    removeAllChldren() {
        this._pixiData.subInstance.removeChildren();
        return super.removeAllChldren();
    }
};
delete (CreatejsMovieClip$1.prototype.endAnimation);
delete (CreatejsMovieClip$1.prototype.reachLabel);
// temporary prototype
Object.defineProperties(CreatejsMovieClip$1.prototype, {
    _createjsParams: {
        value: createCreatejsMovieClipParams(),
        writable: true
    },
    _pixiData: {
        value: createPixiMovieClipData(createObject(CreatejsMovieClip$1.prototype)),
        writable: true
    }
});

/**
 * inherited {@link http://pixijs.download/v5.3.2/docs/PIXI.Sprite.html | PIXI.Sprite}
 */
class PixiSprite extends Sprite {
    constructor(cjs) {
        super();
        this._createjs = cjs;
    }
    get createjs() {
        return this._createjs;
    }
}
/**
 * @ignore
 */
function createCreatejsSpriteParams() {
    return createCreatejsParams();
}
/**
 * @ignore
 */
function createPixiSpriteData(cjs) {
    const pixi = new PixiSprite(cjs);
    return createPixiData(pixi, pixi.anchor);
}
/**
 * @ignore
 */
const P$5 = createjs.Sprite;
/**
 * inherited {@link https://createjs.com/docs/easeljs/classes/Sprite.html | createjs.Sprite}
 */
let CreatejsSprite$1 = class CreatejsSprite extends mixinCreatejsDisplayObject(createjs.Sprite) {
    constructor(...args) {
        super(...args);
        this._pixiData = createPixiSpriteData(this);
        this._createjsParams = createCreatejsSpriteParams();
        this._createjsEventManager = new CreatejsEventManager(this);
        P$5.apply(this, args);
    }
    initialize(...args) {
        this._pixiData = createPixiSpriteData(this);
        this._createjsParams = createCreatejsSpriteParams();
        this._createjsEventManager = new CreatejsEventManager(this);
        return super.initialize(...args);
    }
    updateForPixi(e) {
        return true;
    }
    updateBlendModeForPixi(mode) {
        this._pixiData.instance.blendMode = mode;
    }
    gotoAndStop(...args) {
        super.gotoAndStop(...args);
        const frame = this.spriteSheet.getFrame(this.currentFrame);
        const baseTexture = BaseTexture.from(frame.image);
        const texture = new Texture(baseTexture, frame.rect);
        this._pixiData.instance.texture = texture;
    }
};
// temporary prototype
Object.defineProperties(CreatejsSprite$1.prototype, {
    _createjsParams: {
        value: createCreatejsSpriteParams(),
        writable: true
    },
    _pixiData: {
        value: createPixiSpriteData(createObject(CreatejsSprite$1.prototype)),
        writable: true
    }
});

/**
 * inherited {@link http://pixijs.download/v5.3.2/docs/PIXI.Container.html | PIXI.Container}
 */
class PixiShape extends Container$2 {
    constructor(cjs) {
        super();
        this._createjs = cjs;
    }
    get createjs() {
        return this._createjs;
    }
}
/**
 * @ignore
 */
function createCreatejsShapeParams(graphics) {
    return Object.assign(createCreatejsParams(), {
        graphics
    });
}
/**
 * @ignore
 */
function createPixiShapeData(cjs) {
    const pixi = new PixiShape(cjs);
    return Object.assign(createPixiData(pixi, pixi.pivot), {
        masked: []
    });
}
/**
 * @ignore
 */
const P$4 = createjs.Shape;
/**
 * inherited {@link https://createjs.com/docs/easeljs/classes/Shape.html | createjs.Shape}
 */
class CreatejsShape extends mixinCreatejsDisplayObject(createjs.Shape) {
    constructor(...args) {
        super(...args);
        this._pixiData = createPixiShapeData(this);
        this._createjsParams = createCreatejsShapeParams(null);
        this._createjsEventManager = new CreatejsEventManager(this);
        P$4.apply(this, args);
    }
    initialize(...args) {
        this._pixiData = createPixiShapeData(this);
        this._createjsParams = createCreatejsShapeParams(null);
        this._createjsEventManager = new CreatejsEventManager(this);
        return super.initialize(...args);
    }
    updateForPixi(e) {
        return true;
    }
    updateBlendModeForPixi(mode) {
        var _a;
        this._pixiData.reservedBlendMode = mode;
        (_a = this._createjsParams.graphics) === null || _a === void 0 ? void 0 : _a.updateBlendModeForPixi(mode);
    }
    get graphics() {
        return this._createjsParams.graphics;
    }
    set graphics(value) {
        if (this._pixiData !== defaultPixiData) {
            if (this._pixiData.masked.length) {
                this._pixiData.instance.removeChildren();
                if (value) {
                    for (let i = 0; i < this._pixiData.masked.length; i++) {
                        this._pixiData.masked[i].mask = this._pixiData.instance;
                    }
                }
                else {
                    for (let i = 0; i < this._pixiData.masked.length; i++) {
                        this._pixiData.masked[i].mask = null;
                    }
                }
            }
            if (value) {
                this._pixiData.instance.addChild(value.pixi);
            }
        }
        if (this._createjsParams !== defaultCreatejsParams) {
            this._createjsParams.graphics = value;
        }
    }
    get masked() {
        return this._pixiData.masked;
    }
}
/**
 * @ignore
 */
const defaultCreatejsParams = createCreatejsShapeParams(null);
/**
 * @ignore
 */
const defaultPixiData = createPixiShapeData(createObject(CreatejsShape.prototype));
// temporary prototype
Object.defineProperties(CreatejsShape.prototype, {
    _createjsParams: {
        value: defaultCreatejsParams,
        writable: true
    },
    _pixiData: {
        value: defaultPixiData,
        writable: true
    }
});

/**
 * inherited {@link http://pixijs.download/v5.3.2/docs/PIXI.Sprite.html | PIXI.Sprite}
 */
class PixiBitmap extends Sprite {
    constructor(cjs) {
        super();
        this._createjs = cjs;
    }
    get createjs() {
        return this._createjs;
    }
}
/**
 * @ignore
 */
function createCreatejsBitmapParams() {
    return createCreatejsParams();
}
/**
 * @ignore
 */
function createPixiBitmapData(cjs) {
    const pixi = new PixiBitmap(cjs);
    return createPixiData(pixi, pixi.anchor);
}
/**
 * @ignore
 */
const P$3 = createjs.Bitmap;
/**
 * inherited {@link https://createjs.com/docs/easeljs/classes/Bitmap.html | createjs.Bitmap}
 */
let CreatejsBitmap$1 = class CreatejsBitmap extends mixinCreatejsDisplayObject(createjs.Bitmap) {
    constructor(...args) {
        super(...args);
        this._pixiData = createPixiBitmapData(this);
        this._createjsParams = createCreatejsBitmapParams();
        this._createjsEventManager = new CreatejsEventManager(this);
        P$3.apply(this, args);
    }
    initialize(...args) {
        this._pixiData = createPixiBitmapData(this);
        this._createjsParams = createCreatejsBitmapParams();
        this._createjsEventManager = new CreatejsEventManager(this);
        const res = super.initialize(...args);
        const texture = Texture.from(this.image);
        this._pixiData.instance.texture = texture;
        return res;
    }
    updateForPixi(e) {
        return true;
    }
    updateBlendModeForPixi(mode) {
        this._pixiData.instance.blendMode = mode;
    }
};
// temporary prototype
Object.defineProperties(CreatejsBitmap$1.prototype, {
    _createjsParams: {
        value: createCreatejsBitmapParams(),
        writable: true
    },
    _pixiData: {
        value: createPixiBitmapData(createObject(CreatejsBitmap$1.prototype)),
        writable: true
    }
});

/**
 * inherited {@link http://pixijs.download/v5.3.2/docs/PIXI.Graphics.html | PIXI.Graphics}
 */
class PixiGraphics extends Graphics {
    constructor(cjs) {
        super();
        this._createjs = cjs;
    }
    get createjs() {
        return this._createjs;
    }
}
/**
 * @ignore
 */
function createCreatejsGraphicsParams() {
    return createCreatejsParams();
}
/**
 * @ignore
 */
function createPixiGraphicsData(cjs) {
    const pixi = new PixiGraphics(cjs);
    return Object.assign(createPixiData(pixi, pixi.pivot), {
        strokeFill: 0,
        strokeAlpha: 1
    });
}
/**
 * @ignore
 */
const COLOR_RED = 16 * 16 * 16 * 16;
/**
 * @ignore
 */
const COLOR_GREEN = 16 * 16;
/**
 * @ignore
 */
const LineCap = {
    0: LINE_CAP.BUTT,
    1: LINE_CAP.ROUND,
    2: LINE_CAP.SQUARE
};
/**
 * @ignore
 */
const LineJoin = {
    0: LINE_JOIN.MITER,
    1: LINE_JOIN.ROUND,
    2: LINE_JOIN.BEVEL
};
/**
 * @ignore
 */
const P$2 = createjs.Graphics;
/**
 * inherited {@link https://createjs.com/docs/easeljs/classes/Graphics.html | createjs.Graphics}
 */
class CreatejsGraphics extends mixinCreatejsDisplayObject(createjs.Graphics) {
    constructor(...args) {
        super(...args);
        this._pixiData = createPixiGraphicsData(this);
        this._createjsParams = createCreatejsGraphicsParams();
        this._createjsEventManager = new CreatejsEventManager(this);
        P$2.apply(this, args);
        this._pixiData.instance.beginFill(0xFFEEEE, 1);
        this._pixiData.strokeFill = 0;
        this._pixiData.strokeAlpha = 1;
    }
    initialize(...args) {
        this._pixiData = createPixiGraphicsData(this);
        this._createjsParams = createCreatejsGraphicsParams();
        this._createjsEventManager = new CreatejsEventManager(this);
        return super.initialize(...args);
    }
    updateForPixi(e) {
        return true;
    }
    updateBlendModeForPixi(mode) {
        if (!mode)
            return;
        this._pixiData.instance.blendMode = mode;
    }
    // path methods
    moveTo(x, y) {
        if (this._pixiData.instance.clone().endFill().containsPoint({ x: x, y: y })) {
            this._pixiData.instance.beginHole();
        }
        else {
            this._pixiData.instance.endHole();
        }
        this._pixiData.instance.moveTo(x, y);
        return super.moveTo(x, y);
    }
    mt(x, y) {
        return this.moveTo(x, y);
    }
    lineTo(x, y) {
        this._pixiData.instance.lineTo(x, y);
        return super.lineTo(x, y);
    }
    lt(x, y) {
        return this.lineTo(x, y);
    }
    arcTo(x1, y1, x2, y2, radius) {
        this._pixiData.instance.arcTo(x1, y1, x2, y2, radius);
        return super.arcTo(x1, y1, x2, y2, radius);
    }
    at(x1, y1, x2, y2, radius) {
        return this.arcTo(x1, y1, x2, y2, radius);
    }
    arc(x, y, radius, startAngle, endAngle, anticlockwise) {
        this._pixiData.instance.arc(x, y, radius, startAngle, endAngle, anticlockwise);
        return super.arc(x, y, radius, startAngle, endAngle, anticlockwise);
    }
    a(x, y, radius, startAngle, endAngle, anticlockwise) {
        return this.arc(x, y, radius, startAngle, endAngle, anticlockwise);
    }
    quadraticCurveTo(cpx, cpy, x, y) {
        this._pixiData.instance.quadraticCurveTo(cpx, cpy, x, y);
        return super.quadraticCurveTo(cpx, cpy, x, y);
    }
    qt(cpx, cpy, x, y) {
        return this.quadraticCurveTo(cpx, cpy, x, y);
    }
    curveTo(cpx, cpy, x, y) {
        return this.quadraticCurveTo(cpx, cpy, x, y);
    }
    bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
        this._pixiData.instance.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
        return super.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
    }
    bt(cp1x, cp1y, cp2x, cp2y, x, y) {
        return this.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
    }
    rect(x, y, w, h) {
        this._pixiData.instance.drawRect(x, y, w, h);
        return super.rect(x, y, w, h);
    }
    r(x, y, w, h) {
        return this.rect(x, y, w, h);
    }
    drawRect(x, y, w, h) {
        return this.rect(x, y, w, h);
    }
    dr(x, y, w, h) {
        return this.rect(x, y, w, h);
    }
    closePath() {
        this._pixiData.instance.closePath();
        return super.closePath();
    }
    cp() {
        return this.closePath();
    }
    clear() {
        this._pixiData.instance.clear();
        return super.clear();
    }
    c() {
        return this.clear();
    }
    _parseColor(color) {
        const res = {
            color: 0,
            alpha: 1
        };
        if (!color) {
            res.alpha = 0;
            return res;
        }
        if (color.charAt(0) === '#') {
            res.color = parseInt(color.slice(1), 16);
            return res;
        }
        const colors = color.replace(/rgba|\(|\)|\s/g, '').split(',');
        res.color = Number(colors[0]) * COLOR_RED + Number(colors[1]) * COLOR_GREEN + Number(colors[2]);
        res.alpha = Number(colors[3]);
        return res;
    }
    beginFill(color) {
        const c = this._parseColor(color);
        this._pixiData.instance.beginFill(c.color, c.alpha);
        return super.beginFill(color);
    }
    f(color) {
        return this.beginFill(color);
    }
    endFill() {
        this._pixiData.instance.endFill();
        return super.endFill();
    }
    ef() {
        return this.endFill();
    }
    setStrokeStyle(thickness, caps, joints, miterLimit, ignoreScale) {
        this._pixiData.instance.lineTextureStyle({
            width: thickness,
            color: this._pixiData.strokeFill,
            alpha: this._pixiData.strokeAlpha,
            cap: (caps in LineCap) ? LineCap[caps] : LineCap[0],
            join: (joints in LineJoin) ? LineJoin[joints] : LineJoin[0],
            miterLimit
        });
        return super.setStrokeStyle(thickness, caps, joints, miterLimit, ignoreScale);
    }
    ss(thickness, caps, joints, miterLimit, ignoreScale) {
        return this.setStrokeStyle(thickness, caps, joints, miterLimit, ignoreScale);
    }
    beginStroke(color) {
        const c = this._parseColor(color);
        this._pixiData.strokeFill = c.color;
        this._pixiData.strokeAlpha = c.alpha;
        return super.beginStroke(color);
    }
    s(color) {
        return this.beginStroke(color);
    }
    drawRoundRect(x, y, w, h, radius) {
        this._pixiData.instance.drawRoundedRect(x, y, w, h, radius);
        return super.drawRoundRect(x, y, w, h, radius);
    }
    rr(x, y, w, h, radius) {
        return this.drawRoundRect(x, y, w, h, radius);
    }
    drawCircle(x, y, radius) {
        this._pixiData.instance.drawCircle(x, y, radius);
        return super.drawCircle(x, y, radius);
    }
    dc(x, y, radius) {
        return this.drawCircle(x, y, radius);
    }
    drawEllipse(x, y, w, h) {
        this._pixiData.instance.drawEllipse(x, y, w, h);
        return super.drawEllipse(x, y, w, h);
    }
    de(x, y, w, h) {
        return this.drawEllipse(x, y, w, h);
    }
    drawPolyStar(x, y, radius, sides, pointSize, angle) {
        this._pixiData.instance.drawRegularPolygon(x, y, radius, sides, angle * DEG_TO_RAD);
        return super.drawPolyStar(x, y, radius, sides, pointSize, angle);
    }
    dp(x, y, radius, sides, pointSize, angle) {
        return this.drawPolyStar(x, y, radius, sides, pointSize, angle);
    }
}
// temporary prototype
Object.defineProperties(CreatejsGraphics.prototype, {
    _createjsParams: {
        value: createCreatejsGraphicsParams(),
        writable: true
    },
    _pixiData: {
        value: createPixiGraphicsData(createObject(CreatejsGraphics.prototype)),
        writable: true
    }
});

/**
 * inherited {@link http://pixijs.download/v5.3.2/docs/PIXI.Text.html | PIXI.Text}
 */
class PixiText extends Text {
}
/**
 * inherited {@link http://pixijs.download/v5.3.2/docs/PIXI.Container.html | PIXI.Container}
 */
class PixiTextContainer extends Container$2 {
    constructor(cjs, text) {
        super();
        this._createjs = cjs;
        this._text = text;
    }
    get createjs() {
        return this._createjs;
    }
    get text() {
        return this._text;
    }
}
/**
 * @ignore
 */
const DEF_ALIGN = 'left';
/**
 * @ignore
 */
function createCreatejsTextParams(text, font, color) {
    return Object.assign(createCreatejsParams(), {
        text: text,
        font: font,
        color: color,
        textAlign: DEF_ALIGN,
        lineHeight: 0,
        lineWidth: 0
    });
}
/**
 * @ignore
 */
function createPixiTextData(cjs, text) {
    const pixi = new PixiTextContainer(cjs, text);
    return createPixiData(pixi, pixi.pivot);
}
/**
 * @ignore
 */
const P$1 = createjs.Text;
/**
 * inherited {@link https://createjs.com/docs/easeljs/classes/Text.html | createjs.Text}
 */
class CreatejsText extends mixinCreatejsDisplayObject(createjs.Text) {
    constructor(text, font, color = '#000000', ...args) {
        super(text, font, color, ...args);
        this._createjsParams = createCreatejsTextParams(text, font, color);
        const _font = this._parseFont(font);
        const t = new PixiText(text, {
            fontWeight: _font.fontWeight,
            fontSize: _font.fontSize,
            fontFamily: _font.fontFamily,
            fill: this._parseColor(color),
            wordWrap: true
        });
        this._pixiData = createPixiTextData(this, t);
        this._pixiData.instance.addChild(t);
        this._createjsEventManager = new CreatejsEventManager(this);
        P$1.call(this, text, font, color, ...args);
    }
    updateForPixi(e) {
        return true;
    }
    updateBlendModeForPixi(mode) {
        this._pixiData.instance.text.blendMode = mode;
    }
    get text() {
        return this._createjsParams.text;
    }
    set text(text) {
        this._pixiData.instance.text.text = text;
        this._align(this.textAlign);
        this._createjsParams.text = text;
    }
    _parseFont(font) {
        const p = font.split(' ');
        let w = 'normal';
        let s = p.shift() || '';
        if (s.indexOf('px') === -1) {
            w = s;
            s = p.shift() || '';
        }
        return {
            fontWeight: w,
            fontSize: Number((s || '0px').replace('px', '')),
            fontFamily: p.join(' ').replace(/'/g, '') //'
        };
    }
    get font() {
        return this._createjsParams.font;
    }
    set font(font) {
        const _font = this._parseFont(font);
        this._pixiData.instance.text.style.fontSize = _font.fontSize;
        this._pixiData.instance.text.style.fontFamily = _font.fontFamily;
        this._createjsParams.font = font;
    }
    _parseColor(color) {
        return parseInt(color.slice(1), 16);
    }
    get color() {
        return this._createjsParams.color;
    }
    set color(color) {
        this._pixiData.instance.text.style.fill = this._parseColor(color);
        this._createjsParams.color = color;
    }
    _align(align) {
        if (align === 'left') {
            this._pixiData.instance.text.x = 0;
            return;
        }
        if (align === 'center') {
            this._pixiData.instance.text.x = -this._pixiData.instance.text.width / 2;
            return;
        }
        if (align === 'right') {
            this._pixiData.instance.text.x = -this._pixiData.instance.text.width;
            return;
        }
    }
    get textAlign() {
        return this._createjsParams.textAlign;
    }
    set textAlign(align) {
        this._pixiData.instance.text.style.align = align;
        this._align(align);
        this._createjsParams.textAlign = align;
    }
    get lineHeight() {
        return this._createjsParams.lineHeight;
    }
    set lineHeight(height) {
        this._pixiData.instance.text.style.lineHeight = height;
        this._createjsParams.lineHeight = height;
    }
    get lineWidth() {
        return this._createjsParams.lineWidth;
    }
    set lineWidth(width) {
        this._pixiData.instance.text.style.wordWrapWidth = width;
        this._align(this.textAlign);
        this._createjsParams.lineWidth = width;
    }
}
// temporary prototype
Object.defineProperties(CreatejsText.prototype, {
    _createjsParams: {
        value: createCreatejsTextParams('', '', ''),
        writable: true
    },
    _pixiData: {
        value: createPixiTextData(createObject(CreatejsText.prototype), new PixiText('')),
        writable: true
    }
});

/**
 * inherited {@link http://pixijs.download/v5.3.2/docs/PIXI.ColorMatrixFilter.html | PIXI.Sprite}
 */
class PixiColorMatrixFilter extends filters.ColorMatrixFilter {
    constructor(cjs) {
        super();
        this._createjs = cjs;
    }
    get createjs() {
        return this._createjs;
    }
}
/**
 * @ignore
 */
function createPixiColorMatrixFilterData(cjs) {
    const pixi = new PixiColorMatrixFilter(cjs);
    return { instance: pixi };
}
/**
 * @ignore
 */
function createCreatejsColorFilterParams() {
    return Object.assign(createCreatejsParams(), {
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
/**
 * @ignore
 */
const P = createjs.ColorFilter;
/**
 * inherited {@link https://createjs.com/docs/easeljs/classes/ColorFilter.html | createjs.ColorFilter}
 */
class CreatejsColorFilter extends createjs.ColorFilter {
    constructor(...args) {
        super(args);
        const pixiData = this._pixiData = createPixiColorMatrixFilterData(this);
        const createjsParams = this._createjsParams = createCreatejsColorFilterParams();
        // ColorFilterのtweenは、列挙可能かつ hasOwnPropery なプロパティにアクセスしてしまうので、enumerableを切っておく
        Object.defineProperties(this, {
            _pixiData: {
                enumerable: false,
                value: pixiData
            },
            _createjsParams: {
                enumerable: false,
                value: createjsParams
            },
            redMultiplier: {
                get() {
                    return this._createjsParams.redMultiplier;
                },
                set(value) {
                    this._pixiData.instance.matrix[0] = value, this._createjsParams.redMultiplier = value;
                }
            },
            greenMultiplier: {
                get() {
                    return this._createjsParams.greenMultiplier;
                },
                set(value) {
                    this._pixiData.instance.matrix[6] = value, this._createjsParams.greenMultiplier = value;
                }
            },
            blueMultiplier: {
                get() {
                    return this._createjsParams.blueMultiplier;
                },
                set(value) {
                    this._pixiData.instance.matrix[12] = value, this._createjsParams.blueMultiplier = value;
                }
            },
            alphaMultiplier: {
                get() {
                    return this._createjsParams.alphaMultiplier;
                },
                set(value) {
                    this._pixiData.instance.matrix[18] = value, this._createjsParams.alphaMultiplier = value;
                },
            },
            redOffset: {
                get() {
                    return this._createjsParams.redOffset;
                },
                set(value) {
                    this._pixiData.instance.matrix[4] = value / 255, this._createjsParams.redOffset = value;
                }
            },
            greenOffset: {
                get() {
                    return this._createjsParams.greenOffset;
                },
                set(value) {
                    this._pixiData.instance.matrix[9] = value / 255, this._createjsParams.greenOffset = value;
                }
            },
            blueOffset: {
                get() {
                    return this._createjsParams.blueOffset;
                },
                set(value) {
                    this._pixiData.instance.matrix[14] = value / 255, this._createjsParams.blueOffset = value;
                }
            },
            alphaOffset: {
                get() {
                    return this._createjsParams.alphaOffset;
                },
                set(value) {
                    this._pixiData.instance.matrix[19] = value / 255, this._createjsParams.alphaOffset = value;
                }
            }
        });
        P.apply(this, args);
    }
    get pixi() {
        return this._pixiData.instance;
    }
}
// temporary prototype
Object.defineProperties(CreatejsColorFilter.prototype, {
    _createjsParams: {
        value: createCreatejsColorFilterParams(),
        writable: true
    },
    _pixiData: {
        value: createPixiColorMatrixFilterData(createObject(CreatejsColorFilter.prototype)),
        writable: true
    }
});

function playSound(id, loop, offset) {
    return createjs.Sound.play(id, {
        interrupt: createjs.Sound.INTERRUPT_EARLY,
        loop,
        offset
    });
}
/*
export function dataURLToBlobURL(dataURL: string) {
    const bin = atob(dataURL.replace(/^.*,/, ''));
    const buffer = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) {
        buffer[i] = bin.charCodeAt(i);
    }

    const p = dataURL.slice(5);
    try{
        const blob = new Blob([buffer.buffer], {
            type: p.slice(0, p.indexOf(";"))
        });
        return (URL || webkitURL).createObjectURL(blob);
    } catch (e){
        throw e;
    };
}
*/
/**
 * Load the assets of createjs content published by Adobe Animate.
 * If you use multiple contents, each composition ID must be unique.
 * Please run "Pixim.animate.init" before running.
 */
function loadAssetAsync(targets) {
    var _a, _b;
    if (!Array.isArray(targets)) {
        targets = [targets];
    }
    const promises = [];
    for (let i = 0; i < targets.length; i++) {
        const target = targets[i];
        if ((_a = target.options) === null || _a === void 0 ? void 0 : _a.useSound) {
            window.playSound = playSound;
        }
        const comp = AdobeAn.getComposition(target.id);
        if (!comp) {
            throw new Error(`no composition: ${target.id}`);
        }
        const lib = comp.getLibrary();
        const manifests = lib.properties.manifest.map((v) => {
            return JSON.parse(JSON.stringify(v));
        });
        const crossOrigin = typeof ((_b = target.options) === null || _b === void 0 ? void 0 : _b.crossOrigin) === 'boolean' ? target.options.crossOrigin : true;
        for (let i = 0; i < manifests.length; i++) {
            const manifest = manifests[i];
            if (manifest.src.indexOf('data:image') === 0) {
                manifest.type = createjs.Types.IMAGE;
            }
            else if (manifest.src.indexOf('data:audio') === 0) {
                /* note
                    It seems that data URL format sounds are not supported by the createjs loader.
                    Converting to blob URL also didn't work.
                */
                throw new Error("data URL formatted sound is not supported.");
                /*
                manifest.type = createjs.Types.SOUND;
                manifest.src = dataURLToBlobURL(manifest.src);
                */
            }
            else if (manifest.src.indexOf('blob:') === 0) ;
            else if (manifest.src.indexOf('file:') === 0) ;
            else {
                manifest.src = PIXI$1.utils.url.resolve(target.basepath, manifest.src);
            }
        }
        if (crossOrigin) {
            for (let i = 0; i < manifests.length; i++) {
                manifests[i].crossOrigin = true;
            }
        }
        const loadPromise = new Promise((resolve, reject) => {
            var _a;
            if (manifests.length === 0) {
                resolve({});
            }
            const loader = new createjs.LoadQueue(false);
            if ((_a = target.options) === null || _a === void 0 ? void 0 : _a.useSound) {
                loader.installPlugin(createjs.Sound);
            }
            const errors = [];
            loader.addEventListener('fileload', (evt) => {
                handleFileLoad(evt, comp);
            });
            loader.addEventListener('complete', (evt) => {
                if (errors.length) {
                    reject(errors);
                    return;
                }
                resolve(evt);
            });
            loader.addEventListener('error', (evt) => {
                errors.push(evt.data);
            });
            loader.loadManifest(manifests || []);
        })
            .then((evt) => {
            const ss = comp.getSpriteSheet();
            const queue = evt.target;
            const ssMetadata = lib.ssMetadata;
            for (let i = 0; i < ssMetadata.length; i++) {
                ss[ssMetadata[i].name] = new createjs.SpriteSheet({
                    images: [
                        queue.getResult(ssMetadata[i].name)
                    ],
                    frames: ssMetadata[i].frames
                });
            }
            return lib;
        });
        promises.push(loadPromise
            .then((lib) => {
            var _a;
            for (let i in lib) {
                if (lib[i].prototype instanceof CreatejsMovieClip$1) {
                    lib[i].prototype._framerateBase = lib.properties.fps;
                    lib[i].prototype._listenFrameEvents = (_a = target.options) === null || _a === void 0 ? void 0 : _a.listenFrameEvents;
                }
            }
            return lib;
        }));
    }
    return Promise.all(promises)
        .then((resolvers) => {
        if (resolvers.length === 1) {
            return resolvers[0];
        }
        return resolvers;
    });
}
/**
 * @ignore
 */
function handleFileLoad(evt, comp) {
    const images = comp.getImages();
    if (evt && (evt.item.type == 'image')) {
        images[evt.item.id] = evt.result;
    }
}

class CreatejsController {
    constructor(container) {
        this._createjsData = {
            id: 0,
            targets: {},
            container
        };
    }
    handleTick(delta) {
        // delta timeが1以上になるとフレーム飛びするので
        const e = { delta: Math.min(delta, 1) };
        const targets = this._createjsData.targets;
        for (let i in targets) {
            targets[i].updateForPixi(e);
        }
    }
    _addCreatejs(cjs) {
        if (cjs instanceof CreatejsMovieClip$1) {
            const p = cjs.pixi.parent;
            cjs.pixi.once('added', () => {
                if (cjs.pixi.parent !== p) {
                    cjs.gotoAndPlay(0);
                }
                const id = this._createjsData.id++;
                this._createjsData.targets[id] = cjs;
                cjs.pixi.once('removed', () => {
                    delete (this._createjsData.targets[id]);
                });
            });
        }
    }
    addCreatejs(cjs) {
        this._addCreatejs(cjs);
        this._createjsData.container.addChild(cjs.pixi);
        return cjs;
    }
    addCreatejsAt(cjs, index) {
        this._addCreatejs(cjs);
        this._createjsData.container.addChildAt(cjs.pixi, index);
        return cjs;
    }
    removeCreatejs(cjs) {
        this._createjsData.container.removeChild(cjs.pixi);
        return cjs;
    }
}
/**
 * inherited {@link https://tawaship.github.io/Pixim.js/classes/container.html | Pixim.Container}
 */
let Container$1 = class Container extends Container$2 {
    constructor() {
        super();
        this._createjsData = {
            controller: new CreatejsController(this)
        };
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
};

// overrides
createjs.Stage = CreatejsStage;
createjs.StageGL = CreatejsStageGL;
createjs.MovieClip = CreatejsMovieClip$1;
createjs.Sprite = CreatejsSprite$1;
createjs.Shape = CreatejsShape;
createjs.Bitmap = CreatejsBitmap$1;
createjs.Graphics = CreatejsGraphics;
createjs.Text = CreatejsText;
createjs.ButtonHelper = CreatejsButtonHelper;
createjs.ColorFilter = CreatejsColorFilter;
// install plugins
createjs.MotionGuidePlugin.install();

var pixiAnimateContainer_esm = /*#__PURE__*/Object.freeze({
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
    get createjsInteractionEvents () { return createjsInteractionEvents; },
    loadAssetAsync: loadAssetAsync,
    mixinCreatejsDisplayObject: mixinCreatejsDisplayObject,
    updateDisplayObjectChildren: updateDisplayObjectChildren
});

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
                throw res.statusText;
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
                _target.basepath = utils$1.resolvePath(options.basepath || "", target.basepath);
                return this._prepareAssetsAsync(_target.basepath || "", manifests, options)
                    .then(() => {
                    const version = options.assetVersion || options.version || '';
                    for (let i = 0; i < manifests.length; i++) {
                        const manifest = manifests[i];
                        manifest.src = utils$1.resolveUri("", manifest.src, version);
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
        const filepath = utils$1.resolveUri(target.basepath, target.filepath);
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
            if (!utils$1.isUrl(manifest.src)) {
                continue;
            }
            targets[i] = utils$1.resolveUri(basepath, manifest.src);
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
class Container extends Container$3 {
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

export { AnimateBlobLoader, AnimateBlobLoaderResource, AnimateLoader, AnimateLoaderResource, AnimateManifest, Container, CreatejsBitmap, CreatejsMovieClip, CreatejsSprite, addAnimatesTo, pixiAnimateContainer_esm as core, defineAnimatesTo };
//# sourceMappingURL=Pixim-animate-container.esm.js.map
