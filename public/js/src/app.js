/*global define */

define([
    'jquery',
	'marionette',
    'views/MainView'
], function ($, Marionette, MainView) {
	'use strict';

    window.app = new Marionette.Application();
    window.app.addRegions({
        main: '#main'
    });
    window.app.main.show(new MainView());
});