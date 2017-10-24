module.exports = function ($filter, $scope, Users, Games, Socket, $timeout) {
    console.log("gameC");
    this.lol = "hallo games";
    var curGame = "";
    var pages = 0;
    var curPage = 0;

    $scope.cheatmode = false;
    $scope.gamestate = "";
    $scope.pagemode = "playing"
    $scope.errMsg = "";
    $scope.msg = "";
    $scope.loading = false;

    $scope.setMsg = function (msg) {
        console.log(msg);
        $scope.msg = msg
        $timeout(function () {
            $scope.msg = ""
        }, 2000);
    }
    $scope.errTiles = function (msg) {
        console.error(msg);
        $scope.errMsg = msg
        console.log($scope.errMsg)
        $timeout(function () {
            $scope.errMsg = ""
        }, 4000);
    }
    $scope.el = {
        e1: {},
        e2: {}
    }
    $scope.match = {
        tile1: {},
        tile2: {}
    }
    $scope.clearMatch = function () {
        $scope.match = {
            tile1: {},
            tile2: {}
        }
        $scope.el = {
            e1: {},
            e2: {}
        }
    }
    $scope.loadTiles = function () {
        Games.getTiles(function (response) {
            $scope.gameTiles = response
            $scope.loading = false
            if (curGame.state == 'open') {
                $scope.gamestate = "open"
            } else {
                if ($scope.isGameAlive()) {
                    $scope.gamestate = "Game is playable"
                } else {
                    $scope.gamestate = "no playable tiles left"
                }
            }
        }, curGame);
        Games.getMatches(function (response) {
            if (response != []) {
                $scope.gameMatches = response
            }
        }, curGame)
    }

    $scope.matches = function (tile1, tile2) {
        if (tile1.tile.matchesWholeSuit == tile2.tile.matchesWholeSuit) {
            if (tile1.tile.matchesWholeSuit == true) {
                if (tile1.tile.suit == tile2.tile.suit) {
                    return true
                } else {
                    return false
                }
            } else {
                if (tile1.tile.suit == tile2.tile.suit && tile1.tile.name == tile2.tile.name) {
                    return true
                } else {
                    return false
                }
            }
        } else {
            return false
        }
    }

    $scope.matchTiles = function () {
        var m = $scope.match
        if (m.tile1.tile.matchesWholeSuit == m.tile2.tile.matchesWholeSuit) {
            if (m.tile1.tile.matchesWholeSuit == true) {
                console.log('wholesuit')
                if (m.tile1.tile.suit == m.tile2.tile.suit) {
                    console.log('suit match')
                    $scope.sendTiles(m.tile1._id, m.tile2._id)
                } else {
                    console.log('no suit match')
                    $scope.errTiles('no suit match')
                }
            } else {
                if (m.tile1.tile.suit == m.tile2.tile.suit && m.tile1.tile.name == m.tile2.tile.name) {
                    $scope.sendTiles(m.tile1._id, m.tile2._id)
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

    $scope.isGameAlive = function () {
        var one = {};
        var two = {};
        var ti = $filter('matchable')($scope.gameTiles);
        for (le in ti) {
            one = ti[le]
            if ($scope.isTileClickable(one)) {
                for (me in ti) {
                    two = ti[me]
                    if (one._id != two._id && $scope.isTileClickable(two)) {
                        if ($scope.matches(one, two)) {
                            console.log('match found')
                            console.log('angular.element($0).scope().sendTiles("' + one._id + '", "' + two._id + '");')
                            if ($scope.cheatmode) {
                                $scope.errMsg = "cheating"
                                $timeout(function () {
                                    $scope.sendTiles(one._id, two._id)
                                    $scope.errMsg = "cheating"
                                }, 7000);
                            }
                            return true
                        }
                    }
                }
            }
        }
        return false
    }

    $scope.isGameTileClickable = function (tile) {
        if ($scope.isTileClickable(tile)) {
            return true;
        } else {
            $scope.errTiles("not clickable")
            $scope.$apply()
            return false;
        }
    }
    $scope.isTileClickable = function (tile) {

        var blockedFromLeft = false;
        var blockedFromRight = false;
        var blockedFromTop = false;
        var gtile = $filter('matchable')($scope.gameTiles);
        for (s in gtile) {
            if ((gtile[s].xPos + 2) == tile.xPos && tile.zPos <= gtile[s].zPos && (gtile[s].yPos == tile.yPos || tile.yPos == gtile[s].yPos + 1 || tile.yPos == gtile[s].yPos - 1)) {
                blockedFromLeft = true;
            }
            if ((gtile[s].xPos - 2) == tile.xPos && tile.zPos <= gtile[s].zPos && (gtile[s].yPos == tile.yPos || tile.yPos == gtile[s].yPos + 1 || tile.yPos == gtile[s].yPos - 1)) {
                blockedFromRight = true;
            }
            if (gtile[s].zPos > tile.zPos &&
                ((gtile[s].xPos + 1 == tile.xPos || gtile[s].xPos == tile.xPos || gtile[s].xPos - 1 == tile.xPos) &&
                    (gtile[s].yPos + 1 == tile.yPos || gtile[s].yPos == tile.yPos || gtile[s].yPos - 1 == tile.yPos))) {
                blockedFromTop = true;
            }
        };
        if (blockedFromTop) {
            return false;
        } else if (blockedFromRight && blockedFromLeft) {
            return false;
        } else {
            return true;
        }
    }


    $scope.sendTiles = function (tile1, tile2) {
        Games.matchTiles(function (response) {
            if (response.data.message) {
                console.log(response)
                $scope.errTiles(response.data.message)
            } else {
                console.log(response)
                if (response.data[0].match) {
                    //$scope.loadTiles()
                } else {
                    $scope.errTiles('undefined error')
                }
            }

        }, curGame, tile1, tile2)
        $scope.clearMatch()
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
            $scope.gameMatches = "";
            $scope.loadTiles();
            if (Socket.connect(curGame)) {
                Socket.on(function (data) {
                    $scope.loading = true;
                    $scope.loadTiles();
                    console.log('wss match')
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
            $scope.setMsg('Game started!');
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
            $scope.setMsg('Game created!');
        }, data);
    };
    this.joinGame = function (id) {
        Games.joinGame(function (response) {
            $scope.setMsg('Game joined!');
            curGame = ""
            $scope.load()
        }, id);
    };
    this.leaveGame = function (id) {
        Games.leaveGame(function (response) {
            if(response.message == 'Not implemented yet'){
                $scope.setMsg('Stijn fix pLoX: \n' + response.message);
            }
            console.log(response)
            curGame = "";
            $scope.load()
        }, id);
    };
    this.deleteGame = function (id) {
        console.log('try delete')
        Games.deleteGame(function (response) {
            $scope.setMsg('Game deleted!');
            curGame = "";
            $scope.load()
        }, id);
    };
    this.loadMore = function () {
        console.log('Please sir can I have some more!')
        if (curPage < pages) {
            console.log('cur: ' + curPage)
            Games.getPage(function (response) {
                var obj = JSON.stringify($scope.games).slice(0, -1) + ", " + JSON.stringify(response).slice(1);
                $scope.games = JSON.parse(obj)
                curPage++
            }, curPage)
        } else {
            console.log('whaaat moooore?, There is no mooore!!!!')
        }
    };
};
