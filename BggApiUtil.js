var _ = require('underscore');
var request = require('co-request').defaults({ jar: true });
var when = require('when');
var thunkify = require('thunkify');
var parseString = thunkify(require('xml2js').parseString);

module.exports = {

    getGameCollection: function* (username) {
        var opt = {
            url: 'http://boardgamegeek.com/xmlapi2/collection?own=1&stats=1&username=' + username,
            method: "GET"
        };
        var statusCode = 0;
        var tries = 0;
        while (statusCode !== 200 && tries <= 10) {
            if (tries !== 0) {
                yield this._pauseBetweenTries();
            }
            var response = yield request(opt);
            statusCode = response.statusCode;
            tries++;
        }
        response.body = yield this._parseXml(response.body);
        return response;
    },

    _parseXml: function* (body) {
        // parse the xml to an object
        var bodyObject = yield parseString(body);

        // parse the bonkers object to something manageable
        var parsedObjects = [];
        _.each(bodyObject.items.item || [], function(rawObject) {
            var parsedObject = {};
            parsedObject.id = parseInt(rawObject.$.objectid, 10);
            parsedObject.name = rawObject.name[0]._;
            parsedObject.yearPublished = rawObject.yearpublished ? parseInt(rawObject.yearpublished[0], 10) : 0;
            parsedObject.image = rawObject.image ? rawObject.image[0] : '';
            parsedObject.thumbnail = rawObject.thumbnail ? rawObject.thumbnail[0] : '';
            parsedObject.minPlayers = parseInt(rawObject.stats[0].$.minplayers, 10);
            parsedObject.maxPlayers =  parseInt(rawObject.stats[0].$.maxplayers, 10);
            parsedObject.playingTime = parseInt(rawObject.stats[0].$.playingtime, 10);
            parsedObject.userRating = parseFloat(rawObject.stats[0].rating[0].$.value);
            parsedObject.averageRating = parseFloat(rawObject.stats[0].rating[0].average[0].$.value);
            parsedObjects.push(parsedObject);
        });

        return parsedObjects;
    },

    _pauseBetweenTries: function() {
        var deferred = when.defer();
        setTimeout(function() {
            deferred.resolve( );
        }, 2000);
        return deferred.promise;
    }
};