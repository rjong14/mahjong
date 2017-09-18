module.exports = function ($scope, Users, Games, $timeout) {
        console.log("gameC");
        this.lol = "hallo games";
        var curGame = "";
        var pages = 0;
        var curPage = 0;
        $scope.errMsg = "";

    $scope.match = {
                tile1: {
                    id: "",
                    name: "",
                    suit: "",
                    matcheswhole: false
                },
                tile2: {
                    id: "",
                    name: "",
                    suit: "",
                    matcheswhole: false
                }
            }
    $scope.clearMatch = function (){
            $scope.match = {
                tile1: {
                    id: "",
                    name: "",
                    suit: "",
                    matcheswhole: false
                },
                tile2: {
                    id: "",
                    name: "",
                    suit: "",
                    matcheswhole: false
                }
            }
    }
            $scope.loadTiles = function () {
                Games.getTiles(function (response) {
                    $scope.gameTiles = response
                }, curGame);
                Games.getMatches(function(response){
                    if(response != []){
                        $scope.gameMatches = response
                    }
                }, curGame)
            }

            $scope.matchTiles = function () {
                var m = $scope.match
                if(m.tile1.matcheswhole == m.tile2.matcheswhole){
                    if(m.tile1.matcheswhole == 'true'){
                        console.log('wholesuit')
                        if(m.tile1.suit == m.tile2.suit){
                            console.log('suit match')
                            $scope.sendTiles(m.tile1.id, m.tile2.id)
                        } else{
                            console.log('no suit match')
                            $scope.errTiles()
                        }
                    } else{
                        if(m.tile1.suit == m.tile2.suit && m.tile1.name == m.tile2.name) {
                            $scope.sendTiles(m.tile1.id, m.tile2.id)
                        } else{
                            console.log('no full match')
                            $scope.errTiles()
                        }
                    }
                } else{
                    console.log('no bool match')
                    $scope.errTiles()
                }
            }

        $scope.sendTiles = function(tile1, tile2){
            Games.matchTiles(function(response){
                if(response[0].match){
                    $scope.loadTiles()
                } else {
                    $scope.errMsg()
                }

            }, curGame, tile1, tile2)
            $scope.clearMatch()
        };
        $scope.errTiles = function(){
            $scope.errMsg = "Not a match!!"
            $timeout(function() {
                $scope.errMsg = ""
            }, 4000);
        };


        $scope.load = function () {
            console.log("load");
            var currentUser = {};
            currentUser.id = window.localStorage.getItem('username');
            currentUser.token = window.localStorage.getItem('token');
            Games.getByUser(function (response){
                $scope.mygames = response
            }, currentUser.id)
            Games.all(function (response) {
                console.log(Math.ceil(response.headers('X-Total-Count')/100))
                pages = Math.ceil(response.headers('X-Total-Count')/100)
                curPage++
                $scope.games = response.data
            });
            if (curGame != "") {
                Games.get(function (response) {
                    $scope.game = response
                }, curGame);
                $scope.gameTiles = "";
                Games.getTiles(function (response) {
                    $scope.gameTiles = response
                }, curGame);
                $scope.gameMatches = ""
                Games.getMatches(function(response){
                    if(response != []){
                        $scope.gameMatches = response
                    }
                }, curGame)
            } else {
                $scope.game = ""
                $scope.gameMatches = ""
            }
        };
        $scope.load();
        this.setCurGame = function (id) {
            console.log("cur " + id)
            curGame = id;
            $scope.load();
        };
        this.clearCurGame = function () {
            curGame = "";
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
        this.leaveGame = function(id) {
            Games.leaveGame(function (response) {
                $scope.load()
            }, id);
        };
        this.deleteGame = function(id) {
            Games.leaveGame(function (response) {
                $scope.load()
            }, id);
        };
        this.loadMore = function () {
            console.log('Please sir can I have some more!')
            if(curPage<pages){
            console.log('cur: '+ curPage)
            Games.getPage(function(response){
                var obj = JSON.stringify($scope.games).slice(0, -1) + ", " + JSON.stringify(response).slice(1);
                //console.log(obj)
                $scope.games = JSON.parse(obj)
                curPage++
            }, curPage)
            }else{console.log('whaaat moooore?, There is no mooore!!!!')}
        };


    };
