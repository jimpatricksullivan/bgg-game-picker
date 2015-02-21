/*global define */

define([
    'marionette',
    'backbone.radio',
    'hbs!templates/game'
], function (Marionette, Radio, template) {

    return Marionette.ItemView.extend({
        template: template,

        ui: {
            pickAnotherButton: '.pick'
        },

        events: {
            "click @ui.pickAnotherButton": "_pickAnotherGame"
        },

        _pickAnotherGame: function() {
            var channel = Radio.channel('app');
            channel.trigger("revealGame");
        }
    });
});