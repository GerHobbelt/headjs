module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
        options: {
            curly: false,
            eqeqeq: true,
            immed: true,
            latedef: true,
            newcap: true,
            noarg: true,
            sub: true,
            undef: true,
            eqnull: true,
            browser: true,
            expr: true,
            globals: {
                head: false,
                module: false,
                console: false
            }
        },
        files: [ 
        	'Gruntfile.js', 			
        	'src/core.js', 
			'src/css3.js', 
			'src/load.js'
 		]
    },

	concat: {
		'dist/head.core.js': [
			'src/core.js'
		],
		'dist/head.load.js': [
			'src/core.js', 
			'src/load.js'
		],
		'dist/head.css3.js': [
			'src/core.js', 
			'src/css3.js'
		],
		'dist/head.js': [
			'src/core.js', 
			'src/css3.js', 
			'src/load.js'
		]
	},

	uglify: {
		my_target: {
			files: {
				'dist/head.core.min.js': ['dist/head.core.js'],
				'dist/head.css3.min.js': ['dist/head.css3.js'],
				'dist/head.load.min.js': ['dist/head.load.js'],
				'dist/head.min.js': ['dist/head.js']
			}
		}
	},

    qunit: {
      files: ['test/unit/index-travis.html']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-qunit');
  
  // A convenient task alias.
  grunt.registerTask('test', 'qunit');
  grunt.registerTask("default", ["jshint", "concat", "uglify"]);

};