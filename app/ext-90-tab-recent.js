/**
 * The recently read stories tab.
 *
 * Inherits from the magical Coho.StoryListObject.
 *
 */
Coho.tabs.recent = new Coho.StoryListObject({
	store: new Ext.data.Store({
        model: "story",
        data: Coho.Story.getRecent(),
        autoLoad: true
    }),

    groupedList: false,

    storyRootLabel: "Recent",
    saveToSessionOnRender: true,

    titleBar: {
        xtype: "toolbar",
        dock: "top",
        id: "recentTitleBar"
    },

    panelTitle: "Recent",
    panelIcon: "inbox2"

});

Coho.tabs.recent.refresh = function()
{
    Coho.tabs.recent.store.loadData(Coho.Story.getRecent());
    Coho.tabs.recent.list.refresh();
};

Coho.tabs.recent.stack.unshift({type:"root", uuid:"recent", back:"Recent"});

