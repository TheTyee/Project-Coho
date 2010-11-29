/**
 * The latest stories tab.
 *
 * Inherits from the magical Coho.StoryListObject.
 *
 */
var latestStoriesTab = new Coho.StoryListObject({
    store: new Ext.data.Store({
        model: "searchResultStory",
        proxy: {
            type: "scripttag",
            url: "http://preview.app.thetyee.ca/proxy/latest.pl",
            reader: {
                type: "json",
                root: "hits.hits"
            }
        },
        autoLoad: true
    }),

    titleBar: {
        xtype: "toolbar",
        dock: "top",
        id: "latestTitleBar",
        title: "TheTyee.ca"
    },

    panelTitle: "Latest",
    panelIcon: "inbox2"

});


