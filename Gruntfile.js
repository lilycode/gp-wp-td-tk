/*global module:false*/
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*\nTheme Name: <%= pkg.title || pkg.name %>\n' +
      'Version: <%= pkg.version %>\n' +
      'Author: <%= pkg.author.name %> <<%= pkg.author.email %>>\n' +
      'Author URI: <%= pkg.author.uri %>\n' +
      'Description: <%= pkg.description %>\n' +
      'License: <%= pkg.license %>\n' +
      'Text Domain: <%= pkg.textDomain %>\n' +
      'Domain Path: /languages/\n' +
      'Tags: <%= _.each(pkg.tags).join(", ") %>\n' +
      'Copyright: (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>. All rights reserved.\n*/\n',
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: false
      },
      scripts: {
        src: ['scripts/*.js'],
        dest: 'js/app.js'
      },
      styles: {
        src: ['css/style.css'],
        dest: 'style.css'
      }
    },
    uglify: {
      app: {
        options: {
          banner: '<%= banner %>'
        },
        files: {
          'js/app.min.js': ['<%= concat.scripts.dest %>']
        }
      },
      modernizr: {
        files: {
          'js/modernizr.min.js': ['bower_components/modernizr/modernizr.js']
        }
      },
      foundation: {
        files: {
          'js/foundation/foundation.abide.min.js': ['bower_components/foundation/js/foundation/foundation.abide.js'],
          'js/foundation/foundation.accordion.min.js': ['bower_components/foundation/js/foundation/foundation.accordion.js'],
          'js/foundation/foundation.alert.min.js': ['bower_components/foundation/js/foundation/foundation.alert.js'],
          'js/foundation/foundation.clearing.min.js': ['bower_components/foundation/js/foundation/foundation.clearing.js'],
          'js/foundation/foundation.dropdown.min.js': ['bower_components/foundation/js/foundation/foundation.dropdown.js'],
          'js/foundation/foundation.equalizer.min.js': ['bower_components/foundation/js/foundation/foundation.equalizer.js'],
          'js/foundation/foundation.interchange.min.js': ['bower_components/foundation/js/foundation/foundation.interchange.js'],
          'js/foundation/foundation.joyride.min.js': ['bower_components/foundation/js/foundation/foundation.joyride.js'],
          'js/foundation/foundation.min.js': ['bower_components/foundation/js/foundation/foundation.js'],
          'js/foundation/foundation.magellan.min.js': ['bower_components/foundation/js/foundation/foundation.magellan.js'],
          'js/foundation/foundation.offcanvas.min.js': ['bower_components/foundation/js/foundation/foundation.offcanvas.js'],
          'js/foundation/foundation.orbit.min.js': ['bower_components/foundation/js/foundation/foundation.orbit.js'],
          'js/foundation/foundation.reveal.min.js': ['bower_components/foundation/js/foundation/foundation.reveal.js'],
          'js/foundation/foundation.tab.min.js': ['bower_components/foundation/js/foundation/foundation.tab.js'],
          'js/foundation/foundation.tooltip.min.js': ['bower_components/foundation/js/foundation/foundation.tooltip.js'],
          'js/foundation/foundation.topbar.min.js': ['bower_components/foundation/js/foundation/foundation.topbar.js']
        }
      }
    },
    copy: {
      js: {
        files: [
          {expand: true, flatten: true, src: ['bower_components/jquery/*.js'], dest: 'js/', filter: 'isFile'},
          {expand: true, flatten: true, src: ['bower_components/modernizr/modernizr.js'], dest: 'js/', filter: 'isFile'},
          {expand: true, flatten: true, src: ['bower_components/foundation/js/foundation*.js'], dest: 'js/', filter: 'isFile'},
          {expand: true, flatten: true, src: ['bower_components/foundation/js/foundation/*.js'], dest: 'js/foundation/', filter: 'isFile'}
        ]
      },
      css: {
        files: [
          {expand: true, flatten: true, src: ['css/rtl.css'], dest: './', filter: 'isFile'},
          {expand: true, flatten: true, src: ['_s/layouts/*.css'], dest: 'layouts/', filter: 'isFile'}
        ],
        options: {
          process: function (content, srcpath) {
            p = grunt.file.readJSON('package.json');
            return content.replace(/grunted/g, p.name);
          }
        }
      },
      underscores: {
        files: [
          {expand: true, flatten: true, src: ['_s/*.php'], dest: './', filter: 'isFile'},
          {expand: true, flatten: true, src: ['_s/inc/*.php'], dest: 'inc/', filter: 'isFile'},
          {expand: true, flatten: true, src: ['_s/languages/*'], dest: 'languages/', filter: 'isFile'}
        ],
        options: {
          process: function (content, srcpath) {
            p = grunt.file.readJSON('package.json');
            return content.replace(/grunted/g, p.name);
          }
        }
      }
    },
    rename: {
      languages: {
        files: [
          {src: ['languages/grunted.pot'], dest: 'languages/<%= pkg.name %>.pot'},
        ]
      }
    },
    compress: {
      main: {
        options: {
          archive: 'pkg/<%= pkg.title || pkg.name %>-<%= pkg.version %>.zip'
        },
        files: [
          { expand: true, src: ['js/**'], dest: '/', filter: 'isFile' },
          { expand: true, src: ['css/**'], dest: '/', filter: 'isFile' },
          { expand: true, src: ['inc/**'], dest: '/', filter: 'isFile' },
          { expand: true, src: ['*.css'], dest: '/', filter: 'isFile' },
          { expand: true, src: ['*.php'], dest: '/', filter: 'isFile' },
          { expand: true, src: ['languages/**'], dest: '/', filter: 'isFile' },
          { expand: true, src: ['layouts/**'], dest: '/', filter: 'isFile' },
          { expand: true, src: ['fonts/**'], dest: '/', filter: 'isFile' },
          { expand: true, src: ['images/**'], dest: '/', filter: 'isFile' }
        ]
      }
    },
    compass: {
      compile: {
        options: {
          config: 'config.rb'
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-rename');

  // Default task.
  grunt.registerTask('default', ['compass', 'copy', 'rename', 'concat', 'uglify', 'compress']);

};
