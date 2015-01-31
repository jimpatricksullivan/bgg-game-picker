/*global define, require, describe, beforeEach, it, afterEach, before, after, sinon */
define([
    'mocha',
    'chai',
    'when',
    'views/MainView',
    'foundation.core'
], function (
    Mocha,
    Chai,
    when,
    MainView
) {
    'use strict';

    var waitFor = function(truthTest, callback) {
        var tries = 0;
        var timeoutId = setInterval(function() {
            tries++;
            if (tries === 10) {
                clearInterval(timeoutId);
                throw new Error('This never became true: ' + truthTest.toString());
            } else if (truthTest()) {
                callback();
                clearInterval(timeoutId);
            }
        }, 100);
    };

    return function() {

        describe("Application", function () {
            var view;

            // create a fake server
            var fakeServer = sinon.fakeServer.create();
            fakeServer.autoRespond = false;

            before(function(){

                // fake server responses
                fakeServer.respondWith("/users/kform/games",
                    [200, { "Content-Type": "application/json" },
                        '[{"id":1, "name":"a game","yearPublished":2010, "image":"a.jpg", "thumbnail":"a_t.jpg", "minPlayers":2, "maxPlayers":7, "playingTime":30, "userRating":8, "averageRating":6},' +
                        '{"id":2, "name":"b game","yearPublished":2011, "image":"b.jpg", "thumbnail":"b_t.jpg", "minPlayers":3, "maxPlayers":5, "playingTime":60, "userRating":7, "averageRating":4},' +
                        '{"id":3, "name":"c game","yearPublished":2012, "image":"c.jpg", "thumbnail":"c_t.jpg", "minPlayers":2, "maxPlayers":2, "playingTime":120, "userRating":5, "averageRating":7}]']);
                fakeServer.respondWith("/users/jimbnyc/games",
                    [200, { "Content-Type": "application/json" },
                        '[{"id":3, "name":"c game","yearPublished":2012, "image":"c.jpg", "thumbnail":"c_t.jpg", "minPlayers":2, "maxPlayers":2, "playingTime":120, "userRating":5, "averageRating":7},' +
                        '{"id":4, "name":"d game","yearPublished":2013, "image":"d.jpg", "thumbnail":"d_t.jpg", "minPlayers":1, "maxPlayers":8, "playingTime":60, "userRating":7, "averageRating":4}]']);
                fakeServer.respondWith("/users/error/games",
                    [500, { "Content-Type": "application/json" }, '']);

                // instantiate and render a view
                view = new MainView({
                    el: $('<div></div>')
                });
                view.render();
                view.onShow();
                view.$el.foundation({});
            });

            after(function () {
                fakeServer.restore();
            });

            describe("happy path", function() {

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
                    //expect: include unranked disappears
                    done();
                });

                it('picks a game matching criteria', function (done) {
                    // we shouldn't see a game yet
                    Chai.expect($('#modalContents:visible').length).to.not.be.ok();
                    // click submit
                    view.$('.button').eq(0).click();
                    // we should see a game
                    waitFor(function() {
                        return $('#modalContents:visible').length > 0;
                    }, done);
                });

                it('picks another game matching criteria', function (done) {
                    // click "choose another" or whatevs
                    // expect: a different game
                    done();
                });

                it('only selects games matching criteria', function (done) {
                    // cheat: check all possible games
                    done();
                });

                it('shows another game after closing and changing criteria', function (done) {
                    // close reveal
                    // change criteria
                    // submit
                    // expect a game to be shown
                    done();
                });

                it('only selects games matching new criteria when criteria are changed', function (done) {
                    // cheat: check all possible games
                    done();
                });

                it('can fetch a new collection when the username is changed', function(done) {
                    // change username
                    // expect notification
                    // return xhr
                    // expect notification change
                    // cheat: check all possible games
                    done();
                })
            });

            describe("User submits before collection xhr finishes", function() {
                // expect notification to move
                // return collection
                // expect game to show
            });

            describe("User submits before entering a username", function() {
                // expect error notification
            });

            describe("Collection returns an error before user submits", function() {
                // expect error up top
            });

            describe("Collection returns an error after user submits", function() {
                // expect error at bottom
            });
        });
    };
});
