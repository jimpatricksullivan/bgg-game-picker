define([
    'marionette',
    'backbone.radio',
    'hbs!templates/gameListItem'
], function (Marionette, Radio, template) {

    return Marionette.ItemView.extend({
        template: template
    });
});