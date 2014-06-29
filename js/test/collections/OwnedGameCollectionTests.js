/*global require, describe, beforeEach, it */
define([
    'mocha',
    'chai',
    'collections/OwnedGameCollection'
], function (Mocha, Chai, GameCollection) {
    'use strict';

    return {
        addTests: function() {

            describe("OwnedGameCollection", function () {

                var collection;
                beforeEach(function(){
                    collection = new GameCollection([], {username: "someUser"});
                    collection.PAUSE_BETWEEN_FETCHES = 0;
                });

                describe("initialization", function () {
                    it("should fail without a username", function() {
                        Chai.expect(function() {
                            new GameCollection();
                        }).to.throw(Error);
                    });
                });

                describe("fetch", function () {
                    var fakeServer = sinon.fakeServer.create();
                    fakeServer.autoRespond = true;

                    beforeEach(function () {
                        // the first two responses have no items
                        fakeServer.respondWith(collection.URL_ROOT + "username=someUser&attempt=1",
                            [200, { "Content-Type": "application/json" },
                                '{}']);
                        fakeServer.respondWith(collection.URL_ROOT + "username=someUser&attempt=2",
                            [200, { "Content-Type": "application/json" },
                                '{}']);
                        // the third one has items
                        fakeServer.respondWith(collection.URL_ROOT + "username=someUser&attempt=3",
                            [200, { "Content-Type": "application/json" },
                                '{ "items": 12 }']);
                    });

                    afterEach(function () {
                        fakeServer.restore();
                    });

                    it("should keep fetching until it gets items", function (done) {
                        $.when( collection.fetchWithRetries() ).done(function() {
                            Chai.expect(fakeServer.requests.length).to.equal(3);
                            done();
                        });
                    });

                });
            });
        }
    };
});
