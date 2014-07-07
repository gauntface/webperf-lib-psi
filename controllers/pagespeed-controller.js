var pagespeed = require('gpagespeed');

exports.scoreUrls = function(urlsArray, cb) {
	cb = cb || function() {};
	var options = {
	    // key: '...', optional
	    paths: '',           // optional
	    locale: 'en_GB',     // optional
	    strategy: 'mobile',  // optional
	    threshold: 80        // optional
	};
	options.nokey = options.key === void 0;
	getPSIScrores(0, urlsArray, options, cb);
}

function getPSIScrores(index, urlsArray, options, cb) {
	if(index >= urlsArray.length) {
		cb('onCompleted');
		return;
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

	    getPSIScrores(index+1, urlsArray, options, cb);
	});
}