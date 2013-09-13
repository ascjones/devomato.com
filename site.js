var kerouac = require('kerouac');
var site = kerouac();

if (process.env.NODE_ENV === 'development') {
  site.set('base url', 'http://localhost:3000/');  
}
else {
  site.set('base url', 'http://devomato.com/');
}
site.set('output', 'devomato.com');

site.engine('ejs', require('ejs-locals'));

site.plug(require('kerouac-blog')('blog'));

site.content('content');
site.static('public');

site.generate(function(err) {
  if (err) {
    console.error(err.message);
    console.error(err.stack);
    return;
  }
});