"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var THelper = (function () {
    function THelper() {
    }
    THelper.getAuthValue = function () {
        return 'Bearer ' + THelper.testUserToken;
    };
    return THelper;
}());
THelper.testUserToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmVVc3VhcmlvIjoidGVzdCIsInBhc3MiOiIzNmYwMjg1ODBiYjAyY2M4MjcyYTlhMDIwZjQyMDBlMzQ2ZTI3NmFlNjY0ZTQ1ZWU4MDc0NTU3NGUyZjVhYjgwIiwidXN1YXJpb0xvZ2VhZG8iOiI1OTBlMDc4ZjZmMjJkMDEwOTBmNjM1ZDMiLCJpYXQiOjE0OTQwOTE2Njh9.CkmrNkXtm5YW3TTuYy934T6MXCWXBvz5YdqN2X8PiYY";
THelper.testUsername = "test";
THelper.testPassword = "test";
exports.THelper = THelper;
//# sourceMappingURL=THelper.js.map