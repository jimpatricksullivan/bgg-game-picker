var koa = require('koa');
var logger = require('koa-logger');
var route = require('koa-route');
var serveStatic = require('koa-static');
var bggApiUtil = require('./BggApiUtil.js');

var app = koa();
app.use(logger());

app.use(serveStatic(__dirname + '/public/'));

app.use(route.get('/games', function *() {
    var apiResponse = yield bggApiUtil.getFakeGameCollection();
    this.statusCode = apiResponse.statusCode;
    this.body = apiResponse.body;
    this.set('Content-Type', 'application/json');
}));

app.listen(8000);
console.log('listening on port 8000');