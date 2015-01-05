/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    return Backbone.Model.extend({

        playsWithPlayerCount: function(playerCount) {
            return playerCount <= this.get('maxPlayers') && playerCount >= this.get('minPlayers')
        },

        gameLongerThan: function(length) {
            return this.get('playingTime') >= length;
        },

        gameShorterThan: function(length) {
            return this.get('playingTime') <= length;
        },

        higherUserRatingThan: function(rating) {
            return !this.hasUserRating() || this.get('userRating') >= rating;
        },

        hasUserRating: function() {
            return this.get('userRating') !== null;
        }
    })
});
