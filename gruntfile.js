module.exports = function (grunt) {
    grunt.initConfig({
        browserify: {
            js: {
                src: 'app/js/app.js',
                dest: 'dist/js/app.js',
                options: {
                    external: ['angular'],
                    debug: true,
                    browserifyOptions: {
                        debug: true
                    }
                }
            }
        },
        sass: {
          dist : {
              options: {
                    style: 'expanded',
              },
              files: {
                  './dist/css/style.css' : './app/css/style.scss'
              }
          }
        },
        copy: {
            all: {
                // This copies all the html and css into the dist/ folder
                expand: true,
                cwd: 'app/',
                src: ['**/*.html', '**/**/*.html', '**/*.png'],
                dest: 'dist/',
            }
        },
        watch: {
            js: {
                files: ["app/**/*.js", "app/**/**/*.js"],
                tasks: "browserify"
            },
            html: {
                files: 'app/**/*.html',
                tasks: 'copy'
            },
            layout: {
                files: 'app/*.html',
                tasks: 'copy'
            },
            css: {
                files: 'app/**/*.scss',
                tasks: 'sass'
            }
        }
    });

    // Load
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // default
    grunt.registerTask('default', ['browserify', 'copy']);
};
