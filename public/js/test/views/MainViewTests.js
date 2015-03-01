/*global define, require, describe, beforeEach, it, sinon */
define([
    'jquery',
    'mocha',
    'chai',
    'views/MainView'
], function ($, Mocha, Chai, MainView) {
    'use strict';

    return function() {
        describe("MainView", function () {
            var view;

            beforeEach(function() {
                view = new MainView();
                view.render();
            });

            it("can be initialized", function() {
                Chai.expect(view.criteria).to.be.ok;
                Chai.expect(view.gameCollection).to.be.ok;
                Chai.expect(view.headerView).to.be.ok;
                Chai.expect(view.formView).to.be.ok;
                Chai.expect(view.formView.model).to.eql(view.criteria);
                Chai.expect(view.formView.gameCollection).to.eql(view.gameCollection);
            });

            it("shows games", function() {
                var sandbox = sinon.sandbox.create();
                sandbox.stub(view.gameCollection, 'getFilteredCollection').returns([{id: 11}]);
                sandbox.stub($.prototype, 'foundation');
                view._revealGames();

                Chai.expect(view.games.currentView.collection.at(0).id).to.equal(11);

                sandbox.restore();
            });
        });
    };
});