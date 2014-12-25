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
            return 'http://localhost:8000/users/' + this.criteria.get('bggUserName') + '/games';
        },

        initialize: function(models, options) {
            options = options || {};
            this.criteria = options.criteria;
        },

        getRandomGameForCriteria: function(criteria) {
            criteria = criteria || {};
            var filteredCollection = this.filter(function(game){
                if (criteria.yearsOld && game.isOlderThan(criteria.yearsOld)) {
                    return false;
                }
                if (criteria.playerCount && !game.playsWithPlayerCount(criteria.playerCount)) {
                    return false;
                }
                if (criteria.minLength && !game.gameLongerThan(criteria.minLength)) {
                    return false;
                }
                if (criteria.maxLength && !game.gameShorterThan(criteria.maxLength)) {
                    return false;
                }
                if (criteria.minUserRating && !game.higherUserRatingThan(criteria.minUserRating)) {
                    return false;
                }
                if (criteria.minAverageRating && !game.higherAverageRatingThan(criteria.minAverageRating)) {
                    return false;
                }
                return true;
            });

            var randomGameIndex = _.random(0, filteredCollection.length - 1);
            return filteredCollection[randomGameIndex];
        }

    })
});
