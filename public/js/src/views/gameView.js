/*global define */

define([
    'marionette',
    'hbs!templates/game'
], function (Marionette, template) {

    return Marionette.ItemView.extend({
        template: template
    });
});