/*global require, describe, beforeEach, it */
define([
    'mocha',
    'chai'
], function (Mocha, Chai) {
    'use strict';

    return {
        addTests: function() {

            describe("example test", function () {
                it("should pass", function() {
                    var x = 1;
                    x.should.equal(1);
                });

                it("should still pass", function() {
                    var x = 1;
                    x.should.equal(1);
                });
            });

            describe("another test", function () {
                it("should pass", function() {
                    var x = 1;
                    x.should.equal(1);
                });
            });
        }
    };
});
