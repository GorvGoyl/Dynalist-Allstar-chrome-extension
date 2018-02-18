chrome.runtime.sendMessage({ type: 'showPageAction' });
var s = document.createElement('script');
// TODO: add "script.js" to web_accessible_resources in manifest.json
s.src = chrome.extension.getURL('js/inject.min.js');
s.onload = function () {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);