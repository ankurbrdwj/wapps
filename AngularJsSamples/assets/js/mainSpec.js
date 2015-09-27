describe ('filter', function () {
beforeEach(module('myApp'));

describe ('reverse' function(){
it('it should reverse a string' , inject(function (reverseFilter){
expect(reverseFilter('ABCD')).toEquals('DCBA');
}))
})
})