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
      meteor: {
        files: ['src/app/.meteor/local/build/programs/client/*.{js,css}'],
        tasks: ['copyAllAppAssets']
      }
    },
    uglify: {
      libs: {
        files: {
          'dist/assets/js/lib/base.js': [
            '<%= bowerDirectory %>/jquery/dist/jquery.min.js',
            // '<%= bowerDirectory %>/bootstrap/dist/js/bootstrap.min.js',
            '<%= bowerDirectory %>/jReject/js/jquery.reject.js'
          ],
          'dist/assets/js/lib/phaser.js': [
            '<%= bowerDirectory %>/phaser-official/build/custom/phaser-arcade-physics.min.js'
          ]
        },
      }
    },
    concat: {
      libs: {
        files: {
          'dist/assets/js/lib/base.js': [
            '<%= bowerDirectory %>/jquery/dist/jquery.js',
            '<%= bowerDirectory %>/bootstrap/dist/js/bootstrap.js',
            '<%= bowerDirectory %>/jquery.browser/dist/jquery.browser.min.js',
            '<%= bowerDirectory %>/jReject/js/jquery.reject.js'
          ],
          'dist/assets/js/lib/phaser.js': [
            '<%= bowerDirectory %>/phaser-official/build/custom/phaser-arcade-physics.js'
          ]
        },
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
      appAssets: {
        expand: true,
        cwd: 'src/app/.meteor/local/build/programs/client/assets/',
        src: ['**/*.{json,mp3,ogg}'],
        dest: 'dist/assets/'
      },
      appPackagedJs: {
        src: 'src/app/.meteor/local/build/programs/client/*.js',
        dest: 'dist/assets/js/papitas.js'
      },
      appPackagedCss: {
        src: 'src/app/.meteor/local/build/programs/client/*.css',
        dest: 'dist/assets/css/papitas.css'
      },
      'less-dist-files': {
        files: [
          {
            expand: true,
            cwd: '<%= bowerDirectory %>/bootstrap/dist/fonts/',
            src: ['**'],
            dest: 'dist/assets/fonts/'
          }
        ]
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
      },
      'libs-css': {
        files: [
          {
            expand: true,
            src: '<%= bowerDirectory %>/jReject/css/jquery.reject.css',
            dest: 'tmp/z.css'
          },
        ]
      },
      images: {
        files: [
          {
            expand: true,
            cwd: 'images/',
            src: ['**/*.{png,jpg,gif}'],
            dest: 'dist/assets/images/'
          },
          {
            expand: true,
            cwd: 'src/app/.meteor/local/build/programs/client/assets/images/',
            src: ['**/*.{png,jpg,gif,svg}'],
            dest: 'dist/assets/images/'
          },
        ]
      }
    },
    image: {
      assets: {
        files: [{
          expand: true,
          cwd: 'images/', 
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dist/assets/images/'
        }]
      },
      app: {
        files: [{
          expand: true,
          cwd: 'src/app/public/', 
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dist/'
        }]
      },
      libs: {
        files: [{
          expand: true,
          cwd: '<%= bowerDirectory %>/jReject/images', 
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dist/assets/images/browsers'
        }]
      }
    },
    exec: {
      build: {
        cmd: 'jekyll build'
      },
      serve: {
        cmd: 'jekyll serve'
      },
      meteorStart: {
        cmd: [
          "export MONGO_URL=' '",
          "export DDP_DEFAULT_CONNECTION_URL=' '",
          "cd src/app",
          "meteor --port 5000 --production"
        ].join(' && ')
      },
      meteorStartDev: {
        cmd: [
          "export MONGO_URL=' '",
          "export DDP_DEFAULT_CONNECTION_URL=' http://norul/'",
          "cd ./src/app",
          "meteor"
        ].join(' && ')
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
        tasks: [ 'exec:serve','exec:meteorStart', 'watch'],
        options: {
            logConcurrentOutput: true
        }
      },
      default: {
        tasks: ['exec:serve', 'watch'],
        options: {
            logConcurrentOutput: true
        }
      },
      build: {
        tasks: ['exec:meteorStart', 'delayedCopyMeteorAssets'],
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
    'copy:libs-css', 'copy:images',
    'copyAllAppAssets',
    'copy:less-dist-files', 'clean', 'concurrent:default'
  ]);

  grunt.registerTask('copyAllAppAssets', [
    'copy:appAssets', 'copy:appPackagedJs',
    'copy:appPackagedCss'
  ]);

  grunt.registerTask('dev', [
    'copy:less-src-files', 'less', 'concat', 'copy:unminified-css-files', //'image',
    'copy:less-dist-files', 'clean', 'copy:appAssets', 'concurrent:dev'
  ]); 

  grunt.registerTask('buildJekyll',  [
    'image', 'copy:less-src-files', 'copy:libs-css', 'less', 'uglify', 'cssmin',
    'copy:less-dist-files', 'exec:build', 'copy:appAssets',
    'copy:appPackagedJs', 'copy:appPackagedCss', 'clean'
  ]);

  grunt.registerTask('build',  [
    'buildJekyll'//, 'concurrent:build'
  ]);

  grunt.registerTask('dist',  ['build']);

  grunt.registerTask('deploy',  [
    'build', 'gh-pages'
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
        grunt.log.writeln('Writing to: dist/assets/js/papitas.js');
        grunt.file.write('dist/assets/js/papitas.js',pageData2);
      });

      var css = $page.find("link[href]").attr('href');
      fetchUrl(done, reloadurl+css, function(pageData2) {
        grunt.log.writeln('Writing to: dist/assets/css/papitas.css');
        grunt.file.write('dist/assets/css/papitas.css',pageData2);
      });
    });
  });

  grunt.registerTask('delayedCopyMeteorAssets', 'Wait for it', function() {
    var done = this.async();

    setTimeout(function() {
      grunt.task.run('copyMeteorAssets');
      done();
    }, 10000);
  });

  grunt.registerTask('updatePapas', 'Busca la ultima version de google docs y crea el json', function() {
    var done = this.async();
    var reloadurl = 'https://docs.google.com/spreadsheets/d/1jVo4O67KOY4YdZg6sTCOiKdJHWvLomZQTw_hnZwAR_w/export?gid=1793186240&format=csv';
    var header = "numero,nombre,nombreAlternativo,significadoNombre,colorFlor,"+
      "toleranciaGranizada,colorPulpa,formaRara,toleranciaHelada,usoCocina,lugar,audioIni,audioFin";

    fetchUrl(null, reloadurl, function(fileData) {
      fileData = fileData.replace(/$.*\n.+/,header);
      grunt.log.writeln(fileData);

      // grunt.log.writeln('Writing to: dist/assets/js/papitas.js');
      // grunt.file.write('dist/assets/js/papitas.js',pageData2);

      // var js = $page.find("script[src]").attr('src');
      // fetchUrl(null, reloadurl+js, function(pageData2) {
        
      // });

      // var css = $page.find("link[href]").attr('href');
      // fetchUrl(done, reloadurl+css, function(pageData2) {
      //   grunt.log.writeln('Writing to: dist/assets/css/papitas.css');
      //   grunt.file.write('dist/assets/css/papitas.css',pageData2);
      // });
    });
  });
};
