var request = require('co-request').defaults({ jar: true });

module.exports = {

    getGameCollection: function* () {
        debugger;
        var opt = {
            url: 'http://boardgamegeek.com/xmlapi2/collection?own=1&stats=1&username=kform',
            method: "GET"
        };
        var res = yield request(opt);
        debugger;
        this.statusCode = res.statusCode;
        this.body = res.body;
    }

};