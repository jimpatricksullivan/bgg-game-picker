/*global define */
define([
    'jquery',
    'underscore',
    'backbone',
    'models/GameModel'
], function ($, _, Backbone, GameModel) {
    'use strict';

    /**
     * This is an atypical backbone collection because the bgg api collection endpoint will sometimes respond with
     * { message: "message: "Your request for this collection has been accepted and will be processed.  Please try again later for access." }
     *
     * When fetch receives a response with game items, it fires off a custom 'doneProcessing' event.
     */
    return Backbone.Collection.extend({

        model: GameModel,

        // the time in milliseconds to wait between fetch attempts
        PAUSE_BETWEEN_FETCHES: 3000,

        // the number of fetches that have been attempted, appended to the url for cache busting
        fetchAttemptCounter: 0,

        // a boolean representing whether or not we need to try again
        serverStillProcessing: true,

        url: function() {
            return "http://bgg-api.herokuapp.com/api/v1/collection?" +
                "username=" + this.username +
                "&attempt=" + this.fetchAttemptCounter;
        },

        initialize: function(models, options) {
            options = options || {};
            if (!options.username) { throw new Error("Game collection requires a username"); }
            this.username = options.username;
        },

        /**
         * override Backbone.Collection.parse to:
         * 1. determine if it was a real response or a "will be processed" response
         * 2. parse out the array of games if it was a real response
         */
        parse: function(response) {
            if (response.items) {
                this.serverStillProcessing = false;
                return response.items.item || [];
            }
            return [];
        },

        fetchWithRetries: function(processedResultsDeferred) {
            var self = this;
            this.fetchAttemptCounter ++;

            // if a deferred wasn't passed in by recursive calls to this method, create a new one
            // this is the deferred which was returned by the original called by fetchWithRetries
            processedResultsDeferred = processedResultsDeferred || new $.Deferred();

            this.fetch().then(function(result) {
                if (self.serverStillProcessing) {

                    // if the server is still processing the request, pause and recurse
                    setTimeout(function() {
                        self.fetchWithRetries(processedResultsDeferred);
                    }, self.PAUSE_BETWEEN_FETCHES);

                } else {

                    // the server has processed the result, so we can resolve the deferred
                    processedResultsDeferred.resolve(result);

                }
            });
            return processedResultsDeferred.promise();
        }

    })
});
