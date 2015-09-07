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
            this._setupGameRevealListeners();
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

        _setupGameRevealListeners: function () {
            var channel = Radio.channel('app');
            channel.on('revealGame', _.bind(this._revealGame, this));
            channel.on('revealAnotherGame', _.bind(this._revealAnotherGame, this));
        },

        onShow: function () {
            this.header.show(this.headerView);
            this.body.show(this.formView);
            $(document).foundation();
        },

        _revealGame: function() {
            var games = _.shuffle(this.gameCollection.getFilteredCollection(this.criteria));
            this.gameCollectionView = new GameCollectionView({
                collection: new GameCollection(games)
            });
            this.games.show(this.gameCollectionView);
            $(document).foundation();
            this.currentGameIndex = 0;
            this._revealGameByIndex(this.currentGameIndex);
        },

        _revealAnotherGame: function() {
            this.currentGameIndex++;
            this._revealGameByIndex(this.currentGameIndex);
        },

        // factored out mainly to make testing easier
        _revealGameByIndex: function(index) {
            this.$('#game-' + index).foundation('reveal', 'open');
        }
    });
});