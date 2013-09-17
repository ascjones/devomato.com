module.exports = function(grunt) {

  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      assemble: {
        options: {
          assets: 'public/assets',
          partials: 'partials/*.hbs',
          layoutdir: 'layouts',
          production: process.env.NODE_ENV === 'production'
        },
        blog: {
          options : {
            engine: 'handlebars',
            layout: 'post.hbs',
            ext: '.html' // hack from https://github.com/assemble/assemble/issues/265 for pretty urls - added after file ext below
          },
          files: [
            {expand: true, cwd: 'blog', src: ['*.md'], dest: './out/blog', ext: '/index'}
          ]
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
  grunt.registerTask('default', ['assemble']);
}
