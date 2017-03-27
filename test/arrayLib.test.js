/*
Unit tests for arrayLibrary via jasmine
 */
describe("ArrayLibrary tests", function() {

    beforeEach(function(){
        test_array = [1,2,3,4,5,6,7,8];
    })

    describe("Method take tests", function() {
        it("returns {1,2} on ({1,2,3,4}, 2)", function(){
            expect(arrayLibrary.take(test_array,2)).toEqual([1,2]);
        });

        it("returns {1,2,3,4} on ({1,2,3,4}, 4)", function() {
            expect(arrayLibrary.take(test_array,4)).toEqual([1,2,3,4]);
        });

        it("returns {1,2,3,4} on ({1,2,3,4}, n > length)", function() {
            expect(arrayLibrary.take(test_array,10)).toEqual(test_array);
        });

        it("returns null on n <= 0", function() {
            expect(arrayLibrary.take([1,2,3,4], -1)).toEqual(null);
        });
    });

    describe("Method skip tests", function() {
        it("returns {7,8} on (test_array,6)", function() {
            expect(arrayLibrary.skip(test_array,6)).toEqual([7,8]);
        });

        it("returns null on n >= test_array.length", function() {
            expect(arrayLibrary.skip(test_array,8)).toEqual(null);
        });

        it("returns {2,3,4,5,6,7,8} on (test_array,1)", function() {
            expect(arrayLibrary.skip(test_array,1)).toEqual([2,3,4,5,6,7,8]);
        });

        it("returns test_array on n <= 0", function() {
            expect(arrayLibrary.skip(test_array,0)).toEqual(test_array);
        });
    });

    describe("Method map tests", function() {
        it("reduces each element by 1 if x=> x - 1", function() {
            expect(arrayLibrary.map(test_array, function(x){ return x - 1;})).
            toEqual([0,1,2,3,4,5,6,7]);
        });

        it("squares each element if x => x*x", function() {
            expect(arrayLibrary.map(test_array, function(x) { return x*x })).
            toEqual([1,4,9,16,25,36,49,64]);
        });

        it("doesn't change original array", function() {
            var map = arrayLibrary.map(test_array, Math.sqrt);

            expect(test_array).not.toEqual(map);
        });
    });
});
