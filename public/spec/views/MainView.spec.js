/*global define, require, describe, beforeEach, it, sinon, afterEach */
define([
    'jquery',
    'mocha',
    'chai',
    'backbone.radio',
    'views/MainView'
], function ($, Mocha, Chai, Radio, MainView) {
    'use strict';

    describe("MainView", function () {
        var view,
            sandbox,
            channel,
            revealStub;

        beforeEach(function() {
            sandbox = sinon.sandbox.create();
            channel = Radio.channel('app');

            view = new MainView();
            revealStub = sandbox.stub(view, '_revealGameByIndex');
            sandbox.stub(view.gameCollection, 'getFilteredCollection').returns([
                {id: 1},
                {id: 2}
            ]);

            view.render();
        });

        afterEach(function() {
            sandbox.restore();
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
            view._revealGame();
            Chai.expect(revealStub.withArgs(0).called).to.equal(true);
            Chai.expect(revealStub.withArgs(1).called).to.equal(false);
            view._revealAnotherGame();
            Chai.expect(revealStub.withArgs(1).called).to.equal(true);
        });
    });
});