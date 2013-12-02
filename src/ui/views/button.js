/**
 * M.ButtonView inherits from M.View
 * @module M.ButtonView
 *
 * @type {*}
 * @extends M.View
 */
M.ButtonView = M.View.extend({

    /**
     * The type of the object
     * @private
     */
    _type: 'M.ButtonView',

    /**
     * The template of the object before initializing it.
     * @private
     */
    _template: _.tmpl(M.TemplateManager.get('M.ButtonView')),

    /**
     * The active state of the button. Use isActive and setActive to change this property.
     * @private
     */
    _isActive: YES,

    /**
     * sets the view in the creation process to be enabled or disabled
     * @type {Boolean}
     */
    enabled: YES,

    _assignTemplateValues: function() {
        M.View.prototype._assignTemplateValues.apply(this, arguments);
        this._templateValues.icon = this.icon ? this.icon : '';
    },

    _addClassNames: function() {
        M.View.prototype._addClassNames.apply(this, arguments);
        var value = this._getValue();
        if(value !== '' && this.icon && this.icon !== ''){
            this.$el.addClass('has-icon');
        } else if(value === '' && this.icon && this.icon !== ''){
            this.$el.addClass('is-icon-only');
        }
    },

    isActive: function() {
        return this._isActive();
    },

    activate: function() {
        this._isAcitve = YES;
        this.$el.addClass('active');

    },

    deactivate: function() {
        this._isAcitve = NO;
        this.$el.removeClass('active');
    },

    _postRender: function() {
        M.View.prototype._postRender.apply(this, arguments);
        if( this.enabled === NO && this.disable ) {
            this.disable();
        }
    }

}).implements([M.ActiveState, M.ViewEnableState]);