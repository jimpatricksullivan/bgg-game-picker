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
    integrationTests,
    gameCollectionTests,
    formViewTests,
    mainViewTests,
    notificationViewTests
) {
    'use strict';

    // get ready to add some tests
    Mocha.setup("bdd");
    Chai.should();

    // add some tests
    integrationTests();
    gameCollectionTests();
    formViewTests();
    mainViewTests();
    notificationViewTests();

    // run the tests
    Mocha.run();
});
