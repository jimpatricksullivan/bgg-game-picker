define([
    'marionette',
    'views/GameListCollectionView',
    'hbs!templates/gameListModalView'
], function (Marionette, GameListCollectionView, template) {
    return Marionette.LayoutView.extend({
        template: template,

        initialize: function(options) {
            this.listView = new GameListCollectionView({collection: options.collection});
            this.addRegions({
                gameList: '#game-list'
            });
        },

        onShow: function () {
            this.gameList.show(this.listView);
        }
    });
});