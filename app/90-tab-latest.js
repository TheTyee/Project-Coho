/**
 * The latest stories tab.
 *
 * Inherits from the magical Coho.StoryListObject.
 *
 */
var latestStoriesTab = new Coho.StoryListObject({
    store: new Ext.data.Store({
        model: "story",
        proxy: {
            type: "scripttag",
            extraParams: {filters: []},
            url: Coho.apiURL+"/latest",
            reader: {
                type: "json",
                root: "hits.hits"
            }
        },
        autoLoad: true
    }),

    saveToSessionOnRender: true,

    titleBar: {
        xtype: "toolbar",
        dock: "top",
        id: "latestTitleBar",
        title: "TheTyee.ca"
    },

    panelTitle: "Latest",
    panelIcon: "inbox2"

});


