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
                extraParams: {filters: []},
                url: Coho.config.apiURL+"/search/"+escape(s.getValue()),
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
    model: "story",
    storeId: "searchTabStore",
    autoLoad: false
});

Coho.tabs.searchTab = new Coho.StoryListObject({
    store: searchTabStore,

    saveToSessionOnRender: true,

    titleBar: {
        xtype: "toolbar",
        dock: "top",
        id: "searchTitleBar",
        items: [ searchTabField ]
    },

    panelTitle: "Search",
    panelIcon: "search"

});

Coho.tabs.searchTab.stack.unshift({type:"root", uuid:"search", back:"Back"});

