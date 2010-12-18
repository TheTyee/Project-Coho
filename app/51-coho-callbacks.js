// the Coho.Callbacks object
// namespace for common callbacks

// in case we're testing this file on its own for some reason
if (!Coho) Coho = {};

Coho.Callbacks = {

/**
 * For when a the middle-level container tab (containing latest, popular,
 * saved, etc.) slides left or right.
 *
 * We really only care about the user going "back" in which case we destroy
 * the old panel.
 */
storyPanelStack: function(newCard, oldCard, newIndex, animated)
{
    if (Coho.dyingPanel && Coho.dyingPanel == oldCard) {
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
    this.as = new Ext.ActionSheet({
        items: [
            { text: "Save story", scope: this, handler: function() { Coho.Story.addSaved(Coho.currentTab.stack[0]); this.as.hide(); } },
            { text: Coho.currentTab.stack[0] },
            { text: "Cancel", scope: this, handler: function() { this.as.hide(); } }
        ]
    });

    this.as.show();
},

};

