module.exports = function () {
    return {
        restrict: 'A',
        link: function ($scope, element, attributes) {

            element.bind('click', function () {
                console.log('el: ');
                console.log(element);
                console.log('at: ');
                var t = JSON.parse(attributes.all)
                //console.log(attributes.data);
                //console.log(attributes.suit);
                console.log(attributes.all);
                console.log(t.tile.suit);
                element.addClass('candy');
                if($scope.match.tile1.id == ""){
                    $scope.match.tile1.id = attributes.data;
                    $scope.match.tile1.name = attributes.name;
                    $scope.match.tile1.suit = attributes.suit;
                    $scope.match.tile1.matcheswhole = attributes.matches;
                    console.log($scope.match);
                } else{
                    $scope.match.tile2.id = attributes.data;
                    $scope.match.tile2.name = attributes.name;
                    $scope.match.tile2.suit = attributes.suit;
                    $scope.match.tile2.matcheswhole = attributes.matches;
                    console.log($scope.match);
                    $scope.matchTiles();
                    $scope.clearMatch();
                    $scope.loadTiles();
                }
            });

        }
    };
}
