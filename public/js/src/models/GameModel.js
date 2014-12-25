/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    return Backbone.Model.extend({

        isOlderThan: function(age) {
            var currentYear = new Date().getFullYear();
            var minimumYear = currentYear - age;
            return this.get('yearPublished') < minimumYear;
        },

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
            return this.get('userRating') >= rating && this.get('userRating') !== 255;
        },

        higherAverageRatingThan: function(rating) {
            return this.get('averageRating') >= rating && this.get('averageRating') !== 255;
        }
    })
});
