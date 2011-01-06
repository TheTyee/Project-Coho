/* nothing here yet */

// topics is just a modified StoryListObject.
Coho.tabs.topicsTab = new Coho.StoryListObject({
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
        itemTpl: Coho.Templates.topicList,
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
            Coho.tabs.topicsTab.stack.unshift({type:"topic", uuid:topickey, back:topicname});
            Coho.tabs.topicsTab.setBackButtonText(Coho.tabs.topicsTab.stack[1].back);
            Coho.tabs.topicsTab.showBackButton();
            Coho.tabs.topicsTab.hideContextButton();

            Coho.tabs.topicsTab.store.setProxy({
                type: "scripttag",
                extraParams: {filters: []},
                url: Coho.apiURL+"/topic/"+topickey,
                reader: {
                    type: "json",
                    root: "hits.hits"
                }
            });
            Coho.tabs.topicsTab.store.load();
            Coho.tabs.topicsTab.list.bindStore(Coho.tabs.topicsTab.store);
            //Coho.tabs.topicsTab.list.refresh();

            Coho.tabs.topicsTab.panel.setActiveItem(1, {type:"slide", direction:"left"});
            console.log("switch to topic: "+Coho.apiURL+"/topic/"+topickey);
        } }
    })
});

Coho.tabs.topicsTab.stack.unshift({type:"root", uuid:"topics", back:"Topics"});
