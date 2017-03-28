/*
Unit tests for arrayLibrary via jasmine
 */
describe("ArrayLibrary tests", function() {

    beforeEach(function(){
        testArray = [1,2,3,4,5,6,7,8];
    });

    describe("Method take tests", function() {
        it("returns {1,2} on ({1,2,3,4..}, 2)", function(){
            expect(arrayLibrary.take(testArray,2)).toEqual([1,2]);
        });

        it("returns {1,2,3,4} on ({1,2,3,4..}, 4)", function() {
            expect(arrayLibrary.take(testArray,4)).toEqual([1,2,3,4]);
        });

        it("returns {1,2,3,4} on ({1,2,3,4..}, n > length)", function() {
            expect(arrayLibrary.take(testArray,10)).toEqual(testArray);
        });

        it("returns elements except last mod(n) on n <= 0", function() {
            expect(arrayLibrary.take([1,2,3,4], -3)).toEqual([1]);
        });
    });

    describe("Method skip tests", function() {
        it("returns {7,8} on (testArray,6)", function() {
            expect(arrayLibrary.skip(testArray,6)).toEqual([7,8]);
        });

        it("returns {4,5,6,7,8} on (testArray,3)", function() {
            expect(arrayLibrary.skip(testArray,3)).toEqual([4,5,6,7,8]);
        });

        it("returns {8} on (testArray,7)", function() {
            expect(arrayLibrary.skip(testArray,7)).toEqual([8]);
        });

        it("goes round on n >= testArray.length", function() {
            expect(arrayLibrary.skip(testArray,10)).toEqual([]);
        });

        it("returns {2,3,4,5,6,7,8} on (testArray,1)", function() {
            expect(arrayLibrary.skip(testArray,1)).toEqual([2,3,4,5,6,7,8]);
        });

        it("returns skip(length-n) on n < 0", function() {
            expect(arrayLibrary.skip(testArray,-2)).toEqual([7,8]);
        });

        it("returns same values array on n = 0", function() {
            expect(arrayLibrary.skip(testArray,0)).toEqual(testArray);
        });
    });

    describe("Method map tests", function() {
        it("reduces each element by 1 if x=> x - 1", function() {
            expect(arrayLibrary.map(testArray, function(x){ return x - 1;})).
            toEqual([0,1,2,3,4,5,6,7]);
        });

        it("squares each element if x => x*x", function() {
            expect(arrayLibrary.map(testArray, function(x) { return x*x; })).
            toEqual([1,4,9,16,25,36,49,64]);
        });

        it("doesn't change original array", function() {
            var map = arrayLibrary.map(testArray, Math.sqrt);

            expect(testArray).not.toEqual(map);
        });
    });

    describe("Method reduce tests", function() {
        it("returns sum of array elements if x,y => x + y ", function() {
            expect(arrayLibrary.reduce(testArray, function(a, b) { return a + b; })).toBe(36);
        });

        it("returns concat for string array if x,y => x + y", function() {
            var initial = ["I ", "love ", "Minsk"];

            expect(arrayLibrary.reduce(initial, function(a,b) { return a + b; })).
            toEqual("I love Minsk");
        });

        it("returns multiplication of array elements if x,y => x * y ", function() {
            expect(arrayLibrary.reduce(testArray, function(a, b) { return a * b; })).toEqual(24*1680);
        });

        it("returns difference of array elements if x,y => x * y ", function() {
            expect(arrayLibrary.reduce(testArray, function(a, b) { return a - b; })).toBe(-34);
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
            var actual = "", list = ["Hi", "Goodbye", "Не скучай"];

            var func = function(item) {
                actual += item + "\n";
            };

            arrayLibrary.foreach(list, func);
            var expected = "Hi\nGoodbye\nНе скучай\n";
            expect(actual).toEqual(expected);
        });
    });

    describe("Method filter tests", function() {
        it("doesn't change original array", function() {
            var moreThanFiveArr = arrayLibrary.filter(testArray, function(number) { return number - 5 > 0; });

            expect(testArray).not.toEqual(moreThanFiveArr);
        });

        it("works in normal conditions, when func args.length < 3", function() {
            var moreThanFiveArr = arrayLibrary.filter(testArray, function(number) { return number - 5 > 0; });

            expect(moreThanFiveArr).toEqual([6,7,8]);
        });

        it("works in normal conditions, when func args.length = 3", function() {
            var actualArr = arrayLibrary.filter(testArray, function(number, i, arr) { return (number*i) in arr; });

            expect(actualArr).toEqual([1,2,3]);
        });
    });
});
