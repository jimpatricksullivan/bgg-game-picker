define([
    'underscore',
    'handlebars',
    'marionette',
    'imagesLoaded',
    'masonry'
], function (_, Handlebars, Marionette, imagesLoaded, Masonry) {
    return Marionette.ItemView.extend({
        template: Handlebars.compile(''),

        IMAGE_LOAD_CHUNK_SIZE: 20,

        onShow: function() {
            this.masonry = new Masonry( this.$el.get(0), {
                columnWidth: 160
            });

            var shuffledGames = this.collection.shuffle().toJSON();
            this._appendGames(shuffledGames);
        },

        _appendGames: function(allGames) {
            var chunk = this._getChunkOfGames(allGames);
            if (!chunk.length) return;

            var chunkElements = this._makeElementsFromGames(chunk);

            imagesLoaded(chunkElements, _.bind(function() {
                this.$el.append(chunkElements);
                this.masonry.appended(chunkElements);
                this._appendGames(allGames);
            }, this));
        },

        _getChunkOfGames: function (allGames) {
            return allGames.splice(0, this.IMAGE_LOAD_CHUNK_SIZE);
        },

        _makeElementsFromGames(games) {
            return _.map(games, function(game) {
                //TODO show more than just an image for each game?
                return $('<img>').attr('src', game.thumbnail);
            });
        }
    });
});