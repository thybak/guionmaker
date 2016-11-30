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
                        cwd: './bower_components/angular',
                        dest: './public/libs/angular',
                        flatten: true,
                        filter: 'isFile',
                        src:
                        [
                            'angular.min.js',
                            'angular.min.js.map'
                        ]
                    },
                    {
                        expand: true,
                        cwd: './bower_components',
                        dest: './public/libs/jquery',
                        flatten: true,
                        filter: 'isFile',
                        src:
                        [
                            'jquery/dist/jquery.min.js',
                            'jquery/dist/jquery.min.map'
                        ]
                    },
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
                    },
                    {
                        expand: true,
                        cwd: './bower_components/sortablejs',
                        dest: './public/libs/sortablejs',
                        src:
                        [
                            'Sortable.min.js'
                        ]
                    }
                ]
            }
        },
        ts: {
            app: {
                files: [{
                    src: ["./routes/\*\*/\*.ts", "!.baseDir.ts", "!_all.d.ts"],
                    dest: "./routes"
                }],
                options: {
                    module: "commonjs",
                    noLib: true,
                    target: "es6",
                    sourceMap: false
                }
            }
        },
        tslint: {
            options: {
                configuration: "tslint.json"
            },
            files: {
                src: ["./routes/\*\*/\*.ts"]
            }
        },
        watch: {
            ts: {
                files: ["./routes/\*\*/\*.ts", "!.baseDir.ts", "!_all.d.ts"],
                tasks: ["ts", "tslint"]
            }
        }
    });

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-tslint');

    grunt.registerTask('default', ['bower:install', 'copy', 'ts', 'tslint']);
};