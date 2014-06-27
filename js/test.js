/*global require, describe, beforeEach, it */
require([
    'mocha',
    'chai',
    'tests/SomeTests'
], function (Mocha, Chai, SomeTests) {
    'use strict';

    // get ready to add some tests
    Mocha.setup("bdd");
    Chai.should();

    // add some tests
    SomeTests.addTests();

    // run the tests
    Mocha.run();
});
