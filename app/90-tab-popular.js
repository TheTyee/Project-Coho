/**
 * The popular stories tab.
 *
 * Inherits from the magical Coho.StoryListObject.
 *
 */
var popularStoriesTab = new Coho.StoryListObject({
    store: new Ext.data.Store({
        model: "searchResultStory",
        proxy: {
            type: "ajax",
            url: "/json/popular.json",
            reader: {
                type: "json",
                root: "hits.hits"
            }
        },
        autoLoad: false
    }),

    titleBar: {
        xtype: "toolbar",
        dock: "top",
        id: "popularTitleBar",
        title: "TheTyee.ca"
    },

    panelTitle: "Popular",
    panelIcon: "heart"

});


