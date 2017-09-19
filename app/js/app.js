require('angular/angular');
require('angular-route/angular-route');
require('angular-cookies')

var apiurlService = require('./services/apiurl.js');
var gameFactory = require('./factories/games.js');
var usersFactory = require('./factories/users.js');
var socketFactory = require('./factories/socket.js');
var mainControler = require('./controllers/main.js');
var gameController = require('./controllers/game.js');
var callbackController = require('./controllers/callback.js');
var tileDirective = require('./directives/tile.js');
var matchableDirective = require('./directives/matchable.js');
var scrolledDirective = require('./directives/scrolled.js')
var containsFilter = require('./filters/contains.js');
var matchedFilter = require('./filters/matched.js');
var routerConfig = require('./configs/router.js');

// Create your app

angular.module('App', [
                       'ngRoute',
                       'ngCookies'
                      ])
// Services
    .service('apiurl', apiurlService)
    .factory('Games', gameFactory)
    .factory('Users', usersFactory)
    .factory('Socket', socketFactory)
// Controllers
    .controller('mainController', mainControler)
    .controller('gameController', gameController)
    .controller('callbackController', callbackController)
// Directives
    .directive('tile', tileDirective)
    .directive('matchable', matchableDirective)
    .directive('scrolled', scrolledDirective)
// Other
    .filter('contains', containsFilter)
    .filter('matched', matchedFilter)
    .config(routerConfig);
