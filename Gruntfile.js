'use strict';


module.exports = function(grunt) {
  var opts = {
    clean: {
      options: {
        force: true
      },
      build: {
        src: [
          'tmp',
          'dist',
          'upload'
        ]
      }
    },
    copy: {
      build: {
        files: [{
          expand: true,
          cwd: 'src',
          dest: 'dist',
          src: [
            'images/512.png',
            'content-script/**/*.css',
            'libs/**/*',
            'manifest.json'
          ]
        }]
      }
    },
    uglify: {
      options: {
        output: {
          beautify: false
        },
        screwIE8: true,
        report: 'min',
        sourceMap: false,
        compress: {
          /*eslint-disable */
          sequences: true, // join consecutive statemets with the â€œcomma operatorâ€
          properties: true, // optimize property access: a['foo'] â†’ a.foo
          dead_code: true, // discard unreachable code
          drop_debugger: true, // discard â€œdebuggerâ€ statements
          drop_console: true,
          unsafe: false, // some unsafe optimizations (see below)
          conditionals: true, // optimize if-s and conditional expressions
          comparisons: true, // optimize comparisons
          evaluate: true, // evaluate constant expressions
          booleans: true, // optimize boolean expressions
          loops: true, // optimize loops
          unused: true, // drop unused variables/functions
          hoist_funs: true, // hoist function declarations
          hoist_vars: false, // hoist variable declarations
          if_return: true, // optimize if-s followed by return/continue
          join_vars: true, // join var declarations
          cascade: true, // try to cascade `right` into `left` in sequences
          side_effects: true, // drop side-effect-free statements
          warnings: true, // warn about potentially dangerous optimizations/code
          global_defs: {
            DEBUG: false
          } // global definitions
          /*eslint-enable */
        }
      },
      build: {
        files: (function() {
          var files = {};
          files['./dist/content-script/content-script.js'] = './src/content-script/content-script.js';
          files['./dist/content-script/youtube-mp3.js'] = './src/content-script/youtube-mp3.js';
          return files;
        })()
      }
    },
    compress: {
      build: {
        options: {
          archive: 'upload/archive.zip'
        },
        files: [
          {src: ['dist/**/*']}
        ]
      }
    }
  };

  grunt.initConfig(opts);
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');


  grunt.registerTask('build', function() {
    var tasks = [
      'clean:build',
      'copy:build',
      'uglify:build',
      'compress:build'
    ];

    grunt.task.run(tasks);
  });

};
