(function() {
  module.exports.register = function(Handlebars, options) {

    var grunt = require('grunt');

    /**
    * {{excerpt}}
    *
    * Block helper for taking an excerpt of some text
    *
    * @param  {[type]} options [description]
    * @return {[type]}         [description]
    * @example:
    *   {{#excerpt}}
    *     Here is some content to show as an excerpt <!-- excerpt -->
    *     Here is some more content after the excerpt
    *   {{/excerpt}}
    * @result:
    *   Here is some content to show as an excerpt
    */
    Handlebars.registerHelper("excerpt", function (options) {
      var content = options.fn(this);
      var trimmed = content.trim();
      var excerptMarker = "<!-- excerpt -->";
      var indexOfExcerpt = trimmed.indexOf(excerptMarker); 
      // use the first paragraph as the excerpt if the marker is not there
      indexOfExcerpt = indexOfExcerpt === -1 ? trimmed.indexOf("\n") : indexOfExcerpt;
      return trimmed.substring(0, indexOfExcerpt);
    });
  };
}).call(this);
