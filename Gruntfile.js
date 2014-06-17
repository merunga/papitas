var http = require('http');
var $ = require('cheerio');

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
        tasks: ['concat:games']
      },
      meteor: {
        files: ['src/app/.meteor/local/build/programs/client/*.{js,css}'],
        tasks: ['copyMeteorAssets']
      }
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
    concat: {
      libs: {
        files: {
          'dist/assets/js/lib/base.js': [
            '<%= bowerDirectory %>/jquery/dist/jquery.js',
            '<%= bowerDirectory %>/bootstrap/dist/js/bootstrap.js'
          ],
          'dist/assets/js/lib/phaser.js': [
            '<%= bowerDirectory %>/phaser-official/build/custom/phaser-arcade-physics.js'
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
      app: {
        expand: true,
        cwd: 'src/app/.meteor/local/build/programs/client/assets',
        src: ['**/*.!{png,jpg,gif}'],
        dest: 'dist/'
      },
      'less-dist-files': {
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
      'less-src-files': {
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
      // rompecabezas: {
      //   files: [{
      //     expand: true,
      //     cwd: 'src/_rompecabezas/res/', 
      //     src: ['**/*.{png,jpg,gif}'],
      //     dest: 'dist/assets/res/'
      //   }]
      // },
      app: {
        files: [{
          expand: true,
          cwd: 'src/app/.meteor/local/build/programs/client/assets', 
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dist/'
        }]
      }
    },
    exec: {
      build: {
        cmd: 'jekyll build'
      },
      serve: {
        cmd: 'jekyll serve --watch'
      },
      meteorStart: {
        cmd: 'cd src/app && meteor --port 5000 --production'
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
        tasks: ['exec:meteorStart', 'exec:serve', 'watch'],
        options: {
            logConcurrentOutput: true
        }
      },
      default: {
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
  grunt.loadNpmTasks('grunt-contrib-concat');
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
    'copy:less-src-files', 'less', 'concat', 'copy:unminified-css-files', //'image',
    'copy:less-dist-files', 'clean', 'concurrent:default'
  ]);

  grunt.registerTask('dev', [
    'copy:less-src-files', 'less', 'concat', 'copy:unminified-css-files', //'image',
    'copy:less-dist-files', 'clean', 'copy:app', 'concurrent:dev'
  ]);  

  grunt.registerTask('deploy',  [
    'exec:meteorStart', 'copy:less-src-files', 'less', 'uglify', 'cssmin', 'image',
    'copy:less-dist-files', 'exec:build', 'copyMeteorAssets',
    'clean', 'gh-pages'
  ]);

  function fetchUrl(done, reloadurl, cb) {
    grunt.log.writeln('Loading URL:' + reloadurl + ' ...');

    http.get(reloadurl, function(res) {
      var pageData = "";
      if(res.statusCode != '200'){
        //if we don't have a successful response queue the open:error task
        grunt.log.error('Error Reloading Application!: ' + res.statusCode);
      }
      res.setEncoding('utf8');

      //this saves all the file data to the pageData variable
      res.on('data', function (chunk) {
        pageData += chunk;
      });

      res.on('end', function(){
        cb(pageData);
        if(done) {
          done();
        }
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
      if(done) {
        done(false);
      }
    });
  }

  grunt.registerTask('copyMeteorAssets', 'Copy Meteor assets', function() {
    var done = this.async();
    var reloadurl = 'http://localhost:5000';

    fetchUrl(null, reloadurl, function(pageData) {
      var $page = $(pageData);

      var js = $page.find("script[src]").attr('src');
      fetchUrl(null, reloadurl+js, function(pageData2) {
        grunt.file.write('dist/assets/js/papitas.js',pageData2);
      });

      var css = $page.find("link[href]").attr('href');
      fetchUrl(done, reloadurl+css, function(pageData2) {
        grunt.file.write('dist/assets/css/papitas.css',pageData2);
      });
    });
  });
};
