module.exports = function ($timeout) {
    return {
        restrict: 'A',
        link: function ($scope, element, attributes) {

            element.bind('click', function () {
                var t = JSON.parse(attributes.data)
                console.log(t.tile.suit);
                if ($scope.isGameTileClickable(t) && $scope.pagemode == "playing") {
                    element.addClass('candy');
                    if (!$scope.match.tile1._id) {
                        $scope.match.tile1 = t
                        $scope.el.e1 = element;
                        console.log($scope.match);
                    } else {
                        $scope.match.tile2 = t;
                        $scope.el.e2 = element;
                        console.log($scope.match);
                        $scope.matchTiles();
                        $timeout(function () {
                            $scope.el.e1.removeClass('candy')
                            $scope.el.e2.removeClass('candy')
                            $scope.clearMatch();
                        }, 1000);
                    }
                }
            });

        }
    };
}
