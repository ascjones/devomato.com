module.exports = function(grunt) {

  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      assemble: {
        options: {
          assets: 'out/assets',
          helpers: 'helpers/helper-*.js',
          partials: 'partials/*.hbs',
          layoutdir: 'layouts',
          production: process.env.NODE_ENV === 'production'
        },
        posts: {
          options : {
            engine: 'handlebars',
            layout: 'post.hbs',
            ext: '.html' // hack from https://github.com/assemble/assemble/issues/265 for pretty urls - added after file ext below
          },
          files: [
            {expand: true, cwd: 'blog/posts', src: ['*.md'], dest: './out/blog', ext: '/index'},
            {'out/blog/index.html': ['blog/index.hbs']}
          ]
        }
      },

      clean: ["out"],

      copy: {
        main: {
          files: [
            {expand: true, src: ['assets/**'], dest: 'out/'}
          ]
        }
      },

      bower: {
        install: {
          options: {
            // cleanup: true,
            targetDir: './out/assets',
          }
        }
      },

      watch: {
        files: ['blog/*.md'],
        tasks: ['assemble'],
        options: {
          livereload: true,
        }
      },
  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.registerTask('default', ['clean', 'bower', 'copy', 'assemble']);
}
