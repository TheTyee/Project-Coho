/**
 * The search tab.
 *
 * Inherits from the magical Coho.StoryListObject and uses a custom
 * toolbar for the search box.
 *
 * This is to save screen real estate. Actually, it's for inheritance
 * and code re-use and the best kind of programmer laziness.
 *
 */
var searchTabField = new Ext.form.Search({
    placeHolder: "Search TheTyee.ca",
    name: "searchfield",
    autoCapitalize: false,
    autoComplete: false,
    listeners: {
        action: function(s,e) {
            searchTabStore.setProxy({
                type: "scripttag",
                url: "http://preview.app.thetyee.ca/proxy/v1/search/"+escape(s.getValue()),
                reader: {
                    type: "json",
                    root: "hits.hits"
                }
            });
            searchTabStore.load(function(records, operation, success) {
                // do something?
            });
        }
    }
});
var searchTabStore = new Ext.data.Store({
    model: "searchResultStory",
    storeId: "searchTabStore",
    autoLoad: false
});

var searchTab = new Coho.StoryListObject({
    store: searchTabStore,

    titleBar: {
        xtype: "toolbar",
        dock: "top",
        id: "searchTitleBar",
        items: [ searchTabField ]
    },

    panelTitle: "Search",
    panelIcon: "search"

});

