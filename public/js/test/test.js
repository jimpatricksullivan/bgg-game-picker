/*global require, describe, beforeEach, it */
require([
    'mocha',
    'chai',
    '../test/integration/IntegrationTests',
    '../test/collections/GameCollectionTests',
    '../test/views/FormViewTests',
    '../test/views/MainViewTests',
    '../test/views/NotificationViewTests'
], function (
    Mocha,
    Chai,
    IntegrationTests,
    GameCollectionTests,
    FormViewTests,
    MainViewTests,
    NotificationViewTests
) {
    'use strict';

    // get ready to add some tests
    Mocha.setup("bdd");
    Chai.should();

    // add some tests
    IntegrationTests.addTests();
    GameCollectionTests.addTests();
    FormViewTests.addTests();
    MainViewTests.addTests();
    NotificationViewTests.addTests();

    // run the tests
    Mocha.run();
});
