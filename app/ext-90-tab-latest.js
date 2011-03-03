/**
 * The latest stories tab.
 *
 * Inherits from the magical Coho.StoryListObject.
 *
 */
Coho.tabs.latestStoriesTab = new Coho.StoryListObject({
    store: Coho.Story.getStoryListStoreForLatest(),

    groupedList: true,

    storyRootLabel: "Latest",
    saveToSessionOnRender: true,

    titleBar: {
        xtype: "toolbar",
        dock: "top",
        id: "latestTitleBar",
        //title: "TheTyee.ca"
    },

    panelTitle: "Latest",
    panelIcon: "inbox2"

});

Coho.tabs.latestStoriesTab.stack.unshift({type:"root", uuid:"latest", back:"Latest"});

