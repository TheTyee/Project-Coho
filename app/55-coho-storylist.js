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

    this.list = new Ext.List({
        fullscreen: true,
        itemTpl: storyListTpl,
        itemSelector: "div.article",
        store: this.store,
        onItemDisclosure: config.onItemDisclosure,
        listeners: {
            "itemtap": function(list, index, item, e) {
                var uuid = list.getStore().getAt(index).get("uuid");

                // let Coho know where we are
                Coho.currentTab = me;
                me.stack.unshift(uuid);

                // push the selected story onto the stack
                Coho.pushPanelStackItemtap(list, index, item, e);

                if (config.saveToSessionOnRender)
                    Coho.Story.saveStoryToSession(list.getStore().getAt(index).data);

                // set up the toolbar buttons
                me.showBackButton();
                me.showContextButton();
            }
        }
    });

    // set up our toolbar buttons
    if (!config.titleBar.items) config.titleBar.items = [];
    config.titleBar.items.push(
        { text: "Back", id: config.titleBar.id+"BackButton", ui: "back", handler: Coho.popPanelStack, hidden: true },
        { xtype: "spacer"},
        { iconCls: "action", iconMask: true, id: config.titleBar.id+"ContextButton", handler: Coho.Callbacks.storyContextPressed, hidden: true }
    );

    this.panel = new Ext.Panel({
        layout: "card",
        dockedItems: [config.titleBar],
        iconCls: config.panelIcon,
        title: config.panelTitle,
        items: [this.list],
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

    // to find the story currently on display
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

}


