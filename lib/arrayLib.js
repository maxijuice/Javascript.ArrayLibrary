/**
 * Created by maksim.bulakhau on 3/27/2017.
 */
/*
Array Library object for operating on arrays
 */

var arrayLibrary =  {
    take: function(arr, n) {
        if (n >= arr.length)
            return arr;
        if(n <= 0)
            return null;

        return arr.slice(0,n);
    },

    skip: function(arr, n) {
        if (n >= arr.length)
            return null;
        if (n <= 0)
            return arr;

        return arr.slice(n - arr.length, arr.length);
    },

    map: function(arr, callback) {
        return arr.map(callback);
    }

};