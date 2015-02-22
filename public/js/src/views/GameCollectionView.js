/*global define */

define([
    'marionette',
    'views/GameView'
], function (Marionette, GameView) {

    return Marionette.CollectionView.extend({
        childView: GameView,

        initialize: function() {
            // add a last model to the collection to show a message that you've seen all the games
            this.collection.add({
                noMoreGames: true
            });
        },

        childViewOptions: function(model, index) {
            return {
                childIndex: index
            };
        }
    });
});