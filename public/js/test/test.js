/*global require, describe, beforeEach, it */
require([
    'mocha',
    'chai',
    '../test/integration/IntegrationTests',
    '../test/collections/GameCollectionTests',
    '../test/views/FormViewTests',
    '../test/views/MainViewTests'
], function (
    Mocha,
    Chai,
    integrationTests,
    gameCollectionTests,
    formViewTests,
    mainViewTests
) {
    'use strict';

    // get ready to add some tests
    Mocha.setup("bdd");
    Chai.should();

    // add some tests
    gameCollectionTests();
    formViewTests();
    mainViewTests();
    integrationTests();

    // run the tests
    Mocha.run();
});
