// Asynchronous loading of delicious & flickr feeds
$(document).ready(function () {
  $('#flickrfeed').jflickrfeed({
      limit: 6,
      qstrings: {
          id: '21564949@N00'
      },
      itemTemplate:
      '<li>' +
          '<a rel="colorbox" href="{{image_b}}" title="{{title}}">' +
              '<img src="{{image_s}}" alt="{{title}}" />' +
          '</a>' +
      '</li>'
  }, function(data) {
      $('#flickrfeed a').colorbox();
  });

  $('#delicious-feed').delicious ('arnaud.didry' ,{popopen:true});
});









