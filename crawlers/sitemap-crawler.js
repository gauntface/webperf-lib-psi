var xmlStream = require('xml-stream');

exports.performCrawl = function(sitemapUrl, cb) {
  console.log('Received sitemap url: '+sitemapUrl);

  getSitemap(sitemapUrl, function(err, urls) {
    if(err) {
      cb(err);
      return;
    }

    cb(null, urls);
  })

  
}

function getSitemap(sitemapUrl, cb) {
  var httpRequest;
  if(sitemapUrl.indexOf("https") === 0) {
    httpRequest = require("https");
  } else {
    httpRequest = require("http");
  }

  var urls = [];
  httpRequest.get(sitemapUrl, function(res){
    var xml = new xmlStream(res);

    xml.on('updateElement: loc', function(loc) {
      // Change <title> child to a new value, composed of its previous value
      // and the value of <pubDate> child.
      urls.push(loc.$text);
    });

    xml.on('end', function() {
      cb(null, urls);
    });

  }).on('error', function(e) {
    cb(e, null);
  });
}