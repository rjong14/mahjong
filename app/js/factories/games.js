module.exports = function ($http, apiurl) {


    return {
        // GET
        all: function (callback) {
            $http.get(apiurl.base() + "/games").then(callback);
        },
        get: function (callback, id) {
            $http.get(apiurl.base() + "/games/" + id).success(callback);
        },
        getPage: function (callback, page) {
            $http.get(apiurl.base() + "/games?pageIndex=" + page).success(callback);
        },
        getByUser: function (callback, user) {
            $http.get(apiurl.base() + "/games?player=" + user).success(callback);
        },
        getTiles: function (callback, id) {
            $http.get(apiurl.base() + "/games/" + id + "/tiles").success(callback);
        },
        getMatches: function (callback, id) {
            $http.get(apiurl.base() + "/games/" + id + "/tiles/matches").success(callback);
        },
        // POST
        newGame: function (callback, data) {
            $http.post(apiurl.base() + "/games", data).success(callback);
        },
        startGame: function (callback, id) {
            $http.post(apiurl.base() + "/games/" + id + "/start").success(callback);
        },
        joinGame: function (callback, id) {
            $http.post(apiurl.base() + "/games/" + id + "/players").success(callback);
        },
        // PUT
        matchTiles: function (callback, id, tile1, tile2) {
            var tiles = {}
            tiles.tile1Id = tile1
            tiles.tile2Id = tile2
            $http.put(apiurl.base() + "/games/" + id + "/tiles", tiles).then(callback, callback);
        },
        leaveGame: function (callback, id) {
            $http.delete(apiurl.base() + "/games/" + id + "/players").success(callback);
        },
        deleteGame: function (callback, id) {
            $http.delete(apiurl.base() + "/games/" + id).success(callback);
        }

    };
};
