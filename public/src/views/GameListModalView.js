define([
    'underscore',
    'marionette',
    'views/GameListCollectionView',
    'hbs!templates/gameListModalView'
], function (_, Marionette, GameListCollectionView, template) {

    var cutesyTextStrings = [
        'These are the games you\'re looking for.',
        'Your search turned up these:',
        'Here are some games to choose from:',
        'Here\'s every game that matched your search:',
        'Pick a winner!',
        'Pick a winner! Or at least pick one you can win.'
    ];

    return Marionette.LayoutView.extend({
        template: template,

        initialize: function(options) {
            this.listView = new GameListCollectionView({collection: options.collection});
            this.addRegions({
                gameList: '#game-list > div'
            });
        },

        serializeData: function() {
            return {
                cutesyText: _.sample(cutesyTextStrings)
            };
        },

        onShow: function () {
            this.gameList.show(this.listView);
            this.$el.find('#game-list').one('opened.fndtn.reveal', _.bind(function() {
                this.listView.showGames();
            }, this));
        }
    });
});