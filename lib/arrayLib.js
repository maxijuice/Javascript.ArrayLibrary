/**
 * Created by maksim.bulakhau on 3/27/2017.
 */
/*
Array Library object for operating on arrays
 */

var arrayLibrary =  {
    take: function(arr, n) {
        if (!Array.isArray(arr))
            return undefined;
        if (n >= arr.length)
            return arr;
        if(n <= 0)
            return null;

        return arr.slice(0,n);
    },

    skip: function(arr, n) {
            if (!Array.isArray(arr))
                return undefined;
            if (n >= arr.length)
                return null;
            if (n <= 0)
                return arr;

        return arr.slice(n - arr.length, arr.length);
    },

    map: function(arr, callback) {
        var len = arr.length, result = new Array(len), k = 0;
        for (; k < len; k++) {
            result[k] = callback(arr[k]);
        }

        return result;
    },

    reduce: function(arr, callback /*, initialValue*/) {
         var len = arr.length, k = 0, value = 0;

         if (arguments.length >= 3)
             value = arguments[2];
         else {
             value = arr[k];
             k++;
         }

         for (; k < len; k++){
             if (k in arr)
                value = callback(value, arr[k]);
         }

         return value;
    },

    foreach: function(arr, callback) {
        var i = 0, len = arr.length;
        for (; i < len; i++){
            if (i in arr)
                callback(arr[i], i, arr);
        }
    },

    filter: function(arr, callback) {
        var newArr = [], i = 0, j = 0, len = arr.length;
        for (; i < len; i++){
            if (i in arr){
                if (callback(arr[i], i, arr)) {
                    newArr[j] = arr[i];
                    j++;
                }
            }
        }

        return newArr;
    }
};