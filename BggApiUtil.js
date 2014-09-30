var request = require('co-request').defaults({ jar: true });

module.exports = {

    getGameCollection: function* (context) {
        var opt = {
            url: 'http://boardgamegeek.com/xmlapi2/collection?own=1&stats=1&username=kform',
            method: "GET"
        };
        var res = yield request(opt);
        context.statusCode = res.statusCode;
        context.body = res.body;
    }

};