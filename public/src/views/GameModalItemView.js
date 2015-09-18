/*global define */

define([
    'marionette',
    'backbone.radio',
    'hbs!templates/gameModalItem'
], function (Marionette, Radio, template) {

    return Marionette.ItemView.extend({
        template: template,

        onRender: function() {
            // Set up an event listener. Not doing this with standard Backbone/Marionette events because Foundation
            // likes to move things around in the DOM.
            this.pickAnotherButton = this.$('#modalContents').find('.pick');
            this.pickAnotherButton.on( "click", _.bind(this._pickAnotherGame, this));
        },

        onDestroy: function() {
            this.pickAnotherButton.off('click');
        },

        _pickAnotherGame: function() {
            var channel = Radio.channel('app');
            channel.trigger("revealAnotherGame");
        },

        serializeData: function() {
            var data = {};
            if (this.model) {
                data = this.model.toJSON();
                data.index = this.options.childIndex;
                data.nextIndex = data.index + 1;
            }
            return data;
        }
    });
});