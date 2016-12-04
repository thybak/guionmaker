"use strict";
var Route;
(function (Route) {
    class IndexRoute {
        index(req, res, next) {
            res.render("index.html");
        }
    }
    Route.IndexRoute = IndexRoute;
})(Route || (Route = {}));
module.exports = Route;
