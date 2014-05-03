module.exports = function(grunt) {

  //Initializing the configuration object
    grunt.initConfig({

      // Task configuration
    less: {
        development: {
            options: {
              compress: true,  //minifying the result
            },
            files: {
              "./public/assets/stylesheets/hoglan.css":"./app/assets/stylesheets/hoglan.less",
            }
        }
    },
    concat: {
      options: {
        separator: ';',
      },
      js: {
        src: [
          './bower_components/jquery/jquery.js',
          './bower_components/bootstrap/dist/js/bootstrap.js',
          './app/assets/javascript/hoglan.js'
        ],
        dest: './public/assets/javascript/hoglan.js',
      },
    },
    uglify: {
      options: {
        mangle: false  // Use if you want the names of your functions and variables unchanged
      },
      main: {
        files: {
          './public/assets/javascript/hoglan.js': './public/assets/javascript/hoglan.js',
        }
      },
    },
    phpunit: {
        classes: {
        },
        options: {
        }
    },
    watch: {
        js_frontend: {
          files: [
            './bower_components/jquery/jquery.js',
            './bower_components/bootstrap/dist/js/bootstrap.js',
            './app/assets/javascript/hoglan.js'
            ],   
          tasks: ['concat:js','uglify:main'],
        },
        less: {
          files: ['./app/assets/stylesheets/*.less'],
          tasks: ['less'],
        },
      }
    });

  // Plugin loading
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Task definition
  grunt.registerTask('default', ['watch']);

};
