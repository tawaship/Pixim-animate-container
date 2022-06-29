/*!
 * Pixim-animate-container - v1.3.3
 * 
 * @require pixi.js v^5.3.2
 * @require @tawaship/pixim.js v../Pixim.js
 * @author tawaship (makazu.mori@gmail.com)
 * @license MIT
 */

import { LoaderBase, LoaderResource, utils as utils$1, JsLoader, ManifestBase, Content, Container as Container$2, Task } from '@tawaship/pixim.js';
import createjs from '@tawaship/createjs-module';
export { default as createjs } from '@tawaship/createjs-module';
import { filters, Container as Container$1, BaseTexture, Texture, LINE_CAP, LINE_JOIN, utils, Text, Sprite, Graphics } from 'pixi.js';

/*!
 * @tawaship/pixi-animate-core - v3.3.0
 * 
 * @require pixi.js v^5.3.2
 * @author tawaship (makazu.mori@gmail.com)
 * @license MIT
 */

/**
 * [[https://createjs.com/docs/easeljs/classes/ButtonHelper.html | createjs.ButtonHelper]]
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
        instance: pixi
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
            if (!(cb instanceof CreatejsButtonHelper)) {
                this._createjsEventManager.add(type, cb);
            }
            return super.addEventListener(type, cb, ...args);
        }
        removeEventListener(type, cb, ...args) {
            if (!(cb instanceof CreatejsButtonHelper)) {
                this._createjsEventManager.remove(type, cb);
            }
            return super.removeEventListener(type, cb, ...args);
        }
        removeAllEventListeners(type, ...args) {
            this._createjsEventManager.removeAll(type);
            return super.removeAllEventListeners(type, ...args);
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
 * [[https://createjs.com/docs/easeljs/classes/Stage.html | createjs.Stage]]
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
}

/**
 * [[https://createjs.com/docs/easeljs/classes/StageGL.html | createjs.StageGL]]
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
}

/**
 * @ignore
 */
