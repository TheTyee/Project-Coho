Random notes
============

The Makefile will concatenate all of these files into a single minified
.js file.

- coho-*.js - stuff in the Coho namespace. Templates and application code.
- ext-*.js - wrapped in Ext.Setup({}). Contains calls to Coho and sets
up the Ext application.


Top-level navigation
--------------------

The root view of the application is defined in ext-98-startup.js. It is an
Ext.TabPanel object with a bottom tab icon and card panel for each top-level
selection (latest, search, saved, etc.)

Each top-level panel has its own title bar and display, so only the bottom
tab bar is unique to the root view.

Top-level panels (except for "More") are instances of Coho.StoryListObject.
It is the most magical part of all of Project Coho.


Coho.StoryListObject
--------------------

StoryListObject at its core is a list of stories. It includes a default
handler for when a story is tapped to show the story details (which is what
most users and app developers will want anyway). However, this can be
overridden and other handlers for events such as item swipe can be added.

StoryListObject is a wrapper (more of a container than a subclass) for an
Ext.Panel (in "card" layout) to manage the view. It also contains an
Ext.List to manage the story list.

Usually, the story list is the first view. The "Topics" tab is special since
it starts with a list of topics. There is some special magic to customize
the StoryListObject's Ext.Panel initial state that you can see at work in the
source for the topics tab (ext-90-tab-topics.js).


The stack
---------

Each StoryListObject maintains a "stack" to keep track of things in the card
stack. As the user switches between stories, panels are added and removed from
the card layout on the fly. The stack allows the developer to keep track of
it all.

The stack contains objects like this:
    { type: "story", uuid: "ABCD...", back: "Back", storyData: { ... } }

storyData only needs to be present when type is "story". The uuid field is
sometimes used as a generic ID; on the topics tab for example, the story list
for the "Education" topic has type: "topic" and uuid: "Education".

The "back" field is the back button label. As in Cocoa, this is the label that
should be displayed on the *following* screen on the button that points back.

Items should be unshifted on and shifted off like a LIFO stack. So the current
panel is at stack[0] and the previous panel is at stack[1].


