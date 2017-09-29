module.exports = function () {
    return {
        restrict: 'A',
        link: function ($scope, element, attributes) {
            element.bind('click', function () {
                $scope.theme = attributes.data;
                $scope.$apply();
            });

        }
    };
}
