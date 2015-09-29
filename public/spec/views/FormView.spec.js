/*global define, require, describe, beforeEach, it, sinon */
define([
    'jquery',
    'chai',
    'backbone',
    'backbone.radio',
    'models/NotificationModel',
    '../waitFor.js',
    'views/FormView'
], function ($, Chai, Backbone, Radio, NotificationModel, waitFor, FormView) {
    'use strict';

    describe("FormView", function () {
        var view, deferred;

        beforeEach(function() {
            deferred = new $.Deferred();
            var gameCollection = {
                fetch: sinon.stub().returns(deferred.promise())
            };
            view = new FormView({
                gameCollection: gameCollection,
                model: new Backbone.Model()
            });
        });

        it('sets up notifications when first rendered', function() {
            view.onRender();
            Chai.expect(view.notificationView.model.get('state')).to.equal(NotificationModel.states.INITIAL);
        });

        it('updates models when fields change', function() {
            var event = $.Event('change');

            // string
            event.target = $("<input data-model-attribute='foo' type='text' value='bar'>");
            view._onFieldChange(event);
            Chai.expect(view.model.get('foo')).to.equal('bar');

            // number
            event.target = $("<input data-model-attribute='numberOfPlayers' type='text' value='4'>");
            view._onFieldChange(event);
            Chai.expect(view.model.get('numberOfPlayers')).to.equal(4);

            // checkbox
            event.target = $("<input data-model-attribute='checko' type='checkbox' checked>");
            view._onFieldChange(event);
            Chai.expect(view.model.get('checko')).to.equal(true);
        });

        var changeUsername = function() {
            var event = $.Event('change');
            event.target = $("<input data-model-attribute='bggUserName' type='text' value='foobar'>");
            view._onFieldChange(event);
            view._onUsernameChange();
        };

        it('fetches collection and changes notifications when username changes', function(done) {
            view.onRender();
            changeUsername();
            waitFor(function() {
                var usernameSet = view.gameCollection.bggUserName === 'foobar'
                    && view.notificationView.model.get('username') === 'foobar';
                var fetchCalled = view.gameCollection.fetch.callCount;
                var notificationStateUpdated =
                    view.notificationView.model.get('state') === NotificationModel.states.FETCHING;
                return usernameSet && fetchCalled && notificationStateUpdated;
            }, done);
        });

        it('updates notifications when submitted before fetch complete', function(done) {
            view.onRender();
            changeUsername();
            view._onOneGameSubmit();
            waitFor(function() {
                return view.notificationView.model.get('state') === NotificationModel.states.STILL_FETCHING;
            }, done);
        });

        var testSubmit = function(submitMethod, expectedEvent, done) {
            var channel = Radio.channel('app');
            channel.on(expectedEvent, done);

            view.onRender();
            changeUsername();
            view[submitMethod]();
            waitFor(function() {
                return view.notificationView.model.get('state') === NotificationModel.states.STILL_FETCHING;
            }, function() {
                deferred.resolve();
            });
        };

        it('fires correct event on one game submit after fetch complete', function(done) {
            testSubmit('_onOneGameSubmit', 'revealGame', done);
        });

        it('fires correct event on game list submit after fetch complete', function(done) {
            testSubmit('_onGameListSubmit', 'revealList', done);
        });

        it('shows error when submitted before username entered', function(done) {
            view.onRender();
            view._onOneGameSubmit();
            waitFor(function() {
                return view.notificationView.model.get('state') === NotificationModel.states.ENTER_USERNAME;
            }, done);
        });
    });
});