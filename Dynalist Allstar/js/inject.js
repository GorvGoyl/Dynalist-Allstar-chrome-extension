var jg = (function () {
    var self = {};
    var contextMenu = '.ContextMenu.DocumentItemContextMenu';
    var position = ' >:nth-child(1)';
    var menuItem_SideEl = '<ul class="MenuGroup menuitem-sidedoc"><li onclick="jg.open_in_side(this)" class="open-in-side-li MenuItem"><div style="display: inline-flex;"><img style="width: 100%;margin-left: 2px;margin-right: 12px;" class="MenuItem-icon side-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAbQAAAG0BjlwfygAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAABcSURBVDiN7c8hDoBADETRX4JEciouRVB7hrkId9oEuZYMBkkxaxDUVLz0Jw1JpmOGnmOAEWi21yeMiAXA9p74hqSa1SUVSeXFa/cLf+APfCMQkk7gSHy6d0t8vgB1bhqxJYukhwAAAABJRU5ErkJggg=="></div><span class="MenuItem-name">Open in side</span></li></ul>';
    var menuItem_settingsEl = '<li class="MenuItem menuitem-allstar-settings-li" onclick="jg.open_allstar_settings_popup(this)"><div class="MenuItem-icon"><img style="width:14px;margin:0;" class="MenuItem-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAdgAAAHYBTnsmCAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAQRSURBVEiJpZZfiFR1FMc/57d3Z4TWmqEytY0gBKPyz0NSiyL5IFK4iRTz0Aq17u69Mw5tT5X1UBtF9GAQK8Pde3dtStqXMQ0yRUWKysCQjFBDFsE/ZRZrO9ZqNLN37unh3rFRx42l78v9/c75ne85v/P7/c65QoxisTirWq3awDPAQ8AtzAxXgOOqOlqtVv3+/v4KgAAMDw+312q1gyKyEPge+EZErsyEXVXbgOXAUuBEGIZrcrnceRkcHEwmk8kjcdRbHMd5aYaRXwPf9zcCI2EYjlWr1SVWMpl0gEWxvuP/kAOo6jxARGRhMpnsMyLSBRyP9Ss8z1s0jf20GBgYsIBsPP1JVbuMqj4AfAn8GEeQvRnBf2H+/PnrgHYgAD4XkQcN0AZMAh8CiMiGQqHQFjuTmTgIw3BTPNwPXABmi+d5CrxjjHkvDMNzQAI4AtwDzAHGRGRrKpXyMplMrU42NDS02hjzqqo+CvwNnAUWRzHKOlXtADabukFfX99vwMfxdBkwFzDA/apamJiY2FEsFmcBeJ73uogcUNXHgFlAClhCdO3PpFKpPXXeqw5izIu/ZeBlVX0ScIGaiKyvVCo7PM97CxiI1+0TkU5V3QiMxbJ0uVxuqxNa9cHIyMi9tVptFYCq9maz2V2xavfQ0NBhEflARNYCa2O5a9t2XkQUwHXdA8aYU8BtqrpaRK7dwdTUVHt93NraerhxW9lsdjuwu0F0EXihTg6Qy+XOA6cARGTuDSlKJBKnAY2dLWt04Pt+V0PkAHcAW0qlUktd4LruHOC+2MGFuvzqLXIc5xXf9/eo6hPA76r6tjHmhKp2Ej2eFuAgcIh/z+ALEdkKtKnqi0QV4SKwANhM4y0CMMZsAs4Dt4vIu6q6D8gDLaq6PwiC9Y7jvAG8GZusUtVdqro9Jq+o6rOO4/xxQ4oAent7zwZB8DDwPjABhMBJ4HkR6czn85cBHMd5TUSeBo4CU8CkiOwNw3BlNpvd28hpcR3y+fyvQA/QUyqVWiYnJ+8KgmDccZypxnW2be90Xfe7XC535nqOa7IynXJ8fPzOIAhOAic9z3ukLi8UCnM9z/vUGHPa9/3Hp+OwiOrQ7GbKWq32l2VZZ4jy+5XneXngGPAJ0aO8pKo/N7NV1VtFZNIQVdHlzRb19/f/mUgkVhJV2wQwDHwdk58TkRWO4xxrZisiK4DjRlVHgaW+7z/VbGF3d/elSqWyRkS2xaJW4FvLsjps2z7RzMb3/QxR4Rutt8zDwAIRec627Z3NjCCqoEC7iHx0/aE3kqvqNmAsnU53CIDruncbYz4jatg/AIdE5PLNHDVDGIaz47QsBo5altXZ09Pzy9WGUiqVEuVyuf7bsoioEc0El4kuwGg6nR7OZDJVgH8Ai86YTjG085cAAAAASUVORK5CYII="></div><span class="MenuItem-name">Allstar Settings</span></li>'
    var allstar_settings_popup_el = '<div style ="display:none;" class="modal-container allstar-settings is-shown"> <div class="modal-bg"></div>  <div class="modal js-stop-mousedown-propagation loadable-form">  <span onclick="(function(){$(&quot;.modal-container.allstar-settings&quot;).hide()})()" class="close-btn modal-close-btn"></span>  <div class="mobile-header mod-settings"><div class="MobileHeader-backIcon"></div><div class="MobileHeader-title">Allstar Settings</div>  </div>  <h1 class="modal-title">Allstar Settings</h1>  <div class="settings-tabs-container"><div class="settings-tab is-selected" data-name="preferences"> <div class="setting-section">  <div class="setting mod-checkbox"><input class="js-update-setting sidedoc-checkbox setting-checkbox" onclick ="jg.save_allstar_settings_popup(this)" type="checkbox" data-key="ui.current_highlight" id="ui.current_highlight"><label  class="setting-label mod-checkbox" for="ui.current_highlight">Open Doc in Side</label><div class="setting-explanation">Context menu option to open 2nd document side by side. Work on two documents at same time.</div>  </div> </div></div>  </div> </div></div>'
    var dragDivEl = '<div id="dragoverlay" style="position: static;cursor: ew-resize;top: 0px;bottom: 0px;z-index: 99;left: 0;width: 100%;"><div id="draghandle" style="position: absolute !important;left: 0px;top: 0px;bottom: 0px;width: 9px;cursor: ew-resize;border-left: 1px none #e2e2e2;z-index: 100;"></div></div>';
    var documentHeaderCls = ".DocumentItem-header";
    var selected_2 = "selected_2";
    var menuitem_sidedoc = '.menuitem-sidedoc';
    var mainDocCls = ".DocumentContainer";
    var shortcutCloseBtnCls = ".ShortcutHelp-closeButton";
    var shortcuthelp = '.ShortcutHelp';
    var shortcutOpenBtnCls = ".MenuItem--shortcutHelp";
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
    var KEY_SIDE_DOC_URL = 'side_doc_url';
    var dragWidth = 8;
    var isResizing = false;
    var lastDownX = 0;
    var dragHandle = "#draghandle";
    var dragOverlay = "#dragoverlay";
    var docMinWidth = 200;
    var myInterval = setInterval(function () {

        // this page uses host website's jQuery

        //DOCUMENT.READY FUNCTION
        if ($(documentHeaderCls).length > 0) {

            // -ADD 'open in side' to context menu
            enableFeature_SideDoc();

            // -ADD allstar settings option to settings menu
            $('.ContextMenu.main-menu .MenuItem.MenuItem--settings').after(menuItem_settingsEl)
            //add hidden allstar settings modal in page
            $('.modal-container.settings').before(allstar_settings_popup_el);

            // add hover event to settings menu
            $(".menuitem-allstar-settings-li").hover(
                function () {
                    $(this).find('img').css('filter', 'brightness(150%)')
                }, function () {
                    $(this).find('img').css('filter', '')
                }
            );

            // -ADD marker to document context menu hover
            $(documentHeaderCls).on("contextmenu", function () {
                $(documentHeaderCls).removeClass(selected_2);
                $(this).addClass(selected_2);
            });

            // -ADJUST docs width on left pane resize
            $(shortcutCloseBtnCls).on("click", function (e) { adjustDocsWidth(); });
            $(shortcutOpenBtnCls).on("click", function (e) { adjustDocsWidth(); });
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
                //first time user
                localStorage.setItem(allstar_storage_key, allstar_val)
            }

            loadAllstarSettings();
        }
    }, 1000);


    var open_allstar_settings_popup = function (e) {
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

    self['open_allstar_settings_popup'] = open_allstar_settings_popup;

    var save_allstar_settings_popup = function (e) {
        var key = 'side_doc';
        if (e.checked === true) {
            enableFeature_SideDoc();
        } else {
            disableFeature_SideDoc();
        }
        saveAllstarSettingsLocalStorage(key, e.checked);
    }

    self['save_allstar_settings_popup'] = save_allstar_settings_popup;

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



    var open_in_side = function (el) {
        $(contextMenu).hide();
        var docname = $(documentHeaderCls + "." + selected_2).text();
        var files = DYNALIST.app.document_manager.userspace.server_files;
        var DOC_URL = DYNALIST.SERVER_URL + "/d/";
        var isUrlFound = false;
        for (var key in files) {
            var doc = files[key];
            if (doc.title === docname) {
                DOC_URL += doc.server_id;
                isUrlFound = true;
                break;
            }
        }

        if (isUrlFound) {
            open_side_doc_by_url(DOC_URL);
        }
    }
    self['open_in_side'] = open_in_side;


    var closeSideDoc = function () {
        $(iframewrapper).remove();
        DYNALIST.app.userspace.ui.pane_ui._update_nav_width();

        // remove doc url from localstorage
        saveAllstarSettingsLocalStorage(KEY_SIDE_DOC_URL, null);

        // remove resize drag event handlers
        $(dragOverlay).remove();
        $(document).off('mousemove', dragMouseMoveEvent);
        $(document).off('mouseup', dragMouseUpEvent);
    }

    self['closeSideDoc'] = closeSideDoc;





    ////***************         HELPER  METHODS       ***************////
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


    function open_side_doc_by_url(DOC_URL) {
        var halfWidth = 0;
        if (isSideDocOpen()) {
            closeSideDoc();
        }
        halfWidth = $(mainDocCls).width() / 2;
        $(mainDocCls).width(halfWidth);

        // -CREATE side doc iFrame
        var iframe = '<div class="iframewrapper" style="position:absolute;top:0;right:0;z-index:1;height:100%;width:' + halfWidth + 'px;"><iframe onload="jg.loadEventiFrame(this)" class="sidedociframecls" src="' + DOC_URL + '"  frameborder="0" height="100%" width=' + halfWidth + 'px style="" allowfullscreen></iframe></div>';
        // temporarily hide right pane for side doc
        var obj = JSON.parse(localStorage.dynalist)
        obj['file-pane-expanded-state'] = false
        localStorage.setItem("dynalist", JSON.stringify(obj));

        // temporarily hide shortcut for side doc 
        USER_PREF = JSON.parse(JSON.stringify(DYNALIST.app.userspace.ui.view.preferences.preferences));
        DYNALIST.app.userspace.ui.view.preferences.preferences['ui.shortcut_help'] = 'hide';
        DYNALIST.app.userspace.ui.view.save_preferences();

        // -ADD doc iFrame to .DocumentContainer
        $(mainDocCls).after(iframe);
    }

    // -ADJUST size, TRIM extra divs, add resizable
    var loadEventiFrame = function (el) {
        var bckp = localStorage.dynalist;

        // trim extra divs
        $(el).contents().find('.AppHeader,.GlobalSearchPage,.LeftPaneSlidebarContainer,.LeftPaneSplitter,.ShortcutHelp,.DocumentTools').remove();
        // add close button
        $(el).contents().find('.Document').prepend('<div class="DocumentTools sidedoc"> <div class="close-btn DocumentTools-icon iframe-close js-stop-mousedown-propagation" style=""><div class="tooltip mod-close" data-title="Close"></div></div> </div>');
        $(el).contents().find('.DocumentTools.sidedoc').show();
        $(el).contents().find(".iframe-close").on('click', jg.closeSideDoc);
        $(el).contents().find('.normal-view').removeClass('normal-view')
        var body = $(el).contents().find('body');
        body.removeClass('is-mobile');
        if (!body.hasClass("is-desktop")) {
            body.addClass("is-desktop");
        }

        // -ADD resizable div
        addResizableComponent();


        // Observers
        // side doc after load event
        var sidedocCls = $(el).contents().find(mainDocCls)[0];
        new MutationObserver(function (mutations) {
            afterLoadEventiFrame(el);
        }).observe(sidedocCls, {
            attributes: true
        });

    }
    self['loadEventiFrame'] = loadEventiFrame;


    // iFrame loaded successfully... save values to localstorage
    var afterLoadEventiFrame = _debounce(function (el) {
        var DOC_URL = $(el).contents().get(0).location.href;
        var obj = JSON.parse(localStorage.dynalist)
        obj['file-pane-expanded-state'] = true
        localStorage.setItem("dynalist", JSON.stringify(obj));

        DYNALIST.app.userspace.ui.view.preferences.preferences = USER_PREF;
        DYNALIST.app.userspace.ui.view.save_preferences();

        saveAllstarSettingsLocalStorage(KEY_SIDE_DOC_URL, DOC_URL);
    }, 500);

    function addResizableComponent() {
        $(mainDocCls).after(dragDivEl)
        setPositionDrag();
        var dragHandleEl = $(dragHandle)
        var dragOverlayEl = $(dragOverlay)
        dragHandleEl.on('mousedown', function (e) {

            dragOverlayEl.css('position', 'absolute');
            dragHandleEl.css('border-left-style','solid');

            isResizing = true;
            lastDownX = e.clientX;

        });

        $(document).on('mousemove', dragMouseMoveEvent);
        $(document).on('mouseup', dragMouseUpEvent);
        $(window).on('resize', setPositionDrag);
    }

    function dragMouseMoveEvent(e) {
        // we don't want to do anything if we aren't resizing.
        if (!isResizing) {
            return;
        }
        var handle = $(dragHandle)
        handle.css('left',e.clientX)
    }
    function dragMouseUpEvent(e) {
        var curUpX = e.clientX;
        var dragOverlayEl = $(dragOverlay)
        var dragHandleEl = $(dragHandle)
        dragOverlayEl.css('position', 'static');
        dragHandleEl.css('border-left-style','none');
        if (isResizing && curUpX != lastDownX) {
            var margin = Math.abs(curUpX - lastDownX);
            var lwd, rwd;
            var leftDoc = $(mainDocCls);
            var rightDoc = $(iframewrapper);
            //moved <-
            if (curUpX < lastDownX) {
                lwd = leftDoc.width() - margin;
                rwd = rightDoc.width() + margin;
                // it goes beyond left boundry so set width manually
                if (lwd < docMinWidth) {
                    lwd = docMinWidth;
                    rwd = rightDoc.width() + leftDoc.width() - docMinWidth;
                }
            } else {
                // moved ->
                lwd = leftDoc.width() + margin;
                rwd = rightDoc.width() - margin;

                // it goes above right boundry so set width manually
                if (rwd < docMinWidth) {
                    rwd = docMinWidth;
                    lwd = leftDoc.width() + rightDoc.width() - docMinWidth;
                }
            }
            leftDoc.css('width', lwd);
            rightDoc.css('width', rwd);
            $(sideDociframeCls).css('width', rwd);
            setPositionDrag();
        }
        // stop resizing
        isResizing = false;
    }
    function setPositionDrag() {
        if ($(dragHandle).length > 0) {
            var leftDoc = $(mainDocCls);
            var dragPos = leftDoc.width() + Number(leftDoc.css('left').replace('px', ''))
            $(dragHandle).css('left', dragPos);
        }
    };

    // -GETS all allstar settings from localstorage
    function loadAllstarSettings() {
        try {
            var obj = localStorage.getItem(allstar_storage_key)
            obj = JSON.parse(obj);
            if (obj.side_doc != null && obj.side_doc === false) {
                disableFeature_SideDoc();
            } else {
                enableFeature_SideDoc();

                // if side doc was opened before then reopen it
                if (obj[KEY_SIDE_DOC_URL]) {
                    open_side_doc_by_url(obj[KEY_SIDE_DOC_URL]);
                }
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
            closeSideDoc();
        }
        $(menuitem_sidedoc).remove();
    }

    // -ADD 'open in side' to context menu
    function enableFeature_SideDoc() {
        if ($(menuitem_sidedoc).length === 0) {
            $(contextMenu + position).after(menuItem_SideEl);
            $(".open-in-side-li").hover(
                function () {
                    $(this).find('img').css('filter', 'brightness(150%)')
                }, function () {
                    $(this).find('img').css('filter', '')
                }
            );
        }
    }

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

            // set drag handle position
            setPositionDrag();
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

/* I welcome new opportunities at: 1gouravgg[at]gmail.com */