/*global define */

define([
    'marionette',
    'views/HeaderView',
    'views/FormView',
    'hbs!templates/main'
], function (Marionette, HeaderView, FormView, template) {

    return Marionette.LayoutView.extend({
        template: template,

        onShow: function () {
            this.headerView = new HeaderView();
            this.formView = new FormView({
                model: Marionette.getOption(this, 'criteria')
            });
            this.addRegions({
                header: '#header',
                body: '#body'
            });
            this.header.show(this.headerView);
            this.body.show(this.formView);
        }
    });
});