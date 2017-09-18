module.exports = function ($location, $routeParams, $timeout) {

        console.log("param" + $routeParams.username)
        window.localStorage.setItem('username', $routeParams.username);
        window.localStorage.setItem('token', $routeParams.token);

        console.log(window.localStorage.getItem('username'));
        console.log(window.localStorage.getItem('token'));

            console.log('needSomeTime')
            $timeout(function() {
      $location.url('/');
                console.log('inTime')
                window.location.reload();
      }, 3000);

        //$location.url('#/');
        //window.location.reload();
    };
