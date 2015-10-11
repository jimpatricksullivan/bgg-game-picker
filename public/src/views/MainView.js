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
    'views/GameModalsCollectionView',
    'views/GameListModalView',
    'hbs!templates/main',
    'foundation.reveal'
], function (
    $,
    _,
    Marionette,
    Radio,
    GameCollection,
    CriteriaModel,
    HeaderView,
    FormView,
    GameModalsCollectionView,
    GameListModalView,
    template
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
            channel.on('revealList', _.bind(this._revealGamesList, this));
        },

        onShow: function () {
            this.header.show(this.headerView);
            this.body.show(this.formView);
            $(document).foundation();
        },

        _revealGame: function() {
            var games = _.shuffle(this.gameCollection.getFilteredCollection(this.criteria));
            this._showCollectionView(games, GameModalsCollectionView);
            this.currentGameIndex = 0;
            this._revealModal('#game-' + this.currentGameIndex);
        },

        _revealAnotherGame: function() {
            this.currentGameIndex++;
            this._revealModal('#game-' + this.currentGameIndex);
        },

        _revealGamesList: function() {
            var games = this.gameCollection.getFilteredCollection(this.criteria);
            this._showCollectionView(games, GameListModalView);
            this._revealModal('#game-list');
        },

        _showCollectionView: function (games, ViewClass) {
            this.gameCollectionView = new ViewClass({
                collection: new GameCollection(games)
            });
            this.games.show(this.gameCollectionView);
            $(document).foundation();
        },

        _revealModal: function(selector) {
            window.scrollTo(0, 0);
            this.$(selector).foundation('reveal', 'open', { animation: 'none' });
        }
    });
});