module.exports = function(grunt) {
  grunt.initConfig({
    wiredep: {
      task: {
        src: 'builds/development/**/*.html'
      }
    },
    concat : {
      options: {
        separator: '\n\n//-----------------\n',
        banner: '\n\n//-----------------\n'
      },
      dist : {
        src: ['components/scripts/*.js'],
        dest: 'builds/development/js/script.js'
        },
        prod : {
          src: ['components/scripts/*.js'],
          dest: 'builds/production/js/script.js'
        }
    },

    bower_concat: {
      all: {
        dest: {
            js: 'builds/development/js/_bower.js',
            css: 'builds/development/css/_bower.css',
            coffee: 'build/_bower.coffee'
        },
        // mainFiles: {
        //   'bootstrap': ['dist/css/bootstrap.css']
        // }
      },
    },
    sass: {
      dist: {
        files: [{
            expand: true,
            cwd: 'components/sass',
            src: ['*.scss'],
            dest: 'builds/development/css',
            ext: '.css'
        }]
      }
    },

    connect : {
      server: {
        options: {
          hostname: 'localhost',
          port: 3000,
          base: 'builds/development',
          livereload: true
        }
      }
    },
    watch: {
      css: {
        files: 'components/sass/**/*.scss',
        tasks: ['sass'],
        options: {
          livereload: true
        }
      },
      options: {
        spawn: false,
        livereload: true
      },
      scripts: {
        files: ['builds/development/**/*.html',
         'components/scripts/**/*.js'],
        task: ['wiredep','bower_concat','concat', 'sass']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-bower-concat');

  grunt.registerTask('default', ['wiredep','bower_concat','concat', 'sass', 'connect', 'watch']);
};
