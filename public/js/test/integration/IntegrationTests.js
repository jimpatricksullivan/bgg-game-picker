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
            fakeServer.autoRespond = true;

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

            describe("happy path", function() { //todo make this check more stuff
                it('renders', function (done) {
                    waitFor(
                        function() {
                            return view.$('[data-model-attribute="bggUserName"]').length > 0;
                        },
                        done
                    )
                });

                it('shows notification that collection is fetched', function (done) {
                    view.$('[data-model-attribute="bggUserName"]').val('kform').trigger('change');
                    waitFor(
                        function() {
                            return view.$('#top-notification').text().trim() === 'Done fetching kform\'s collection.';
                        },
                        done
                    )
                });

                it('shows a game', function (done) {
                    Chai.expect($('#modalContents:visible').length).to.not.be.ok();
                    view.$('.button').eq(0).click();
                    waitFor(
                        function() {
                            return $('#modalContents:visible').length > 0;
                        },
                        done
                    )
                });
            });

        });

    };

});
