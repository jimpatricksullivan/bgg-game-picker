/*global define */

define([
    'marionette',
    'hbs!templates/randomGame'
], function (Marionette, template) {

    return Marionette.ItemView.extend({
        template: template,

        initialize: function(options) {
            this.collection = options.gameCollection;
        },

        onBeforeRender: function() {
            this.model = this.collection.getRandomGameForCriteria();
        }
    });
});