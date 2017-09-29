module.exports = function ($scope, Users, Games, Socket, $timeout) {
    console.log("gameC");
    this.lol = "hallo games";
    var curGame = "";
    var pages = 0;
    var curPage = 0;
    $scope.pagemode = "playing"
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
    $scope.clearMatch = function () {
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
        Games.getMatches(function (response) {
            if (response != []) {
                $scope.gameMatches = response
            }
        }, curGame)
    }

    $scope.matchTiles = function () {
        var m = $scope.match
        if (m.tile1.matcheswhole == m.tile2.matcheswhole) {
            if (m.tile1.matcheswhole == 'true') {
                console.log('wholesuit')
                if (m.tile1.suit == m.tile2.suit) {
                    console.log('suit match')
                    $scope.sendTiles(m.tile1.id, m.tile2.id)
                } else {
                    console.log('no suit match')
                    $scope.errTiles('no suit match')
                }
            } else {
                if (m.tile1.suit == m.tile2.suit && m.tile1.name == m.tile2.name) {
                    $scope.sendTiles(m.tile1.id, m.tile2.id)
                } else {
                    console.log('no full match')
                    $scope.errTiles('no full match')
                }
            }
        } else {
            console.log('no bool match')
            $scope.errTiles('no bool match')
        }
    }

    $scope.sendTiles = function (tile1, tile2) {
        console.log('before match')
        Games.matchTiles(function (response) {
            console.log('dooo maaatch')
            if (response.data.message) {
                console.log(response)
                $scope.errTiles(response.data.message)
            } else {
                console.log(response)
                if (response.data[0].match) {
                    $scope.loadTiles()
                } else {
                    $scope.errTiles('undefined error')
                }
            }

        }, curGame, tile1, tile2)
        $scope.clearMatch()
    };
    $scope.errTiles = function (msg) {
        $scope.errMsg = msg
        $timeout(function () {
            $scope.errMsg = ""
        }, 4000);
    };


    $scope.load = function () {
        console.log("load");
        var currentUser = {};
        currentUser.id = window.localStorage.getItem('username');
        currentUser.token = window.localStorage.getItem('token');
        Games.getByUser(function (response) {
            $scope.mygames = response
        }, currentUser.id)
        Games.all(function (response) {
            console.log(Math.ceil(response.headers('X-Total-Count') / 100))
            pages = Math.ceil(response.headers('X-Total-Count') / 100)
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
            Games.getMatches(function (response) {
                if (response != []) {
                    $scope.gameMatches = response
                }
            }, curGame)
            if (Socket.connect(curGame)) {
                Socket.on(function (data) {
                    console.log('match made')
                    console.log(data)
                    $scope.loadTiles();
                    console.log('lol')
                    $timeout(function () {
                        console.log('load Tiles')
                        $scope.loadTiles();
                    }, 500);
                }, "match")
            }
        } else {
            $scope.game = ""
            $scope.gameMatches = ""
        }
    };
    $scope.load();

    this.changeMode = function () {
        if ($scope.pagemode == "spectating") {
            console.log('if')
            $scope.pagemode = "playing"
        } else {
            console.log('else')
            $scope.pagemode = "spectating"
        }

        console.log($scope.pagemode)
        $scope.load()
    }
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
    this.joinGame = function (id) {
        Games.joinGame(function (response) {
            $scope.load()
        }, id);
    };
    this.leaveGame = function (id) {
        Games.leaveGame(function (response) {
            $scope.load()
        }, id);
    };
    this.deleteGame = function (id) {
        Games.leaveGame(function (response) {
            $scope.load()
        }, id);
    };
    this.loadMore = function () {
        console.log('Please sir can I have some more!')
        if (curPage < pages) {
            console.log('cur: ' + curPage)
            Games.getPage(function (response) {
                var obj = JSON.stringify($scope.games).slice(0, -1) + ", " + JSON.stringify(response).slice(1);
                //console.log(obj)
                $scope.games = JSON.parse(obj)
                curPage++
            }, curPage)
        } else {
            console.log('whaaat moooore?, There is no mooore!!!!')
        }
    };
    
    this.isTileClickable = function(tile){

		var blockedFromLeft = false;
	    var blockedFromRight = false;
	    var blockedFromTop = false;
        var gtile = $scope.gameTiles;
	    for(s in gtile){
	    	if(gtile[s].match == undefined){
	    		if(tile == gtile[s])
	            return true

		        // width of tile is 2 px
		        // check position of array tile is xPos + 2 because xPos and xPos + 1 are the tile
		        if((gtile[s].xPos + 2) == tile.xPos && tile.zPos <=  gtile[s].zPos && (gtile[s].yPos == tile.yPos || tile.yPos == gtile[s].yPos + 1 || tile.yPos == gtile[s].yPos-1)){
		            // its blocked from the left
		            blockedFromLeft = true;
		        }
		        if((gtile[s].xPos - 2) == tile.xPos && tile.zPos <= gtile[s].zPos && (gtile[s].yPos == tile.yPos || tile.yPos == gtile[s].yPos + 1 || tile.yPos == gtile[s].yPos-1)){
		            // its blocked from the right
		            blockedFromRight = true;
		        }
		        if(gtile[s].zPos > tile.zPos
		            && ( (gtile[s].xPos + 1 == tile.xPos || gtile[s].xPos == tile.xPos || gtile[s].xPos - 1 == tile.xPos)
		            && (gtile[s].yPos + 1 == tile.yPos || gtile[s].yPos == tile.yPos || gtile[s].yPos - 1 == tile.yPos)) ){
		            blockedFromTop = true;
		        }
	    	}
	    	
	    };
	    if(blockedFromTop){
	        return true;
	    } else if(blockedFromRight && blockedFromLeft){
	        return true;
	    } else {
	        return false;
	    }
	}


};
