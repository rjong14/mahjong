angular.module('App.services', [])
    .factory('Users', function () {
        var currentUser = {
            "id": "rjong14", // Avans username
            "name": "Rick de Jong", // fullname
            "email": "rjong14@avans.nl", // avans e-mail
            "nickname": "Default" // maybe filled later?
        };

        var users = [{
            "id": "rjong14", // Avans username
            "name": "Rick de Jong", // fullname
            "email": "rjong14@avans.nl", // avans e-mail
            "nickname": "Default" // maybe filled later?
        },
        {
            "id": "some1", // Avans username
            "name": "som1", // fullname
            "email": "som1@avans.nl", // avans e-mail
            "nickname": "Default" // maybe filled later?
        }];

        return {
            all: function () {
                console.log(users);
                return users;
            },
            currentUser: function () {
                return currentUser;
            }
        };
    })

    .factory('Games', ['$http', function ($http) {

        var games = [
            {
                "layout": "shangai", // -> 'shanghai'|'snake'|'ox'|'ram'|'dragon'|'rooster'|'monkey'
                "createdOn": "Sat Apr 20 2015 16:43:27 GMT+0200", // date + time
                "startedOn": "Sat Apr 25 2015 16:43:27 GMT+0200", // date + time
                "endedOn": "Sat Apr 27 2015 16:43:27 GMT+0200", // date + time
                "createdBy": {
                    "id": "rjong14", // Avans username
                    "name": "Rick de Jong", // fullname
                    "email": "rjong14@avans.nl", // avans e-mail
                    "nickname": "Default" // maybe filled later?
                },
                "minPlayers": 2, // 35 <= x >= 1, Required number of players to start
                "maxPlayers": 22, // 35 <= x >= 1
                "players": [{
                    "id": "rjong14", // Avans username
                    "name": "Rick de Jong", // fullname
                    "email": "rjong14@avans.nl", // avans e-mail
                    "nickname": "Default" // maybe filled later?
                        // Properties like score and isWinner maybe filled later
                }],
                "state": "open" // -> 'open'|'playing'|'finished'
            },
            {
                "layout": "snake", // -> 'shanghai'|'snake'|'ox'|'ram'|'dragon'|'rooster'|'monkey'
                "createdOn": "Sat Apr 20 2015 16:43:27 GMT+0200", // date + time
                "startedOn": "Sat Apr 25 2015 16:43:27 GMT+0200", // date + time
                "endedOn": "Sat Apr 27 2015 16:43:27 GMT+0200", // date + time
                "createdBy": {
                    "id": "rjong14", // Avans username
                    "name": "Rick de Jong", // fullname
                    "email": "rjong14@avans.nl", // avans e-mail
                    "nickname": "Default" // maybe filled later?
                },
                "minPlayers": 2, // 35 <= x >= 1, Required number of players to start
                "maxPlayers": 22, // 35 <= x >= 1
                "players": [{
                    "id": "rjong14", // Avans username
                    "name": "Rick de Jong", // fullname
                    "email": "rjong14@avans.nl", // avans e-mail
                    "nickname": "Default" // maybe filled later?
                        // Properties like score and isWinner maybe filled later
                }],
                "state": "playing" // -> 'open'|'playing'|'finished'
            }];

        return {
            all: function () {
                return games;
            },
            open: function () {
                var open = [];
                angular.forEach(games, function(game){
                if(game.state === "open"){
                  open.push(game);
                    console.log(open);
                }
                });
                return open;
            },
            playing: function () {
                var playing = [];
                angular.forEach(games, function(game){
                if(game.state === "playing"){
                  playing.push(game);
                    console.log(playing);
                }
                });
                return playing;
            },
            finished: function () {
                var finished = [];
                angular.forEach(games, function(game){
                if(game.state === "finished"){
                  finished.push(game);
                    console.log(finished);
                }
                });
                return games;
            },
            get: function (index) {
                return games[index];
            },
            insert: function (game) {
                games.push(game);
            },
            remove: function (index) {
                games.splice(games.indexOf(index), 1);
            },
            update: function (game, index) {
                games[index] = game;
            }
        };
    }]);
