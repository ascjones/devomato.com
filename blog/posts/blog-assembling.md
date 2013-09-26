---
title: 'Blog assembling'
date: 2013-09-24
tags: ['meta', 'javascript', 'assemble']
---

I've gone through several different static site generators for this blog: <a href="http://octopress.org" target="_blank">Octopress</a>, <a href="http://docpad.org" target="_blank">Docpad</a>, <a href="http://wintersmith.io/">Wintersmith</a>, and <a href="https://github.com/jaredhanson/kerouac">Kerouac</a>. They all work perfectly fine, but I'm a pernickety fellow and none worked just how I wanted. I finally settled on one I like: <a href="http://assemble.io">Assemble</a>. It fits my criteria nicely:

- Simple to use
- Flexible and extensible
- Written in Javascript
- Well structured source code I can read and understand
- Being actively developed by an engaged core team
- Relatively new, with the potential to contribute
- Pretty <a href="http://assemble.io/docs/">website</a> with good docs!

## Grunt work

I discovered Assemble when I realised that the essence of static site generation was transformation of one set of files into another set of files: a job that <a href="http://gruntjs.com/" target="_blank">Grunt</a> does quite nicely (e.g. transformation of LESS to CSS). This must have been done, I thought. And indeed a quick google search <a href="http://stackoverflow.com/questions/16007694/is-there-a-standard-static-site-generator-for-grunt-js">led me to it</a>.

To generate html files from the markdown posts, I added an assemble task to my Gruntfile:

```javascript
assemble: {
	options: {
	  assets: 'out/assets',    // path of assets e.g. css files available as variable to templates
	  layoutdir: 'layouts',    // resolve layouts from this directory
	},
	blog: {
	  options : {
	    engine: 'handlebars',  // use handlebars engine to render the pages
	    layout: 'post.hbs'     // the layout to use to generate each page
	  },
	  files: [
	  	// transform all markdown files into html files
	    {expand: true, cwd: 'blog/posts', src: ['*.md'], dest: './out/blog', ext: '.html'},
	  ]
	}
}
```

Assemble uses <a href="http://handlebarsjs.com/">Handlebars</a> as its default templating engine, and here's a basic ``post.hbs`` layout:

```handlebars
---
layout : default.hbs
---

<h1 class="page-header">\{{ title }}</h1>

<div class="content">
\{{#markdown}}
\{{> body }}
\{{/markdown}}
</div>
```

The YAML Front Matter at the beginning of the file specifies that our post layout will be rendered in place of the `\{{> body}}` of the `default.hbs` layout which contains the boilerplate html with header, script imports, body etc. The content of the markdown file itself will be converted to html by the `\{{#markdown}}` Handlebars helper which is bundled as part of assemble. Check out the <a href="http://assemble.io/docs/Layouts.html" target="_blank">docs</a> for a full explanation of layouts.

Now simply running `grunt assemble` will generate a nice set of static html pages for my blog. The current code for this blog is all up at <a href="https://github.com/ascjones/devomato.com" target="_blank">github</a>, of course. As a disclaimer it's a work in progress as I learn, and should not be taken as the idiomatic way to do things with assemble, if indeed there is one.