/*global require, describe, beforeEach, it */
require([
    'mocha',
    'chai',
    '../test/collections/OwnedGameCollectionTests'
], function (Mocha, Chai, OwnedGameCollectionTests) {
    'use strict';

    // get ready to add some tests
    Mocha.setup("bdd");
    Chai.should();

    // add some tests
    OwnedGameCollectionTests.addTests();

    // run the tests
    Mocha.run();
});
