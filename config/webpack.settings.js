/* global module */

// Webpack settings exports.
module.exports = {
	entries: {
		// JS files.
		'admin': './assets/js/admin/admin.js',
		'frontend': './assets/js/frontend/frontend.js',
		'shared': './assets/js/shared/shared.js',
		'blocks-editor': './assets/js/admin/blocks/editor.js',
		'blocks': './assets/js/admin/blocks/index.js',

		// CSS files.
		'admin-style': './assets/css/admin/admin-style.css',
		'editor-style': './assets/css/frontend/editor-style.css',
		// 'blocks-editor-style': './assets/js/admin/blocks/editor.css',
		'shared-style': './assets/css/shared/shared-style.css',
		'style': './assets/css/frontend/style.css',
		// TODO pull style from prism package (figure out why the laoder fails on it)
		// 'prism-theme-tomorrow': './node_modules/prismjs/themes/prism-tomorrow.css',
		'prism-theme-tomorrow': './assets/css/shared/prism-tomorrow.css',
		
	},
	filename: {
		js: 'js/[name].js',
		css: 'css/[name].css'
	},
	paths: {
		src: {
			base: './assets/',
			css: './assets/css/',
			js: './assets/js/'
		},
		dist: {
			base: './dist/',
			clean: ['./images', './css', './js']
		},
	},
	stats: {
		// Copied from `'minimal'`.
		all: false,
		errors: true,
		maxModules: 0,
		modules: true,
		warnings: true,
		// Our additional options.
		assets: true,
		errorDetails: true,
		excludeAssets: /\.(jpe?g|png|gif|svg|woff|woff2)$/i,
		moduleTrace: true,
		performance: true
	},
	copyWebpackConfig: {
		from: '**/*.{jpg,jpeg,png,gif,svg,eot,ttf,woff,woff2}',
		to: '[path][name].[ext]'
	},
	BrowserSyncConfig: {
		host: 'localhost',
		port: 3000,
		proxy: 'http://github-file-contents.test',
		open: false,
		files: [
			'**/*.php',
			'dist/js/**/*.js',
			'dist/css/**/*.css',
			'dist/svg/**/*.svg',
			'dist/images/**/*.{jpg,jpeg,png,gif}',
			'dist/fonts/**/*.{eot,ttf,woff,woff2,svg}'
		]
	},
	performance: {
		maxAssetSize: 100000
	},
	manifestConfig: {
		basePath: ''
	},
};