/*global define */

define([
    'marionette',
    'views/HeaderView',
    'views/FormView',
    'hbs!templates/main'
], function (Marionette, HeaderView, FormView, template) {

    return Marionette.LayoutView.extend({
        template: template,

        initialize: function() {
            this.headerView = new HeaderView();
            this.formView = new FormView({
                model: Marionette.getOption(this, 'criteria')
            });
            this.addRegions({
                header: '#header',
                body: '#body'
            });
            // listen for events from the form
        },

        onShow: function () {
            this.header.show(this.headerView);
            this.body.show(this.formView);
        }
    });
});