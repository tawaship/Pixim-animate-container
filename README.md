# Pixim-animate-container

"Pixim-animate-container" is a plugin for using content created by Adobe Animate with "[Pixim.js](https://github.com/tawaship/Pixim.js)".

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

---

## Core module
[@tawaship/pixi-animate-container](https://github.com/tawaship/pixi-animate-container/)

## Supported version

- A complete set of content created with Adobe Animate version 24.0.1
- pixi.js 5.3.x
- Pixim.js 1.14.0

It may work with other versions as well.

## Setup

### NPM

```sh
npm install --save pixi.js @tawaship/pixim.js @tawaship/pixim-animate-container
```

<br />

```javascript
import * as PIXI from 'pixi.js';
import * as Pixim from '@tawaship/pixim.js';
import * as PiximAnimate from '@tawaship/pixim-animate-container';
```

### Browser

```sh
git clone https://github.com/tawaship/Pixim-animate-container
```

<br />

```html
<script src="https://code.createjs.com/1.0.0/createjs.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/5.3.2/pixi.min.js"></script>
<script src="/path/to/lib/Pixim.min.js"></script>
<script src="/path/to/dist/Pixim-animate-container.min.js"></script>
```

## Usage

For browsers, this module is stored in the namespace "Pixim.animate".

```javascript
const app = new Pixim.Application();

const Game = Pixim.Content.create();

Game.setConfig({
	width: 450,
	height: 800
});

Pixim.animate.defineAnimatesTo(Game, {
	test: {
		id: "[conposition id]", // "lib.properties.id" in Animate content.
		basepath: "[content directory path]", // Directory path of Animate content.
		filepath: "[content js file path], // Javascript file path from basepath.
		options: {
			crossOrigin: true
		}
	}
});

Game.defineLibraries({
	root: class Root extends Pixim.animate.Container {
		constructor($) {
			super();
			
			this.addCreatejs(new $.resources.animates.test.game()); // The class you want to use.
		}
	}
});

const game = new Game();

app
	.fullScreen()
	.attachAsync(game)
	.then(function() {
		app.play();
	});
```

## Change log

### 3.1.0

Compatible with [@tawaship/pixi-animate-container@3.1.0](https://github.com/tawaship/pixi-animate-container): `createjsSmooth` (default `true`) keeps the playing even when `delta` jitters, the content is brought up to date right before each render, so a `gotoAndPlay()` / `gotoAndStop()` made between frames (for example from another task) is drawn correctly at once, values written to `instance.pixi` stay until the timeline writes them again, and rotated-and-skewed objects are drawn as in the browser output of Animate. See its change log for the complete list.

### 3.0.1

Compatible with [@tawaship/pixi-animate-container@3.0.1](https://github.com/tawaship/pixi-animate-container): the full createjs 1.0 API is now typed, named Animate instances (`this.a` and friends) resolve through `CreatejsMovieClip`, `off()` correctly detaches the Pixi-side interaction bridge, and `addChild` with multiple children forwards every child. See its change log for the complete list. `replaceInstance()` is fully typed, including the publish-stamped `nominalBounds` it reads; runtime behavior is unchanged.

### 3.0.0

Compatible with [@tawaship/pixi-animate-container@3.0.0](https://github.com/tawaship/pixi-animate-container) — see its change log for the behavior changes of the tick/sync redesign. The Pixim-side APIs (`replaceInstance`, `replaceTexture`) are unchanged.

This release was implemented with Claude (Anthropic's AI assistant) and verified by the same per-tick full-state differential suite as the core module.

### 2.4.0

Compatible with [@tawaship/pixi-animate-container@2.4.0](https://github.com/tawaship/pixi-animate-container)

### 2.3.0

Compatible with [@tawaship/pixi-animate-container@2.3.1](https://github.com/tawaship/pixi-animate-container)

### 2.2.0

Compatible with [@tawaship/pixim.js@1.15.0](https://github.com/tawaship/Pixim.js)

### 2.1.0

- Compatible with [@tawaship/pixi-animate-container@2.1.0](https://github.com/tawaship/pixi-animate-container)

### 2.0.0

- Compatible with [@tawaship/pixi-animate-container@2.0.0](https://github.com/tawaship/pixi-animate-container)

### 1.0.0

- Overrides

	|name|class|
	|:--|:--|
	|createjs.MovieClip|[CreatejsMovieClip](https://tawaship.github.io/Pixim-animate-container/docs/classes/CreatejsMovieClip.html)|

