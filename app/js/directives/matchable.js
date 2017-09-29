module.exports = function () {
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
                        console.log($scope.match);
                    } else {
                        $scope.match.tile2 = t;
                        console.log($scope.match);
                        $scope.matchTiles();
                        $scope.clearMatch();
                        $scope.loadTiles();
                    }
                }
            });

        }
    };
}
