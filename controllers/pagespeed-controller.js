var pagespeed = require('gpagespeed');

exports.scoreUrls = function(urlsArray, cb) {
	var options = {
	    // key: '...', optional
	    url: 'http://html5rocks.com',
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
		cb(null);
		return;
	}

	options.url = urlsArray[index];

	pagespeed(options, function(err, data){
		var response = JSON.parse(data);
	    cb('onResult', 'psi', data);

	    getPSIScrores(index+1, urlsArray, options, cb);
	});
}