﻿    var api_url = "https://api.stackexchange.com/2.1/";
    var site_name = "stackoverflow";
    site = "?order=asc&site=" + site_name;
    var user = {};

    //stacker.User
    amplify.request.define("stacker.User", "ajax", {
        url: api_url + "users/{id}" + site,
        type: "GET"
    });

    amplify.request.define("stacker.User.Badges", "ajax", {
        url: api_url + "users/{id}/badges" + site,
        type: "GET",
        cache: "true"
    });

    amplify.request.define("stacker.User.Tags", "ajax", {
        url: api_url + "users/{id}/tags?site=" + site_name + "&order=desc&sort=popular",
        type: "GET"
    });
