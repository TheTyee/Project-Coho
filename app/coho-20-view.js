// Code in this file keeps track of positioning, story stacks,
// and other screen rendering things

// in case we're testing this file on its own for some reason
if (!Coho) Coho = {};

Coho.View = {

/**
 * render a story to a story panel
 */
renderStory: function(storyPanel, storyData) {
    // slideshow?
    if (storyData.related_media && storyData.related_media.length > 0) {
        var carouselItems = [];
        var thumbnail;
        for (i=0; i < storyData.related_media.length; i++) {
            if (!storyData.related_media[i].thumbnails || storyData.related_media[i].thumbnails.length < 1)
                continue;

            for (j=0; j < storyData.related_media[i].thumbnails.length; j++) {
                if (!thumbnail && storyData.related_media[i].thumbnails[j] && storyData.related_media[i].thumbnails[j].width == "90") {
                    thumbnail = storyData.related_media[i].thumbnails[j].uri;
                }

                if (storyData.related_media[i].thumbnails[j] && storyData.related_media[i].thumbnails[j].width == "300") {
                    console.log("adding "+storyData.related_media[i].thumbnails[j].uri+" to slideshow");
                    carouselItems.push({tpl: Coho.Templates.slideshowSlide, data: {uri: storyData.related_media[i].thumbnails[j].uri, caption: storyData.related_media[i].caption, width: storyData.related_media[i].thumbnails[j].width, height: storyData.related_media[i].thumbnails[j].height}});
                }
            }
        }

        // if only one item, show the single image
        // otherwise, set up a slideshow
        if (carouselItems.length == 1) {
            storyData.top_image_html = Coho.Templates.storyTopImageSingle.apply(carouselItems[0].data);
        } else if (carouselItems.length > 1) {
            storyData.top_image_html = Coho.Templates.storyTopImageSlideshow.apply(carouselItems[0].data);

            storyPanel.slideshowOverlay = new Ext.Carousel({
                width: 308, height: 320, xtype: "carousel", ui: "dark", direction: "horizontal",
                items: carouselItems,
                floating: true,
                modal: true,
                centered: true
            });

            Coho.currentTab.storyPanel = storyPanel;
        }
    }

    // main story template
    storyPanel.getComponent(0).update(storyData);

    // related stories?
    if (storyData.related_stories && storyData.related_stories[0]) {
        var relatedStore = new Ext.data.JsonStore({
            model: "story",
            data: storyData.related_stories
        });

        storyPanel.add(new Ext.Panel({
            width: "100%",
            items: [{xtype:"panel", tpl:Coho.Templates.relatedStory, baseCls:"related-stories", data: storyData.related_stories }]
        }));
    }
},

/**
 * Call up a story by UUID and push it onto the stack
 */
pushPanelStackByUUID: function(uuid)
{
    var selectedStoryPanel = new Ext.Panel(Coho.Story.genericStoryPanel);

    Coho.currentTab.stack.unshift({type:"story", uuid:uuid, back:"Back"});

    selectedStoryPanel.uuid = uuid;

    Coho.Story.getStory(uuid, function(storyData) {
        Coho.View.renderStory(selectedStoryPanel, storyData);
        selectedStoryPanel.doLayout();
        if (storyData.uuid == Coho.currentTab.stack[0].uuid) {
            Coho.currentTab.stack[0].storyData = storyData;
        }
    });

    Coho.View.pushPanelStack(selectedStoryPanel);
},

/**
 * Call up a story based on the user's selection from a list and push it
 * onto the stack.
 */
pushPanelStackItemtap: function(list, index, item, e)
{
    var rec = list.getStore().getAt(index);
    if (!rec.data || !rec.data.uuid || rec.data.html_override) return false;

    var selectedStoryPanel = new Ext.Panel(Coho.Story.genericStoryPanel);
    Coho.View.renderStory(selectedStoryPanel, rec.data);

    selectedStoryPanel.uuid = rec.get("uuid");
    Coho.currentTab.stack.unshift({type:"story", uuid:rec.get("uuid"), back:"Back", storyData:rec.data});

    Coho.View.hideTabBar();

    Coho.View.pushPanelStack(selectedStoryPanel);
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
        Coho.View.showTabBar();
    } else {
        Coho.currentTab.setBackButtonText(Coho.currentTab.stack[1].back);

        // kill the context button if the current panel is a list with a store
        if (Coho.currentTab.panel.getActiveItem().getStore) {
            Coho.currentTab.hideContextButton();
            Coho.View.showTabBar();
        }
    }
},

showTabBar: function()
{
    var mainPanel = Ext.getCmp("mainPanel");
    if (mainPanel.getDockedItems().length) return;

    mainPanel.addDocked(Coho.tabBar, false);
},

hideTabBar: function()
{
    var mainPanel = Ext.getCmp("mainPanel");
    if (!mainPanel.getDockedItems().length) return;

    Coho.tabBar = Ext.getCmp("tabBar");
    mainPanel.removeDocked(Coho.tabBar, false);
},

}; // end Coho.View

