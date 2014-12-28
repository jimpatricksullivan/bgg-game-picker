/*global define */

define([
    'jquery',
	'marionette',
    'collections/GameCollection',
    'models/CriteriaModel',
    'views/MainView'
], function ($, Marionette, GameCollection, CriteriaModel, MainView) {
	'use strict';

    var app = new Marionette.Application();

    // create data models
    var criteria = new CriteriaModel();
    var gameCollection = new GameCollection([], {criteria: criteria});

    // setup and show regions
    app.addRegions({
        main: '#main'
    });
    app.main.show(new MainView({
        eventBus: app.vent,
        criteria: criteria,
        gameCollection: gameCollection
    }));

	return window.app = app;
});