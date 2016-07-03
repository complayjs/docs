var config = require('../config');

module.exports = {
	options: {
		cwd: config.options.paths.src + '/templating/',
		dest: config.options.paths.dev,
		types: {
			data: {
				dir: '',
				files: [
					'data/**/*.json',
					'data/**/*.hjson',
					'partials/**/*.json',
					'partials/**/*.hjson'
				]
			},
			partials: {
				dir: 'partials',
				files: [
					'**/*.hbs'
				]
			},
			pages: {
				dir: 'pages',
				files: [
					'**/*.hbs'
				]
			},
			layouts: {
				dir: 'layouts',
				files: [
					'**/*.hbs'
				]
			}
		},
		helpers: [
			'helpers/*.js'
		]
	}, 
	dev: { // IMPORTANT: When using Mangony in grunt-express the dev task will be executed in the server script
		options: {
			compileStaticFiles: false,
			devServer: {
				start: true
			},
			watch: true
		}
	},
	dist: {
		options: {
			compileStaticFiles: true,
			watch: false
		}
	}
};