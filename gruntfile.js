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
        copy: {
            all: {
                // This copies all the html and css into the dist/ folder
                expand: true,
                cwd: 'app/',
                src: ['**/*.html', '**/*.css'],
                dest: 'dist/',
            }
        },
        watch: {
            js: {
                files: "app/**/*.js",
                tasks: "browserify"
            },
            html: {
                files: 'app/**/*.html',
                tasks: 'copy'
            },
            css: {
                files: 'app/**/*.css',
                tasks: 'copy'
            }
        }
    });

    // Load
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // default
    grunt.registerTask('default', ['browserify', 'copy']);
};
