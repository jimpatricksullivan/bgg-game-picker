/*global define, require, describe, beforeEach, it */
define([
    'underscore',
    'mocha',
    'chai'//,
    //'models/CriteriaModel',
    //'collections/GameCollection'
], function (
    _,
    Mocha,
    Chai//, CriteriaModel, GameCollection
) {
    'use strict';

    describe('a dummy test', function() {
        it('does a thing', function() {
            expect(1).to.not.equal(0);
        });

    });

    //
    //var games = [
    //    { minPlayers: 1, maxPlayers: 8, playingTime: 45, userRating: 7, name: 'game' },
    //    { minPlayers: 1, maxPlayers: 8, playingTime: 45, userRating: 6, name: 'game with rating 6' },
    //    { minPlayers: 1, maxPlayers: 8, playingTime: 45, userRating: 5, name: 'game with rating 5' },
    //    { minPlayers: 1, maxPlayers: 8, playingTime: 45, userRating: null, name: 'game with no rating' },
    //    { minPlayers: 3, maxPlayers: 8, playingTime: 45, userRating: 7, name: 'game with min 3 players' },
    //    { minPlayers: 1, maxPlayers: 3, playingTime: 45, userRating: 7, name: 'game with max 3 players' },
    //    { minPlayers: 4, maxPlayers: 4, playingTime: 45, userRating: 7, name: 'game for 4 players' },
    //    { minPlayers: 2, maxPlayers: 2, playingTime: 45, userRating: 7, name: 'game for 2 players'},
    //    { minPlayers: 1, maxPlayers: 8, playingTime: 15, userRating: 7, name: 'game that takes 15 min' },
    //    { minPlayers: 1, maxPlayers: 8, playingTime: 30, userRating: 7, name: 'game that takes 30 min' },
    //    { minPlayers: 1, maxPlayers: 8, playingTime: 60, userRating: 7, name: 'game that takes 60 min' },
    //    { minPlayers: 1, maxPlayers: 8, playingTime: 90, userRating: 7, name: 'game that takes 90 min' }
    //];
    //
    //return function() {
    //
    //    describe("GameCollection and GameModel", function () {
    //        var collection;
    //
    //        beforeEach(function() {
    //            collection = new GameCollection(games);
    //        });
    //
    //        var getNames = function(array) {
    //            return _.map(array, function(model) {
    //                return model.get('name');
    //            });
    //        };
    //
    //        it("doesn't filter games with empty criteria", function() {
    //            var criteria = new CriteriaModel();
    //            var names = getNames(collection.getFilteredCollection(criteria));
    //            Chai.expect(names.length).to.eql(games.length)
    //        });
    //
    //        it("filters games with criteria", function() {
    //            var criteria = new CriteriaModel({
    //                numberOfPlayers: 3,
    //                minTime:30,
    //                maxTime: 60,
    //                minRating: 6,
    //                includeUnrated: true
    //            });
    //            var names = getNames(collection.getFilteredCollection(criteria));
    //            Chai.expect(names).to.have.members([
    //                'game',
    //                'game with rating 6',
    //                'game with no rating',
    //                'game with min 3 players',
    //                'game with max 3 players',
    //                'game that takes 30 min',
    //                'game that takes 60 min']);
    //        });
    //
    //        it("filters correctly with includeUnrated=false", function() {
    //            var criteria = new CriteriaModel({
    //                minRating: 6,
    //                includeUnrated: false
    //            });
    //            var names = getNames(collection.getFilteredCollection(criteria));
    //            Chai.expect(names).to.have.members([
    //                'game',
    //                'game with rating 6',
    //                'game with min 3 players',
    //                'game with max 3 players',
    //                'game for 4 players',
    //                'game for 2 players',
    //                'game that takes 15 min',
    //                'game that takes 30 min',
    //                'game that takes 60 min',
    //                'game that takes 90 min']);
    //        });
    //    });
    //};
});
