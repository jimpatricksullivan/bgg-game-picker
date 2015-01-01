/*global define */
define([
    'marionette',
    'views/NotificationView',
    'models/NotificationModel',
    'hbs!templates/form'
], function (Marionette, NotificationView, NotificationModel, template) {
    'use strict';

    return Marionette.ItemView.extend({
        template: template,

        ui: {
            "submitButton": ".button",
            "username": "#username"
        },

        events: {
            "click @ui.submitButton": "_submit",
            "change @ui.username": "_onUsernameChange"
        },

        initialize: function(options) {
            this.gameCollection = options.gameCollection;
        },

        onRender: function() {
            if (!this.notificationView) {
                this._setupNotification();
            }
            this._updateNotification(this.notificationView.model.get('state'));
        },

        _submit: function() {
            //todo protect against submission before the collection is done fetching
            app.vent.trigger("revealGame");
        },

        _onUsernameChange: _.debounce(function() {
            this.model.set('bggUserName', this.ui.username.val());
            this.gameCollection.bggUserName = this.model.get('bggUserName');
            this.gameCollection.fetch();
        }, 300),

        _setupNotification: function () {
            var notificationModel = new NotificationModel({
                state: NotificationModel.states.INITIAL,
                username: ''
            });
            this.notificationView = new NotificationView({
                model: notificationModel
            })
        },

        _updateNotification: function(state) {
            this.notificationView.$el.empty();
            if (state === NotificationModel.states.STILL_FETCHING) {
                this.notificationView.setElement(this.$('#bottom-notification'));
            } else {
                this.notificationView.setElement(this.$('#top-notification'));
            }
            this.notificationView.updateState(state, this.model.get('bggUserName'));
            this.notificationView.render();
        }
    })
});