/*global define, require, describe, beforeEach, afterEach, it, sinon */
define([
    'underscore',
    'mocha',
    'chai',
    'backbone',
    'views/GameListCollectionView'
], function (_, Mocha, Chai, Backbone, GameListCollectionView) {
    'use strict';

    describe("GameListCollectionView", function () {
        var view, sandbox;

        beforeEach(function() {
            sandbox = sinon.sandbox.create();
            this.games = [
                {name: 'a game'},
                {name: 'b game'},
                {name: 'c game'},
                {name: 'd game'},
                {name: 'e game'},
                {name: 'f game'},
                {name: 'g game'}
            ];
            var collection = new Backbone.Collection(this.games);
            view = new GameListCollectionView({
                collection: collection
            });
            sandbox.stub(view, '_imagesLoaded', function(images, callback) {
                callback();
            });
        });

        afterEach(function() {
            sandbox.restore();
        });

        it('adds groups of games as their images are loaded', function() {
            view.showGames();

            // black box test: are we seeing all the games?
            Chai.expect(view.$('.game-list-item').length).to.equal(7);

            // white box test: did the games load in chunks?
            Chai.expect(view._imagesLoaded.callCount).to.equal(2);
            var firstChunk = view._imagesLoaded.getCall(0).args[0];
            var secondChunk = view._imagesLoaded.getCall(1).args[0];
            var allGameNames = _.map(firstChunk.concat(secondChunk), function(element) {
                return $(element).find('h4').text().trim();
            });
            Chai.expect(allGameNames.sort()).to.eql(_.pluck(this.games, 'name'));
        });
    });
});