angular.module('App.controllers', [])
    .controller('mainController', function ($scope, Users) {
        //var username = window.localStorage.getItem('username');
        //var token = window.localStorage.getItem('token');

        var currentUser = {};
        currentUser.id = window.localStorage.getItem('username');
        currentUser.token = window.localStorage.getItem('token');

        if (currentUser.token != 'undefined' && currentUser.id != 'undefined' && currentUser.token && currentUser.id) {

            Users.login(currentUser.id, currentUser.token);
        }
        this.lol = "Hello World";
        this.user = Users.all();
        this.loggedIn = Users.isLoggedIn();
        console.log(Users.isLoggedIn());
        console.log("user " + currentUser.id);
        console.log("token " + currentUser.token);
        this.login = function () {
            window.location.href = "http://mahjongmayhem.herokuapp.com/auth/avans?callbackUrl=http://localhost:8080/%23/oauthcallback";
        };
        this.logout = function () {
            console.log("clear")
            window.localStorage.clear();
        };


        //$('body').prepend('<p>wooooooooooooooo</p>');
    })
    .controller('gameController', function ($scope, Users, Games) {
        console.log("gameC");
        this.lol = "hallo games";
        var curGame = "";

        $scope.load = function () {
            console.log("load");
            Games.all(function (response) {
                $scope.games = response
            });
            if (curGame != "") {
                Games.get(function (response) {
                    $scope.game = response
                }, curGame);
                $scope.gameTiles = "";
                Games.getTiles(function (response) {
                    $scope.gameTiles = response
                }, curGame);
            }
        };
        $scope.load();
        this.setCurGame = function (id) {
            console.log("cur " + id)
            curGame = id;
            $scope.load();
        };
        this.startGame = function () {
            Games.startGame(function (response) {
                $scope.load()
            }, curGame);
        };
        this.submitNewGame = function () {
            var data = {
                templateName: this.newgame.layout,
                minPlayers: this.newgame.minPlayers,
                maxPlayers: this.newgame.maxPlayers
            };
            console.log(data);
            Games.newGame(function (response) {
                $scope.load()
            }, data);
        };
        this.joinGame = function(id) {
            Games.joinGame(function (response) {
                $scope.load()
            }, id);
        };


    })
    .controller('callbackController', function ($location, $routeParams) {

        console.log("param" + $routeParams.username)
        window.localStorage.setItem('username', $routeParams.username);
        window.localStorage.setItem('token', $routeParams.token);

        console.log(window.localStorage.getItem('username'));
        console.log(window.localStorage.getItem('token'));

        //$location.url('#/');
        //window.location.reload();
    });
