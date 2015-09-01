/*global require, module, describe, beforeEach, it */
var chai = require("chai");
var sinon = require("sinon");
var when = require('when');
var bggApiUtil = require("../src/BggApiUtil");

var fakeXml = '' +
    '<items>' +
    '   <item objecttype="thing" objectid="1" subtype="boardgame" collid="16402370">' +
    '       <name sortindex="1">Dusseldorf</name>' +
    '       <yearpublished>2014</yearpublished>' +
    '       <image>//cf.geekdo-images.com/images/pic1652300.png</image>' +
    '       <thumbnail>//cf.geekdo-images.com/images/pic1652300_t.png</thumbnail> ' +
    '       <stats minplayers="2" maxplayers="4" minplaytime="15" maxplaytime="45" playingtime="45" numowned="1414"> ' +
    '           <rating value="8"> ' +
    '               <usersrated value="1130"/> ' +
    '               <average value="6.55738"/> ' +
    '               <bayesaverage value="6.16077"/> ' +
    '               <stddev value="1.15706"/> <median value="0"/> ' +
    '               <ranks> ' +
    '                   <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="1361" /> ' +
    '               </ranks> ' +
    '           </rating> ' +
    '       </stats> ' +
    '       <status own="1" prevowned="0" want="0" wanttoplay="0" wanttobuy="0" wishlist="0" preordered="0" /> ' +
    '       <numplays>20</numplays> ' +
    '       <wishlistcomment>Look at all those wooden cubes!</wishlistcomment> ' +
    '   </item>' +
    '   <item objecttype="thing" objectid="2" subtype="boardgame" collid="16402370">' +
    '       <name sortindex="1">Xeno Shooter: Reckoning Alpha</name>' +
    '       <yearpublished>2015</yearpublished>' +
    '       <image>//cf.geekdo-images.com/images/pic1652300.png</image>' +
    '       <thumbnail>//cf.geekdo-images.com/images/pic1652300_t.png</thumbnail> ' +
    '       <stats minplayers="1" maxplayers="6" minplaytime="120" maxplaytime="240" playingtime="240" numowned="1000"> ' +
    '           <rating value="7"> ' +
    '               <usersrated value="1130"/> ' +
    '               <average value="6.55738"/> ' +
    '               <bayesaverage value="6.16077"/> ' +
    '               <stddev value="1.15706"/> <median value="0"/> ' +
    '               <ranks> ' +
    '                   <rank type="subtype" id="1" name="boardgame" friendlyname="Board Game Rank" value="1361" /> ' +
    '               </ranks> ' +
    '           </rating> ' +
    '       </stats> ' +
    '       <status own="1" prevowned="0" want="0" wanttoplay="0" wanttobuy="0" wishlist="0" preordered="0" /> ' +
    '       <numplays>0</numplays> ' +
    '       <wishlistcomment>Look at all those plastic miniatures!</wishlistcomment> ' +
    '   </item>' +
    '</items>';

describe('BggApiUtil', function(){
    beforeEach(function (){
        sinon.stub(bggApiUtil, '_request').returns({
            statusCode: 200,
            body: fakeXml
        });
        sinon.stub(bggApiUtil, '_pause').returns(when.resolve());
    });

    it('parses a board game collection', function *() {
        var results = yield bggApiUtil.getGameCollection('nobody');
        chai.expect(bggApiUtil._pause.called).to.not.be.ok;
        chai.expect(results.body.length).to.equal(2);
        //TODO expect more stuff
    });
});