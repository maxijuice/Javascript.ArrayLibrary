/**
 * Created by maksim.bulakhau on 3/27/2017.
 */
/*
Array Library object for operating on arrays
 */

var arrayLibrary =  {
    take: function(array, n) {
        return array.slice(0, n);
    },

    skip: function(array, n) {
        return array.slice(n - array.length, array.length);
    },

    map: function(array, callback) {
        var length = array.length;
        var result = new Array(length);
        var k = 0;

        for (; k < length; k++) {
            result[k] = callback(array[k]);
        }

        return result;
    },

    reduce: function(array, callback /*, initialValue*/) {
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
    },

    foreach: function(array, callback) {
        var i = 0;
        var length = array.length;

        for (; i < length; i++){
            if (i in array) {
                callback(array[i], i, array);
            }
        }
    },

    filter: function(array, callback) {
        var newArray = [];
        var i = 0;
        var j = 0;
        var length = array.length;

        for (; i < length; i++){
            if (i in array){
                if (callback(array[i], i, array)) {
                    newArray[j] = array[i];
                    j++;
                }
            }
        }

        return newArray;
    }
};