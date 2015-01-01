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
            return 'http://localhost:8000/users/' + this.bggUserName + '/games';
        },

        getRandomGameForCriteria: function(criteria) {
            criteria = criteria || {};
            var filteredCollection = this.filter(function(game){
                return (!criteria.get('numberOfPlayers') || game.playsWithPlayerCount(criteria.get('numberOfPlayers'))) &&
                       (!criteria.get('minTime') || game.gameLongerThan(criteria.get('minTime'))) &&
                       (!criteria.get('maxTime') || game.gameShorterThan(criteria.get('maxTime'))) &&
                       (!criteria.get('minRating') || game.higherUserRatingThan(criteria.get('minRating'))) &&
                       (criteria.get('includeUnrated') || game.hasUserRating());
            });

            var randomGameIndex = _.random(0, filteredCollection.length - 1);
            return filteredCollection[randomGameIndex];
        }

    })
});
