require('./cjs.js');
const assert = require('assert');
const PIXI = require('pixi.js-legacy');
const Pixim = require('@tawaship/pixim.js');
const PiximAnimate = require('../');
const path = require('path');
require('./game/game.js');

describe('PiximAnimate.container', () => {
	it('basic', () => {
		const app = new Pixim.Application({
			width: 450,
			height: 800,
			antialias: true,
			backgroundColor: 0xFFFFFF
		});
		
		return PiximAnimate.loadAssetAsync({
			id: '2FA8E0C7230941478CE2CA3DB82DBEDF_1',
			basepath: path.resolve(__dirname, 'game/'),
			options: {
				crossOrigin: false
			}
		})
		.then(function(lib) {
			const Game = Pixim.Content.create();
			
			Game.setConfig({
				width: 450,
				height: 800
			});
			
			Game.defineLibraries({
				root: class Root extends PIXI.Container {
					constructor($) {
						super();
						
						this.x = 10;
						this.y = 10;
						this.scale.set(0.7);
						
						const container = this.addChild(new PiximAnimate.Container());
						
						container.addChild(new PIXI.Text('Library game'));
						const a = container.addCreatejs(new $.vars.lib.game());
						a.y = 50;
					}
				}
			});
			
			const game = new Game();
			game.addVars({
				lib: lib
			});
			
			return app.attachAsync(game)
		});
	});
});