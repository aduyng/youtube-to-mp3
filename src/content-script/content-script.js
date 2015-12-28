function start () {
  if (/\?v=.+/.test(window.location.toString()) && $('#ytmp3').size() === 0) {
    var TEMPLATE = _.template(
      '<div id="ytmp3">' +
      '<button id="ytmp3-button" class="yt-uix-button yt-uix-button-size-default yt-uix-button-default">Download MP3</button>' +
      '</div>'
    );

    var container = $(TEMPLATE({}));
    var button = container.find('#ytmp3-button');
    button.on('click', function(e) {
      e.stopPropagation();
      e.preventDefault();
      var downloadWindow = window.open('http://www.youtube-mp3.org/?url=' + encodeURIComponent(window.location.toString()), '', 'width=10,height=10,resizable=no');
      downloadWindow.resizeTo(0, 0);
      downloadWindow.moveTo(0, window.screen.availHeight + 10);
      downloadWindow.blur();
      self.focus();
    });


    function injectButton () {
      if ($('#watch-headline-title').size() > 0) {
        return $('#watch-headline-title').append(container);
      }
      return _.defer(injectButton);
    }

    injectButton();
  }
}

$(function() {
  start();
  setInterval(start, 1000);
});
