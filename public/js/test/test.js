/*global require, describe, beforeEach, it */
require([
    'mocha',
    'chai',
    '../test/collections/GameCollectionTests'
], function (Mocha, Chai, GameCollectionTests) {
    'use strict';

    // get ready to add some tests
    Mocha.setup("bdd");
    Chai.should();

    // add some tests
    GameCollectionTests.addTests();

    // run the tests
    Mocha.run();
});
