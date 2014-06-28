/*global define */

define([
	'marionette'
], function (Marionette) {
	'use strict';

	var app = new Marionette.Application();

	app.addRegions({
		header: '#header',
		main: '#main',
		footer: '#footer'
	});

	return window.app = app;
});
