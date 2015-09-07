/* global module:false */
module.exports = function(grunt) {

  // https://saucelabs.com/docs/platforms
  var browsers = [
                    // sauce says ff25 is availiable, but times out systematically...
                    {
                        browserName: "firefox",
                        platform   : "Windows 8",
                        version    : "22"
                    },
                    {
                        browserName         : "iphone",
                        platform            : "OS X 10.8",
                        version             : "6.1",
                        "device-orientation": "portrait"
                    },
                    {
                        browserName         : "ipad",
                        platform            : "OS X 10.8",
                        version             : "6.1",
                        "device-orientation": "portrait"
                    },
                    {
                        browserName         : "android",
                        platform            : "Linux",
                        version             : "4.0",
                        "device-orientation": "portrait"
                    },
                    {
                        browserName: "safari",
                        platform   : "OS X 10.8",
                        version    : "6"
                    },
                    {
                        browserName: "safari",
                        platform   : "OS X 10.6",
                        version    : "5"
                    },
                    {
                        browserName: "chrome",
                        platform   : "Windows 7",
                        version    : "31"
                    },
                    {
                        browserName: "internet explorer",
                        platform   : "Windows 8.1",
                        version    : "11"
                    },
                    {
                        browserName: "internet explorer",
                        platform   : "Windows 8",
                        version    : "10"
                    },                    
                    {
                        browserName: "internet explorer",
                        platform   : "Windows 7",
                        version    : "9"
                    },
                    {
                        browserName: "internet explorer",
                        platform   : "Windows XP",
                        version    : "8"
                    },
                    {
                        browserName: "internet explorer",
                        platform   : "Windows XP",
                        version    : "7"
                    }
                ];
  //#endregion

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //#region Saucelabs
    connect: {
        server: {
            options: {
                base: "",
                port: 9999
            }
        }
    },
    "saucelabs-qunit": {
        all: {
            options: {
                urls         : ["http://127.0.0.1:9999/test/unit/1.0.0/index.html"],
                tunnelTimeout: 10,
                build        : process.env.TRAVIS_JOB_ID,
                concurrency  : 3,
                browsers     : browsers,
                testname     : "qunit tests",
                tags         : ["master"]
            }
        }
    },
    watch: {},
    //#endregion

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

    // task: local unit tests
    qunit: {
      files: ['test/unit/index-travis.html']
    }
  });

  // Loading dependencies
  for (var key in grunt.config("pkg").devDependencies) {
    if (key !== "grunt" && key.indexOf("grunt") === 0) {
      grunt.loadNpmTasks(key);
    }
  }

  // Default task
  grunt.registerTask("default", ["jshint", "concat", "uglify", "qunit"]);

  // A convenient task alias.
  grunt.registerTask('test', 'qunit');

  // register sauce tasks
  grunt.registerTask("saucedev" , ["connect", "watch"]);
  grunt.registerTask("saucetest", ["connect", "saucelabs-qunit"]);
};
