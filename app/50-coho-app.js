// The main project Coho super-object
// Code in this file keeps track of positioning, story stacks,
// performs some rendering, etc.

var Coho = {

// configuration
apiURL: "http://preview.app.thetyee.ca/proxy/v1",

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
    var selectedStoryPanel = new Ext.Panel(genericStoryPanel);

    Coho.currentTab.stack.unshift({type:"story", uuid:uuid, back:"Back"});

    selectedStoryPanel.uuid = uuid;

    Coho.Story.getStory(uuid, function(storyData) {
        Coho.renderStory(selectedStoryPanel, storyData);
        selectedStoryPanel.doLayout();
    });

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

    selectedStoryPanel.uuid = rec.get("uuid");
    Coho.currentTab.stack.unshift({type:"story", uuid:rec.get("uuid"), back:"Back"});

    Coho.pushPanelStack(selectedStoryPanel);
},

/**
 * Push a panel onto the stack and set up the back button.
 *
 * You must push the *new* panel's back button label onto the stack
 * before calling this method!
 *
 */
pushPanelStack: function(panel)
{
    Coho.currentTab.panel.setActiveItem(panel, {
        type: "slide",
        direction: "left"
    });

    Coho.currentTab.setBackButtonText(Coho.currentTab.stack[1].back);
    Coho.currentTab.showBackButton();
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
    // remove from our tab's information stack
    Coho.currentTab.stack.shift();

    // schedule the old panel to be destroyed after the animation
    // ...unless it has a store, meaning it's a list. Most probably a list
    // of stories for a topic.
    if (!Coho.currentTab.panel.getActiveItem().getStore)
        Coho.dyingPanel = Coho.currentTab.panel.getActiveItem();

    // animate going back
    Coho.currentTab.panel.getLayout().prev({type:"slide",direction:"right"}, false);

    // if we're back at the start, kill the toolbar buttons
    if (Coho.currentTab.panel.getActiveItem() == Coho.currentTab.panel.getComponent(0) && Coho.currentTab.titleBar) {
        Coho.currentTab.hideBackButton();
        Coho.currentTab.hideContextButton();
    } else {
        Coho.currentTab.setBackButtonText(Coho.currentTab.stack[1].back);

        // kill the context button if the current panel is a list with a store
        if (Coho.currentTab.panel.getActiveItem().getStore)
            Coho.currentTab.hideContextButton();
    }
},

// defined elsewhere...
Story: {},

CommonCallbacks: {},

}; // end Coho

