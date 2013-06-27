$(function () {
    var speakers = [{
        name: "Ralph Whitbeck",
        id: "648"
    },
    {
        name: "Jonathan Sampson",
        id: "54680"
    }];

    $.each(speakers, function (i, speaker) {
        amplify.request("stacker.User", { id: speaker.id }, function (data) {
            var dataItem = data.items[0];
            speakers[i].items = dataItem;
            var li = $("<li></li>", { "data-id": dataItem.user_id }).html($("<img></img>", {
                src: dataItem.profile_image + "&s=300",
                alt: dataItem.display_name
            }));
            $("#side-bar ul").append(li);
        });
    });

    $("#side-bar").on("click", "li", function (data) {
        var id = $(this).data("id");
        $("#side-bar").hide();
        $("#dataCanvas").show();

        amplify.request("stacker.User.Badges", { id: id }, function (data) {
            $.each( speakers, function ( i, speaker ) {
                if (speaker.id == id) {
                    var badgeCounts = speaker.items.badge_counts;
                    $("#dataCanvas")
                        .html("<ul></ul>", { id: "badge-count" })
                            .append("<li>Gold - " + badgeCounts.gold + "</li>")
                            .append("<li>Silver - " + badgeCounts.silver + "</li>")
                            .append("<li>Bronze - " + badgeCounts.bronze + "</li>");
                }
            });
            
            
                            
        });

    });
});