var fs = require('fs');

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
    },
    'template': {
      'pages': {
        'options': {
          data: {
            'header': fs.readFileSync('app/header.html'),
            'footer': fs.readFileSync('app/footer.html'),
            'sidebar': fs.readFileSync('app/sidebar.html'),
          }
        },
        'files': {
          'public/index.html': ['app/pages/index.html'],
          'public/about/index.html': ['app/pages/about.html'],
          'public/activities/index.html': ['app/pages/activities.html'],
          'public/checklist/index.html': ['app/pages/checklist.html'],
          'public/gameslist/index.html': ['app/pages/gameslist.html'],
          'public/location/index.html': ['app/pages/location.html']
        }
      }
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
        tasks: ['template'],
      },
      pages: {
        files: ['./app/pages/*.html'],
        tasks: ['template'],
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
  grunt.loadNpmTasks('grunt-template');

  // Task definition
  grunt.registerTask('default', ['connect', 'watch']);

};
