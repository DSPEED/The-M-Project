Kitchensink.Views = Kitchensink.Views || {};

(function() {
    'use strict'
    Kitchensink.Views.MenuView = M.View.extend({

        template: '<div><div data-childviews="content"></div></div>',
        grid: 'container'


    }, {
        content: M.View.extend({
            cssClass:'lalalalal',
            grid: 'row'
        }, {

            headline: M.View.extend({
                tagName: 'h2',
                grid: 'col-md-12',
                value: M.I18N.get('global.appName', {aka: 'Absinth'}),
                events: {
                    tap: function() {
                        console.log('tap');
                    }
                }
            }),

            buttongroupExample: M.ButtonGroupView.extend({
                grid: 'floatnone'
            },{

                firstButton: M.ButtonView.extend({
                    value:'first button',
                    cssClass: 'btn-success',
                    grid: 'col-xs-3'
                }),

                secondButton: M.ButtonView.extend({
                    value:'second button',
                    grid: 'col-xs-2'
                }),

                thirdButton: M.ButtonView.extend({
                    value:'third button',
                    cssClass: 'btn-info',
                    grid: 'col-xs-3'
                }),

                fourthButton: M.ButtonView.extend({
                    value:'fourth button',
                    cssClass: 'btn-danger',
                    grid: 'col-xs-4'
                })

            }),

            bindingTestInput: M.View.extend({
                scopeKey: 'bindingTestModel',
                grid:'floatnone',
                extendTemplate: '<div><input class="col-xs-2" value="<%= a %>"/> <input class="col-xs-2" value="<%= b %>" /></div>'
            }),

            bindingTestOutput: M.View.extend({
                scopeKey: 'bindingTestModel',
                grid: 'floatnone',
                template: '<div class=""><input class="col-xs-4" value="<%= a %>"/> <input class="col-xs-4" value="<%= b %>" /></div>'

            }),

            bindingTestAttributeA: M.View.extend({
                grid: 'col-xs-3 floatnone',
                scopeKey: 'bindingTestModel.a'
            }),

            bindingTestAttributeB: M.View.extend({
                grid: 'col-xs-3 floatnone',
                scopeKey: 'bindingTestModel.b'
            }),

            eventTest: M.View.extend({
                scopeKey: 'consoleModel',
                cssClass: 'box',
                grid: 'col-xs-6 col-xs-offset-3 floatnone',
                events: {
                    hold: 'eventDidHappen',
                    tap: 'eventDidHappen',
                    doubletap: 'eventDidHappen',
                    drag: 'eventDidHappen',
                    swipe: 'eventDidHappen',
                    transform: 'eventDidHappen',
                    rotate: 'eventDidHappen',
                    pinch: 'eventDidHappen',
                    touch: 'eventDidHappen'
                    //                    release: 'eventDidHappen'
                }
            }),

            listExample: M.ListView.extend({

                scopeKey: 'tmpViews',

                listItemView: M.ListItemView.extend({

                    events: {

                        tap: 'eventDidHappen'
                    }
                })
            }),

            localizationExample: M.ButtonView.extend({
                value: M.I18N.get('global.switchLanguage'),
                events: {
                    tap: function() {
                        if( M.I18N._activeLocale == 'de' ) {
                            M.I18N.setLocale('en');
                        } else {
                            M.I18N.setLocale('de');
                        }
                    }
                }
            }),

            pageswitchExample: M.ButtonView.extend({
                value: M.I18N.get('global.pageswitch'),
                events: {
                    tap: 'nextPage'
                }
            }),

            sliderExample: M.SliderView.extend({
                events: {
                    change: function( event, element ) {
                        console.log(element.$el);
                    }
                }
            }),

            textfieldExample: M.TextfieldView.extend({

                label: 'Label',
                value: ''
            }),


            //            toggleExample: M.ToggleView.extend({
            //
            //                value: 'ICH BIN DER VALUE',
            //                preRender: function(){
            //
            //                },
            //                postRender: function(){
            //                    console.log(this.$el, this.el);
            //
            //                }
            //
            //            },{
            //                first: M.ButtonView.extend({
            //                    value: 'btn1',
            //                    events:{
            //                        tap: function(event, element){
            //                            console.log(element);
            //                        }
            //                    }
            //                }),
            //                second: M.ButtonView.extend({
            //                    value: 'btn2'
            //                })
            //            }),

            imageExample: M.ImageView.extend({
                value: 'http://www.bhmpics.com/thumbs/success_kid-t2.jpg',
                alt: 'success',
                grid: 'col-xs-2',
                events: {
                    tap: function() {
                        //this.$el.append('click');
                        var that = this;
                        this.$el.hide();

                        setTimeout(function() {
                            that.$el.show();
                        }, 2000);
                    },
                    swipe: 'eventDidHappen',
                    swiperight: 'eventDidHappen',
                    swipeleft: 'eventDidHappen'
                }
            }),

            searchfieldExample: M.SearchfieldView.extend({
                label: 'Label',
                value: ''
            }),

            loadingExample: M.LoaderView.extend({
                value: 'Loading ...',
                preRender: function() {
                },
                postRender: function() {
                }
            }),

            loaderButtonExample: M.ButtonView.extend({
                value: 'Toggle LoaderView',
                events: {
                    tap: function() {
                        //this.scope.menu.childViews.content.childViews.loadingExample.toggle();
                    }
                }
            }),

            dialogExample: M.DialogView.extend({
                value: new M.Model({
                    'header': 'Header Text',
                    'message': 'Dialog Message',
                    'cancel': 'Abbrechen',
                    'ok': 'Ok'
                })
            }),

            selectionlistExample: M.SelectionListView.extend({
                scopeKey: 'selectionListModel.water',
                selectOptions: {
                    collection: [
                        {id: 1, name: 'fountain'},
                        {id: 2, name: 'evian'},
                        {id: 3, name: 'dasina'}
                    ],
                    labelPath: 'name',
                    valuePath: 'name'
                }

            }),

            mulitpleSelectionListViewExample: M.MulitpleSelectionListView.extend({
                scopeKey: 'multipleSelectionListModel.water',
                selectOptions: {
                    collection: [
                        {id: 1, name: 'fountain'},
                        {id: 2, name: 'evian'},
                        {id: 3, name: 'dasina'}
                    ],
                    labelPath: 'name',
                    valuePath: 'name'
                }

            }),

            birthday: M.View.extend({
                value: 'Birthday:'
            }),

            birthdayPlain: M.View.extend({
                scopeKey: 'person.birthday'
            }),

            egon: M.TextfieldView.extend({
                scopeKey: 'person.birthday',
                type:'date',
                onGet: function( value ) {
                    var date= M.Date.create(parseInt(value)).format('YYYY-MM-DD');
                    return date;
                },
                onSet: function( value ) {
                    return M.Date.create(value).unix() * 1000;
                }
            }),

            egon2: M.TextfieldView.extend({
                scopeKey: 'person',
                template: '<input type="date" value="<%= birthday %>" />',
                onGet: function( value ) {
                    var date= M.Date.create(parseInt(value)).format('YYYY-MM-DD');
                    return date;
                },
                onSet: function( value ) {
                    return M.Date.create(value).unix() * 1000;
                }
            })
        }),

        gridStuff: M.View.extend({
            grid: 'row'
        }, {

            red: M.View.extend({
                cssClass: 'btn-success',
                grid: 'col-xs-1 col-md-1'
            }),

            green: M.View.extend({
                cssClass: 'btn-danger',
                grid: 'col-xs-1 col-md-1 col-md-offset-1'
            }),

            blue: M.View.extend({
                cssClass: 'btn-info',
                grid: 'col-xs-1 col-md-3 col-md-offset-6'
            })

        })
    });

})();

var options = {};
var childViews = {}

M.View.extend(options, childViews);