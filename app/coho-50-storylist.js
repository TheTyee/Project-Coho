/**
 * A generic instantiable object representing a story list as the root
 * panel in a card stack. Story details and other things can be pushed/popped
 * for navigation
 */
Coho.StoryListObject = function(config)
{
    var me = this;

    // store and list for the main display
    this.store = config.store;

    // back button for story list root
    this.storyRootLabel = config.storyRootLabel;

    // support for custom listeners (e.g. swipe)
    if (!config.listeners) config.listeners = {};
    // one that likely won't be overridden is the basic tap to view story
    if (!config.listeners.itemtap) config.listeners.itemtap = function(list, index, item, e) {
        var uuid = list.getStore().getAt(index).get("uuid");

        // let Coho know where we are
        Coho.currentTab = me;

        // push the selected story onto the stack
        Coho.pushPanelStackItemtap(list, index, item, e);

        if (config.saveToSessionOnRender)
            Coho.Story.saveStoryToSession(list.getStore().getAt(index).data);

        // set up the toolbar buttons
        me.showContextButton();
    };

    this.list = new Ext.List({
        fullscreen: true,
        itemTpl: storyListTpl,
        itemSelector: "div.article",
        store: this.store,
        onItemDisclosure: config.onItemDisclosure,
        listeners: config.listeners
    });

    // set up our toolbar buttons
    if (!config.titleBar.items) config.titleBar.items = [];
    config.titleBar.items.push(
        { text: "Back", id: config.titleBar.id+"BackButton", ui: "back", handler: Coho.popPanelStack, hidden: true },
        { xtype: "spacer"},
        { iconCls: "action", iconMask: true, id: config.titleBar.id+"ContextButton", handler: Coho.Callbacks.storyContextPressed, hidden: true }
    );

    // custom items?
    var items = [this.list];
    if (config.pre) items.unshift(config.pre);
    if (config.post) items.push(config.post);

    this.panel = new Ext.Panel({
        layout: "card",
        dockedItems: [config.titleBar],
        iconCls: config.panelIcon,
        title: config.panelTitle,
        items: items,
        onCardSwitch: Coho.Callbacks.storyPanelStack
    });

    this.panel.wrapperObject = me;

    // we want the real titleBar component
    this.panel.dockedItems.each(function(thing) {
        if (thing.isToolbar) {
            me.titleBar = thing;
            return;
        }
    });

    // to be overridden, if needed
    this.refresh = function() { };

    // to find the things in the stack
    this.stack = [];

    // nice methods
    this.showBackButton = function() {
        me.titleBar.getComponent(me.titleBar.id+"BackButton").show();
    };
    this.hideBackButton = function() {
        me.titleBar.getComponent(me.titleBar.id+"BackButton").hide();
    };
    this.showContextButton = function() {
        me.titleBar.getComponent(me.titleBar.id+"ContextButton").show();
    };
    this.hideContextButton = function() {
        me.titleBar.getComponent(me.titleBar.id+"ContextButton").hide();
    };
    this.setBackButtonText = function(text) {
        me.titleBar.getComponent(me.titleBar.id+"BackButton").setText(text);
    };

}


