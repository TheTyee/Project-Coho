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
        //title: "TheTyee.ca"
    },

    panelTitle: "Topics",
    panelIcon: "doc_drawer",

    // root screen is list of topics
    pre: new Ext.List({
        itemTpl: Coho.Templates.topicList,
        store: new Ext.data.JsonStore({model: "topic", data:[
            {key:"News", topic:"News"},
            {key:"Culture", topic:"Culture"},
            {key:"Opinion", topic:"Opinion"},
            {key:"National", topic:"National"},
            {key:"Mediacheck", topic:"Mediacheck"},
            {key:"Solutions", topic:"Solutions"},
            {key:"Aboriginal Affairs", topic:"Aboriginal Affairs"},
            {key:"BC Election 2013", topic:"BC Election 2013"},
            {key:"BC Politics", topic:"BC Politics"},
            {key:"Education", topic:"Education"},
            {key:"Energy", topic: "Energy"},
            {key:"Environment", topic: "Environment"},
            {key:"Film", topic: "Film"},
            {key:"Food", topic: "Food"},
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
            {key:"Urban Design + Architecture", topic: "Urban Design + Architecture"},
            {key:"Video", topic: "Video"}
          ]}),
        listeners: { "itemtap": function(list, index, item, e) {
            var topickey = list.getStore().getAt(index).get("key");
            var topicname = list.getStore().getAt(index).get("topic");

            // set up back button
            Coho.tabs.topicsTab.stack.unshift({type:"topic", uuid:topickey, back:"Back"});
            Coho.tabs.topicsTab.setBackButtonText(Coho.tabs.topicsTab.stack[1].back);
            Coho.tabs.topicsTab.showBackButton();
            Coho.tabs.topicsTab.hideContextButton();

            // set the story list's data source
            // this can be session storage or remote
            Coho.tabs.topicsTab.store = Coho.Story.getStoryListStoreForTopic(topickey);

            // the order of these next three lines is important for layout
            Coho.tabs.topicsTab.panel.setActiveItem(1, {type:"slide", direction:"left"});
            Coho.tabs.topicsTab.list.bindStore(Coho.tabs.topicsTab.store);
            Coho.tabs.topicsTab.list.scroller.scrollTo({x:0, y:0});
        } }
    })
});

Coho.tabs.topicsTab.stack.unshift({type:"root", uuid:"topics", back:"Topics"});

