window.createjs = require('@tawaship/createjs-module');
window.AdobeAn = {};
const assert = require('assert');
const PIXI = require('pixi.js-legacy');
const Pixim = require('@tawaship/pixim.js');
const PiximAnimate = require('../');
const path = require('path');

describe('Pixim-animate-container', () => {
	describe('manifest', () => {
		it('class', () => {
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
			
			PiximAnimate.defineAnimatesTo(Game, {
				test: {
					basepath: path.resolve(__dirname, 'game/'),
					filepath: 'game.js',
					id: '2FA8E0C7230941478CE2CA3DB82DBEDF_1',
					options: {
						crossOrigin: false
					}
				}
			})
			
			Game.defineLibraries({
				root: class Root extends PIXI.Container {
					constructor($) {
						super();
						
						this.x = 10;
						this.y = 10;
						this.scale.set(0.7);
						
						const container = this.addChild(new PiximAnimate.Container());
						
						container.addChild(new PIXI.Text('Library game'));
						const a = container.addCreatejs(new $.resources.animates.test.game());
						a.y = 50;
					}
				}
			});
			
			const game = new Game();
			
			return app.attachAsync(game)
		});
		
		it('instance', () => {
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
						
						this.x = 10;
						this.y = 10;
						this.scale.set(0.7);
						
						const container = this.addChild(new PiximAnimate.Container());
						
						container.addChild(new PIXI.Text('Library game'));
						const a = container.addCreatejs(new $.resources.animates.test.game());
						a.y = 50;
					}
				}
			});
			
			const game = new Game({
			});
			
			PiximAnimate.addAnimatesTo(game, {
				test: {
					basepath: path.resolve(__dirname, 'game/'),
					filepath: 'game.js',
					id: '2FA8E0C7230941478CE2CA3DB82DBEDF_1'
				}
			})
			
			return app.attachAsync(game)
		});
	});
	
	describe('loader', () => {
		it('single', () => {
			return new PiximAnimate.AnimateLoader()
				.loadAsync({
					basepath: path.resolve(__dirname, 'game/'),
					filepath: 'game.js',
					id: '2FA8E0C7230941478CE2CA3DB82DBEDF_1',
					options: {
						crossOrigin: true
					}
				})
				.then(resource => {
					if (!resource.data) {
						throw 'invalid lib'
					}
				})
		});
		
		it('multi', () => {
			return new PiximAnimate.AnimateLoader()
				.loadAllAsync({
					a: {
						basepath: path.resolve(__dirname, 'game/'),
						filepath: 'game.js',
						id: '2FA8E0C7230941478CE2CA3DB82DBEDF_1',
						options: {
							crossOrigin: true
						}
					},
					b: {
						basepath: path.resolve(__dirname, 'game/'),
						filepath: 'game.js',
						id: '2FA8E0C7230941478CE2CA3DB82DBEDF_1',
						options: {
							crossOrigin: true
						}
					},
				})
				.then(resources => {
					if (!resources.a.data) {
						throw 'invalid lib'
					}
					
					if (!resources.b.data) {
						throw 'invalid lib'
					}
				})
		});
	});
});