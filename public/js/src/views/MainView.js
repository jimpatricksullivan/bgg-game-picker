/*global define */

define([
    'jquery',
    'marionette',
    'views/HeaderView',
    'views/FormView',
    'views/RandomGameView',
    'hbs!templates/main',
    'foundation.reveal'
], function ($, Marionette, HeaderView, FormView, RandomGameView, template) {

    return Marionette.LayoutView.extend({
        template: template,

        initialize: function() {
            this.headerView = new HeaderView();
            this.formView = new FormView({
                model: Marionette.getOption(this, 'criteria'),
                gameCollection: Marionette.getOption(this, 'gameCollection')
            });

            this.randomGameView = new RandomGameView({
                gameCollection: Marionette.getOption(this, 'gameCollection')
            });
            this.addRegions({
                header: '#header',
                body: '#body',
                game: '#modalContents'
            });
            // listen for events from the form
        },

        onShow: function () {
            this.header.show(this.headerView);
            this.body.show(this.formView);
            this.game.show(this.randomGameView);
            $(document).foundation();
        },

        openModalWithGame: function() {
            this.randomGameView.render();
            $('#gameModal').foundation('reveal', 'open');
        }
    });
});