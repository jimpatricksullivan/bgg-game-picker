/*global define */
define([
    'marionette',
    'models/NotificationModel',
    'hbs!templates/notifications/doneFetching',
    'hbs!templates/notifications/error',
    'hbs!templates/notifications/fetching',
    'hbs!templates/notifications/initial',
    'hbs!templates/notifications/stillFetching'
], function (
    Marionette,
    NotificationModel,
    doneFetchingTemplate,
    errorTemplate,
    fetchingTemplate,
    initialTemplate,
    stillFetchingTemplate
) {
    "use strict";

    var statesToTemplates = {};
    statesToTemplates[NotificationModel.states.DONE_FETCHING] = doneFetchingTemplate;
    statesToTemplates[NotificationModel.states.ERROR] = errorTemplate;
    statesToTemplates[NotificationModel.states.FETCHING] = fetchingTemplate;
    statesToTemplates[NotificationModel.states.INITIAL] = initialTemplate;
    statesToTemplates[NotificationModel.states.STILL_FETCHING] = stillFetchingTemplate;

    return Marionette.ItemView.extend({
        template: initialTemplate,

        updateState: function(state, username) {
            this.model.set('state', state);
            this.model.set('username', username);
            this.template = statesToTemplates[state];
        }
    });
});