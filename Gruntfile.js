module.exports = function(grunt) {
  grunt.initConfig({
    bowerDirectory: require('bower').config.directory,
    less: {
      compile: {
        options: {
          compress: false,
          paths: ['src/_less', 'tmp', '<%= bowerDirectory %>/bootstrap/less']
        },
        files: {
          'tmp/assets/css/bootstrap.css': ['src/_less/theme.less']
        }
      }
    },
    watch: {
      less: {
        files: ['src/_less/*.less'],
        tasks: ['less:compile', 'cssmin:minify', 'clean']
      }
    },
    uglify: {
      js: {
        files: {
          'dist/assets/js/site.js': [
            '<%= bowerDirectory %>/jquery/dist/jquery.min.js', 
            '<%= bowerDirectory %>/bootstrap/dist/js/bootstrap.min.js'
          ]
        }
      }
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: 'tmp/assets/css/',
        src: ['*'],
        dest: 'dist/assets/css/',
        ext: '.min.css'
      }
    },
    copy: {
      'dist-files': {
        files: [
          {
            expand: true,
            cwd: '<%= bowerDirectory %>/bootstrap/dist/fonts/',
            src: ['**'],
            dest: 'dist/assets/fonts/'
          },
          {
            expand: true,
            cwd: 'images',
            src: ['**'],
            dest: 'dist/assets/images/'
          }
        ],
      },
      'src-files': {
        files: [
          {
            expand: true,
            cwd: '<%= bowerDirectory %>/bootstrap/less',
            src: ['bootstrap.less'],
            dest: 'tmp/'
          },
        ]
      }
    },
    exec: {
      build: {
        cmd: 'jekyll build'
      },
      serve: {
        cmd: 'jekyll serve --watch'
      }
    },
    'gh-pages': {
      options: {
        base: 'dist'
      },
      src: ['**']
    },
    clean: ['tmp'],
    concurrent: {
      dev: {
        tasks: ['exec:serve', 'watch:less'],
        options: {
            logConcurrentOutput: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  //grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-exec');

  //grunt.registerTask('default', [ 'less', 'uglify', 'copy', 'exec:build' ]);
  grunt.registerTask('default', [ 'copy:src-files', 'less', 'uglify', 'cssmin', 'copy:dist-files', 'clean', 'concurrent:dev'  ]);
  grunt.registerTask('deploy',  [ 'copy:src-files', 'less', 'uglify', 'cssmin', 'copy:dist-files', 'exec:build', 'clean', 'gh-pages' ]);
};
