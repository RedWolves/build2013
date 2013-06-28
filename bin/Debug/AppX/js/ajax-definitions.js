/*

    Amplify.js Ajax Definitions.  

    More info: http://amplifyjs.com
    Created by: http://appendto.com

    Learn about mocking requests: http://www.elijahmanor.com/2012/10/mocking-jquery-ajax-with-amplifyjs.html

*/


var api_url = "https://api.stackexchange.com/2.1/";
var site_name = "stackoverflow";
var site = "?order=asc&site=" + site_name;
var user = {};

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