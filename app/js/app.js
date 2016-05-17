require('angular/angular');
require('angular-route/angular-route');
require('angular-cookies')
require('./services.js');
require('./controllers.js');

// Create your app

angular.module('App', ['ngRoute', 'ngCookies', 'App.services', 'App.controllers'])
    .config(function ($routeProvider, $httpProvider) {
        $httpProvider.defaults.headers.common['x-username'] = window.localStorage.getItem('username');
        $httpProvider.defaults.headers.common['x-token'] = window.localStorage.getItem('token');
        $routeProvider
            .when('/', {
                templateUrl: 'partials/home.html'
            })
            .when('/game', {
                controller: 'gameController as gameCtrl',
                templateUrl: 'partials/game.html'
            })
            .when('/oauthcallback', {
                controller: 'callbackController as callCtrl',
                templateUrl: 'partials/oauthcallback.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
