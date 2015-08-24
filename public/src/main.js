/*global require */
require([
	'backbone',
    'jquery',
	'views/MainView',
    'foundation.core'
], function (Backbone, $, MainView) {
	'use strict';

	var mainView = new MainView({
		el: $('#main')
	});
	mainView.render();
	mainView.onShow();
    $(document).foundation({});
});