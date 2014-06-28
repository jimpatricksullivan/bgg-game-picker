/*global define */
define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    /**
     * This is an atypical backbone collection because the bgg api collection endpoint will sometimes respond with
     * { message: "message: "Your request for this collection has been accepted and will be processed.  Please try again later for access." }
     *
     * When fetch receives a response with game items, it fires off a custom 'doneProcessing' event.
     */
    return Backbone.Collection.extend({

        // the time to wait between fetch attempts
        PAUSE_BETWEEN_FETCHES: 3000,

        fetchStatus: {
            // the number of fetches that have been attempted, also appended to each request as a query string
            attemptCounter: 0,

            // a boolean representing whether or not we need to try again
            stillProcessing: true
        },

        url: function() {
            return "http://bgg-api.herokuapp.com/api/v1/collection?username=jimbnyc&attempt="
                + this.fetchStatus.attemptCounter;
        },

        /**
         * override Backbone.Collection.parse to:
         * 1. determine if it was a real response or a "will be processed" response
         * 2. parse out the array of games if it was a real response
         */
        parse: function(response) {
            if (response.items) {
                this.fetchStatus.stillProcessing = false;
                return response.items.item || [];
            }
            return [];
        },

        /**
         * Override Backbone.Collection.fetch to:
         * 1. fetch again after a delay if the response was "will be processed"
         * 2. trigger a special "doneProcessing" event otherwise
         */
        fetch: function(options) {
            var self = this;
            this.fetchStatus.attemptCounter ++;
            options = options || {};
            var fetch = _.bind(this.fetch, this);
            options.success = function() {
                if (self.fetchStatus.stillProcessing) {
                    setTimeout(fetch, self.PAUSE_BETWEEN_FETCHES);
                } else {
                    self.trigger('doneProcessing');
                }
            };
            return Backbone.Collection.prototype.fetch.call(this, options);
        }

    })
});
