$(function () {

    var speakers = { 
        "u648": { name: "Ralph Whitbeck", id: "648" },
        "u54680": { name: "Jonathan Sampson", id: "54680" }
    };

    $("#add-user").on("submit", function (e) {

        e.preventDefault();
        $(this).dialog("close");

        var name = $("[name='fullname']", this).val();
        var id = $("[name='userid']", this).val();

        speakers["u" + id] = { name: name, id: id };

        populateUsers([{ name: name, id: id }]);

    });

    populateUsers();

    function populateUsers(users) {
        $.each(users || speakers, function (i, speaker) {
            amplify.request("stacker.User", { id: speaker.id }, function (data) {
                var dataItem = data.items[0];
                speakers["u" + dataItem.user_id].items = dataItem;
                var li = $("<li></li>", { "data-id": dataItem.user_id }).html($("<img></img>", {
                    src: dataItem.profile_image + "&s=300",
                    alt: dataItem.display_name
                }));
                $("#side-bar ul").append(li);
            });
        });
    }

    var appbar = new WinJS.UI.AppBar(null, {
        layout: "custom",
        placement: "top",
        commands: [
            new WinJS.UI.AppBarCommand(null, {
                icon: WinJS.UI.AppBarIcon.home,
                label: "Go Home",
                onclick: function () {
                    $("#side-bar").show();
                    $("#dataCanvas").hide();
                }
            }),
            new WinJS.UI.AppBarCommand(null, {
                icon: WinJS.UI.AppBarIcon.add,
                label: "Add User",
                onclick: function () {
                    $("#add-user").dialog();
                }
            })
        ]
    });

    $("body").append(appbar.element);

    $("#side-bar").on("click", "li", function (data) {
        var id = $(this).data("id");
        $("#side-bar").hide();
        $("#dataCanvas").show();

        amplify.request("stacker.User.Badges", { id: id }, function (data) {
            $.each(speakers, function (i, speaker) {
                if (speaker.id == id) {
                    tab_profile(speaker);
                    tab_badges(speaker);
                    tab_tags(speaker);
                    $("#tabs").tabs();
                }
            });
        });
    });

});




var tab_profile = function (speaker) {
    var tab = $("#profile");
    tab.html("");

    var creation_date = new Date(speaker.items.creation_date * 1000);

    tab.append($("<h1></h1>").text(speaker.items.display_name));

    tab.append($("<img/>", {
        src: speaker.items.profile_image
    })
    );

    tab.append($("<p></p>").text("Created on: " + creation_date.toDateString()));
};

var tab_badges = function (speaker) {
    var tab = $("#badges");
    tab.html("");

    tab.append($("<ul></ul>", { id: "badge-count" })
                             .append("<li>Gold - " + speaker.items.badge_counts.gold + "</li>")
                             .append("<li>Silver - " + speaker.items.badge_counts.silver + "</li>")
                             .append("<li>Bronze - " + speaker.items.badge_counts.bronze + "</li>"));

    amplify.request("stacker.User.Badges", { id: speaker.id }, function (data) {
        $.each(data.items, function (i, badge) {
            tab.append($("<div></div>").text(badge.rank + ": " + badge.name + " x " + badge.award_count));
        });
    });
};

var tab_tags = function (speaker) {
    var tab = $("#tags");
    tab.html("");

    tab.append($("<ul></ul>"));
    amplify.request("stacker.User.Tags", { id: speaker.id }, function (data) {
        $.each(data.items, function (i, tag) {
            tab.find("ul").append("<li>" + tag.name + " x " + tag.count + "</li>");
        });
    });
};