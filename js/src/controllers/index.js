define([
	'app',
    'views/SomeView',
    'collections/OwnedGameCollection'
], function (app, SomeView, GameCollection) {
	'use strict';

	return {
        anyRoute: function (param) {
            var gameCollection = new GameCollection([], {username: 'mcmanzi'} );

            // Attach a done, fail, and progress handler for the asyncEvent
            $.when( gameCollection.fetchWithRetries() ).done(
                function() {
                    console.log("gameCollection.fetchWithRetries() done");
                }
            );
		}
	};
});
