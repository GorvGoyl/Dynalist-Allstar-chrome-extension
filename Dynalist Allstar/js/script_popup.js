var storage_key = 'dynalist_allstar';
var allstar_val = '{"side_doc":true}';
var cb_side_doc = '#cb_side_doc';
$(document).ready(function () {
    $('.custom-checkbox').click(function (e) {
        toggleCustomCheckbox(e.target);
    })
    // setup first time local storage
    var key = localStorage.getItem('dynalist_allstar')
    if (!key) {
        localStorage.setItem('dynalist_allstar', allstar_val)
    }

    loadAllstarSettings();

    // updated: this works with Chrome 30:

});

function loadAllstarSettings() {
    try {
        var obj = localStorage.getItem('dynalist_allstar')
        obj = JSON.parse(obj);
        setCustomCheckbox(cb_side_doc, obj.side_doc);
    } catch (e) {
        console.log(JSON.stringify(e));
    }

}

function saveAllstarSettings(key, value) {
    var obj = localStorage.getItem('dynalist_allstar')
    obj = JSON.parse(obj);
    obj[key] = value;
    localStorage.setItem('dynalist_allstar', JSON.stringify(obj));
}

function toggleCustomCheckbox(el) {

    var key = 'side_doc'
    var val = '';
    var tickEl = $(el).find('.custom-tick').addBack('.custom-tick');
    if (tickEl.css('visibility') === 'hidden') {

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { method: "enableFeature_SideDoc" }, function (response) {
            });
        });
        val = true;
        tickEl.css('visibility', 'visible')
        $('.custom-checkbox').val(val)
    } else {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { method: "disableFeature_SideDoc" }, function (response) {
            });
        });
        val = false;
        tickEl.css('visibility', 'hidden')
        $('.custom-checkbox').val(val)
    }

    if (val != '') {
        saveAllstarSettings(key, val);
    }
}
function setCustomCheckbox(checkboxid, val) {
    var tickEl = $(checkboxid).find('.custom-tick').addBack('.custom-tick');
    if (val && val === true) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { method: "enableFeature_SideDoc" }, function (response) {
            });
        });
        tickEl.css('visibility', 'visible')
        $('.custom-checkbox').val(true)
    }
    else {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { method: "disableFeature_SideDoc" }, function (response) {
            });
        });
        tickEl.css('visibility', 'hidden')
        $('.custom-checkbox').val(false)
    }
}

