/*global define */
define([
    'backbone',
    'foundation.reveal',
    'hbs!templates/someTemplate'
], function (Backbone, reveal, Template) {
    'use strict';

    return Backbone.View.extend({
        render: function() {
            this.$el.html(Template({
                thing: 'World'
            }));
            this.$el.foundation();
            this.$('#helloWorld').foundation('reveal', 'open');
        }
    })
});
