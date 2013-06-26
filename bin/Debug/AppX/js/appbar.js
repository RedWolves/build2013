$(function () {

    "use strict";

    // Define a set of commands for the appBarControl
    var commands = [
        { label: "Home", icon: "home" },
        { label: "Add User", icon: "people" }
    ];

    // Convert objects into commands
    $.each(commands, function (index, options) {
        commands[index] = new WinJS.UI.AppBarCommand(null, options);
    });

    // Create our container, and our control
    var appBar = $("<div></div>");

    var appBarControl = new WinJS.UI.AppBar(appBar[0], {
        commands: commands, layout: "custom"
    });

    // Add appBar to the body
    appBar.appendTo("body");

});