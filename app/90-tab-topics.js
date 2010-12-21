/* nothing here yet */

// topics is just a modified StoryListObject.
var topicsTab = new Coho.StoryListObject({
    store: new Ext.data.Store({
        model: "story",
        data: [],
        autoLoad: false
    }),

    titleBar: {
        xtype: "toolbar",
        dock: "top",
        id: "topicsTitleBar",
        title: "TheTyee.ca"
    },

    panelTitle: "Topics",
    panelIcon: "doc_drawer",

    // root screen is list of topics
    pre: new Ext.List({
        fullscreen: true,
        itemTpl: topicListTpl,
        store: new Ext.data.JsonStore({model: "topic", data:[{key: "2010 Olympics", topic: "2010 Olympics"},{key: "Education", topic:"Education"}]}),
        listeners: { "itemtap": function(list, index, item, e) {
            var topickey = list.getStore().getAt(index).get("key");
            var topicname = list.getStore().getAt(index).get("topic");

            // set up back button label for the story list (future)
            topicsTab.storyRootLabel = topicname;

            // set up back button for right now
            topicsTab.showBackButton();
            topicsTab.setBackButtonText("Topics");

            topicsTab.store.setProxy({
                type: "scripttag",
                extraParams: {filters: []},
                url: Coho.apiURL+"/topic/"+topickey,
                reader: {
                    type: "json",
                    root: "hits.hits"
                }
            });
            topicsTab.store.load();
            topicsTab.list.bindStore(topicsTab.store);
            //topicsTab.list.refresh();

            topicsTab.panel.setActiveItem(1, {type:"slide", direction:"left"});
            console.log("switch to topic: "+Coho.apiURL+"/topic/"+topickey);
        } }
    })
});


