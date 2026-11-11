---
name: pixim-animate-container-guide
description: Use this skill whenever the user asks to create, edit, or debug content using @tawaship/pixim-animate-container — a plugin that enables Adobe Animate HTML5 Canvas published content to be played within Pixim.js. Trigger on any mention of 'pixim-animate-container', 'Animate コンテンツ', 'Adobe Animate', 'AdobeAn', 'createjs', or requests to integrate Animate-published JS files into a Pixim.js content. Also trigger when the user references concepts like defineAnimatesTo, addCreatejs, removeCreatejs, AnimateContainer, or listenFrameEvents. Always read the PixiJS skill and Pixim.js skill first if available, then apply this skill for animate-container-specific patterns.
---

# @tawaship/pixim-animate-container development skill

Supported versions: **`3.1.0`** (this skill ships with the package and describes that version only).

If the installed version (`node_modules/@tawaship/pixim-animate-container/package.json`) is not `3.1.0`, the skill was copied from another version: follow the type definitions in `node_modules` wherever they differ, and suggest copying the skills again from the installed package (see its README, "Claude Code skills").

## Dependencies

This skill depends on the following skills. Read them first, then apply this skill.

- **pixijs-guide** — Type definitions and usage guide for pixi.js v5.3.9. Required because the pixi-animate-container type definitions reference the pixi.js types.
- **piximjs-guide** — Type definitions and usage guide for Pixim.js v1.15.0. Required because the pixim-animate-container type definitions reference the Pixim.js types.
- **pixi-animate-container-guide** — Guide for the core module `@tawaship/pixi-animate-container`. Details of the wrapper classes, TypeScript typing patterns, and playback speed control are documented there; this skill delegates to it. This package ships a copy of it in its own `dist-skills/` (copy both into the project's skills); if it is missing from the project, report that to the user before proceeding.

## Overview

`@tawaship/pixim-animate-container` is a plugin for playing "Animate content" — content published from Adobe Animate in HTML5 Canvas mode — on Pixim.js.

Animate content runs on createjs. This plugin extends createjs and integrates it into the PixiJS / Pixim.js rendering pipeline.

## Type definition files

**Before writing any code that uses a class, method, or property of this package, always check the corresponding type definition file. If it is already loaded in context there is no need to re-Read it, but when in doubt, always confirm with the Read tool.**

Type definitions are read from the package installed in the project (`node_modules/`). That is the single source of truth that exactly matches the runtime code.

- If the package is not installed, run `npm install @tawaship/pixim-animate-container` first (the dependency `@tawaship/pixi-animate-container` comes with it)
- If the installed version differs from this skill's target version, **treat the type definitions in node_modules as authoritative** and follow them wherever they disagree with this skill

| Module | Location of type definitions |
|-----------|-------------------|
| `@tawaship/pixim-animate-container` | `node_modules/@tawaship/pixim-animate-container/types/` |
| `@tawaship/pixi-animate-container` | `node_modules/@tawaship/pixi-animate-container/types/` |
| `@tawaship/createjs-module` (types for createjs itself) | `node_modules/@tawaship/createjs-module/types/` |
| `@tawaship/pixim.js` | Follow the instructions in the `piximjs-guide` skill |
| `pixi.js` | Follow the instructions in the `pixijs-guide` skill |

Frequently used classes and features (paths are relative to `node_modules/@tawaship/`):

| Class / feature | Purpose | Type definition file |
|---|---|---|
| `defineAnimatesTo` | Registers Animate assets on a Content class | `pixim-animate-container/types/core.d.ts` |
| `Container` (AnimateContainer) | Pixim.Container subclass dedicated to Animate content | `pixim-animate-container/types/Container.d.ts` |
| `AnimateLoader` | Loader for Animate JS files (normally not used directly) | `pixim-animate-container/types/AnimateLoader.d.ts` |
| `IAnimateContainer` | Container interface of the pixi-animate-container layer | `pixi-animate-container/types/Container.d.ts` |
| createjs types (`CreatejsMovieClip`, `CreatejsBitmap`, etc.) | Types of the objects inside Animate content | `pixi-animate-container/types/createjs/modules/` |

## Basic usage

### 1. defineAnimatesTo — registering Animate content

```typescript
import { defineAnimatesTo } from '@tawaship/pixim-animate-container';

defineAnimatesTo(MyContent, {
  game: {
    id: 'COMPOSITION_ID', // the value of lib.properties.id
    basepath: './assets/', // path relative to index.html (the directory of the Animate content)
    filepath: 'game.js',  // path relative to basepath; the actual JS path resolves to basepath + filepath
  }
});
```

`basepath` is not just the location of the JS file — it is also the base path for the assets (such as images) that the Animate content references. Typically an `images` directory sits next to the Animate content JS, and the images are placed inside it. Images are loaded automatically by createjs / animate-container relative to `basepath`, so no path needs to be specified in code. This is why `basepath` and `filepath` are separate.

```
index.html
└── assets/          ← basepath
    ├── game.js      ← filepath
    └── images/      ← resolved automatically by animate-container relative to basepath
        └── *.png
```

To load multiple pieces of Animate content, just add more members to `defineAnimatesTo` under different names.

**⚠️ Watch out for duplicate IDs**: loading multiple pieces of Animate content with the same ID can cause problems. The ID is defined inside the Animate content JS (`lib.properties.id`) and cannot be changed from code. When loading multiple pieces of Animate content, check that each `id` is unique, and if a duplicate is found, raise the problem with the user.

### 2. AnimateContainer — display container

`AnimateContainer` (the `Container` of `@tawaship/pixim-animate-container`) is a container dedicated to Animate content that extends the `Container` of `Pixim.js`.

```typescript
import { Container } from '@tawaship/pixim.js';
import { Container as AnimateContainer } from '@tawaship/pixim-animate-container';

class Root extends Container {
  constructor($) {
    super();

    const lib = $.resources.animates.game;
    const game = new AnimateContainer();
    this.addChild(game);

    // Add the root instance of the Animate content (returns the createjs instance)
    const cjs = game.addCreatejs(new lib.game());
  }
}

MyContent.defineLibraries({ root: Root });
```

### 3. addCreatejs / removeCreatejs

- `game.addCreatejs(cjsInstance)` — adds a createjs instance and starts displaying it. The return value is the createjs instance
- `game.removeCreatejs(cjsInstance)` — removes the createjs instance and stops displaying it

If nothing needs to be displayed initially, do not call `addCreatejs`. Call it when display becomes necessary (e.g. on a button click), and call `removeCreatejs` when it is no longer needed.

```typescript
const cjs = game.addCreatejs(new lib.game());
// ...
game.removeCreatejs(cjs);
```

## Events

createjs instances have `addEventListener`. The common pattern is to place a `dispatchEvent` on the Animate content side and listen on the Pixim.js side.

```typescript
const cjs = game.addCreatejs(new lib.game());

// Listen to an event on the root instance
cjs.addEventListener('myEvent', (e) => {
  console.log('received', e);
});

// Listen to an event on a child instance (determined from the contents of game.js)
cjs.instance.addEventListener('myEvent', (e) => {
  console.log('child received', e);
});
```

### The listenFrameEvents option (not needed by default)

An option that enables the built-in frame-related events. Normally not used.

```typescript
import { defineAnimatesTo } from '@tawaship/pixim-animate-container';

defineAnimatesTo(MyContent, {
  game: {
    id: 'COMPOSITION_ID',
    basepath: './',
    options: {
      listenFrameEvents: {
        endAnimation: true,  // fires on the last frame of the timeline
        reachLabel: true,    // fires when a labeled frame is reached
      }
    }
  }
});
```

## Using with TypeScript

- At runtime, every display object in AC-using code — including instances inside published Animate content — is a wrapper instance (the core module replaces `createjs.MovieClip` etc. with its wrapper classes when its module is evaluated), but values reached through `createjs.*` are still statically typed as the plain createjs classes, so the wrapper-only surface (`pixi`, the string index signature) does not compile on them
- Therefore use the wrapper classes exported by the core module (`CreatejsMovieClip`, `CreatejsSprite`, etc.) in your own type annotations — that is what code using this package almost always needs
- Named child instances that Adobe Animate stamps on at runtime during publish (`this.a` and friends) can be referenced without declarations thanks to the string index signature on `CreatejsMovieClip` (they type as `any`). If you want them strictly typed, `declare` them on your own class

See "Using with TypeScript" in the `pixi-animate-container-guide` skill for the detailed patterns.

## Important notes

### createjs.stop() only stops that instance's own timeline

`cjs.stop()` stops only the timeline of that instance. Child movie clips keep playing, so it does not stop the entire Animate content. If you do not want the content displayed, do not call `addCreatejs`.

### Read the createjs-side properties from frame scripts

The display properties of the pixi mirror (`instance.pixi.*`) are synced at the end of each tick. Reading `instance.pixi.x` etc. from inside a frame script returns the value from the previous tick. Always read the createjs-side properties (`instance.x` etc. — always current) from frame scripts.
