/**
 * The saved stories tab.
 *
 * Inherits from the magical Coho.StoryListObject. Big difference with other
 * tabs is that saved story data is stored locally.
 *
 */
Coho.tabs.savedStoriesTab = new Coho.StoryListObject({
    store: new Ext.data.Store({
        model: "story",
        data: Coho.Story.getSavedFull(),
        autoLoad: true
    }),

    titleBar: {
        xtype: "toolbar",
        dock: "top",
        id: "savedTitleBar",
        title: "TheTyee.ca"
    },

    panelTitle: "Saved",
    panelIcon: "favorites",

    listeners: {
        "itemswipe": function(list, index, item, e) {
            var uuid = list.getStore().getAt(index).get("uuid");
            // TODO: delete button magic
            Coho.Story.removeSaved(uuid);
        }
    }
});

Coho.tabs.savedStoriesTab.refresh = function()
{
    Coho.tabs.savedStoriesTab.store.loadData(Coho.Story.getSavedFull());
    Coho.tabs.savedStoriesTab.list.refresh();
};

Coho.tabs.savedStoriesTab.stack.unshift({type:"root", uuid:"saved", back:"Saved"});

