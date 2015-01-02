var koa = require('koa');
var logger = require('koa-logger');
var route = require('koa-route');
var serveStatic = require('koa-static');
var bggApiUtil = require('./BggApiUtil.js');

var app = koa();
app.use(logger());

app.use(serveStatic(__dirname + '/public/'));

app.use(route.get('/users/:name/games', function *(username) {
    var apiResponse = yield bggApiUtil.getGameCollection(username);
    this.statusCode = apiResponse.statusCode;
    this.body = apiResponse.body;
    this.set('Content-Type', 'application/json');
}));

var port = process.env.PORT || 8000;

app.listen(port);
console.log('listening on port ' + port);