let playersTest = []; 
playersTest.push({'_id': 'test@avans.nl'});
playersTest.push({'_id': 'test1@avans.nl'});
playersTest.push({'_id': 'test2@avans.nl'});
playersTest.push({'_id': 'test3@avans.nl'});
playersTest.push({'_id': 'test4@avans.nl'});

describe("Filters",() => {
	let containsFilter;
    let matchableFilter;

    beforeEach(module('App'));
	

	beforeEach(inject(function (_matchableFilter_, _containsFilter_)
	{
		matchableFilter = _matchableFilter_;
		containsFilter = _containsFilter_;
	}));


	it('should check if player is playing', function (done)
	{
        let options = { data : 'test3@avans.nl'}
		let result = containsFilter(playersTest, options);
		expect(result).to.be.true;

		done();
	});
    it('should check if player is playing but not playing', function (done)
	{
        let options = { data : 'test1337@avans.nl'}
		let result = containsFilter(playersTest, options);
		expect(result).to.be.false;

		done();
	});
    it('should check if player not is playing', function (done)
	{
        let options = {mode : "not", data : 'test1337@avans.nl'}
		let result = containsFilter(playersTest, options);
		expect(result).to.be.true;

		done();
	});
    it('should check if player not is playing but playing', function (done)
	{
        let options = {mode : "not", data : 'test3@avans.nl'}
		let result = containsFilter(playersTest, options);
		expect(result).to.be.false;

		done();
	});


});
