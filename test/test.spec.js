let som = 1+1

describe('do a test', () => {
    it('should return total sum', (done) => {
        expect(som).to.equal(2)
        done()
    })
    it('should return a value', (done) => {
        expect(som).to.not.be.undefined;
        done()
    })
    
    
})

