require('angular/angular');
require('angular-route/angular-route');
require('./services.js');
require('./controllers.js');

// Create your app

angular.module('App', ['ngRoute', 'App.services', 'App.controllers'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/home.html'
            })
            .when('/game', {
                controller: 'gameController as gameCtrl',
                templateUrl: 'partials/game.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
