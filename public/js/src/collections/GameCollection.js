/*global define */
define([
    'jquery',
    'underscore',
    'backbone',
    'models/GameModel'
], function ($, _, Backbone, GameModel) {
    'use strict';

    return Backbone.Collection.extend({

        model: GameModel,

        url: function() {
            return '/users/' + this.bggUserName + '/games';
        },

        getFilteredCollection: function (criteria) {
            return this.filter(function (game) {
                return (!criteria.get('numberOfPlayers') || game.playsWithPlayerCount(criteria.get('numberOfPlayers'))) &&
                    (!criteria.get('minTime') || game.gameLongerThan(criteria.get('minTime'))) &&
                    (!criteria.get('maxTime') || game.gameShorterThan(criteria.get('maxTime'))) &&
                    (!criteria.get('minRating') || game.higherUserRatingThan(criteria.get('minRating'))) &&
                    (criteria.get('includeUnrated') || game.hasUserRating());
            });
        },

        getRandomGameForCriteria: function(criteria) {
            var filteredCollection = this.getFilteredCollection(criteria || {});
            var randomGameIndex = _.random(0, filteredCollection.length - 1);
            return filteredCollection[randomGameIndex];
        }

    })
});
