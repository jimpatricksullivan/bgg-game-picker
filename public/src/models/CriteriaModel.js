/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    return Backbone.Model.extend({
        defaults: {
            bggUserName: '',
            numberOfPlayers: null,
            minTime: 0,
            maxTime: 480,
            minRating: 0,
            includeUnrated: true
        }
    }, {
        numericFields: [
            'numberOfPlayers',
            'minTime',
            'maxTime',
            'minRating'
        ]
    });
});
