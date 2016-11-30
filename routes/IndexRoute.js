"use strict";
var Route;
(function (Route) {
    class IndexRoute {
        index(req, res, next) {
            res.render("../views/index");
        }
    }
    Route.IndexRoute = IndexRoute;
})(Route || (Route = {}));
module.exports = Route;
