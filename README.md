# Pixim-animate-container

"Pixim-animate-container" is a plugin for using content created by Adobe Animate with "[Pixim.js](https://github.com/tawaship/Pixim.js)".

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

---

## Core module
[@tawaship/pixi-animate-core](https://tawaship.github.io/pixi-animate-core/)

## Supported version

- A complete set of content created with Adobe Animate version 20.02 | 20.5.1
- pixi.js 5.3.x
- Pixim.js 1.11.x

I have not confirmed the operation on other versions.

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
<script src="[your content].js"></script>
```

## Usage

For browsers, this module is stored in the namespace "Pixim.animate".

```javascript
const app = new Pixim.Application();

Pixim.animate.loadAssetAsync([{
	id: "[conposition id]", // "lib.properties.id" in Animate content.
	basepath: "[content directory path]", // Directory path of Animate content.
	options: {
		crossOrigin: false
	}
}]).then(function(lib) {
	// If you load multiple contents, the argument "lib" will be an array and the "lib" of each content will be stored in order.
	const Game = Pixim.Content.create();
	
	Game.setConfig({
		width: 450,
		height: 800
	});
	
	Game.defineLibraries({
		root: class Root extends Pixim.animate.Container {
			constructor($) {
				super();
				
				this.addCreatejs(new lib.game()); // The class you want to use.
			}
		}
	});
	
	const game = new Game();
	game.addVars({
		lib: lib
	});
	
	app
		.fullScreen()
		.attachAsync(game)
		.then(function() {
			app.play();
		});
});
```

## Change log

### 1.0.0

- Overrides

	|name|class|
	|:--|:--|
	|createjs.MovieClip|[CreatejsMovieClip](https://tawaship.github.io/Pixim-animate-container/docs/classes/createjsmovieclip.html)|
