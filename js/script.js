$('#flickrfeed').jflickrfeed({
	limit: 6,
	qstrings: {
		id: '21564949@N00'
	},
	itemTemplate:
	'<li>' +
		'<a rel="colorbox" href="{{image}}" title="{{title}}">' +
			'<img src="{{image_s}}" alt="{{title}}" />' +
		'</a>' +
	'</li>'
}, function(data) {
	$('#cbox a').colorbox();
});








