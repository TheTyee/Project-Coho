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
        data: Coho.Story.getSavedFullUI(),
        autoLoad: true
    }),

    titleBar: {
        xtype: "toolbar",
        dock: "top",
        id: "savedTitleBar",
        //title: "TheTyee.ca"
    },

    panelTitle: "Saved",
    panelIcon: "favorites",

    listeners: {
        "itemswipe": function(list, index, item, e) {
            var el = Ext.get(item);
            var uuid = list.getStore().getAt(index).get("uuid");
            var active = false;

            console.log("item swipe on "+uuid);

            Ext.select("div.delete-button", el.dom).each(function(e,c,i){if (e.dom.style.display=='block')active=true;});

            Ext.select("div.delete-button", this.el.dom).each(function(e,c,i){e.setStyle({display:'none'});});
            if (!active)
                Ext.select("div.delete-button", el.dom).each(function(e,c,i){e.setStyle({display:'block'});});

            // TODO: delete button magic
            //Coho.Story.removeSaved(uuid);
        }
    }
});

Coho.tabs.savedStoriesTab.refresh = function()
{
    Coho.tabs.savedStoriesTab.store.loadData(Coho.Story.getSavedFullUI());
    Coho.tabs.savedStoriesTab.list.refresh();
};

Coho.tabs.savedStoriesTab.stack.unshift({type:"root", uuid:"saved", back:"Saved"});

