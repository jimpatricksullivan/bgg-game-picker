/*global define, require, describe, beforeEach, it */
define([
    'mocha',
    'chai',
    'views/MainView'
], function (Mocha, Chai, MainView) {
    'use strict';

    return function() {
        describe("MainView", function () {
            var view;

            beforeEach(function() {
                view = new MainView();
            });

            it("can be initialized", function() {
                Chai.expect(view.criteria).to.be.ok;
                Chai.expect(view.gameCollection).to.be.ok;
                Chai.expect(view.headerView).to.be.ok;
                Chai.expect(view.gameView).to.be.ok;
                Chai.expect(view.formView).to.be.ok;
                Chai.expect(view.formView.model).to.eql(view.criteria);
                Chai.expect(view.formView.gameCollection).to.eql(view.gameCollection);
            });

            it("can pick a random game", function() {
                var sandbox = sinon.sandbox.create();
                var fakeJqueryElement = { foundation: sandbox.stub() };
                sandbox.stub(view, '$').returns(fakeJqueryElement);
                sandbox.stub(view.gameCollection, 'getRandomGameForCriteria').returns('fake game model');
                sandbox.stub(view.gameView, 'render');

                view.revealRandomGame();

                Chai.expect(fakeJqueryElement.foundation.getCall(0).args).to.eql(['reveal', 'close']);
                Chai.expect(fakeJqueryElement.foundation.getCall(1).args).to.eql(['reveal', 'open']);
                Chai.expect(view.gameView.model).to.eql('fake game model');
                Chai.expect(view.gameView.render.called).to.be.ok;
            });
        });
    };
});