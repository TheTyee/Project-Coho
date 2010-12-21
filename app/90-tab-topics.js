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
        store: new Ext.data.JsonStore({model: "topic", data:[
            {key:"2010 Olympics", topic:"2010 Olympics"},
            {key:"Education", topic:"Education"},
            {key:"Elections", topic:"Elections"},
            {key:"Energy", topic: "Energy"},
            {key:"Environment", topic: "Environment"},
            {key:"Film", topic: "Film"},
            {key:"Food + Farming", topic: "Food + Farming"},
            {key:"Gender + Sexuality", topic: "Gender + Sexuality"},
            {key:"Health", topic: "Health"},
            {key:"Housing", topic: "Housing"},
            {key:"Labour + Industry", topic: "Labour + Industry"},
            {key:"Music", topic: "Music"},
            {key:"Photo Essays", topic: "Photo Essays"},
            {key:"Podcasts", topic: "Podcasts"},
            {key:"Politics", topic: "Politics"},
            {key:"Rights + Justice", topic: "Rights + Justice"},
            {key:"Science + Tech", topic: "Science + Tech"},
            {key:"Transportation", topic: "Transportation"},
            {key:"Travel", topic: "Travel"},
            {key:"Tyee News", topic: "Tyee News"},
            {key:"Urban Design + Architecture", topic: "Urban Design + Architecture"},
            {key:"Video", topic: "Video"}
          ]}),
        listeners: { "itemtap": function(list, index, item, e) {
            var topickey = list.getStore().getAt(index).get("key");
            var topicname = list.getStore().getAt(index).get("topic");

            // set up back button for right now
            topicsTab.stack.unshift(topickey);
            topicsTab.backLabelStack.unshift(topicname);
            topicsTab.setBackButtonText(topicsTab.backLabelStack[1]);
            topicsTab.showBackButton();
            topicsTab.hideContextButton();

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

topicsTab.backLabelStack.unshift("Topics");

