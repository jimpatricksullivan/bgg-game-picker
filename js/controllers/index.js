define([
	'app',
    '../views/SomeView'
], function (app, SomeView) {
	'use strict';

	return {
        anyRoute: function (param) {
            var view = new SomeView({
                el: $('body')
            });
            view.render();
		}
	};
});
