module.exports = function ($scope, Users) {
        //var username = window.localStorage.getItem('username');
        //var token = window.localStorage.getItem('token');

        var currentUser = {};
        currentUser.id = window.localStorage.getItem('username');
        currentUser.token = window.localStorage.getItem('token');

        if (currentUser.token != 'undefined' && currentUser.id != 'undefined' && currentUser.token && currentUser.id) {

            Users.login(currentUser.id, currentUser.token);
        }
        this.lol = "Hello World";
        this.user = Users.all();
        this.loggedIn = Users.isLoggedIn();
        console.log(Users.isLoggedIn());
        console.log("user " + currentUser.id);
        console.log("token " + currentUser.token);
        this.login = function () {
            window.location.href = "http://mahjongmayhem.herokuapp.com/auth/avans?callbackUrl=http://localhost:8080/%23/oauthcallback";
        };
        this.logout = function () {
            console.log("clear")
            window.localStorage.clear();
            window.location.href = "http://localhost:8080/";
        };

        //$('body').prepend('<p>wooooooooooooooo</p>');
    };
