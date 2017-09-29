describe("Factories", () => {
    let $httpBackend;
	let	$controller;
    let apiurl;
    let Games;

    beforeEach(module('App'));


    beforeEach(inject(function (_$httpBackend_, _$controller_, _apiurl_, _Games_) {
        $controller 				= _$controller_;
		$httpBackend 				= _$httpBackend_;
        apiurl = _apiurl_;
        Games = _Games_;
    }));

    it('Should give api url', function (done) {
        let result = apiurl.base();
        console.log(result);
        expect(result).to.equal('http://mahjongmayhem.herokuapp.com');

        done();
    });

});
