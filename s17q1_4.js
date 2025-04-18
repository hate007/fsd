// app.js
var app = angular.module("mscApp", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
        .when("/os", {
            templateUrl: "partials/os.html"
        })
        .when("/dbms", {
            templateUrl: "partials/dbms.html"
        })
        .when("/cn", {
            templateUrl: "partials/cn.html"
        })
        .when("/ai", {
            templateUrl: "partials/ai.html"
        })
        .otherwise({
            redirectTo: "/os"
        });
});

