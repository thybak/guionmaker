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
                        cwd: './bower_components/bootstrap/dist',
                        dest: './public/src/assets/bootstrap',
                        src:
                        [
                            '**/**'
                        ]
                    },
                    {
                        expand: true,
                        cwd: './bower_components/jquery/dist',
                        dest: './public/src/assets/jquery',
                        src:
                        [
                            'jquery.min.*'
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