var PORT = 3000;

var sitemapCrawler = require('./crawlers/sitemap-crawler');
var pagespeedController = require('./controllers/pagespeed-controller');
var EventEmitter = require('events').EventEmitter;

function PSILib() {
	EventEmitter.call(this);

	this.crawlSitemap = function(url) {
		sitemapCrawler.performCrawl(url, function(err, urlArray) {
			if(err) {
				this.emit('onError', 'Unable to fetch and parse the sitemap: '+JSON.stringify(err));
				return;
			}

			this.scoreUrls(urlArray);
		}.bind(this));
	};

	this.scoreUrls = function(urlArray) {
		pagespeedController.scoreUrls(urlArray, function(eventName, url, type, data) {
			this.emit(eventName, url, type, data);
		}.bind(this));
	};
};

PSILib.prototype.__proto__ = EventEmitter.prototype;

module.exports = new PSILib();