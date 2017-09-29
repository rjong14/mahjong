describe("directives", () => {
	var tileDirective;
	var $compile;
	var $rootScope;

	beforeEach(module('App'));


	beforeEach(inject(function (_tileDirective_, _$compile_, _$rootScope_)
	{
		tileDirective 		= _tileDirective_;
		$compile 			= _$compile_;
		$rootScope 			= _$rootScope_;
	}));

 
	it('should render the tile directive', function ()
	{ 
		var $scope 			= $rootScope.$new();
		$scope.tile 		= { mismatched: true };

		var element 		= $compile('<div></div>')($scope);
		$scope.$digest();
        console.log(element)
		expect(element.attr("class")).to.have.string('ng-scope');
	});
});