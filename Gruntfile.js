module.exports = function(grunt) {

  //Initializing the configuration object
    grunt.initConfig({
    connect: {
      server: {
        options: {
          port: 3000,
          base: 'public'
        }
      }
    },
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
    copy: {
      images: {
        files: [
          {expand: true, flatten: true, src: ['app/assets/images/*'], dest: 'public/assets/images/', filter: 'isFile'},
        ]
      },
      cname: {
        files: [
          {expand: true, cwd: 'app/', src: ['CNAME'], dest: 'public/'},
        ]
      }
    },
    concat: {
      js: {
        options: {
          separator: ';',
        },
        src: [
          './bower_components/jquery/jquery.js',
          './bower_components/bootstrap/dist/js/bootstrap.js',
          './app/assets/javascript/hoglan.js'
        ],
        dest: './public/assets/javascript/hoglan.js',
      },
      index: {
        src: [
          './app/header.html',
          './app/index.html',
          './app/footer.html'
        ],
        dest: './public/index.html',
      },
    },
    uglify: {
      options: {
        mangle: false
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
        js: {
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
        images: {
          files: ['./app/assets/images/*'],
          tasks: ['copy:images'],
        },
        html: {
          files: ['./app/*.html'],
          tasks: ['concat:index'],
        },
        cname: {
          files: ['./app/CNAME'],
          tasks: ['copy:cname'],
        },
      }
    });

  // Plugin loading
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Task definition
  grunt.registerTask('default', ['connect', 'watch']);

};
