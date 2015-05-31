angular.module('App.controllers', [])
    .controller('mainController', function ($scope, Users) {
    	var username 		= window.localStorage.getItem('username');
	    var token 			= window.localStorage.getItem('token');
        if (token != 'undefined' && username != 'undefined') 		{ Users.login(username, token);}
        this.lol = "Hello World";
        this.user = Users.all();
        this.loggedIn = Users.isLoggedIn();
        console.log(Users.isLoggedIn());
        console.log("user " + username);
        console.log("token " + token);
       	this.login = function ()
        {
            window.location.href = "http://mahjongmayhem.herokuapp.com/auth/avans?callbackUrl=http://localhost:8080/oauthcallback";
        };

        //$('body').prepend('<p>wooooooooooooooo</p>');
    })
    .controller('gameController', function ($scope, Users, Games) {
       console.log("gameC");
       this.lol = "hallo games";
       var curGame = "";

       Games.all(function(response) { $scope.games = response });
       if (curGame != ""){
         Games.get(function(response, curGame) { $scope.game = response });
         Games.getTiles(function(response, curGame) { $scope.gameTiles = response });
       }


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
