module.exports = function (grunt) {

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({

		clean: {
			build: ['js/remastered/build/'],
			js_vendor: ['js/remastered/dist/vendor/'],
			js_main: ['js/remastered/dist/main.min.js'],
		},

		copy: {
			js_vendor: {
				files: {
					'js/remastered/dist/vendor/jquery.min.js': 'node_modules/jquery/dist/jquery.min.js',
					'js/remastered/dist/vendor/popper.min.js': 'node_modules/popper.js/dist/umd/popper.min.js',
					'js/remastered/dist/vendor/bootstrap.min.js': 'node_modules/bootstrap/dist/js/bootstrap.min.js',
					'js/remastered/dist/vendor/lazysizes.min.js': 'node_modules/lazysizes/lazysizes.min.js',
				}
			}
		},

		uglify: {
			options: {
				sourceMap: false,
				mangle: true
			},
			js_vendor: {
				files: {
					'js/remastered/build/wnumb.min.js': 'node_modules/wnumb/wNumb.js',
					'js/remastered/build/live-form-validation.min.js': 'node_modules/live-form-validation/live-form-validation.js',
					'js/remastered/build/nette.ajax.min.js': 'node_modules/nette.ajax.js/nette.ajax.js',
				}
			},
			js_main: {
				files: {
					'js/remastered/build/template.min.js': 'js/remastered/template.js',
				}
			}
		},

		concat: {
			options: {
				separator: ';\n\n',
			},
			js_vendor: {
				files: {
					'js/remastered/dist/vendor/vendor.min.js': [
						'node_modules/slick-carousel/slick/slick.min.js',
						'node_modules/magnific-popup/dist/jquery.magnific-popup.min.js',
						'node_modules/stupid-table-plugin/stupidtable.min.js',
						'js/remastered/build/wNumb.min.js',
						'node_modules/selectric/public/jquery.selectric.min.js',
						'node_modules/nouislider/distribute/nouislider.min.js',
						'node_modules/rateyo/min/jquery.rateyo.min.js',
						'js/remastered/build/live-form-validation.min.js',
						'js/remastered/build/nette.ajax.min.js',
					],
					'js/remastered/dist/vendor/bootstrap-datepicker.min.js': [
						'node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js',
						'node_modules/bootstrap-datepicker/dist/locales/bootstrap-datepicker.cs.min.js',
						'node_modules/bootstrap-datepicker/dist/locales/bootstrap-datepicker.sk.min.js',
						'node_modules/bootstrap-datepicker/dist/locales/bootstrap-datepicker.hu.min.js',
					]
				}
			},
			js_main: {
				files: {
					'js/remastered/dist/main.min.js': [
						'js/remastered/build/template.min.js',
						'js/remastered/helpers/is.js',
						'js/remastered/helpers/live-form-validation.js',
						'js/remastered/app.js',
					]
				}
			}
		},

		watch: {
			js_main: {
				files: [
					'js/remastered/helpers/is.js',
					'js/remastered/helpers/live-form-validation.js',
					'js/remastered/app.js',
					'js/remastered/template.js',
				],
				tasks: ['clean:build', 'clean:js_main', 'uglify:js_main', 'concat:js_main', 'clean:build']
			}
		}

	});


	grunt.registerTask('default', [
		'clean',
		'copy',
		'uglify',
		'concat',
		'clean:build'
	]);

	grunt.registerTask('js_main', [
		'clean:build',
		'clean:js_main',
		'uglify:js_main',
		'concat:js_main',
		'clean:build'
	]);

};
