module.exports = function ($routeProvider, $httpProvider) {
        $httpProvider.defaults.headers.common['x-username'] = window.localStorage.getItem('username');
        $httpProvider.defaults.headers.common['x-token'] = window.localStorage.getItem('token');
        $routeProvider
            .when('/', {
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
    }
