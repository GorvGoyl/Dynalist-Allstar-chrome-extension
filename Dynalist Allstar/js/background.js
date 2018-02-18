chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
    if(message.type === 'showPageAction'){
        chrome.pageAction.show(sender.tab.id);
    }
});