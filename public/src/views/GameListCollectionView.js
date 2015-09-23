define([
    'marionette',
    'views/GameListItemView'
], function (Marionette, GameListItemView) {
    return Marionette.CollectionView.extend({
        childView: GameListItemView
    });
});