const createjsInteractionEvents = {
    mousedown: true,
    pressmove: true,
    pressup: true,
    rollover: true,
    rollout: true,
    click: true
};
class EventManager {
    constructor(cjs) {
        this._isDown = false;
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
        e.currentTarget = e.currentTarget.createjs;
        e.target = e.target.createjs;
        const ev = e.data;
        e.rawX = ev.global.x;
        e.rawY = ev.global.y;
        this._isDown = true;
        this._emitter.emit('mousedown', e);
    }
    _onPointerMove(e) {
        if (!this._isDown) {
            return;
        }
        e.currentTarget = this._cjs;
        e.target = e.target && e.target.createjs;
        const ev = e.data;
        e.rawX = ev.global.x;
        e.rawY = ev.global.y;
        this._emitter.emit('pressmove', e);
    }
    _onPointerUp(e) {
        e.currentTarget = this._cjs;
        e.target = e.target && e.target.createjs;
        const ev = e.data;
        e.rawX = ev.global.x;
        e.rawY = ev.global.y;
        this._isDown = false;
        this._emitter.emit('pressup', e);
    }
    _onPointerUpOutside(e) {
        e.currentTarget = this._cjs;
        e.target = e.target && e.target.createjs;
        const ev = e.data;
        e.rawX = ev.global.x;
        e.rawY = ev.global.y;
        this._isDown = false;
        this._emitter.emit('pressup', e);
    }
    _onPointerTap(e) {
        e.currentTarget = this._cjs;
        e.target = e.target && e.target.createjs;
        const ev = e.data;
        e.rawX = ev.global.x;
        e.rawY = ev.global.y;
        this._emitter.emit('click', e);
    }
    _onPointerOver(e) {
        e.currentTarget = e.currentTarget.createjs;
        e.target = e.currentTarget.createjs;
        const ev = e.data;
        e.rawX = ev.global.x;
        e.rawY = ev.global.y;
        this._emitter.emit('rollover', e);
    }
    _onPointerOut(e) {
        e.currentTarget = e.currentTarget.createjs;
        e.target = e.currentTarget.createjs;
        const ev = e.data;
        e.rawX = ev.global.x;
        e.rawY = ev.global.y;
        this._emitter.emit('rollout', e);
    }
    add(type, cb) {
        if (!(type in createjsInteractionEvents)) {
            return;
        }
        this._emitter.off(type, cb);
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
 * [[http://pixijs.download/release/docs/PIXI.Container.html | PIXI.Container]]
 */
class PixiMovieClip extends Container$1 {
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
        filters: null
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
/**
 * @ignore
 */
const P = createjs.MovieClip;
/**
 * [[https://createjs.com/docs/easeljs/classes/MovieClip.html | createjs.MovieClip]]
 */
class CreatejsMovieClip extends mixinCreatejsDisplayObject(createjs.MovieClip) {
    constructor(...args) {
        super();
        this._pixiData = createPixiMovieClipData(this);
        this._createjsParams = createCreatejsMovieClipParams();
        this._createjsEventManager = new EventManager(this);
        P.apply(this, args);
    }
    initialize(...args) {
        this._pixiData = createPixiMovieClipData(this);
        this._createjsParams = createCreatejsMovieClipParams();
        this._createjsEventManager = new EventManager(this);
        return super.initialize(...args);
    }
    updateForPixi(e) {
        this._updateState();
        return updateDisplayObjectChildren(this, e);
    }
    get filters() {
        return this._createjsParams.filters;
    }
    set filters(value) {
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
            var o = this._pixiData.instance;
            var c = o.children;
            var n = new Container$1();
            var nc = this._pixiData.subInstance = n.addChild(new Container$1());
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
                        fc.cacheAsBitmap = false;
                    }
                }
            }
            n.x = x;
            n.y = y;
            nc.filters = list;
            nc.cacheAsBitmap = true;
        }
        else {
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
                nc.cacheAsBitmap = false;
                this._pixiData.subInstance = o;
            }
        }
        this._createjsParams.filters = value;
    }
    addChild(child) {
        this._pixiData.subInstance.addChild(child.pixi);
        return super.addChild(child);
    }
    addChildAt(child, index) {
        this._pixiData.subInstance.addChildAt(child.pixi, index);
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
}
// temporary prototype
Object.defineProperties(CreatejsMovieClip.prototype, {
    _createjsParams: {
        value: createCreatejsMovieClipParams(),
        writable: true
    },
    _pixiData: {
        value: createPixiMovieClipData(createObject(CreatejsMovieClip.prototype)),
        writable: true
    }
});

/**
 * [[http://pixijs.download/release/docs/PIXI.Sprite.html | PIXI.Sprite]]
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
const P$1 = createjs.Sprite;
/**
 * [[https://createjs.com/docs/easeljs/classes/Sprite.html | createjs.Sprite]]
 */
class CreatejsSprite extends mixinCreatejsDisplayObject(createjs.Sprite) {
    constructor(...args) {
        super(...args);
        this._pixiData = createPixiSpriteData(this);
        this._createjsParams = createCreatejsSpriteParams();
        this._createjsEventManager = new EventManager(this);
        P$1.apply(this, args);
    }
    initialize(...args) {
        this._pixiData = createPixiSpriteData(this);
        this._createjsParams = createCreatejsSpriteParams();
        this._createjsEventManager = new EventManager(this);
        return super.initialize(...args);
    }
    updateForPixi(e) {
        return true;
    }
    gotoAndStop(...args) {
        super.gotoAndStop(...args);
        const frame = this.spriteSheet.getFrame(this.currentFrame);
        const baseTexture = BaseTexture.from(frame.image);
        const texture = new Texture(baseTexture, frame.rect);
        this._pixiData.instance.texture = texture;
    }
}
// temporary prototype
Object.defineProperties(CreatejsSprite.prototype, {
    _createjsParams: {
        value: createCreatejsSpriteParams(),
        writable: true
    },
    _pixiData: {
        value: createPixiSpriteData(createObject(CreatejsSprite.prototype)),
        writable: true
    }
});

/**
 * [[http://pixijs.download/release/docs/PIXI.Container.html | PIXI.Container]]
 */
class PixiShape extends Container$1 {
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
const P$2 = createjs.Shape;
/**
 * [[https://createjs.com/docs/easeljs/classes/Shape.html | createjs.Shape]]
 */
class CreatejsShape extends mixinCreatejsDisplayObject(createjs.Shape) {
    constructor(...args) {
        super(...args);
        this._pixiData = createPixiShapeData(this);
        this._createjsParams = createCreatejsShapeParams(null);
        this._createjsEventManager = new EventManager(this);
        P$2.apply(this, args);
    }
    initialize(...args) {
        this._pixiData = createPixiShapeData(this);
        this._createjsParams = createCreatejsShapeParams(null);
        this._createjsEventManager = new EventManager(this);
        return super.initialize(...args);
    }
    updateForPixi(e) {
        return true;
    }
    get graphics() {
        return this._createjsParams.graphics;
    }
    set graphics(value) {
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
        this._createjsParams.graphics = value;
    }
    get masked() {
        return this._pixiData.masked;
    }
}
// temporary prototype
Object.defineProperties(CreatejsShape.prototype, {
    _createjsParams: {
        value: createCreatejsShapeParams(null),
        writable: true
    },
    _pixiData: {
        value: createPixiShapeData(createObject(CreatejsShape.prototype)),
        writable: true
    }
});

/**
 * [[http://pixijs.download/release/docs/PIXI.Sprite.html | PIXI.Sprite]]
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
 * [[https://createjs.com/docs/easeljs/classes/Bitmap.html | createjs.Bitmap]]
 */
class CreatejsBitmap extends mixinCreatejsDisplayObject(createjs.Bitmap) {
    constructor(...args) {
        super(...args);
        this._pixiData = createPixiBitmapData(this);
        this._createjsParams = createCreatejsBitmapParams();
        this._createjsEventManager = new EventManager(this);
        P$3.apply(this, args);
    }
    initialize(...args) {
        this._pixiData = createPixiBitmapData(this);
        this._createjsParams = createCreatejsBitmapParams();
        this._createjsEventManager = new EventManager(this);
        const res = super.initialize(...args);
        const texture = Texture.from(this.image);
        this._pixiData.instance.texture = texture;
        return res;
    }
    updateForPixi(e) {
        return true;
    }
}
// temporary prototype
Object.defineProperties(CreatejsBitmap.prototype, {
    _createjsParams: {
        value: createCreatejsBitmapParams(),
        writable: true
    },
    _pixiData: {
        value: createPixiBitmapData(createObject(CreatejsBitmap.prototype)),
        writable: true
    }
});

/**
 * [[http://pixijs.download/release/docs/PIXI.Graphics.html | PIXI.Graphics]]
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
const P$4 = createjs.Graphics;
/**
 * [[https://createjs.com/docs/easeljs/classes/Graphics.html | createjs.Graphics]]
 */
class CreatejsGraphics extends mixinCreatejsDisplayObject(createjs.Graphics) {
    constructor(...args) {
        super(...args);
        this._pixiData = createPixiGraphicsData(this);
        this._createjsParams = createCreatejsGraphicsParams();
        this._createjsEventManager = new EventManager(this);
        P$4.apply(this, args);
        this._pixiData.instance.beginFill(0xFFEEEE, 1);
        this._pixiData.strokeFill = 0;
        this._pixiData.strokeAlpha = 1;
    }
    initialize(...args) {
        this._pixiData = createPixiGraphicsData(this);
        this._createjsParams = createCreatejsGraphicsParams();
        this._createjsEventManager = new EventManager(this);
        return super.initialize(...args);
    }
    updateForPixi(e) {
        return true;
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
 * [[http://pixijs.download/release/docs/PIXI.Text.html | PIXI.Text]]
 */
class PixiText extends Text {
}
/**
 * [[http://pixijs.download/release/docs/PIXI.Container.html | PIXI.Container]]
 */
class PixiTextContainer extends Container$1 {
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
const P$5 = createjs.Text;
/**
 * [[https://createjs.com/docs/easeljs/classes/Text.html | createjs.Text]]
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
        this._createjsEventManager = new EventManager(this);
        P$5.call(this, text, font, color, ...args);
    }
    updateForPixi(e) {
        return true;
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
 * Load assets of createjs content published with Adobe Animate.
 *
 * @param comp Composition obtained from `AdobeAn.getComposition`.
 */
function loadAssetAsync(comp) {
    if (!comp) {
        return Promise.reject(new Error('no composition'));
    }
    const lib = comp.getLibrary();
    return new Promise((resolve, reject) => {
        if (lib.properties.manifest.length === 0) {
            resolve({});
        }
        const loader = new createjs.LoadQueue(false);
        loader.installPlugin(createjs.Sound);
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
        loader.loadManifest(lib.properties.manifest || []);
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
}
// overrides
createjs.Stage = CreatejsStage;
createjs.StageGL = CreatejsStageGL;
createjs.MovieClip = CreatejsMovieClip;
createjs.Sprite = CreatejsSprite;
createjs.Shape = CreatejsShape;
createjs.Bitmap = CreatejsBitmap;
createjs.Graphics = CreatejsGraphics;
createjs.Text = CreatejsText;
createjs.ButtonHelper = CreatejsButtonHelper;
// install plugins
createjs.MotionGuidePlugin.install();
/**
 * @ignore
 */
function handleFileLoad(evt, comp) {
    const images = comp.getImages();
    if (evt && (evt.item.type == 'image')) {
        images[evt.item.id] = evt.result;
    }
}

/**
 * @ignore
 */
const P$6 = 1000 / 60;
class AnimateEvent extends createjs.Event {
    constructor(type) {
        super(type);
    }
}
class ReachLabelEvent extends AnimateEvent {
    constructor(type, label) {
        super(type);
        this.data = label;
    }
}
/**
 * \@tawaship/pixi-animate-core [[https://tawaship.github.io/pixi-animate-core/classes/createjsmovieclip.html | CreatejsMovieClip]]
 */
class CreatejsMovieClip$1 extends CreatejsMovieClip {
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
        super(...args);
        this.framerate = this._framerateBase;
    }
    initialize(...args) {
        super.initialize(...args);
        this.framerate = this._framerateBase;
    }
    /**
     * @override
     */
    updateForPixi(e) {
        const currentFrame = this.currentFrame;
        // this.advance(e.delta * P);
        this.advance(P$6 * e.delta);
        if (currentFrame !== this.currentFrame) {
            if (this.currentFrame === (this.totalFrames - 1)) {
                this.dispatchEvent(new AnimateEvent('endAnimation'));
            }
            for (let i = 0; i < this.labels.length; i++) {
                const label = this.labels[i];
                if (this.currentFrame === label.position) {
                    this.dispatchEvent(new ReachLabelEvent('reachLabel', label));
                    break;
                }
            }
        }
        return super.updateForPixi(e);
    }
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
delete (CreatejsMovieClip$1.prototype.endAnimation);
delete (CreatejsMovieClip$1.prototype.reachLabel);

/**
 * \@tawaship/pixi-animate-core [[https://tawaship.github.io/pixi-animate-core/classes/createjsbitmap.html | CreatejsBitmap]]
 */
class CreatejsBitmap$1 extends CreatejsBitmap {
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
 * \@tawaship/pixi-animate-core [[https://tawaship.github.io/pixi-animate-core/classes/createjssprite.html | CreatejsSprite]]
 */
class CreatejsSprite$1 extends CreatejsSprite {
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
        if (this._data.isObjectURL) {
            (window.URL || window.webkitURL).revokeObjectURL(this._data.src);
        }
        this._data.src = '';
    }
}
class AnimateBlobLoader extends LoaderBase {
    _loadAsync(target, options = {}) {
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
            .catch((e) => new AnimateBlobLoaderResource({ isObjectURL: false, src: '' }, e));
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
            const comp = AdobeAn.getComposition(target.id);
            if (!comp) {
                throw new Error(`no composition: ${target.id}`);
            }
            const lib = comp.getLibrary();
            const manifests = lib.properties.manifest;
            const version = options.assetVersion || '';
            for (let i = 0; i < manifests.length; i++) {
                const manifest = manifests[i];
                manifest.src = utils$1.resolveUri(target.basepath, manifest.src, version);
            }
            return this._prepareImagesAsync(manifests, options)
                .then(() => {
                for (let i = 0; i < manifests.length; i++) {
                    const manifest = manifests[i];
                    if (options.crossOrigin) {
                        manifest.crossOrigin = true;
                    }
                    if (!utils$1.isUrl(manifest.src)) {
                        manifest.type = 'image';
                    }
                }
                return loadAssetAsync(comp);
            });
        })
            .then(lib => {
            for (let i in lib) {
                if (lib[i].prototype instanceof CreatejsMovieClip$1) {
                    lib[i].prototype._framerateBase = lib.properties.fps;
                }
            }
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
    _prepareImagesAsync(manifests, options) {
        const targets = {};
        for (let i = 0; i < manifests.length; i++) {
            const manifest = manifests[i];
            if (!utils$1.isUrl(manifest.src)) {
                continue;
            }
            targets[i] = manifest.src;
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
                manifests[_i].src = resources[i].data.src;
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
 * @param PiximContent Target [[https://tawaship.github.io/Pixim.js/classes/content.html | Pixim.Content]] class.
 */
function defineAnimatesTo(Content, data) {
    Content.defineTargets('animates', data, {});
}
/**
 * Define animate assets for instance.
 *
 * @param PiximContent Target [[https://tawaship.github.io/Pixim.js/classes/content.html | Pixim.Content]] instance.
 */
function addAnimatesTo(content, data) {
    content.addTargets('animates', data, {});
}
// overrides
createjs.MovieClip = CreatejsMovieClip$1;
createjs.Bitmap = CreatejsBitmap$1;
createjs.Sprite = CreatejsSprite$1;

/**
 * [[https://tawaship.github.io/Pixim.js/classes/container.html | Pixim.Container]]
 */
class Container extends Container$2 {
    constructor(...args) {
        super(...args);
        this._createjsData = {
            id: 0,
            targets: {},
            task: new Task([], this)
        };
        const targets = this._createjsData.targets;
        this._createjsData.task.add((e) => {
            for (let i in targets) {
                targets[i].updateForPixi(e);
            }
        });
        this._createjsData.task.first();
    }
    /**
     * @override
     */
    updateTask(e) {
        super.updateTask(e);
        const task = this._createjsData.task;
        if (!this.taskEnabled) {
            return;
        }
        task.done({ delta: Math.min(e.delta, 1) });
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
    /**
     * [[https://tawaship.github.io/pixi-animate-core/modules.html#tcreatejsobject | TCreatejsObject]]
     */
    addCreatejs(cjs) {
        this._addCreatejs(cjs);
        this.addChild(cjs.pixi);
        return cjs;
    }
    /**
     * [[https://tawaship.github.io/pixi-animate-core/modules.html#tcreatejsobject | TCreatejsObject]]
     */
    addCreatejsAt(cjs, index) {
        this._addCreatejs(cjs);
        this.addChildAt(cjs.pixi, index);
        return cjs;
    }
    /**
     * [[https://tawaship.github.io/pixi-animate-core/modules.html#tcreatejsobject | TCreatejsObject]]
     */
    removeCreatejs(cjs) {
        this.removeChild(cjs.pixi);
        return cjs;
    }
}

export { AnimateEvent, AnimateLoader, AnimateLoaderResource, AnimateManifest, Container, CreatejsBitmap$1 as CreatejsBitmap, CreatejsMovieClip$1 as CreatejsMovieClip, CreatejsSprite$1 as CreatejsSprite, ReachLabelEvent, addAnimatesTo, defineAnimatesTo };
//# sourceMappingURL=Pixim-animate-container.esm.js.map
