/*global require */
require([
	'app',
	'backbone',
    'jquery',
	'routers/index',
	'controllers/index',
    'foundation.core'
], function (app, Backbone, $, Router, Controller) {
	'use strict';
    $(document).foundation({});
	app.start();
	new Router({ controller: Controller });
	Backbone.history.start();
});
