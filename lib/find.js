var cheerio = require('cheerio');

var Finder = {};

Finder.find = function(body) {

  var icons = [], icon, $ = cheerio.load(body);

  /**
   * Opengraph protocol images
   * @url http://ogp.me/#structured
   *
   * * @todo  Blacklist od:image:width et al. tags
   */
  icons.push({
    'type'  : 'opengraph',
    'image' : $('meta[property~="og:image"]').attr('content')
  });

  /**
   * Twitter Cards
   * @url https://dev.twitter.com/cards/markup
   *
   * @todo  Blacklist twitter:image:width et al. tags
   */
  icons.push({
    'type'  : 'twitter',
    'image' : $('meta[name~="twitter:image"]').attr('content')
  });

  /**
   * Schema.org Google+ markup
   * @url https://developers.google.com/+/web/snippet/
   *
   * @todo  The attribute can also be 'src' instead of content
   */
  icons.push({
    'type'  : 'schema.org',
    'image' : $('[itemprop="image"]').attr('content')
  });

  /**
   * Apple Touch Icons
   * @url https://mathiasbynens.be/notes/touch-icons
   *
   * @todo  Separate precomposed from composed icons
   * @todo  Also support no-html touch icons
   */
  icons.push({
    'type'  : 'apple',
    'image' : $('link[rel="apple-touch-icon"]').attr('href')
  });

  /**
   * Ye Olde favicons
   * @url http://www.w3.org/2005/10/howto-favicon
   *
   * @todo  Look for a favicon.ico, no DOM manipulation
   */
  icons.push({
    'type'  : 'favicon',
    'image' : $('link[rel~="icon"]').attr('href')
  });

  /**
   * Favicon in absence of a meta tag
   * @url https://html5.org/r/5904
   *
   * @todo  Should also work with .png and .gif files
   */

  /**
   * IDEAS:
   *
   * Firefox application manifest.webapp
   * Chrome application manifest.json
   */

  return icons;
};

module.exports = Finder;
