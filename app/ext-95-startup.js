// Real procedural code to boot the application lives here.

/**
 * Set up the top-level navigation
 */
var mainTabPanels = [
    Coho.tabs.latestStoriesTab.panel,
    Coho.tabs.recent.panel,
    Coho.tabs.topicsTab.panel,
    Coho.tabs.searchTab.panel,
    Coho.tabs.savedStoriesTab.panel,
    {
        xtype: "panel",
        dockedItems: [{xtype: "toolbar", dock: "top"}],
        tpl: Coho.Templates.morePanel,
        data: {},
        layout: "auto",
        iconCls: "more",
        title: "More",
        scroll: "vertical"
    }
];

// set the current tab to the first tab to start
Coho.currentTab = mainTabPanels[0].wrapperObject;

// initialize the main application panel
var mainPanel = new Ext.TabPanel({
    id: "mainPanel",
    fullscreen: "true",
    items: [mainTabPanels],
    tabBar: {
        id: "tabBar",
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

