/*global define,document */

define([
    'jquery',
    'underscore',
    'marionette',
    'backbone.radio',
    'collections/GameCollection',
    'models/CriteriaModel',
    'views/HeaderView',
    'views/FormView',
    'views/GameCollectionView',
    'hbs!templates/main',
    'foundation.reveal'
], function (
    $, _, Marionette, Radio, GameCollection, CriteriaModel, HeaderView, FormView, GameCollectionView, template
) {

    return Marionette.LayoutView.extend({
        template: template,

        initialize: function() {
            this._setupModels();
            this._setUpViews();
            this._setupRegions();
            var channel = Radio.channel('app');
            channel.on('revealGame', _.bind(this._revealGames, this));
        },

        _setupModels: function() {
            this.criteria = new CriteriaModel();
            this.gameCollection = new GameCollection([]);
        },

        _setUpViews: function() {
            this.headerView = new HeaderView();
            this.formView = new FormView({
                model: this.criteria,
                gameCollection: this.gameCollection
            });
        },

        _setupRegions: function() {
            this.addRegions({
                header: '#header',
                body: '#body',
                games: '#game-modals'
            });
        },

        onShow: function () {
            this.header.show(this.headerView);
            this.body.show(this.formView);
            $(document).foundation();
        },

        _revealGames: function() {
            var games = _.shuffle(this.gameCollection.getFilteredCollection(this.criteria));
            this.gameCollectionView = new GameCollectionView({
                collection: new GameCollection(games)
            });
            this.games.show(this.gameCollectionView);
            $(document).foundation();
            $('#game-0').foundation('reveal', 'open');
        }
    });
});