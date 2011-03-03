// the Coho.Callbacks object
// namespace for common callbacks

// in case we're testing this file on its own for some reason
if (!Coho) Coho = {};

Coho.Callbacks = {

/**
 * Right before a middle-level container tab is about to slide left or right.
 *
 * Only used for the search tab to hide/show things in the titlebar.
 */
storyListPanelWillChange: function(panel, newCard, oldCard, newIndex, animated)
{
    console.log("about to switch to tab "+newIndex);
    if (Coho.currentTab == Coho.tabs.searchTab) {
        if (newIndex == 0) {
            Coho.currentTab.titleBar.getComponent("searchfield").show();
            Coho.currentTab.titleBar.hideTitle();
        } else {
            Coho.currentTab.titleBar.getComponent("searchfield").hide();
            Coho.currentTab.titleBar.setTitle("TheTyee.ca");
            Coho.currentTab.titleBar.showTitle();
        }
    }
},


/**
 * For when a the middle-level container tab (containing latest, popular,
 * saved, etc.) slides left or right.
 *
 * We really only care about the user going "back" in which case we destroy
 * the old panel.
 *
 */
storyListPanelDidChange: function(panel, newCard, oldCard, newIndex, animated)
{
    console.log("switched to tab "+newIndex);
    if (Coho.dyingPanel && Coho.dyingPanel == oldCard) {
        console.log("previous panel "+oldCard.id+" was KILLED");
        Coho.currentTab.panel.remove(oldCard);
        Coho.dyingPanel = null;
    }
},


/**
 * For when the user switches the top-level tab
 * (Latest, popular, saved, etc.)
 */
topTabSwitch: function(newCard, oldCard, newIndex, animated)
{
    if (newCard.wrapperObject) {
        Coho.currentTab = newCard.wrapperObject;
    }
},


/**
 * For when the story context toolbar button is pressed.
 *
 */
storyContextPressed: function(b, e)
{
    if (!Coho.currentTab.stack[0] || !Coho.currentTab.stack[0].uuid || Coho.currentTab.stack[0].type != "story")
        return;

    var uuid = Coho.currentTab.stack[0].uuid;

    var items = [
      { text: "<a style='color: black; display: block; text-decoration: none;' href='mailto:?&subject="+escape(Coho.currentTab.stack[0].storyData.title)+"&body="+escape(Coho.currentTab.stack[0].storyData.uri)+"' onclick='')'>E-mail this story</a>" },
      { text: "<a style='color: black; display: block; text-decoration: none;' href='http://m.facebook.com/sharer.php?u="+escape(Coho.currentTab.stack[0].storyData.uri)+"&t="+escape(Coho.currentTab.stack[0].storyData.title)+"' onclick=''>Share on Facebook</a>" },
      { text: "<a style='color: black; display: block; text-decoration: none;' href='http://mobile.twitter.com/home?status="+escape(Coho.currentTab.stack[0].storyData.title+": "+Coho.currentTab.stack[0].storyData.uri)+" via @TheTyee' onclick=''>Share on Twitter</a>" },
      { text: "Cancel", scope: this, handler: function() { this.as.hide(); } }
    ];

    if (Coho.Story.isSaved(uuid))
        items.unshift({ text: "Remove from saved stories", scope: this, handler: function() { Coho.Story.removeSaved(uuid); this.as.hide(); } });
    else
        items.unshift({ text: "Save story", scope: this, handler: function() { Coho.Story.addSaved(uuid); this.as.hide(); } });

    this.as = new Ext.ActionSheet({"items":items});
    this.as.show();
},

};

