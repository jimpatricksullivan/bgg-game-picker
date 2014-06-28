/*global define */
define([
    '../../../bower_components/underscore/underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    return Backbone.Model.extend({

        parse: function(response) {
            /*
             if response looks like it doesn't have the details we want, just grab the id
             if response looks like it has the details we want, parse them
             */
        }

    })
});
