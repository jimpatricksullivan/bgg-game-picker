/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    return Backbone.Model.extend({
        defaults: {
            bggUserName: '',
            numberOfPlayers: 'any',
            minTime: 0,
            maxTime: 480,
            minRating: 0,
            includeUnrated: true
        }
    })
});
