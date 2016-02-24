// Get background-color values from the current tab
// and open them in Colorpeek.
function getBgColors (tab) {
  injectedMethod(tab, 'getBgColors', function (response) {
    var colors = response.data;
    if (colors && colors.length) {
      var url = 'http://colorpeek.com/#' + colors.join(',');
      chrome.tabs.create({ url: url });
    } else {
      alert('No background colors were found! :(');
    }
    return true;
  })
}