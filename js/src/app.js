/*global define */

define([
	'marionette',
    'views/HeaderView'
], function (Marionette, HeaderView) {
	'use strict';

	var app = new Marionette.Application();

	app.addRegions({
		header: '#header',
		main: '#main'
	});

    app.header.show(new HeaderView());

	return window.app = app;
});
