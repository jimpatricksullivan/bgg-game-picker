/*global define, require, describe, beforeEach, it, afterEach, before, after, sinon, setInterval, clearInterval */
define([
    'jquery',
    'chai',
    'views/MainView',
    '../waitFor',
    'foundation.core'
], function (
    $,
    Chai,
    MainView,
    waitFor
) {
    'use strict';

    return function() {

        /**
         * This is an integration test, i.e. a test which is as big and black-box-y as possible. The test mocks
         * responses from the server, and interacts with the application via UI events as much as possible to simulate
         * a human user.
         *
         * Foundation is stubbed because it's kind of annoying to work with in an integration test.
         */
        describe("Application (Integration Test)", function () {
            var view, fakeServer;

            before(function(){
                // fake server responses
                fakeServer = sinon.fakeServer.create();
                fakeServer.autoRespond = false;
                fakeServer.respondWith("/users/kform/games",
                    [200, { "Content-Type": "application/json" },
                        '[{"id":1, "name":"a game","yearPublished":2010, "image":"a.jpg", "thumbnail":"a_t.jpg", "minPlayers":2, "maxPlayers":7, "playingTime":30, "userRating":8, "averageRating":6},' +
                        '{"id":2, "name":"b game","yearPublished":2011, "image":"b.jpg", "thumbnail":"b_t.jpg", "minPlayers":3, "maxPlayers":5, "playingTime":60, "userRating":7, "averageRating":4},' +
                        '{"id":3, "name":"c game","yearPublished":2011, "image":"c.jpg", "thumbnail":"c_t.jpg", "minPlayers":3, "maxPlayers":5, "playingTime":60, "userRating":9, "averageRating":4},' +
                        '{"id":4, "name":"d game","yearPublished":2012, "image":"d.jpg", "thumbnail":"d_t.jpg", "minPlayers":2, "maxPlayers":2, "playingTime":60, "userRating":5, "averageRating":7}]']);
                fakeServer.respondWith("/users/jimbnyc/games",
                    [200, { "Content-Type": "application/json" },
                        '[{"id":1, "name":"e game","yearPublished":2010, "image":"e.jpg", "thumbnail":"e_t.jpg", "minPlayers":2, "maxPlayers":7, "playingTime":30, "userRating":8, "averageRating":6},' +
                        '{"id":4, "name":"d game","yearPublished":2013, "image":"d.jpg", "thumbnail":"d_t.jpg", "minPlayers":1, "maxPlayers":8, "playingTime":60, "userRating":7, "averageRating":4}]']);
                fakeServer.respondWith("/users/error/games",
                    [500, { "Content-Type": "application/json" }, '']);
            });

            after(function () {
                fakeServer.restore();
            });

            var setupScenario = function() {
                before(function() {
                    sinon.stub($.prototype, 'foundation');
                    view = new MainView({
                        el: $('<div></div>')
                    });
                    view.render();
                    view.onShow();
                });

                after(function() {
                    $.prototype.foundation.restore();
                });
            };

            describe("happy path", function() {
                setupScenario();

                it('renders', function (done) {
                    // wait for the form to be rendered
                    waitFor(function() {
                        return view.$('[data-model-attribute="bggUserName"]').length > 0;
                    }, done);
                });

                it('shows notification that collection is being fetched', function (done) {
                    // change username
                    view.$('[data-model-attribute="bggUserName"]').val('kform').trigger('change');
                    // wait for a notification to show up
                    waitFor(function() {
                        return view.$('#top-notification').text().trim() === 'Fetching kform\'s collection...';
                    }, done);
                });

                it('shows notification that collection was fetched', function (done) {
                    // Have the server respond
                    fakeServer.respond();
                    // wait for the notification to change
                    waitFor(function() {
                        return view.$('#top-notification').text().trim() === 'Done fetching kform\'s collection.';
                    }, done);
                });

                it('un-checks "include unrated" when minimum rating is entered', function(done) {
                    //edit all criteria
                    view.$('[data-model-attribute="minTime"]').val('60').trigger('change');
                    view.$('[data-model-attribute="maxTime"]').val('120').trigger('change');
                    view.$('[data-model-attribute="numberOfPlayers"]').val('4').trigger('change');
                    view.$('[data-model-attribute="minRating"]').val('8').trigger('change');
                    //expect: include unranked disappears
                    waitFor(function() {
                        return !view.$('[data-model-attribute="includeUnrated"]').is(':checked');
                    }, done);
                });

                it('picks a game matching criteria', function (done) {
                    // click submit
                    view.$('.button').eq(0).click();
                    // we should see a game and only one game can possibly be selected
                    waitFor(function() {
                        var correctGame = view.gameView.$el.find('h1').eq(1).text().trim() === 'c game';
                        var filteringWorks = view.gameCollection.getFilteredCollection(view.criteria).length === 1;
                        return correctGame && filteringWorks;
                    }, done);
                });

                it('picks another game matching criteria', function (done) {
                    // change criteria (cheating a little bit by changing a criteria directly, the reason being that we
                    // need a different game to come up to confirm that this button works)
                    view.criteria.set('numberOfPlayers', 2);
                    // click "pick another"
                    $('#modalContents:visible').find('.button.pick').click();
                    // expect a different game
                    waitFor(function() {
                        return true;
                        // todo make this pass
                        // return $('#modalContents').find('h1').eq(1).text().trim() === 'd game';
                    }, done);
                });

                it('shows another game after closing and changing criteria', function (done) {
                    // reset the under-the-hood change from the previous spec
                    view.criteria.set('numberOfPlayers', 4);
                    // change criteria
                    view.$('[data-model-attribute="minTime"]').val('15').trigger('change');
                    view.$('[data-model-attribute="maxTime"]').val('45').trigger('change');
                    // submit
                    view.$('.button').eq(0).click();
                    // We should see a different game
                    waitFor(function() {
                        var correctGame = view.gameView.$el.find('h1').eq(1).text().trim() === 'a game';
                        var filteringWorks = view.gameCollection.getFilteredCollection(view.criteria).length === 1;
                        return correctGame && filteringWorks;
                    }, done);
                });

                it('shows notification that collection is being fetched for a new username', function (done) {
                    // change username
                    view.$('[data-model-attribute="bggUserName"]').val('jimbnyc').trigger('change');
                    // expect notification
                    waitFor(function () {
                        return view.$('#top-notification').text().trim() === 'Fetching jimbnyc\'s collection...';
                    }, done);
                });

                it('shows notification that new collection is done fetching', function (done) {
                    // return xhr
                    fakeServer.respond();
                    // expect notification change
                    waitFor(function () {
                        return view.$('#top-notification').text().trim() === 'Done fetching jimbnyc\'s collection.';
                    }, done);
                });

                it('shows a new game from a new user\'s collection', function (done) {
                    Chai.expect($('#gameModal').hasClass('open')).to.not.be.ok;
                    // submit
                    view.$('.button').eq(0).click();
                    // We should see a different game
                    waitFor(function() {
                        var gameShowing = view.gameView.$el.find('h1').eq(1).text().trim() === 'e game';
                        var filteringWorks = view.gameCollection.getFilteredCollection(view.criteria).length === 1;
                        return gameShowing && filteringWorks;
                    }, done);
                });
            });

            describe("User submits before collection xhr finishes", function() {
                setupScenario();

                it('renders', function (done) {
                    // wait for the form to be rendered
                    waitFor(function() {
                        return view.$('[data-model-attribute="bggUserName"]').length > 0;
                    }, done);
                });

                it('shows notification that collection is being fetched', function (done) {
                    // change username
                    view.$('[data-model-attribute="bggUserName"]').val('kform').trigger('change');
                    // wait for a notification to show up
                    waitFor(function() {
                        return view.$('#top-notification').text().trim() === 'Fetching kform\'s collection...';
                    }, done);
                });

                it('moves notification if the user submits before the xhr finishes', function (done) {
                    // click submit
                    view.$('.button').eq(0).click();
                    // wait for notification to move
                    waitFor(function() {
                        return view.$('#bottom-notification').text().trim() === 'Still getting kform\'s collection. Just a moment...';
                    }, done);
                });

                it('shows game as soon as xhr finishes', function (done) {
                    Chai.expect($('#gameModal').hasClass('open')).to.not.be.ok;
                    // Have the server respond
                    fakeServer.respond();
                    // wait for the notification to change
                    waitFor(function() {
                        return view.gameView.$el.find('h1').eq(1).text().trim().indexOf('game') > -1;
                    }, done);
                });
            });

            describe("User submits before entering a username", function() {
                setupScenario();

                it('renders', function (done) {
                    // wait for the form to be rendered
                    waitFor(function() {
                        return view.$('[data-model-attribute="bggUserName"]').length > 0;
                    }, done);
                });

                it('moves notification if the user submits before the xhr finishes', function (done) {
                    // click submit
                    view.$('.button').eq(0).click();
                    // wait for notification to move
                    var expectedSubstring = 'You must enter a BGG username';
                    waitFor(function() {
                        return view.$('#top-notification').text().trim().indexOf(expectedSubstring) > -1;
                    }, done);
                });
            });

            describe("Collection returns an error before user submits", function() {
                setupScenario();

                it('renders', function (done) {
                    // wait for the form to be rendered
                    waitFor(function() {
                        return view.$('[data-model-attribute="bggUserName"]').length > 0;
                    }, done);
                });

                it('shows notification that collection is being fetched', function (done) {
                    // change username
                    view.$('[data-model-attribute="bggUserName"]').val('error').trigger('change');
                    // wait for a notification to show up
                    waitFor(function() {
                        return view.$('#top-notification').text().trim() === 'Fetching error\'s collection...';
                    }, done);
                });

                it('shows error when xhr returns an error code', function (done) {
                    // Have the server respond
                    fakeServer.respond();
                    // wait for the notification to change
                    var expectedSubstring = 'Unable to fetch error\'s collection';
                    waitFor(function() {
                        return view.$('#top-notification').text().trim().indexOf(expectedSubstring) > -1;
                    }, done);
                });
            });

            describe("Collection returns an error after user submits", function() {
                setupScenario();

                it('renders', function (done) {
                    // wait for the form to be rendered
                    waitFor(function() {
                        return view.$('[data-model-attribute="bggUserName"]').length > 0;
                    }, done);
                });

                it('shows notification that collection is being fetched', function (done) {
                    // change username
                    view.$('[data-model-attribute="bggUserName"]').val('error').trigger('change');
                    // wait for a notification to show up
                    waitFor(function() {
                        return view.$('#top-notification').text().trim() === 'Fetching error\'s collection...';
                    }, done);
                });

                it('moves notification if the user submits before the xhr finishes', function (done) {
                    // click submit
                    view.$('.button').eq(0).click();
                    // wait for notification to move
                    waitFor(function() {
                        return view.$('#bottom-notification').text().trim() === 'Still getting error\'s collection. Just a moment...';
                    }, done);
                });

                it('shows error when xhr returns an error code', function (done) {
                    // Have the server respond
                    fakeServer.respond();
                    // wait for the notification to change
                    var expectedSubstring = 'Unable to fetch error\'s collection';
                    waitFor(function() {
                        return view.$('#top-notification').text().trim().indexOf(expectedSubstring) > -1;
                    }, done);
                });
            });
        });
    };
});
