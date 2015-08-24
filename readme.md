#BoardGameGeek Game Picker

This is a WIP JavaScript application that uses the
[boardgamegeek.com api](http://boardgamegeek.com/wiki/page/BGG_XML_API) to select a random owned game in a user's
[collection](http://boardgamegeek.com/wiki/page/collection) which meets certain criteria, such as number of
players, maximum run time, or minimum rating. Handy when you have lots of games and can't decide what to play.

To see the app in action, go here: http://immense-waters-4279.herokuapp.com/

##Running this app locally

To run the app, just
```
npm install
npm start
```

If you want to run tests, you can
```
npm test
```

## Dev Notes

This was built on top of [Web App Skeleton](https://github.com/jimpatricksullivan/web-app-skeleton) and
therefore it's powered by  [Koa](https://github.com/koajs/koa), [requirejs](https://github.com/jrburke/requirejs),
[gulp](https://github.com/gulpjs/gulp), and [bower](https://github.com/bower/bower). The client side framework is
[backbone.marionette](https://github.com/marionettejs/backbone.marionette). Tests are powered by
[Karma](https://github.com/karma-runner/karma), [Mocha](https://github.com/mochajs/mocha),
[Chai](https://github.com/chaijs/chai), and [Sinon](https://github.com/cjohansen/Sinon.JS).