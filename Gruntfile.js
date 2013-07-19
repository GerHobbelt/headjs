/* global module:false */
module.exports = function(grunt) {

  // Project configuration
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
        ],
        'dist/head-amd.js': {
            options: {
                // Remove all wrappers and init code in the files with a single AMD wrapper at the top and var decls in core.
                process: function(src, filepath) {
                  return "\n// Source: " + filepath + "\n\n" +
                    src.replace(/(^|\n).*REMOVE-ON-REQUIRE-BUILD/g, "\n");
                },
                banner: "\n" +
                        "(function ( window, factory ) {\n" +
                        "\n" +
                        "  if ( typeof module === \"object\" && typeof module.exports === \"object\" ) {\n" +
                        "    // Expose a factory as module.exports in loaders that implement the Node\n" +
                        "    // module pattern (including browserify).\n" +
                        "    // This accentuates the need for a real window in the environment\n" +
                        "    // e.g. var jQuery = require(\"jquery\")(window);\n" +
                        "    module.exports = function( w ) {\n" +
                        "      w = w || window;\n" +
                        "      if ( !w.document ) {\n" +
                        "        throw new Error(\"headJS requires a window with a document\");\n" +
                        "      }\n" +
                        "      return factory( w );\n" +
                        "    };\n" +
                        "  } else {\n" +
                        "    if ( typeof define === \"function\" && define.amd ) {\n" +
                        "      // AMD. Register as a named module.\n" +
                        "      define( \"head\", [], function() {\n" +
                        "        return factory(window);\n" +
                        "      });\n" +
                        "    } else {\n" +
                        "        // Browser globals\n" +
                        "        window.head = factory(window);\n" +
                        "    }\n" +
                        "  }\n" +
                        "\n" +
                        "// Pass this, window may not be defined yet\n" +
                        "}(this, function ( win, undefined ) {\n" +
                        "\n" +
                        "\n",
                footer: "\n" +
                        "  return api;\n" +
                        "}));\n\n"
            },
            files: {
                'dist/head-amd.js': [
                    'src/core.js',
                    'src/css3.js',
                    'src/load.js'
                ]
            }
        }
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

  // Dependencies
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task
  grunt.registerTask("default", ["jshint", "concat", "uglify", "qunit"]);

  // A convenient task alias.
  grunt.registerTask('test', 'qunit');

};