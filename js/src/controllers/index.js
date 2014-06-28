define([
	'app',
    'views/SomeView',
    'collections/DetailedGameCollection'
], function (app, SomeView, GameCollection) {
	'use strict';

	return {
        anyRoute: function (param) {
            var gameCollection = new GameCollection([], {username: 'mcmanzi'} );
            gameCollection.fetch();
		}
	};
});
