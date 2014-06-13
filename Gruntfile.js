module.exports = function(grunt) {
  grunt.initConfig({
    bowerDirectory: require('bower').config.directory,
    less: {
      compile: {
        options: {
          compress: false,
          paths: ['src/_styles', 'tmp', '<%= bowerDirectory %>/bootstrap/less']
        },
        files: {
          'tmp/assets/css/bootstrap.css': ['src/_styles/theme.less']
        }
      }
    },
    watch: {
      less: {
        files: ['src/_styles/*.less'],
        tasks: ['less:compile', 'copy:unminified-css-files', 'clean']
      },
      js: {
        files: ['src/_rompecabezas/src/*.js', 'src/_rompecabezas/src/**/*.js'],
        tasks: ['uglify:games']
      },
    },
    uglify: {
      libs: {
        files: {
          'dist/assets/js/lib/base.js': [
            '<%= bowerDirectory %>/jquery/dist/jquery.min.js',
            '<%= bowerDirectory %>/bootstrap/dist/js/bootstrap.min.js'
          ],
          'dist/assets/js/lib/phaser.js': [
            '<%= bowerDirectory %>/phaser-official/build/custom/phaser-arcade-physics.min.js'
          ]
        },
      },
      games: {
        files: {
          'dist/assets/js/rompecabezas.js': [
            'src/_rompecabezas/src/Main.js',
            'src/_rompecabezas/src/Prefabs/NumberBlock.js',
            'src/_rompecabezas/src/Prefabs/Board.js',
            'src/_rompecabezas/src/Solver.js',
            'src/_rompecabezas/src/States/Boot.js',
            'src/_rompecabezas/src/States/Preloader.js',
            'src/_rompecabezas/src/States/MainMenu.js',
            'src/_rompecabezas/src/States/LeaderBoards.js',
            'src/_rompecabezas/src/States/Credits.js',
            'src/_rompecabezas/src/States/Play.js'
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
      'unminified-css-files': {
        expand: true,
        cwd: 'tmp/assets/css/',
        src: ['*'],
        dest: 'dist/assets/css/',
        ext: '.min.css'
      },
      'dist-files': {
        files: [
          {
            expand: true,
            cwd: '<%= bowerDirectory %>/bootstrap/dist/fonts/',
            src: ['**'],
            dest: 'dist/assets/fonts/'
          },
          // {
          //   expand: true,
          //   cwd: 'images',
          //   src: ['**'],
          //   dest: 'dist/assets/images/'
          // },
          {
            expand: true,
            cwd: 'src/_rompecabezas/res/',
            src: ['**/*','!**/*.{png,jpg,gif}'],
            dest: 'dist/assets/res/'
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
    image: {
      // static: {
      //   files: { 
      //     'dist/img.png': 'src/img.png',
      //     'dist/img.jpg': 'src/img.jpg',
      //     'dist/img.gif': 'src/img.gif'
      //   }
      // },
      assets: {
        files: [{
          expand: true,
          cwd: 'images/', 
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dist/assets/images/'
        }]
      },
      rompecabezas: {
        files: [{
          expand: true,
          cwd: 'src/_rompecabezas/res/', 
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dist/assets/res/'
        }]
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
        tasks: ['exec:serve', 'watch'],
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
  grunt.loadNpmTasks('grunt-image');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-exec');

  //grunt.registerTask('default', [ 'less', 'uglify', 'copy', 'exec:build' ]);
  grunt.registerTask('default', [
    'copy:src-files', 'less', 'uglify', 'copy:unminified-css-files', //'image',
    'copy:dist-files', 'clean', 'concurrent:dev'
  ]);
  grunt.registerTask('deploy',  [
    'copy:src-files', 'less', 'uglify', 'cssmin', 'image',
    'copy:dist-files', 'exec:build', 'clean', 'gh-pages'
  ]);
};
