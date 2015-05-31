angular.module('App.services', [])
    .service('apiurl', function () {
        var url = 'http://mahjongmayhem.herokuapp.com/';
            return {
                get: function () {
                    return url;
                },
                set: function(value) {
                    url = value;
                }
            };
    })
    .factory('Users', function () {
        var currentUser = {
            "id": "rjong14", // Avans username
            "name": "Rick de Jong", // fullname
            "email": "rjong14@avans.nl", // avans e-mail
            "nickname": "Default" // maybe filled later?
        };

       	var username = null;
	    var token = null;
	    var loggedIn = false;

        return {
            login : function (newUsername, newToken)
            {
                username 	= newUsername;
                token 		= newToken;
                loggedIn 	= true;
            },
            isLoggedIn: function ()
            {
                return loggedIn;
            },

    		getUsername: function ()
            {
                return username;
            },
            getToken: function ()
            {
                return token;
            },
            all: function () {
                return currentUser;
            },
            currentUser: function () {
                return currentUser;
            }
        };
    })

    .factory('Games', function ($http, apiurl) {


        return {
            all: function(callback){
                $http.get(apiurl.get() + "games").success(callback);
            },
            get: function(callback, id){
                $http.get(apiurl.get() + "games/" + id).success(callback);
            },
            getTiles: function(callback, id){
                $http.get(apiurl.get() + "games/" + id + "/tiles").success(callback);
            },

            newGame: function(callback, data){
                $http.post(apiurl.get() + "games", data).success(callback);
            },
            startGame: function(callback, id){
                $http.post(apiurl.get() + "games/" + id + "/start").success(callback);
            }

        };
    });
