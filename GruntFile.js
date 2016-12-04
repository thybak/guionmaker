module.exports = function (grunt) {
    grunt.initConfig({
        bower: {
            install: {

            }
        },
        copy:
        {
            main:
            {
                files: [
                    {
                        expand: true,
                        cwd: './bower_components/semantic-ui/dist',
                        dest: './public/libs/semantic-ui',
                        src:
                        [
                            'semantic.min.css',
                            'semantic.min.js',
                            'components/**',
                            'themes/**'
                        ]
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-tslint');

    grunt.registerTask('default', ['bower:install', 'copy']);
};