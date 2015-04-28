angular.module('App.controllers', [])
    .controller('mainController', function ($scope, User) {
        this.lol = "Hello World";
        this.user = User.currentUser();
        //$('body').prepend('<p>wooooooooooooooo</p>');
    })
    .controller('gameController', function ($scope, Games) {

        this.games = Games.all();

    });
