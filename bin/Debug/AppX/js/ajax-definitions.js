    var api_url = "https://api.stackexchange.com/2.1/";
    var site = "stackoverflow";
    site = "?site=" + site;
    var user = {};

    //stacker.User
    amplify.request.define("stacker.User", "ajax", {
        url: api_url + "users/{id}" + site,
        type: "GET"
    });

    amplify.request.define("stacker.User.Answers", "ajax", {
        url: api_url + "users/{id}/answers" + site,
        type: "GET"
    });

    amplify.request.define("stacker.User.Badges", "ajax", {
        url: api_url + "users/{id}/badges" + site,
        type: "GET",
        cache: "true"
    });