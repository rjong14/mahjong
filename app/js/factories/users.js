module.exports = function () {
        var currentUser = {
            "id": "rjong14", // Avans username
            "token": ""
//            "name": "Rick de Jong", // fullname
//            "email": "rjong14@avans.nl", // avans e-mail
//            "nickname": "Default" // maybe filled later?
        };

       	var username = null;
	    var token = null;
	    var loggedIn = false;

        return {
            login : function (newUsername, newToken)
            {
                currentUser.id 	= newUsername;
                currentUser.token = newToken;
                loggedIn 	= true;
            },
            isLoggedIn: function ()
            {
                return loggedIn;
            },

    		getUsername: function ()
            {
                return currentUser.id;
            },
            getToken: function ()
            {
                return currentUser.token;
            },
            all: function () {
                return currentUser;
            },
            currentUser: function () {
                return currentUser;
            }
        };
    };
