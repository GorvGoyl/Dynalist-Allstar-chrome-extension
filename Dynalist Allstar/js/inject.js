var jg = (function(){
var self = {};
var contextMenu = '.ContextMenu.DocumentItemContextMenu';
var position = ' >:nth-child(1)';
var menuItem_SideEl = '<ul class="MenuGroup menuitem-sidedoc"><li onclick="jg.open_side_doc(this)" class="open-in-side-li MenuItem"><div style="display: inline-flex;"><img style="width: 100%;margin-left: 2px;margin-right: 12px;" class="MenuItem-icon side-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAbQAAAG0BjlwfygAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAABcSURBVDiN7c8hDoBADETRX4JEciouRVB7hrkId9oEuZYMBkkxaxDUVLz0Jw1JpmOGnmOAEWi21yeMiAXA9p74hqSa1SUVSeXFa/cLf+APfCMQkk7gSHy6d0t8vgB1bhqxJYukhwAAAABJRU5ErkJggg=="></div><span class="MenuItem-name">Open in side</span></li></ul>';
var menuItem_settingsEl = '<li class="MenuItem menuitem-allstar-settings-li" onclick="jg.open_allstar_settings_popup(this)"><div class="MenuItem-icon"><img style="width:14px;margin:0;" class="MenuItem-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAARQAAAEUBOP42OwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHgSURBVCiRhdJPiE5xFMbx7/O7N81myqQxa2qahSxYGf8WShMhUorF2Li/+1I2k5XMCDspu7d7784kSYgiKUnNwp9SKLOQbJDJ4t28mXdk7vtYmJkoxlmecz5ncc4RQFVV+2yPA6uBef4eKfBV0rkY4z0toCu2tzQajel/IACKohiU9DyEcCzYnrA9F0LYtBwCCCH0Ayvruj4TgAFJd20f/x/sdrsngKeS+lWW5UfgMDAFvAH6gTvAqb6+vu+tVmtC0lFgDlgrKdq+kALMz8+/T9O0K+mT7avASWBdq9WakbQbuGR7UNIQ8G5xU6Rpug1QT0/PodHR0W9lWd4GpiWtkLQzxvgIoCzLrbaHl2AI4UO329Xs7OyuycnJB51O5zRQA19tj5Vl+UrSGtsDkj7bJgBkWfYSuCzpRqfTaQMHJR2QtAMYWhjwQtKU7VvALwiQ5/mY7Q22D9V1vTHG+DDG+La3t3dzXdf7QwjbsywbyfP8xx8QoNFovA4hpEmSPKuq6kBRFMPtdvt5kiTrsyybkuSlmwIzRVEMLiZijNeBpu2bkp4Aj4GLi/VmszkEfFFRFHslnZV0JMb4brGhqqoR26vyPL/2O0qS5JrtcS007bE9AQywzJNLmrF9Ps/z+z8BTHLaxEbRmdMAAAAASUVORK5CYII="></div><span class="MenuItem-name">Allstar Settings</span></li>'
var allstar_settings_popup_el = '<div style ="display:none;" class="modal-container allstar-settings is-shown"> <div class="modal-bg"></div>  <div class="modal js-stop-mousedown-propagation loadable-form">  <span onclick="(function(){$(&quot;.modal-container.allstar-settings&quot;).hide()})()" class="close-btn modal-close-btn"></span>  <div class="mobile-header mod-settings"><div class="MobileHeader-backIcon"></div><div class="MobileHeader-title">Allstar Settings</div>  </div>  <h1 class="modal-title">Allstar Settings</h1>  <div class="settings-tabs-container"><div class="settings-tab is-selected" data-name="preferences"> <div class="setting-section">  <div class="setting mod-checkbox"><input class="js-update-setting sidedoc-checkbox setting-checkbox" onclick ="jg.save_allstar_settings_popup(this)" type="checkbox" data-key="ui.current_highlight" id="ui.current_highlight"><label  class="setting-label mod-checkbox" for="ui.current_highlight">Open Doc in Side</label><div class="setting-explanation">Context menu option to open 2nd document side by side. Work on two documents at same time.</div>  </div> </div></div>  </div> </div></div>'
var documentHeaderCls = ".DocumentItem-header";
var selected_2 = "selected_2";
var menuitem_sidedoc = '.menuitem-sidedoc';
var mainDocCls = ".DocumentContainer";
var shortcutCloseBtnCls = ".ShortcutHelp-closeButton";
var shortcuthelp = '.ShortcutHelp';
var shortcutOpenBtnCls = ".MenuItem--shortcutHelp";
var DOC_URL = "";
var sideDociframeCls = ".sidedociframecls";
var shortcutcontainer = '.ShortcutHelp-tableContainer';
var WIDTH_MAIN_DOC = "";
var leftpanecontainer = '.LeftPaneContainer';
var WIDTH_SIDE_DOC = "";
var USER_PREF = "";
var leftpane = '.LeftPaneContainer-panes';
var shortcutpane = '.ShortcutHelp';
var iframewrapper = '.iframewrapper';
var allstar_storage_key = 'dynalist_allstar';
var allstar_val = '{"side_doc":true}';

var myInterval = setInterval(function () {

    // this page uses host website's jQuery
    if ($('.LeftPaneContainer') && $('.LeftPaneContainer').width() > 0) {

        enableFeature_SideDoc();
        $('.ContextMenu.main-menu .MenuItem.MenuItem--settings').after(menuItem_settingsEl)
        $('.modal-container.settings').before(allstar_settings_popup_el);

        $(".menuitem-allstar-settings-li").hover(
            function () {
                $(this).find('img').css('filter', 'brightness(140%)')
            }, function () {
                $(this).find('img').css('filter', '')
            }
        );
        $(documentHeaderCls).on("contextmenu", function () {
            $(documentHeaderCls).removeClass(selected_2);
            $(this).addClass(selected_2);
        });
        $(shortcutCloseBtnCls).on("click", function (e) { adjustDocsWidth(); });
        $(shortcutOpenBtnCls).on("click", function (e) {  adjustDocsWidth(); });
        //left pane width change
        new MutationObserver(function (mutations) {
            leftPaneEvent();
        }).observe(document.querySelector(leftpanecontainer), {
            attributes: true
        });

        var leftPaneEvent = _debounce(function () {
            adjustDocsWidth();
        }, 500);
        clearInterval(myInterval);

        var allstar_key = localStorage.getItem(allstar_storage_key)
        if (!allstar_key) {
            localStorage.setItem(allstar_storage_key, allstar_val)
        }

        loadAllstarSettings();
    }
}, 3000);


function loadAllstarSettings() {
    try {
        var obj = localStorage.getItem(allstar_storage_key)
        obj = JSON.parse(obj);
        if (obj.side_doc != null && obj.side_doc === false) {
            disableFeature_SideDoc();
        } else {
            enableFeature_SideDoc();
        }
    } catch (e) {
        console.log(JSON.stringify(e));
    }

}

function getValFromLocalStorage(key) {
    try {
        var obj = localStorage.getItem(allstar_storage_key)
        obj = JSON.parse(obj);
        return obj[key];
    } catch (e) {

    }
}

function saveAllstarSettingsLocalStorage(key, value) {
    var obj = localStorage.getItem(allstar_storage_key)
    obj = JSON.parse(obj);
    obj[key] = value;
    localStorage.setItem(allstar_storage_key, JSON.stringify(obj));
}

function disableFeature_SideDoc() {
    if (isSideDocOpen()) {
        close_side_doc();
    }
    $(menuitem_sidedoc).remove();
}

function enableFeature_SideDoc() {
    if ($(menuitem_sidedoc).length === 0) {
        $(contextMenu + position).after(menuItem_SideEl);
        $(".open-in-side-li").hover(
            function () {
                $(this).find('img').css('filter', 'brightness(140%)')
            }, function () {
                $(this).find('img').css('filter', '')
            }
        );
    }
}

var open_allstar_settings_popup =function(e) {
    DYNALIST.app.userspace.view.dom_events.ui.hide_context_menu();
    var popup = $(".modal-container.allstar-settings");

    var val = getValFromLocalStorage('side_doc');

    if (val != null && val === false) {
        popup.find('.sidedoc-checkbox').prop('checked', false);

    }
    else {
        popup.find('.sidedoc-checkbox').prop('checked', true);
    }

    popup.show();
}

self['open_allstar_settings_popup']=open_allstar_settings_popup;

var save_allstar_settings_popup=function(e) {
    var key = 'side_doc';
    if (e.checked === true) {
        enableFeature_SideDoc();
    } else {
        disableFeature_SideDoc();
    }
    saveAllstarSettingsLocalStorage(key, e.checked);
}

self['save_allstar_settings_popup']=save_allstar_settings_popup;

// debounce prototype
function _debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

// Observers



//right pane show hide
// new MutationObserver(function (mutations) {
//     rightPaneEvent('rightpane');
// }).observe(document.querySelector(shortcutpane), {
//     attributes: true
// });
// var rightPaneEvent = _debounce(function () {
//     adjustDocsWidth();
// }, 500);


var open_side_doc = function(el) {
    $(contextMenu).hide();
    var docname = $(documentHeaderCls + "." + selected_2).text();
    var files = DYNALIST.app.document_manager.userspace.server_files;
    DOC_URL = DYNALIST.SERVER_URL + "/d/";
    for (var key in files) {
        var doc = files[key];
        if (doc.title === docname) {
            DOC_URL += doc.server_id;
            break;
        }
    }

    var halfWidth = 0;
    if (isSideDocOpen()) {
        close_side_doc();
    }
    halfWidth = $(mainDocCls).width() / 2;
    $(mainDocCls).width(halfWidth);
    var iframe = '<div class="iframewrapper" style="position:absolute;top:0;right:0;z-index:1;height:100%;width:' + halfWidth + 'px;"><iframe onload="jg.loadEventiFrame(this)" class="sidedociframecls" src="' + DOC_URL + '"  frameborder="0" height="100%" width=' + halfWidth + 'px style="" allowfullscreen></iframe></div>';
    //hide right pane for side doc
    var obj = JSON.parse(localStorage.dynalist)
    obj['file-pane-expanded-state'] = false
    localStorage.setItem("dynalist", JSON.stringify(obj));

    // hide shortcut for side doc
    USER_PREF = JSON.parse(JSON.stringify(DYNALIST.app.userspace.ui.view.preferences.preferences));
    DYNALIST.app.userspace.ui.view.preferences.preferences['ui.shortcut_help'] = 'hide';
    DYNALIST.app.userspace.ui.view.save_preferences();
    $(mainDocCls).after(iframe);
}
self['open_side_doc'] = open_side_doc;
function isSideDocOpen() {
    if ($(iframewrapper) && $(iframewrapper).width() > 0) {
        return true;
    }
    return false;
}

function isRightPaneOpen() {
    return !($(shortcutcontainer).width() === 0);
}

function isLeftPaneOpen() {
    return !($(leftpane).width() === 0);
}

var close_side_doc= function() {
    $(iframewrapper).remove();
    DYNALIST.app.userspace.ui.pane_ui._update_nav_width();

}

self['close_side_doc']=close_side_doc;

var loadEventiFrame= function(el) {

    var bckp = localStorage.dynalist;
    // trim extra divs

    $(el).contents().find('.AppHeader,.GlobalSearchPage,.LeftPaneSlidebarContainer,.LeftPaneSplitter,.ShortcutHelp,.DocumentTools').remove();
    // add close button
    $(el).contents().find('.Document').prepend('<div class="DocumentTools sidedoc"> <div class="close-btn DocumentTools-icon iframe-close js-stop-mousedown-propagation" style=""></div> </div>');
    $(el).contents().find('.DocumentTools.sidedoc').show();
    $(el).contents().find(".iframe-close").on('click', jg.close_side_doc);
    $(el).contents().find('.normal-view').removeClass('normal-view')

    // Observers
    // side doc after load event
    var sidedocCls = $(el).contents().find(mainDocCls)[0];
    new MutationObserver(function (mutations) {
        afterLoadEventiFrame(el);
    }).observe(sidedocCls, {
        attributes: true
    });

}

self['loadEventiFrame']=loadEventiFrame;

var afterLoadEventiFrame = _debounce(function (el) {

    var obj = JSON.parse(localStorage.dynalist)
    obj['file-pane-expanded-state'] = true
    localStorage.setItem("dynalist", JSON.stringify(obj));

    DYNALIST.app.userspace.ui.view.preferences.preferences = USER_PREF;
    DYNALIST.app.userspace.ui.view.save_preferences();
}, 500);

function adjustDocsWidth(a) {

    var totalWidth = 0;
    var mainDocWidth = 0;
    if (isSideDocOpen()) {


        // approach:
        // total width
        totalWidth = $('.main-container').width();

        // left pane width
        mainDocWidth = totalWidth - $('.LeftPaneSlidebarContainer').width() - $('.LeftPaneSplitter').width() - 4;
        if (isRightPaneOpen()) {
            // right pane width
            mainDocWidth -= $(shortcutpane).width();
        }

        //side doc width
        mainDocWidth -= $(iframewrapper).width();

        //end

        $(mainDocCls).width(mainDocWidth);
    }
}

// find events attached to click jquery
        //var handlers = $._data($('.close-btn.ShortcutHelp-closeButton').get(0), "events");
        //handlers.resize[0].handler(this);

//DYNALIST.app.userspace.ui.pane_ui._update_nav_width();
//window.dispatchEvent(new Event('resize'));
//DYNALIST.app.userspace.ui.view.save_preferences;
return self;
})();