/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    return Backbone.Model.extend({

        /**
         * Parse the json object returned by the server, which is bonkers because it's a just a rudimentary json proxy
         * of an xml endpoint.
         *
         * @param rawObject the object retrieved from the server
         */
        parse: function(rawObject) {
            var parsedObject = {};
            parsedObject.id = parseInt(rawObject.$.objectid, 10);
            parsedObject.name = rawObject.name[0]._;
            parsedObject.yearPublished = parseInt(rawObject.yearpublished[0], 10);
            parsedObject.image = rawObject.image[0];
            parsedObject.thumbnail = rawObject.thumbnail[0];
            parsedObject.minPlayers = parseInt(rawObject.stats[0].$.minplayers, 10);
            parsedObject.maxPlayers =  parseInt(rawObject.stats[0].$.maxplayers, 10);
            parsedObject.playingTime = parseInt(rawObject.stats[0].$.playingtime, 10);
            parsedObject.userRating = parseFloat(rawObject.stats[0].rating[0].$.value);
            parsedObject.averageRating = parseFloat(rawObject.stats[0].rating[0].average[0].$.value);
            return parsedObject;
        },

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
