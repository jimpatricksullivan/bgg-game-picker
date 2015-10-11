define([
    'underscore',
    'handlebars',
    'marionette',
    'imagesLoaded',
    'masonry',
    'hbs!templates/gameListItem'
], function (_, Handlebars, Marionette, imagesLoaded, Masonry, gameListItem) {
    return Marionette.ItemView.extend({
        template: Handlebars.compile('<div></div>'),

        IMAGE_LOAD_CHUNK_SIZE: 5,

        onShow: function() {
            var shuffledGames = _.shuffle(this.collection.toJSON());
            this._appendGames(shuffledGames);
        },

        _appendGames: function(allGames) {
            var chunk = this._getChunkOfGames(allGames);
            if (!chunk.length) return;

            var chunkElements = this._makeElementsFromGames(chunk);

            imagesLoaded(chunkElements, _.bind(function() {
                this.$el.append(chunkElements);
                this.masonry = new Masonry( this.$el.get(0), { columnWidth: 187 });
                this._appendGames(allGames);
            }, this));
        },

        _getChunkOfGames: function (allGames) {
            return allGames.splice(0, this.IMAGE_LOAD_CHUNK_SIZE);
        },

        _makeElementsFromGames(games) {
            return _.map(games, function(game) {
                return $(gameListItem(game)).get(0);
            });
        }
    });
});