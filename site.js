var kerouac = require('kerouac');
var site = kerouac();

site.set('base url', 'http://devomato.com/');
site.set('output', 'devomato.com');

site.engine('ejs', require('ejs-locals'));

site.plug(require('kerouac-blog')('posts'));

site.content('content');
site.static('public');

// site.plug(require('kerouac-sitemap')());

site.generate(function(err) {
  if (err) {
    console.error(err.message);
    console.error(err.stack);
    return;
  }
});