# Pixim-animate-container

"Pixim-animate-container" is a plugin for using content created by Adobe Animate with "[Pixim.js](https://github.com/tawaship/Pixim.js)".

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

---

## Core module
[@tawaship/pixi-animate-core](https://tawaship.github.io/pixi-animate-core/)

## Supported version

- A complete set of content created with Adobe Animate version 20.02 | 20.5.1
- pixi.js 5.3.2
- Pixim.js 1.7.x | 1.8.x | 1.9.x

I have not confirmed the operation on other versions.

## How to use

1. Install

```sh
git clone https://github.com/tawaship/pixi-animate-container
```

<br>

```html
<script src="https://code.createjs.com/1.0.0/createjs.min.js"></script>
<script src="/path/to/lib/pixi.5.3.2.min.js"></script>
<script src="/path/to/lib/Pixim.min.js"></script>
<script src="/path/to/dist/Pixim-animate-container.min.js"></script>
<script src="[your content]"></script>
```

2. Use

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
	|createjs.MovieClip|[CreatejsMovieClip](https://tawaship.github.io/pixi-animate-container/docs/pixim/classes/createjsmovieclip.html)|
