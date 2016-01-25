// Gruntfile.js
module.exports = function (grunt) {
  grunt.initConfig({
    // Watch task config
    watch: {
      sass: {
        files: "scss/*.scss",
        tasks: ['sass', 'postcss']
      },
      jshint: {
        files: "js/*.js",
        tasks: ['jshint:all']
      },
      scsslint: {
        files: 'scss/*.scss',
        tasks: ['scsslint']
      }
    },
    // SASS task config
    sass: {
      dev: {
        options: {
          style: 'compressed'
        },
        files: {
          // destination         // source file
          "css/main.css" : "scss/main.scss"
        }
      }
    },

    jshint: {
      all: ['js/*.js']
    },

    // Using the BrowserSync Server for your static .html files.
    browserSync: {
      default_options: {
        bsFiles: {
          src: [
            "css/*.css",
            "*.html"
          ]
        },
        options: {
          watchTask: true,
          server: {
            baseDir: './'
          }
        }
      }
    },

    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')({browsers: ['last 4 versions', '> 1%']})
        ]
      },
      dist: {
        src: 'css/*.css'
      }
    },

    scsslint: {
      allFiles: ['scss/main.scss'],
      options: {
        config: '.scss-lint.yml',
        reporterOutput: 'scss-lint-report.xml',
        colorizeOutput: true,
        emitError: true
      },
    },

    csscomb: {
      dist: {
        options: {
          config: 'csscomb.json'
        },
        files: {
          'css/main.css': ['css/main.css']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-csscomb');
  grunt.loadNpmTasks('grunt-scss-lint');
  grunt.registerTask('default', ['browserSync', 'watch', 'postcss:dist', 'csscomb', 'scsslint']);
};