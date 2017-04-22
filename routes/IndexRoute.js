"use strict";
var Route;
(function (Route) {
    var IndexRoute = (function () {
        function IndexRoute() {
        }
        IndexRoute.prototype.index = function (req, res, next) {
            res.render("index.html");
        };
        return IndexRoute;
    }());
    Route.IndexRoute = IndexRoute;
})(Route || (Route = {}));
module.exports = Route;
//# sourceMappingURL=IndexRoute.js.map