angular.module('App.controllers', [])
    .controller('mainController', function ($scope, Users) {
        this.lol = "Hello World";
        this.user = Users.currentUser();
        this.users = Users.all();
        //$('body').prepend('<p>wooooooooooooooo</p>');
    })
    .controller('gameController', function ($scope, Users, Games) {

        this.games = Games.all();
        this.openGames = Games.open();
        this.playingGames = Games.playing();
        this.game = {
                "layout": "", // -> 'shanghai'|'snake'|'ox'|'ram'|'dragon'|'rooster'|'monkey'
                "createdOn": "", // date + time
                "startedOn": "", // date + time
                "endedOn": "", // date + time
               "createdBy": "",
               "minPlayers": "", // 35 <= x >= 1, Required number of players to start
               "maxPlayers": "",  // 35 <= x >= 1
                "players": [],
                "state": "" // -> 'open'|'playing'|'finished'
            };

        this.submitEmployee = function() {
            var data = {
                "layout": this.game.layout, // -> 'shanghai'|'snake'|'ox'|'ram'|'dragon'|'rooster'|'monkey'
                "createdOn": new Date(), // date + time
                "startedOn": new Date(), // date + time
                "endedOn": "", // date + time
               "createdBy": Users.currentUser(),
               "minPlayers": this.game.minPlayers, // 35 <= x >= 1, Required number of players to start
               "maxPlayers": this.game.maxPlayers,  // 35 <= x >= 1
                "players": [Users.currentUser()],
                "state": "open" // -> 'open'|'playing'|'finished'
            };
            console.log(data);
            Games.insert(data);
            this.openGames = Games.open();
  	};
    });
