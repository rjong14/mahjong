module.exports = function(){
	return {
		restrict: 'E',
		templateUrl: 'partials/templates/tile.html',
        link: function($scope, element, attributes){
//			element = element.children('.tile');
//    		element.css({'left': ($scope.tile.xPos-1) * 37 + 'px', 'top': $scope.tile.yPos * 45 + 'px',  'z-index': $scope.tile.zPos });
//    		if(scope.tile.zPos > 0){
//    			element.css({'left':((scope.tile.xPos-1) * 37 + (scope.tile.zPos * 3)) + 'px','top':(scope.tile.yPos * 45 - (scope.tile.zPos * 3)) + 'px'})
//	    	}
//
//			if(scope.controller.mode == "game"){
//				element.on('mouseenter', function(){
//					if(!scope.controller.isTileClickable(scope.tile)){
//						element.addClass("clickable");
//					}
//				});
//
//				element.on('mouseleave', function(){
//					element.removeClass("clickable");
//				});
//
//				scope.$watch('tile.clicked', function(){
//					if(scope.tile.clicked){
//						element.addClass("clicked");
//					} else {
//						element.removeClass("clicked");
//					}
//				});
//			}
//
//			var className = scope.tile.tile.suit+"-"+scope.tile.tile.name;
//			element.addClass(className);
        }
	};
}
