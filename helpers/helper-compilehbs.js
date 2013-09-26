(function() {
  module.exports.register = function(Handlebars, options) {

    var grunt = require('grunt');

    /**
    * {{striphbsescape}}
    *
    * Strips out leading escape chars for handlebars code in markdown.
    * @param  {[type]} options [description]
    * @return {[type]}         [description]
    * @example:
    *   {{#striphbsescape}}
    *     # some markdown with handlebars code
    *     ```handlebars
    *     \{{escaped}}
    *     Here is some more content after the excerpt
    *   {{/striphbsescape}}
    * @result:
    *   # some markdown with handlebars code
    *     ```handlebars
    *     {{escaped}}
    */
    Handlebars.registerHelper("striphbsescape", function (options) {
      var content = options.fn(this);
      var tmpl = Handlebars.compile(content);
      return tmpl(this);
    });
  }
}).call(this);
