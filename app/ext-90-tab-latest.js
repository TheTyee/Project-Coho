/**
 * The latest stories tab.
 *
 * Inherits from the magical Coho.StoryListObject.
 *
 */
Coho.tabs.latestStoriesTab = new Coho.StoryListObject({
    store: new Ext.data.Store({
        model: "story",
        getGroupString: function(r) {
            return r.get("group");
        },
        proxy: {
            type: "scripttag",
            extraParams: {filters: []},
            url: Coho.apiURL+"/latest/grouped",
            reader: {
                type: "json",
                root: "hits.hits"
            }
        },
        autoLoad: true
    }),

    groupedList: true,

    storyRootLabel: "Latest",
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

Coho.tabs.latestStoriesTab.stack.unshift({type:"root", uuid:"latest", back:"Latest"});

