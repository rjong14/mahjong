module.exports = function () {
        var currentUser = {
            "id": "",
            "token": ""
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
