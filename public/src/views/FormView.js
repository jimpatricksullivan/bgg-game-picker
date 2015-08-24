/*global define */
define([
    'jquery',
    'underscore',
    'marionette',
    'backbone.radio',
    'views/NotificationView',
    'models/NotificationModel',
    'models/CriteriaModel',
    'hbs!templates/form'
], function ($, _, Marionette, Radio, NotificationView, NotificationModel, CriteriaModel, template) {
    'use strict';

    return Marionette.ItemView.extend({
        template: template,

        ui: {
            submitButton: '.button',
            username: '[data-model-attribute="bggUserName"]',
            attributeField: '[data-model-attribute]'
        },

        events: {
            "click @ui.submitButton": "_submit",
            "change @ui.username": "_onUsernameChange",
            "change @ui.attributeField": "_onFieldChange"
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
            this.listenTo(this.model, 'change:minRating', this._excludeUnranked);
        },

        _submit: _.debounce(function() {
            var self = this;
            if (this.gameCollectionFetchPromise) {
                if (this.gameCollectionFetchPromise.state() === 'pending') {
                    this._updateNotification(NotificationModel.states.STILL_FETCHING);
                }
                this.gameCollectionFetchPromise.then(function() {
                    var channel = Radio.channel('app');
                    channel.trigger("revealGame");
                    self._updateNotification();
                });
            } else {
                this._updateNotification(NotificationModel.states.ENTER_USERNAME);
            }
        }, 200),

        _onUsernameChange: _.debounce(function() {
            var self = this;
            this.gameCollection.bggUserName = this.model.get('bggUserName');
            this.gameCollectionFetchPromise = this.gameCollection.fetch();
            this.gameCollectionFetchPromise.then(
                function() {
                    self._updateNotification(NotificationModel.states.DONE_FETCHING);
                },
                function() {
                    self._updateNotification(NotificationModel.states.ERROR);
                }
            );
            this._updateNotification(NotificationModel.states.FETCHING);
        },100),

        _onFieldChange: function(event) {
            var fieldElement = $(event.target);
            var modelAttribute = fieldElement.attr('data-model-attribute');
            var value = fieldElement.val();
            if (_.contains(CriteriaModel.numericFields, modelAttribute)) {
                value = parseInt(value, 10);
            } else if (fieldElement.attr('type') === 'checkbox') {
                value = fieldElement.prop('checked') ? true : false;
            }
            this.model.set(modelAttribute, value);
        },

        _setupNotification: function () {
            var notificationModel = new NotificationModel({
                state: NotificationModel.states.INITIAL,
                username: ''
            });
            this.notificationView = new NotificationView({
                model: notificationModel
            });
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
        },

        _excludeUnranked: function() {
            this.$('[data-model-attribute="includeUnrated"]').prop('checked', false);
            this.model.set('includeUnrated', false);
        }
    });
});