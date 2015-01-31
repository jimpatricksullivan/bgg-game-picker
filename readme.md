#BoardGameGeek Game Picker

When complete, this will be a JavaScript application that uses the [boardgamegeek.com api](http://boardgamegeek.com/wiki/page/BGG_XML_API) to select a random owned game in a user's [collection](http://boardgamegeek.com/wiki/page/collection) which meets certain criteria, such as number of players, maximum run time, or minimum rating. Handy when you have lots of games and can't decide what to play.

##Running this app

This app is built on [Koa](http://koajs.com/), so it requires node 0.11.x. The app can be installed like so:
```Shell
npm install
gulp
```

And the web server can be started like so:
```Shell
node --harmony app.js
```
