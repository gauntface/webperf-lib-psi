var pagespeed = require('gpagespeed');

exports.scoreUrls = function(urlsArray, cb, timeout) {
	cb = cb || function() {};
	timeout = timeout || 500;
	var options = {
	    // key: '...', optional
	    paths: '',           // optional
	    locale: 'en_GB',     // optional
	    strategy: 'mobile',  // optional
	    threshold: 80        // optional
	};
	options.nokey = options.key === void 0;
	getPSIScrores(0, urlsArray, options, new Date().getTime(), cb);
}

function getPSIScrores(index, urlsArray, options, prevQueryTime, cb) {
	if(index >= urlsArray.length) {
		cb('onCompleted');
		return;
	}
	
	if(options.nokey) {
		// This is to make sure we aren't hitting any rate limits
		var workTime = new Date().getTime() - prevQueryTime;
		if(workTime < 500) {
			setTimeout(function () {
			    getPSIScrores(index, urlsArray, options, prevQueryTime, cb);
			  }, 500 - workTime);
			return;
		}
	}

	options.url = urlsArray[index];

	pagespeed(options, function(err, data) {
		if(err) {
			cb('onError', 'There was an error while running PageSpeed '+
				'Insights against '+options.url+': '+JSON.stringify(err));
			return;
		}

		var response = JSON.parse(data);
		
	    cb('onResult', urlsArray[index], 'psi', response);

	    prevQueryTime = new Date().getTime();
	    getPSIScrores(index+1, urlsArray, options, prevQueryTime, cb);
	});
}