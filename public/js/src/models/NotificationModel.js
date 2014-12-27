/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    return Backbone.Model.extend({}, {
        states: {
            DONE_FETCHING: 'done',
            ERROR: 'error',
            FETCHING: 'fetching',
            INITIAL: 'initial',
            STILL_FETCHING: 'still'
        }
    })
});
