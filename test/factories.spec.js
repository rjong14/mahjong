describe("Factories", () => {
    let $httpBackend;
    let $controller;
    let apiurl;
    let Games;
    var games = [{
        "_id": "123"
    }, {
        "_id": "321"
    }];
    beforeEach(module('App'));


    beforeEach(inject(function (_$httpBackend_, _$controller_, _apiurl_, _Games_) {
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
        apiurl = _apiurl_;
        Games = _Games_;
    }));
    beforeEach(function () {
        $httpBackend.
        whenGET('http://mahjongmayhem.herokuapp.com/games').
        respond(function () {
            return [200, games];
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Should give api url', function (done) {
        let result = apiurl.base();
        expect(result).to.equal('http://mahjongmayhem.herokuapp.com');

        done();
    });

    it('Should give games object', function () {
        let data;
        Games.all(function (response) {
            data = response.data;
        });

        $httpBackend.flush();
        expect(data[0].name).to.equal(games[0].name);
    });

});
