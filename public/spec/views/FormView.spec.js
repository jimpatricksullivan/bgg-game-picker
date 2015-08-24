///*global define, require, describe, beforeEach, it, sinon */
//define([
//    'jquery',
//    '../../bower_components/chai/chai',
//    'backbone',
//    'backbone.radio',
//    'models/NotificationModel',
//    '../waitFor',
//    'views/FormView'
//], function ($, Chai, Backbone, Radio, NotificationModel, waitFor, FormView) {
//    'use strict';
//
//    return function() {
//        describe("FormView", function () {
//            var view, deferred;
//
//            beforeEach(function() {
//                deferred = new $.Deferred();
//                var gameCollection = {
//                    fetch: sinon.stub().returns(deferred.promise())
//                };
//                view = new FormView({
//                    gameCollection: gameCollection,
//                    model: new Backbone.Model()
//                });
//            });
//
//            it('sets up notifications when first rendered', function() {
//                view.onRender();
//                Chai.expect(view.notificationView.model.get('state')).to.equal(NotificationModel.states.INITIAL);
//            });
//
//            it('updates models when fields change', function() {
//                var event = $.Event('change');
//
//                // string
//                event.target = $("<input data-model-attribute='foo' type='text' value='bar'>");
//                view._onFieldChange(event);
//                Chai.expect(view.model.get('foo')).to.equal('bar');
//
//                // number
//                event.target = $("<input data-model-attribute='numberOfPlayers' type='text' value='4'>");
//                view._onFieldChange(event);
//                Chai.expect(view.model.get('numberOfPlayers')).to.equal(4);
//
//                // checkbox
//                event.target = $("<input data-model-attribute='checko' type='checkbox' checked>");
//                view._onFieldChange(event);
//                Chai.expect(view.model.get('checko')).to.equal(true);
//            });
//
//            var changeUsername = function() {
//                var event = $.Event('change');
//                event.target = $("<input data-model-attribute='bggUserName' type='text' value='foobar'>");
//                view._onFieldChange(event);
//                view._onUsernameChange();
//            };
//
//            it('fetches collection and changes notifications when username changes', function(done) {
//                view.onRender();
//                changeUsername();
//                waitFor(function() {
//                    var usernameSet = view.gameCollection.bggUserName === 'foobar'
//                        && view.notificationView.model.get('username') === 'foobar';
//                    var fetchCalled = view.gameCollection.fetch.callCount;
//                    var notificationStateUpdated =
//                        view.notificationView.model.get('state') === NotificationModel.states.FETCHING;
//                    return usernameSet && fetchCalled && notificationStateUpdated;
//                }, done);
//            });
//
//            it('updates notifications when submitted before fetch complete', function(done) {
//                view.onRender();
//                changeUsername();
//                view._submit();
//                waitFor(function() {
//                    return view.notificationView.model.get('state') === NotificationModel.states.STILL_FETCHING;
//                }, done);
//            });
//
//            it('fires event when submitted after fetch complete', function(done) {
//                var channel = Radio.channel('app');
//                channel.on("revealGame", done);
//
//                view.onRender();
//                changeUsername();
//                view._submit();
//                waitFor(function() {
//                    return view.notificationView.model.get('state') === NotificationModel.states.STILL_FETCHING;
//                }, function() {
//                    deferred.resolve();
//                });
//            });
//
//            it('shows error when submitted before username entered', function(done) {
//                view.onRender();
//                view._submit();
//                waitFor(function() {
//                    return view.notificationView.model.get('state') === NotificationModel.states.ENTER_USERNAME;
//                }, done);
//            });
//        });
//    };
//});