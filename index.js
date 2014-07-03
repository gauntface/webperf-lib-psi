var PORT = 3000;

var sitemapCrawler = require('./crawlers/sitemap-crawler');
var pagespeedController = require('./controllers/pagespeed-controller');
var EventEmitter = require('events').EventEmitter;

function PageSpeedMonitor() {
	EventEmitter.call(this);

	this.crawlSitemap = function(url) {
		sitemapCrawler.performCrawl(url, function(err, urlArray){
			if(err) {
				emitter.emit('onError', err);
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

PageSpeedMonitor.prototype.__proto__ = EventEmitter.prototype;

module.exports = new PageSpeedMonitor();