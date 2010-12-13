// Real procedural code to boot the application lives here.

/**
 * Set up the top-level navigation
 */
var mainTabPanels = [
    latestStoriesTab.panel,
    searchTab.panel,
    {   
        iconCls: "favorites",
        title: "Saved",
        html: "Pressed Saved"
    },
    {
        iconCls: "doc_drawer",
        title: "Topics",
        html: "Pressed Topics"
    },
    {
        iconCls: "more",
        title: "More",
        html: "Pressed More"
    }
];

// set the current tab to the first tab to start
Coho.currentTab = mainTabPanels[0].wrapperObject;

// initialize the main application panel
var mainPanel = new Ext.TabPanel({
    fullscreen: "true",
    items: [mainTabPanels],
    tabBar: {
        dock: "bottom",
        scroll: {
            direction: "horizontal",
            useIndicators: false
        },
        layout: {
            pack: "center"
        }
    },
    onCardSwitch: Coho.Callbacks.topTabSwitch
});

