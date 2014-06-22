/*global define */
define([
    'backbone',
    'hbs!templates/someTemplate'
], function (Backbone, Template) {
    'use strict';

    return Backbone.View.extend({
        render: function() {
            this.$el.html(Template({
                thing: 'World'
            }));
        }
    })
});
