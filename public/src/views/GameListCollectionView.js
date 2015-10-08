define([
    'marionette',
    'views/GameListItemView',
    'bower_components/masonry/dist/masonry.pkgd.js'
], function (Marionette, GameListItemView, Masonry) {
    return Marionette.CollectionView.extend({
        childView: GameListItemView,

        onShow: function() {

            var el =this.$el.get(0);

            setTimeout(function() {
                window.masonry = new Masonry( el, {
                    columnWidth: 160
                });
            }, 2000);

        }
    });
});