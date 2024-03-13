import * as PA from "./createjs/modules";
import createjs from "@tawaship/createjs-module";
import * as core from "@tawaship/pixi-animate-container";

// overrides
createjs.MovieClip = PA.CreatejsMovieClip;
createjs.Bitmap = PA.CreatejsBitmap;
createjs.Sprite = PA.CreatejsSprite;

export * from "./core";
export * from "./createjs";
export * from "./Container";
export * from "./AnimateManifest";
export * from "./AnimateLoader";
export * from "./AnimateBlobLoader";
export { core };