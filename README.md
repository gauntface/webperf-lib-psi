webperf-lib-psi
=================

A simple tool to crawl a sitemap and produce a PageSpeed Insight Score for each page

You can use the module as follows:

    var onErrorCb = function(err) {
      console.log('There was an error while running the script: '+err);
    };
    var onCompleteCb = function() {
      console.log('Run completed successfully');
    };
    var onResultCb = function(url, type, data) {
      console.log('onResult for URL: '+url);
    };

    PSILib.on('onResult', onResultCb);

    PSILib.on('onError', onErrorCb);

    PSILib.on('onCompleted', onCompleteCb);

    PSILib.crawlSitemap(sitemapUrl);

The onResultCb gives you the URL it scored, the type will be 'psi' and the data takes the form of:

- data.score
	- PageSpeed Insights Score
- data.formattedResults.ruleResults
	- An Array of rules which PageSpeed was looking at.
