window.createjs = require('@tawaship/createjs-module');
window.AdobeAn = {};
const assert = require('assert');
const PIXI = require('pixi.js-legacy');
const Pixim = require('@tawaship/pixim.js');
const PiximAnimate = require('../');
const path = require('path');

describe('animate.container', () => {
	describe('loader', () => {
		it('simple', () => {
			const pRatio = window.devicePixelRatio || 1;
			
			const app = new Pixim.Application({
				width: 450,
				height: 800,
				antialias: true,
				resolution: pRatio,
				backgroundColor: 0xFFFFFF
			});
			
			const Game = Pixim.Content.create();
			
			Game.setConfig({
				width: 450,
				height: 800
			});
			
			PiximAnimate.defineAnimatesTo(Game, {
				test: {
					basepath: '',
					filepath: 'game.js',
					id: '2FA8E0C7230941478CE2CA3DB82DBEDF',
				}
			});
			
			Game.defineLibraries({
				root: class Root extends PIXI.Container {
					constructor($) {
						super();
					}
				}
			});
			
			const game = new Game({
				basepath: path.resolve(__dirname, 'game/') + "\\",
				version: 2,
				typeOptions: {
					animates: {
						fileVersion: 4,
						assetVersion: 5
					}
				}
			});
			
			return app
				.fullScreen()
				.attachAsync(game)
				.then(function() {
				});
		});

		it('xhr', () => {
			const app = new Pixim.Application({
				width: 450,
				height: 800,
				antialias: true,
				backgroundColor: 0xFFFFFF
			});
			
			const Game = Pixim.Content.create();
			
			Game.setConfig({
				width: 450,
				height: 800
			});
			
			Game.defineLibraries({
				root: class Root extends PIXI.Container {
					constructor($) {
						super();
					}
				}
			});
			
			const game = new Game({
				basepath: "",
				xhr: {
					requestOptions: {
						headers: {
							"X-A": "Bearer: hoge"
						}
					}
				},
				typeOptions: {
					animates: {
						fileVersion: 222,
						assetVersion: 345
					}
				}
			});
			
			PiximAnimate.addAnimatesTo(game, {
				test: {
					basepath: path.resolve(__dirname, 'game/') + "\\",
					filepath: 'game.js',
					id: '2FA8E0C7230941478CE2CA3DB82DBEDF',
					options: {
						crossOrigin: true
					}
				}
			})
			
			return app.attachAsync(game).then(() => {
			})
		});
	});
});