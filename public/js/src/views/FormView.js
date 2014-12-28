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
            "submitButton": "button"
        },

        events: {
            "click @ui.submitButton": "submit"
        },

        initialize: function(options) {
            this.collection = options.collection;
        },

        onRender: function() {
            if (!this.notificationView) {
                this._setupNotification();
            }
            this._updateNotification(this.notificationView.model.get('state'));
        },

        submit: function() {},

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