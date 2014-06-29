define([
	'app',
    'views/SomeView',
    'collections/GameCollection'
], function (app, SomeView, GameCollection) {
	'use strict';

	return {
        anyRoute: function (param) {
            var gameCollection = new GameCollection([], {username: 'kform'} );
            $.when( gameCollection.fetchWithRetries() ).done(
                function() {
                    console.log("game collection finished fetching");
                    debugger;
                }
            );
		}
	};
});
