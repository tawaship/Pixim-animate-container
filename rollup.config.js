import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import buble from '@rollup/plugin-buble';
import { terser } from 'rollup-plugin-terser';
import del from 'del';

const conf = require('./package.json');
const version = conf.version;
const pixi = conf.devDependencies['pixi.js'];
const pixim = conf.devDependencies['@tawaship/pixim.js'];

const banner = [
	'/*!',
	` * Pixim-animate-container - v${version}`,
	' * ',
	` * @require pixi.js v${pixi}`,
	` * @require @tawaship/pixim.js v${pixim}`,
	' * @author tawaship (makazu.mori@gmail.com)',
	' * @license MIT',
	' */',
	''
].join('\n');

export default (async () => {
	if (process.env.PROD) {
		await del(['./docs/', './dist/', './types/']);
	}
	
	return [
		{
			input: 'src/index.ts',
			output: [
				{
					banner: banner,
					file: 'dist/Pixim-animate-container.js',
					format: 'iife',
					name: 'Pixim.animate',
					sourcemap: true,
					extend: true,
					globals: {
						'pixi.js': 'PIXI',
						'@tawaship/pixim.js': 'Pixim',
						'@tawaship/createjs-module': 'createjs'
					}
				}
			],
			external: ['pixi.js', '@tawaship/pixim.js', '@tawaship/createjs-module'],
			plugins: [
				nodeResolve(),
				commonjs(),
				typescript(),
				buble(),
				terser({
					compress: {
						//drop_console: true
						//pure_funcs: ['console.log']
					},
					mangle: false,
					output: {
						beautify: true,
						braces: true
					}
				})
			]
		},
		{
			input: 'src/index.ts',
			output: [
				{
					banner: banner,
					file: 'dist/Pixim-animate-container.min.js',
					format: 'iife',
					name: 'Pixim.animate',
					sourcemap: true,
					extend: true,
					globals: {
						'pixi.js': 'PIXI',
						'@tawaship/pixim.js': 'Pixim',
						'@tawaship/createjs-module': 'createjs'
					},
					compact: true
				}
			],
			external: ['pixi.js', '@tawaship/pixim.js', '@tawaship/createjs-module'],
			plugins: [
				nodeResolve(),
				commonjs(),
				typescript(),
				buble(),
				terser({
					compress: {
						//drop_console: true,
						pure_funcs: ['console.log']
					}
				})
			]
		},
		{
			input: 'src/index.ts',
			output: [
				{
					banner,
					file: 'dist/Pixim-animate-container.cjs.js',
					format: 'cjs',
					sourcemap: true
				},
				{
					banner,
					file: 'dist/Pixim-animate-container.esm.js',
					format: 'esm',
					sourcemap: true
				}
			],
			external: ['pixi.js', '@tawaship/pixim.js', '@tawaship/createjs-module'],
			watch: {
				clearScreen: false
			},
			plugins: [
				nodeResolve(),
				commonjs(),
				typescript()
			]
		}
	]
})();