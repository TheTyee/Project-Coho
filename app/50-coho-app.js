// The main project Coho super-object
// Keeps track of positioning, story stacks, some rendering, etc.

var Coho = {

// quasi-globals
currentTab: null,
dyingPanel: null,

/**
 * render a story to a story panel
 */
renderStory: function(storyPanel, storyData) {
    // template magic
    storyPanel.getComponent(0).update(storyData);

    // related stories?
    if (storyData.related_stories && storyData.related_stories[0]) {
        storyPanel.add(new Ext.Panel({
            items: [ {
                xtype: "fieldset",
                items: [ {
                    xtype: "button",
                    text: "Related stories",
                    handler: function() {
                        var relatedStore = new Ext.data.JsonStore({
                            model: "story",
                            data: storyData.related_stories
                        });
                        if (!storyPanel.relatedStoriesList) {
                            storyPanel.relatedStoriesList = new Ext.List({
                                itemTpl: relatedStoryTpl,
                                store: relatedStore,
                                listeners: {
                                    "itemtap": function(list, index, item, e) {
                                        storyPanel.relatedStoriesOverlay.hide();
                                        var uuid = list.getStore().getAt(index).get("uuid");
                                        if (uuid) {
                                            Coho.pushPanelStackByUUID(uuid);
                                        }
                                    }
                                }
                            });
                        } else {
                            storyPanel.relatedStoriesList.deselect(storyPanel.relatedStoriesList.getSelectedRecords());
                        }

                        storyPanel.relatedStoriesOverlay = new Ext.Panel({
                            floating: true,
                            modal: true,
                            centered: true,
                            items: [ storyPanel.relatedStoriesList ]
                        });

                        storyPanel.relatedStoriesOverlay.show();
                    }
                } ]
            } ]
        }));
    }
},

/**
 * Call up a story by UUID and push it onto the stack
 */
pushPanelStackByUUID: function(uuid)
{
    var selectedStoryStore = new Ext.data.Store({
        model: "searchResultStory",
        proxy: {
            type: "scripttag",
            url: "http://preview.app.thetyee.ca/proxy/v1/story/"+uuid,
            reader: {
                type: "json",
                root: "hits.hits"
            }
        },
        autoLoad: true,
        listeners: { "load": function(store, records, success) {
            if (success) {
                Coho.renderStory(selectedStoryPanel, store.getAt(0).data);
                selectedStoryPanel.doLayout();
            }
        } }
    });
    var selectedStoryPanel = new Ext.Panel(genericStoryPanel);
    Coho.pushPanelStack(selectedStoryPanel);
},

/**
 * Call up a story based on the user's selection from a list and push it
 * onto the stack.
 */
pushPanelStackItemtap: function(list, index, item, e)
{
    var selectedStoryPanel = new Ext.Panel(genericStoryPanel);

    var rec = list.getStore().getAt(index);
    Coho.renderStory(selectedStoryPanel, rec.data);

    Coho.pushPanelStack(selectedStoryPanel);
},

/**
 * Push a panel onto the stack
 */
pushPanelStack: function(panel)
{
    Coho.currentTab.panel.setActiveItem(panel, {
        type: "slide",
        direction: "left"
    });
},

/**
 * Pop a panel off the stack.
 *
 * Two other magical things:
 *  - The panel will be destroyed after the animation.
 *  - The back button in the title bar will be removed if we've popped
 *    all the way back to the root panel.
 */
popPanelStack: function()
{
    // schedule the old panel to be destroyed after the animation
    Coho.dyingPanel = Coho.currentTab.panel.getActiveItem();

    // animate going back
    Coho.currentTab.panel.getLayout().prev({type:"slide",direction:"right"}, false);

    // if we're back at the start, kill the back button
    if (Coho.currentTab.panel.getActiveItem() == Coho.currentTab.panel.getComponent(0) && Coho.currentTab.titleBar) {
        Coho.currentTab.titleBar.remove(Coho.currentTab.titleBar.getId()+"BackButton");
        Coho.currentTab.titleBar.doLayout();
    }
},

/**
 * Add a back button to the current title bar.
 */
addBackButton: function() {
    if (!Coho.currentTab || !Coho.currentTab.titleBar) return;

    Coho.currentTab.titleBar.add({
        text: "Back",
        id: Coho.currentTab.titleBar.getId()+"BackButton",
        handler: Coho.popPanelStack
    });
    Coho.currentTab.titleBar.doLayout();
},



///////////////////////// callbacks

/**
 * Called when a the middle-level container tab (containing latest, popular,
 * saved, etc.) slides left or right.
 *
 * We really only care about the user going "back" in which case we destroy
 * the old panel.
 */
onStoryPanelStack: function(newCard, oldCard, newIndex, animated)
{
    if (Coho.dyingPanel && Coho.dyingPanel == oldCard) {
        Coho.currentTab.panel.remove(oldCard);
        Coho.dyingPanel = null;
    }
},

/**
 * Called when the user switches the top-level tab
 * (Latest, popular, saved, etc.)
 */
onTopTabSwitch: function(newCard, oldCard, newIndex, animated)
{
    if (newCard.wrapperObject) {
        Coho.currentTab = newCard.wrapperObject;
    }
}


}; // end Coho

