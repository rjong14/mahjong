module.exports = function (apiurl) {
    var socket = null;
    var settings = {'force new connection': true}
    return {
        connect: function (id) {
            if (io) {
                console.log("connect");
                socket = io.connect(apiurl.base() + "?gameId=" + id, settings);
                return true;
            }
        },
        on: function (callback, event) {
            socket.on(event, callback);
        },
        emit: function (callback, event, data){
            socket.emit(event, data, callback)
        }
    };
}
