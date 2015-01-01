/*global define */
define([
    'underscore',
    'marionette',
    'views/NotificationView',
    'models/NotificationModel',
    'hbs!templates/form'
], function (_, Marionette, NotificationView, NotificationModel, template) {
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
            this.gameCollectionFetchPromise = null;
        },

        onRender: function() {
            if (!this.notificationView) {
                this._setupNotification();
            }
            this._updateNotification(this.notificationView.model.get('state'));
        },

        _submit: _.debounce(function() {
            var self = this;
            if (this.gameCollectionFetchPromise) {
                if (this.gameCollectionFetchPromise.state() === 'pending') {
                    this._updateNotification(NotificationModel.states.STILL_FETCHING);
                }
                this.gameCollectionFetchPromise.then(function() {
                    app.vent.trigger("revealGame");
                    self._updateNotification();
                });
            } else {
                //todo show error about no username being entered yet
            }
        }, 200),

        _onUsernameChange: _.debounce(function() {
            var self = this;
            this.model.set('bggUserName', this.ui.username.val());
            this.gameCollection.bggUserName = this.model.get('bggUserName');
            this.gameCollectionFetchPromise = this.gameCollection.fetch();
            this.gameCollectionFetchPromise.then(function() {
                self._updateNotification(NotificationModel.states.DONE_FETCHING);
            });
            this._updateNotification(NotificationModel.states.FETCHING);
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
            if (state) {
                if (state === NotificationModel.states.STILL_FETCHING) {
                    this.notificationView.setElement(this.$('#bottom-notification'));
                } else {
                    this.notificationView.setElement(this.$('#top-notification'));
                }
                this.notificationView.updateState(state, this.model.get('bggUserName'));
                this.notificationView.render();
            }
        }
    })
});