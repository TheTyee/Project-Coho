Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    onReady: function() {

        // Models
        // ------
        Ext.regModel('Article', {
            fields: [
            {   name: 'uuid'
            },
            {
                name: 'title'
            },
            {
                name: 'url'
            },
            {
                name: 'published_date'
            },
            {
                name: 'abstract'
            },
            {
                name: 'thumbnail',
                mapping: 'media'
            },
           {
               name: 'story'
           },
        ]
        });

        Ext.regModel('Category', {
            fields: [{
                name: 'title',
                type: 'string'
            },
            {
                name: 'url',
                type: 'string'
            }]
        });

        // Other Models that will be required:
        // - Author
        // - ...

        // Data Store(s)
        // -----------
        // Just a call to a local JSON resource that contains the data for a
        // list of stories
        var recentStories = new Ext.data.Store({
            model: 'Article',
            proxy: {
                type: 'ajax',
                url: 'json/recent-stories-list.json',
                reader: {
                    type: 'json',
                    root: 'results'
                }
            },
            autoLoad: true
        });

        // Templates
        // ---------
        // Templates are used to format the display of data
        
        // This one is for the list of articles
        var articleListTpl = new Ext.Template(
                '<tpl for="."><div id="{uuid}" class="article">', 
                    '<tpl for="thumbnail">', 
                       '<tpl for="metadata"><img src="{url}" /></tpl>',
                     '</tpl>',
                     '<h2>{title}</h2>',
                     '<p>{abstract} <span class="published">{published_date}</span></p>',
                '</div>',
                '</tpl>'
        );
        // This one for story details
        var storyDetailTpl = new Ext.Template(
                '<div id="{uuid}" class="storyDetail">',
                    '<h1>{title}</h1>',
                    '<h2>{abstract}</h2>',
                    '<div class="content">',
                    '{story}',
                    '</div>',
                    // This is where I ran out of steam.
                    // Need to finish modelling a complex article/story with
                    // lots of deeply nested sub-elements. From there, the
                    // storyDetailTpl can be updated to iterate over these
                    // elements for a mobile display.
                    //'<tpl for="large_thumbnail"><img src="{url}" /></tpl>',
                '</div></tpl>');

        // Panels
        // -------------------
        // Panels control the application. They are created, shown, updated,
        // etc.
       
        // The storyDetail panel is the panel that is shown when a user clicks
        // on a item in the list.
        var storyDetail = new Ext.Panel({
            hidden: true,
            html: 'Detail View',
            tpl: storyDetailTpl,
            dockedItems: [{
                dock: 'top',
                xtype: 'toolbar',
                items: [{
                    text: 'Back',
                    handler: function() {
                        storyList.setActiveItem(0, {
                            type: 'slide',
                            direction: 'right'
                        })
                    }
                }]
            }]
        });

        // This is an instance of an Ext.List component that is used in the
        // storyList panel.
        var articleList = new Ext.List({
            fullscreen: true,
            itemTpl: articleListTpl,
            itemSelector: 'div.article',
            store: recentStories,
            //onItemDisclosure: 'true',
            listeners: {
                "itemtap": function(list, index, item, e) {
                    // 
                    var detail = storyDetail,
                    rec = recentStories.getAt(index);
                    detail.update(rec.data);
                    storyList.setActiveItem(detail, {
                        type: 'slide',
                        direction: 'left'
                    });
                }
            }
        });

        var storyList = new Ext.Panel({
            // The layout of this panel needs to be set to 'card' so that it
            // can be updated when a user taps an item in the list.
            layout: 'card',
            iconCls: 'inbox2',
            title: 'Latest',
            items: [articleList]
        });

        // Bottom Tabs
        // -----------
        // These are the 'tabs' shown across the bottom of the application.
        var navBarItems = [
        storyList, {
            iconCls: 'heart',
            //iconMask: true,
            title: 'Popular',
            html: 'Pressed Favourites'
        },
        {
            iconCls: 'favorites',
            title: 'Saved',
            html: 'Pressed Saved'
        },
        {
            iconCls: 'doc_drawer',
            title: 'Topics',
            html: 'Pressed Topics'
        },
        {
            iconCls: 'more',
            title: 'More',
            html: 'Pressed More'
        }];

        var titleBar = {
            dock: 'top',
            xtype: 'toolbar',
            title: 'TheTyee.ca'
        };

        var navBar = {
            dock: 'bottom',
            xtype: 'toolbar',
            ui: 'dark',
            items: navBarItems
        };

        // Panel that controls the basic application UI
        var main = new Ext.TabPanel({
            fullscreen: 'true',
            items: [navBarItems],
            dockedItems: [titleBar],
            tabBar: {
                dock: 'bottom',
                scroll: {
                    direction: 'horizontal',
                    useIndicators: false
                },
                layout: {
                    pack: 'center'
                }
            }
        });

        // End onReady
        // End Ext.setup
    }
});

