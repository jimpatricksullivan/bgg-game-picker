/*global define */
define([
    'underscore',
    'backbone',
    'collections/OwnedGameCollection'
], function (_, Backbone, OwnedGameCollection) {
    'use strict';

    return Backbone.Collection.extend({

        initialize: function(models, options) {
            options = options || {};
            if (!options.username) { throw new Error("Game collection requires a username"); }
            this.username = options.username;
        },

        fetch: function() {
            this.ownedGameCollection = new OwnedGameCollection([], {username: this.username} );
            $.when( this.ownedGameCollection.fetchWithRetries() ).done(
                function() {
                    console.log("detailedGameCollection fetched an owned game collection. " +
                        "Now it's time to start getting details for them.");
                }
            );
        }

    })
});
