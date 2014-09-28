/*global define */
define([
    'backbone',
    'hbs!templates/header',
    'foundation.topbar'
], function (Backbone, template) {
    'use strict';

    return Backbone.View.extend({
        render: function() {
            this.$el.html(template({}));
            this.$el.foundation();
        }
    })
});