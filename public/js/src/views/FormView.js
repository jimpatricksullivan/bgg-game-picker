/*global define */
define([
    'marionette',
    'hbs!templates/form'
], function (Marionette, template) {
    'use strict';

    return Marionette.ItemView.extend({
        template: template,

        ui: {
            "submitButton": "button"
        },

        events: {
            "click @ui.submitButton": "submit"
        },

        submit: function() {
            debugger;
        }
    })
});