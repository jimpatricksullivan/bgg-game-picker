/*global define, setInterval, clearInterval */
define([], function () {
    'use strict';

    /**
     * a function that waits a second for something asynchronous to happen,
     * calls a callback if it does, and explodes if it doesn't
     */
    return function (truthTest, callback) {
        var tries = 0;
        var timeoutId = setInterval(function () {
            tries++;
            if (tries === 10) {
                clearInterval(timeoutId);
                throw new Error('This never became true: ' + truthTest.toString());
            }
            if (truthTest()) {
                callback();
                clearInterval(timeoutId);
            }
        }, 100);
    };
});