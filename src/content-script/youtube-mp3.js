var url = window.location.search.replace(/\?url=(.+)/i, '$1');
if (url) {
  $('#youtube-url').val(decodeURIComponent(url));
  $('#submit').click();

  var when = function(truthTest, done) {
    if (truthTest() === true) {
      done();
    }
  }

  var checkIfDownloadUrlAvailable = function(done) {
    if ($('#dl_link>a:visible').size() > 0) {
      return done($('#dl_link>a:visible').attr('href'));
    }
    return _.defer(checkIfDownloadUrlAvailable);
  };

  new Promise(function(resolve) {
    function checkIfDownloadUrlAvailable () {
      if ($('#dl_link>a:visible').size() > 0) {
        return resolve($('#dl_link>a:visible').attr('href'));
      }
      return _.defer(checkIfDownloadUrlAvailable);
    }

    checkIfDownloadUrlAvailable();
  })
    .then(function(downloadUrl) {
      window.open(downloadUrl);
      self.close();
    });
}
