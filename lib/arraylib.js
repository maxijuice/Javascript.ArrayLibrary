/**
 * Created by maksim.bulakhau on 3/27/2017.
 */
/*
Array Library object for operating on arrays
 */
"use strict";

var arrayLibrary = (function() {
    function take(array, n) {
        return array.slice(0, n);
    }

    function skip(array, n) {
        return array.slice(n);
    }

    function map(array, callback) {
        var length = array.length;
        var newArray = [];

        for (var k = 0; k < length; k++) {
            newArray.push(callback(array[k]));
        }

        return newArray;
    }

    function reduce(array, callback /*, initialValue*/) {
        var k = 0;
        var value = 0;

        if (arguments.length >= 3)
            value = arguments[2];
        else {
            value = array[k];
            k++;
        }

        var length = array.length;

        for (; k < length; k++){
            if (k in array){
                value = callback(value, array[k]);
            }
        }

        return value;
    }

    function foreach(array, callback) {
        var i = 0;
        var length = array.length;

        for (; i < length; i++) {
            if (i in array) {
                callback(array[i], i, array);
            }
        }
    }

    function filter(array, callback) {
        var newArray = [];
        var i = 0;
        var length = array.length;

        for (; i < length; i++) {
            if (i in array) {
                if (callback(array[i], i, array)) {
                    newArray.push(array[i]);
                }
            }
        }

        return newArray;
    }

    function chain(array) {
        var initArray = array;
        chain = chain.bind(this);

        function wrapChain(callback) {
            callback = callback.bind(null, initArray);
            return function(n) {
                return chain(callback.apply(null, arguments));
            }
        }

        return {
            take: wrapChain(this.take),
            skip: wrapChain(this.skip),
            map: wrapChain(this.map),
            foreach: wrapChain(this.foreach),
            filter: wrapChain(this.filter),
            value: function() {
                return initArray;
            }
        };
    }

    return {
        take: take,
        skip: skip,
        map: map,
        reduce: reduce,
        foreach: foreach,
        filter: filter,
        chain: chain
    };
})();
