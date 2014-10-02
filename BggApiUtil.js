var request = require('co-request').defaults({ jar: true });

module.exports = {

    getGameCollection: function* () {
        var opt = {
            url: 'http://boardgamegeek.com/xmlapi2/collection?own=1&stats=1&username=kform',
            method: "GET"
        };
        var response = yield request(opt);
        this._transformResponse(response);
        return response;
    },

    _transformResponse: function(response) {
        //TODO convert verbose xml response body into json string containing only what we need
    }

};