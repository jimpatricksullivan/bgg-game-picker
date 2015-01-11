/*global define, require, describe, beforeEach, it, afterEach, sinon, sinon */
define([
    'mocha',
    'chai',
    'views/MainView'
], function (Mocha, Chai, MainView) {
    'use strict';

    return function() {

        describe("Application", function () {
            var view;

            // create a fake server
            var fakeServer = sinon.fakeServer.create();
            fakeServer.autoRespond = true;

            beforeEach(function(){

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
            });

            afterEach(function () {
                fakeServer.restore();
            });

            it("has a dummy test", function() {
                Chai.expect(view).to.be.ok();
            });

        });

    };

});
