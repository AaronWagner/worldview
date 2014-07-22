/*
 * NASA Worldview
 *
 * This code was originally developed at NASA/Goddard Space Flight Center for
 * the Earth Science Data and Information System (ESDIS) project.
 *
 * Copyright (C) 2013 - 2014 United States Government as represented by the
 * Administrator of the National Aeronautics and Space Administration.
 * All Rights Reserved.
 */

/**
 * @module wv.ui
 */
var wv = wv || {};
wv.ui = wv.ui || {};

wv.ui.info = wv.ui.info || (function(ui) {

    var selector = "#wv-info-button";
    var $button = $("<input></input>")
        .attr("type", "checkbox")
        .attr("id", "wv-info-button-check");
    var $label = $("<label></label>")
        .attr("for", "wv-info-button-check")
        .attr("title", "Information");
    var $icon = $("<i></i>")
        .addClass("fa")
        .addClass("fa-info-circle")
        .addClass("fa-2x");
    $label.append($icon);
    $(selector).append($label);
    $(selector).append($button);

    $button.button({
        text: false
    });

    var $menu = $("<div></div>").attr("id", "wv-info-menu");
    var $menuItems = $("<ul></ul>");

    var $feedback = $("<li><a href='mailto:@MAIL@?subject=Feedback for @LONG_NAME@ tool' target='_blank'><i class='ui-icon fa fa-envelope fa-fw'></i>Feedback</a></li>");
    var $tour = $("<li><a><i class='ui-icon fa fa-truck fa-fw'></i>Start Tour</a></li>");
    var $new = $("<li><a><i class='ui-icon fa fa-flag fa-fw'></i>What's New</a></li>");
    var $about = $("<li><a><i class='ui-icon fa fa-file fa-fw'></i>About</a></li>");

    var feedbackInit = false;
    
    $menuItems.append($feedback);
    $menuItems.append($tour);
    $menuItems.append($new);
    $menuItems.append($about);
    $menu.append($menuItems);
    $("body").append($menu);
    $menuItems.hide().menu().position({
        my: "left top",
        at: "left bottom+5",
        of: $label
    });

    $about.click(function() {
        if ( wv.util.browser.small ) {
            window.open("brand/pages/about.html?v=@BUILD_NONCE@", "_blank");
        } else {
            wv.ui.getDialog().dialog({
                title: "About",
                width: 625,
                height: 525,
                show: { effect: "fade" },
                hide: { effect: "fade" }
            }).load("brand/pages/about.html?v=@BUILD_NONCE@ #page");
        }
    });

    $feedback.click(function(event) {
        if ( window.feedback ) {
            event.preventDefault();
            if ( !feedbackInit ) {
                feedback.init({showIcon: false});
            }
            feedback.showForm();
        }
    });
    
    $new.click(function() {
        if ( wv.util.browser.small ) {
            window.open("brand/pages/new.html?v=@BUILD_NONCE@", "_blank");
        } else {
            wv.ui.getDialog().dialog({
                title: "What's New",
                width: 625,
                height: 525,
                show: { effect: "fade" },
                hide: { effect: "fade" }
            }).load("brand/pages/new.html?v=@BUILD_NONCE@ #page");
        }
    });

    $tour.click(function() {
        ui.tour.start();
    });

    $button.click(function(event) {
        event.stopPropagation();
        $(".ui-menu").hide();
        wv.ui.closeDialog();
        var checked = $("#wv-info-button-check").prop("checked");
        if ( checked ) {
            show();
        }
    });

    var show = function() {
        $("#wv-toolbar input:not(#wv-info-button-check)")
            .prop("checked", false)
            .button("refresh");
        $menuItems.show("slide", { direction: "up" });
        $("html").one("click", function(event) {
            if ( $button.parent().has(event.target).length > 0 ) {
                return;
            }
            $menuItems.hide("slide", { direction: "up" });
            $("#wv-info-button-check").prop("checked", false);
            $button.button("refresh");
        });
    };

});
