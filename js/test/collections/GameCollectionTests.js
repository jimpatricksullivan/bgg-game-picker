/*global require, describe, beforeEach, it */
define([
    'mocha',
    'chai',
    '../../src/collections/GameCollection'
], function (Mocha, Chai, GameCollection) {
    'use strict';

    return {
        addTests: function() {

            describe("GameCollection", function () {
                it("doesn't parse if there are no items", function() {
                    var gameCollection = new GameCollection();
                    var parsed = gameCollection.parse({});
                    Chai.expect(parsed).to.eql([]);
                });
            });
        }
    };
});
