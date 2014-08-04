define([
	'app',
    'collections/GameCollection'
], function (app, GameCollection) {
	'use strict';

	return {
        anyRoute: function (param) {
            var gameCollection = new GameCollection([], {username: 'kform'} );
            /*$.when( gameCollection.fetchWithRetries() ).done(
                function(collection) {
                    console.log("collection fetched with length: " + collection.length);
                    window.gc = collection;
                }
            );*/
		}
	};
});
