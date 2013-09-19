(function() {
  module.exports.register = function(Handlebars, options) {

    var grunt = require('grunt');

    /**
    * TODO: add comment
    */
    Handlebars.registerHelper("postindex", function (pages, count, options) {
      // only show posts that were posted today or in the past
      var posts = pages
          .filter(function(page) {
            return page.src.indexOf('posts') > -1 && page.data.date < new Date();
          })
          .sort(function(p1, p2) {
            var date1 = p1.data.date;
            var date2 = p2.data.date;
            if (date1 === date2) {
              return 0;
            }
            // sort dates in descending order: most recent first
            return date1 > date2 ? -1 : 1;
          })
          .slice(0, count);

      var i;
      var len;
      var result = '';
      var index;
      for (index = i = 0, len = posts.length; i < len; index = ++i) {
        var post = posts[index];
        result += options.fn({
          post: post,
          isFirst: index === 0
        });
      }
      return result;
    });
  };
}).call(this);
