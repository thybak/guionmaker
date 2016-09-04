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
            cwd: './bower_components/react',
            dest: './libs/react',
            flatten: true,
            filter: 'isFile',
            src:
            [
              'react.min.js',
              'react-dom.min.js'
            ]
          },
          {
            expand: true,
            cwd: './bower_components',
            dest: './libs/jquery',
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
            dest: './libs/semantic-ui',
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
  grunt.registerTask('default', ['copy']);
};