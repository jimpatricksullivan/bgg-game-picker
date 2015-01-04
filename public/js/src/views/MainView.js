/*global define */

define([
    'jquery',
    'marionette',
    'backbone.radio',
    'collections/GameCollection',
    'models/CriteriaModel',
    'views/HeaderView',
    'views/FormView',
    'views/GameView',
    'hbs!templates/main',
    'foundation.reveal'
], function (
    $, Marionette, Radio, GameCollection, CriteriaModel, HeaderView, FormView, GameView, template) {

    return Marionette.LayoutView.extend({
        template: template,

        initialize: function() {
            this._setupModels();
            this._setUpViews();
            this._setupRegions();
            var channel = Radio.channel('app');
            channel.on('revealGame', _.bind(this.revealRandomGame, this));
        },

        _setupModels: function() {
            this.criteria = new CriteriaModel();
            this.gameCollection = new GameCollection([]);
        },

        _setUpViews: function() {
            this.headerView = new HeaderView();
            this.gameView = new GameView();
            this.formView = new FormView({
                model: this.criteria,
                gameCollection: this.gameCollection
            });
        },

        _setupRegions: function() {
            this.addRegions({
                header: '#header',
                body: '#body',
                game: '#modalContents'
            });
        },

        onShow: function () {
            this.header.show(this.headerView);
            this.body.show(this.formView);
            this.game.show(this.gameView);
            $(document).foundation();
        },

        revealRandomGame: function() {
            this.$('#gameModal').foundation('reveal', 'close');
            this.gameView.model = this.gameCollection.getRandomGameForCriteria(this.criteria);
            this.gameView.render();
            this.$('#gameModal').foundation('reveal', 'open');
        }
    });
});