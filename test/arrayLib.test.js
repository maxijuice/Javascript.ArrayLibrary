/*
Unit tests for arrayLibrary via jasmine
 */
describe("ArrayLibrary tests", function() {

    beforeEach(function(){
        test_array = [1,2,3,4,5,6,7,8];
    });

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
            expect(arrayLibrary.map(test_array, function(x) { return x*x; })).
            toEqual([1,4,9,16,25,36,49,64]);
        });

        it("doesn't change original array", function() {
            var map = arrayLibrary.map(test_array, Math.sqrt);

            expect(test_array).not.toEqual(map);
        });
    });

    describe("Method reduce tests", function() {
        it("returns sum of array elements if x,y => x + y ", function() {
            expect(arrayLibrary.reduce(test_array, function(a, b) { return a + b; })).toBe(36);
        });

        it("returns concat for string array if x,y => x + y", function() {
            var initial = ["I ", "love ", "Minsk"];

            expect(arrayLibrary.reduce(initial, function(a,b) { return a + b; })).
            toEqual("I love Minsk");
        });

        it("returns multiplication of array elements if x,y => x * y ", function() {
            expect(arrayLibrary.reduce(test_array, function(a, b) { return a*b; })).toEqual(24*1680);
        });

        it("returns difference of array elements if x,y => x * y ", function() {
            expect(arrayLibrary.reduce(test_array, function(a, b) { return a-b; })).toBe(-34);
        });

        it("still works on array with 1 or more elements", function() {
            var arr = [1,2];

            expect(arrayLibrary.reduce(arr, function(a, b) { return a - b;})).toBe(-1);
        });

        it("still works on array with 1 element without initial value", function() {
            var arr = [1];

            expect(arrayLibrary.reduce(arr, function(a, b) { return a - b;})).toBe(1);
        });

        it("still works on array with 1 element without initial value", function() {
            var arr = [1];

            expect(arrayLibrary.reduce(arr, function(a, b) { return a * b;})).toBe(1);
        });

        it("works with initial value", function() {
            var arr = [1];

            expect(arrayLibrary.reduce(arr, function(a, b) { return a - b;}, 10)).toBe(9);
        });

        it("successfully ignores undefined elements", function() {
            var arr = [1,,,2,3];

            expect(arrayLibrary.reduce(arr, function(a, b) { return a + b;})).toBe(6);
        });
    });

    describe("Method foreach tests", function() {
        it("writes each element to string", function() {
            var actual = "", list = ["Hi", "Goodbye", "Не скучай"];

            var func = function(item, i, arr) {
                actual += i + ": " + item + " (array: " + arr + " )\n";
            };

            arrayLibrary.foreach(list, func);
            var expected = "0: Hi (array: Hi,Goodbye,Не скучай )\n" +
                "1: Goodbye (array: Hi,Goodbye,Не скучай )\n" +
                "2: Не скучай (array: Hi,Goodbye,Не скучай )\n";
            expect(actual).toEqual(expected);
        });

        it("ignores missed elements", function() {
            var actual = "", list = ["Hi", , "Не скучай"];

            var func = function(item, i, arr) {
                actual += i + ": " + item + " (array: " + arr + " )\n";
            };

            arrayLibrary.foreach(list, func);
            var expected = "0: Hi (array: Hi,,Не скучай )\n" +
                "2: Не скучай (array: Hi,,Не скучай )\n";
            expect(actual).toEqual(expected);
        });

        it("works if callback func arguments.length < 3", function() {

        })
    });

    describe("Method filter tests", function() {
        it("doesn't change original array", function() {
            var moreThanFiveArr = arrayLibrary.filter(test_array, function(number) { return number - 5 > 0; });

            expect(test_array).not.toEqual(moreThanFiveArr);
        });

        it("works in normal conditions, when func args.length < 3", function() {
            var moreThanFiveArr = arrayLibrary.filter(test_array, function(number) { return number - 5 > 0; });

            expect(moreThanFiveArr).toEqual([6,7,8]);
        });

        it("works in normal conditions, when func args.length = 3", function() {
            var actualArr = arrayLibrary.filter(test_array, function(number, i, arr) { return (number*i) in arr; });

            expect(actualArr).toEqual([1,2,3]);
        });
    });
});
