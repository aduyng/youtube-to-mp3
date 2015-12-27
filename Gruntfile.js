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
          'dist'
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
            'content-script/**/*.js',
            'content-script/**/*.css',
            'libs/**/*',
            'manifest.json'
          ]
        }]
      }
    }
  };

  grunt.initConfig(opts);
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('build', function() {
    var tasks = [
      'clean:build',
      'copy:build'
    ];

    grunt.task.run(tasks);
  });

};
