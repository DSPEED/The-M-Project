define([
    'themproject',
    "text!templates/detail.html",
    "app"
],
    function( M, template, app ) {

        var View = M.View.extend({
            first: true,

            template: _.tpl(template),

            events: {
                "click .back": "back",
                "click .delete": "deleteEntry",
                "click .edit": "editEntry"
            },

            bindings: {
                '[data-binding="input-firstname"]': {
                    observe: 'firstname'
                },
                '[data-binding="input-lastname"]': {
                    observe: 'lastname'
                }
            },

            initialize: function() {
                this.listenTo(this.model, 'change', this.change);
            },

            // provide data to the template
            serialize: function() {
                return this.model.attributes
            },

            back: function() {
                app.layoutManager.navigate({
                    route: '/'
                });
            },

            deleteEntry: function() {
                var that = this;
                this.unstickit();
                this.model.destroy({
                    success: function() {
                        that.back();
                    }
                });
            },

            editEntry: function() {
                this.model.save();
                this.back();
            },

            afterRender: function() {
                this.stickit();
                return this;
            }
        })

        return View;
    });