var app = angular.module("guionMaker", []);

app.controller('escenasCtrl', function ($scope, $http) {
    $scope.escenas = [
        {
            nombre: "Escena 1"
        },
        {
            nombre: "Escena 2"
        },
        {
            nombre: "Escena 3"
        }
    ];
    $scope.guardar = function () {
        return 0;
    }
});