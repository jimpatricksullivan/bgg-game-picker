/*global require */

require.config({
	paths: {
		underscore: '../bower_components/underscore/underscore',
		backbone: '../bower_components/backbone/backbone',
		marionette: '../bower_components/backbone.marionette/lib/backbone.marionette',
		jquery: '../bower_components/jquery/jquery',
		localStorage: '../bower_components/backbone.localStorage/backbone.localStorage',
		tpl: 'lib/tpl',

        /* Foundation */
        'foundation.core': 'lib/foundation/foundation',
        'foundation.abide': 'lib/foundation/foundation.abide',
        'foundation.accordion': 'lib/foundation/foundation.accordion',
        'foundation.alert': 'lib/foundation/foundation.alert',
        'foundation.clearing': 'lib/foundation/foundation.clearing',
        'foundation.dropdown': 'lib/foundation/foundation.dropdown',
        'foundation.equalizer': 'lib/foundation/foundation.equalizer',
        'foundation.interchange': 'lib/foundation/foundation.interchange',
        'foundation.joyride': 'lib/foundation/foundation.joyride',
        'foundation.magellan': 'lib/foundation/foundation.magellan',
        'foundation.offcanvas': 'lib/foundation/foundation.offcanvas',
        'foundation.orbit': 'lib/foundation/foundation.orbit',
        'foundation.reveal': 'lib/foundation/foundation.reveal',
        'foundation.tab': 'lib/foundation/foundation.tab',
        'foundation.tooltip': 'lib/foundation/foundation.tooltip',
        'foundation.topbar': 'lib/foundation/foundation.topbar',
        'fastclick': 'lib/foundation-dependencies/fastclick',
        'modernizr': 'lib/foundation-dependencies/modernizr',
        'placeholder': 'lib/foundation-dependencies/placeholder'
	},

	shim: {
		underscore: {
			exports: '_'
		},

		backbone: {
			exports: 'Backbone',
			deps: ['jquery', 'underscore']
		},

		marionette: {
			exports: 'Backbone.Marionette',
			deps: ['backbone']
		},

        /* Foundation */
        'foundation.core': {
            deps: [
                'jquery',
                'modernizr'
            ],
            exports: 'Foundation'
        },
        'foundation.abide': {
            deps: [
                'foundation.core'
            ]
        },
        'foundation.accordion': {
            deps: [
                'foundation.core'
            ]
        },
        'foundation.alert': {
            deps: [
                'foundation.core'
            ]
        },
        'foundation.clearing': {
            deps: [
                'foundation.core'
            ]
        },
        'foundation.dropdown': {
            deps: [
                'foundation.core'
            ]
        },
        'foundation.equalizer': {
            deps: [
                'foundation.core'
            ]
        },
        'foundation.interchange': {
            deps: [
                'foundation.core'
            ]
        },
        'foundation.joyride': {
            deps: [
                'foundation.core',
                'jquery.cookie'
            ]
        },
        'foundation.magellan': {
            deps: [
                'foundation.core'
            ]
        },
        'foundation.offcanvas': {
            deps: [
                'foundation.core'
            ]
        },
        'foundation.orbit': {
            deps: [
                'foundation.core'
            ]
        },
        'foundation.reveal': {
            deps: [
                'foundation.core'
            ]
        },
        'foundation.tab': {
            deps: [
                'foundation.core'
            ]
        },
        'foundation.tooltip': {
            deps: [
                'foundation.core'
            ]
        },
        'foundation.topbar': {
            deps: [
                'foundation.core'
            ]
        },

        /* Vendor Scripts */
        'jquery.cookie': {
            deps: [
                'jquery'
            ]
        },
        'fastclick': {
            exports: 'FastClick'
        },
        'modernizr': {
            exports: 'Modernizr'
        },
        'placeholder': {
            exports: 'Placeholders'
        }
	},

	deps: ['jquery', 'underscore']
});

require([
	'app',
	'backbone',
    'jquery',
	'routers/index',
	'controllers/index'
], function (app, Backbone, $, Router, Controller) {
	'use strict';
    $(document).foundation({});
	app.start();
	new Router({ controller: Controller });
	Backbone.history.start();
});
