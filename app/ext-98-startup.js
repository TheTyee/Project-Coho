// Real procedural code to boot the application lives here.

/**
 * Set up the top-level navigation
 */
var mainTabPanels = [
    Coho.tabs.latestStoriesTab.panel,
    Coho.tabs.topicsTab.panel,
    Coho.tabs.searchTab.panel,
    Coho.tabs.savedStoriesTab.panel,
    {
        xtype: "panel",
        dockedItems: [{xtype: "toolbar", dock: "top", title: "TheTyee.ca"}],
        tpl: Coho.Templates.morePanel,
        data: {},
        layout: "auto",
        iconCls: "more",
        title: "More",
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

