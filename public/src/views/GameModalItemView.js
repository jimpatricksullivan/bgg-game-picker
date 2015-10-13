/*global define */

define([
    'marionette',
    'backbone.radio',
    'hbs!templates/gameModalItem'
], function (Marionette, Radio, template) {

    var cutesyTextStrings = [
        'How about...',
        'Maybe you should play...',
        'When\'s the last time you played this one?',
        'Howzabout...',
        'Hello. Is it this game you\'re looking for?',
        'This game matches your criteria:',
        'This is totes the game you should play!',
        'We picked this one. What do you think?'
    ];

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
                data.cutesyText = _.sample(cutesyTextStrings);
            }
            return data;
        }
    });
});