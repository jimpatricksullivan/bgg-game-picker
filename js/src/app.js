/*global define */

define([
	'marionette',
    'models/CriteriaModel',
    'views/MainView'
], function (Marionette, CriteriaModel, MainView) {
	'use strict';

	var app = new Marionette.Application();
    app.criteria = new CriteriaModel();

    app.addRegions({
        main: '#main'
    });
    app.main.show(new MainView({
        eventBus: app.vent,
        criteria: app.criteria
    }));
	return window.app = app;
});