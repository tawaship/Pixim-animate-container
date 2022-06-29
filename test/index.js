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
					basepath: path.resolve(__dirname, 'game/') + "\\",
					filepath: 'game.js',
					id: '2FA8E0C7230941478CE2CA3DB82DBEDF_1'
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
			
			let c = 0;
			game.on(Pixim.EVENT_LOADER_ASSET_LOADED, () => {
				++c;
			});
			
			return app.attachAsync(game)
				.then(() => {
					if (game.assetCount !== c) throw new Error();
				})
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
			
			PiximAnimate.defineAnimatesTo(Game, {
				test: {
					basepath: path.resolve(__dirname, 'game/') + "\\",
					filepath: 'game.js',
					id: '2FA8E0C7230941478CE2CA3DB82DBEDF_1'
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
			
			const game = new Game({
				xhr: true
			});
			
			let c = 0;
			game.on(Pixim.EVENT_LOADER_ASSET_LOADED, () => {
				++c;
			});
			
			return app.attachAsync(game)
				.then(() => {
					if (game.assetCount !== c) throw new Error();
				})
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
					basepath: path.resolve(__dirname, 'game/') + "\\",
					filepath: 'game.js',
					id: '2FA8E0C7230941478CE2CA3DB82DBEDF_1'
				}
			})
			
			let c = 0;
			game.on(Pixim.EVENT_LOADER_ASSET_LOADED, () => {
				++c;
			});
			
			return app.attachAsync(game)
				.then(() => {
					if (game.assetCount !== c) throw new Error();
				})
		});
	});
	
	describe('loader', () => {
		it('single', () => {
			let c = 0;
			
			const l = new PiximAnimate.AnimateLoader()
				l.onLoaded = () => {
					c++
				};
				return l.loadAsync({
					basepath: path.resolve(__dirname, 'game/') + "\\",
					filepath: 'game.js',
					id: '2FA8E0C7230941478CE2CA3DB82DBEDF_1'
				})
				.then(resource => {
					if (resource.error || !resource.data) {
						throw 'invalid lib'
					}
					
					if (c !== 1) throw "invalid asset"
				})
		});
		
		it('xhr', () => {
			let c = 0;
			
			const l = new PiximAnimate.AnimateLoader()
				l.onLoaded = () => {
					c++
				};
				return l.loadAsync({
					basepath: path.resolve(__dirname, 'game/') + "\\",
					filepath: 'game.js',
					id: '2FA8E0C7230941478CE2CA3DB82DBEDF_1'
				}, { xhr: true })
				.then(resource => {
					if (resource.error || !resource.data) {
						throw 'invalid lib'
					}
					
					console.log()
					
					if (c !== 1) throw "invalid asset"
				})
		});
		
		it('multi', () => {
			let c = 0;
			
			const l = new PiximAnimate.AnimateLoader()
				l.onLoaded = () => {
					c++
				};
				return l.loadAllAsync({
					a: {
						basepath: path.resolve(__dirname, 'game/') + "\\",
						filepath: 'game.js',
						id: '2FA8E0C7230941478CE2CA3DB82DBEDF_1'
					},
					b: {
						basepath: path.resolve(__dirname, 'game/')+ "\\",
						filepath: 'game.js',
						id: '2FA8E0C7230941478CE2CA3DB82DBEDF_1'
					},
				})
				.then(resources => {
					if (resources.a.error || !resources.a.data) {
						throw 'invalid lib'
					}
					
					if (resources.b.error || !resources.b.data) {
						throw 'invalid lib'
					}
					
					if (c !== 2) throw "invalid asset"
				})
		});
	});
});