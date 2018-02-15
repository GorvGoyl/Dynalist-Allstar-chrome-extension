"use strict";
var contextMenu = '.ContextMenu.DocumentItemContextMenu';
var position = ' >:nth-child(1)';
var menuItem_Side = '<ul class="MenuGroup"><li onclick="open_side_doc(this)" class="open-in-side-li MenuItem"><div style="display: inline-flex;"><img class="MenuItem-icon side-icon" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDU1Mi4zNTUgNTUyLjM1NSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTUyLjM1NSA1NTIuMzU1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTU1Mi4zNTUsMEgwdjU1Mi4zNTVoNTUyLjM1NVYweiBNMzEuMzc3LDg0LjQxOWgyMjYuNjU0djQzNi41NTdIMzEuMzc3Vjg0LjQxOXogTTUyMC45NzcsNTIwLjk3N0gyOTQuMzIyVjg0LjQxOWgyMjYuNjU0ICAgIFY1MjAuOTc3eiIgZmlsbD0iIzAwOGFmZiIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo="></div><span class="MenuItem-name">Open in side</span></li></ul>';
var documentHeaderCls = ".DocumentItem-header";
var selected_2 = "selected_2";
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

$(contextMenu + position).after(menuItem_Side);

$(".open-in-side-li").hover(
    function() {
        $(this).find('img').css('filter','grayscale(1) brightness(2)')
    }, function() {
        $(this).find('img').css('filter','')
    }
  );


$(documentHeaderCls).on("contextmenu", function () {
    $(documentHeaderCls).removeClass(selected_2);
    $(this).addClass(selected_2);
});
$(shortcutCloseBtnCls).on("click", function (e) { adjustDocsWidth(); });
$(shortcutOpenBtnCls).on("click", function (e) { adjustDocsWidth(); });

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

//left pane width change
new MutationObserver(function (mutations) {
    leftPaneEvent();
}).observe(document.querySelector(leftpanecontainer), {
    attributes: true
});

var leftPaneEvent = _debounce(function () {
    adjustDocsWidth();
}, 500);

//right pane show hide
// new MutationObserver(function (mutations) {
//     rightPaneEvent('rightpane');
// }).observe(document.querySelector(shortcutpane), {
//     attributes: true
// });
// var rightPaneEvent = _debounce(function () {
//     adjustDocsWidth();
// }, 500);


function open_side_doc(el) {
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
    var iframe = '<div class="iframewrapper" style="position:absolute;top:0;right:0;z-index:1;height:100%;width:' + halfWidth + 'px;"><iframe onload="loadEventiFrame(this)" class="sidedociframecls" src="' + DOC_URL + '"  frameborder="0" height="100%" width=' + halfWidth + 'px style="" allowfullscreen></iframe></div>';
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

function isSideDocOpen() {
    if($(iframewrapper) && $(iframewrapper).width() >0){
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

function close_side_doc() {
    $(iframewrapper).remove();
    DYNALIST.app.userspace.ui.pane_ui._update_nav_width();

}

function loadEventiFrame(el) {
    
    var bckp = localStorage.dynalist;
    // trim extra divs

    $(el).contents().find('.AppHeader,.GlobalSearchPage,.LeftPaneSlidebarContainer,.LeftPaneSplitter,.ShortcutHelp,.DocumentTools').remove();
    // add close button
    $(el).contents().find('.Document').prepend('<div class="DocumentTools sidedoc"> <div class="close-btn DocumentTools-icon iframe-close js-stop-mousedown-propagation" style=""></div> </div>');
    $(el).contents().find('.DocumentTools.sidedoc').show();
    $(el).contents().find(".iframe-close").on('click', close_side_doc);
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