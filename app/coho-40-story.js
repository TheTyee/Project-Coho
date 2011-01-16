// the Coho.Story object
// namespace for story-related functions (fetching, storing, etc.)

// in case we're testing this file on its own for some reason
if (!Coho) Coho = {};

Coho.Story = {

/**
 * Get a JSON story record via callback.
 *
 * Since the story might need to be fetched asynchronously, this function
 * can't return the story record directly. Thus the callback.
 *
 * The callback will be called with a single parameter. This will 
 * be the JSON representation of the story or {} if something went wrong.
 *
 * This method will do the Right Thing in terms of using the local cache
 * first before going over the network.
 *
 */
getStory: function(uuid, callback)
{
    var c;

    // is it the currently displayed story?
    if (Coho.currentTab.stack[0] && Coho.currentTab.stack[0].type=="story" && Coho.currentTab.stack[0].uuid==uuid && Coho.currentTab.stack[0].storyData) {
        console.log("story "+uuid+" retrieved from story stack");
        c = Coho.currentTab.stack[0].storyData;

        if (callback) return callback(c);
        else          return c;
    }

    // session storage?
    c = Coho.Story.getStoryFromSession(uuid);
    if (c) {
        console.log("story "+uuid+" retrieved from session");

        if (callback) return callback(c);
        else          return c;
    }

    // local storage?
    c = Coho.Story.getStoryFromStorage(uuid);
    if (c) {
        console.log("story "+uuid+" retrieved from local storage");

        if (callback) return callback(c);
        else          return c;
    }

    if (!callback) {
        console.log("story "+uuid+" was not found locally and no callback was specified for remote transfer");
        return {};
    }

    console.log("story "+uuid+" retrieved from remote");
    var store = Coho.Story.getStoreFromRemote(uuid, {
        listeners: { "load": function(store, records, success) {
            if (success) {
                if (store && store.getAt(0) && store.getAt(0).data)
                    return callback(store.getAt(0).data);
                else
                    return callback({});
            } else {
                return callback({});
            }
        } }
    });
},


/**
 * Get the store (Ext.data.Store) for a story from the remote server.
 * If successful, the story data is stored in the session cache.
 *
 * Note this method is named get *store*, not get *story*. You will wear the
 * shameful hat for a week if you misuse it.
 *
 * You probably want the much nicer JSON getStory().
 */
getStoreFromRemote: function(uuid, config)
{
    if (!config) config = {};

    // intercept the client-defined onload handler (if it exists) because
    // we need to inject our own "save story to session" call.
    var bubble;
    if (config.listeners && config.listeners.load && typeof config.listeners.load == "function")
        bubble = config.listeners.load;
    if (!config.listeners)
        config.listeners = {};
    config.listeners.load = function(store, records, success) {
        if (store && store.getAt(0) && store.getAt(0).data)
            Coho.Story.saveStoryToSession(store.getAt(0).data);
        if (bubble) bubble(store, records, success);
    };

    config.model = "story";
    config.proxy = {
        type: "scripttag",
        extraParams: {filters: []},
        url: Coho.config.apiURL+"/story/"+uuid,
        reader: {
            type: "json",
            root: "hits.hits"
        }
    };
    config.autoLoad = true;

    return new Ext.data.Store(config);
},

/**
 * Get a story record from session storage.
 *
 * You're probably looking for the friendlier getStory().
 */
getStoryFromSession: function(uuid)
{
    var aString = sessionStorage.getItem(uuid);
    if (!aString) return false;

    return JSON.parse(aString);
},

/**
 * Get a story record from local storage.
 *
 * You probably want to use plain old getStory() instead.
 */
getStoryFromStorage: function(uuid)
{
    var aString = localStorage.getItem(uuid);
    if (!aString) return false;

    return JSON.parse(aString);
},

/**
 * Get a list of saved stories. This returns a set of UUIDs only.
 *
 */
getSaved: function()
{
    return JSON.parse(localStorage.getItem('savedStories'));
},

/**
 * Is a particular story saved?
 *
 * Doesn't need to process JSON so this should be relatively quick.
 */
isSaved: function(uuid)
{
    savedStories = localStorage.getItem('savedStories');
    if (!savedStories) return false;

    // taking advantage of JSON here
    if (savedStories.indexOf(uuid) >= 0)
        return true;
    else
        return false;
},


/**
 * Get a list of saved stories. This returns the full JSON representation
 * for each story.
 *
 */
getSavedFull: function()
{
    var savedStories = Coho.Story.getSaved();

    if (!savedStories) {
        return [];
    }

    var data = [];
    for (i = 0; i < savedStories.length; i++) {
        one = Coho.Story.getStoryFromStorage(savedStories[i]);
        if (one) data.push(one);
    }

    return data;
},

/**
 * Add a story to the list of saved stories.
 *
 */
addSaved: function(uuid)
{
    if (!uuid || Coho.Story.isSaved(uuid))
        return false;

    var savedStories = [];
    var aString = localStorage.getItem('savedStories');

    if (aString) {
        savedStories = JSON.parse(aString);
    }

    // since the story is rendered and cached, this should grab it from
    // session/local storage
    storyData = Coho.Story.getStory(uuid);

    // try to add the story first in case we're out of room
    stat = Coho.Story.saveStoryToStorage(storyData);

    // TODO: check stat
    savedStories.push(uuid);

    console.log("adding story "+uuid+" to saved stories");

    stat = localStorage.setItem('savedStories', JSON.stringify(savedStories));
    // TODO: check stat
    Coho.tabs.savedStoriesTab.refresh();
},

/**
 * Remove a story from the list of saved stories.
 */
removeSaved: function(uuid)
{
    if (!uuid || !Coho.Story.isSaved(uuid))
        return false;

    savedStories = localStorage.getItem('savedStories');
    if (!savedStories) return false;

    console.log("removing story "+uuid+" from saved stories");

    stat = Coho.Story.removeStoryFromStorage(uuid);

    // taking advantage of JSON here for speed
    var index = savedStories.indexOf(uuid);
    if (index > 2) {
        // uuid found and it is not the first one in the list
        savedStories = savedStories.replace(',"'+uuid+'"', "");
    } else if (index == 2 && savedStories.length < 45) {
        // uuid found and it is the only one in the list
        savedStories = "[]";
    } else if (index == 2) {
        // uuid found and it is the first of many in the list
        savedStories = savedStories.replace('"'+uuid+'",', "");
    }

    stat = localStorage.setItem('savedStories', savedStories);
    Coho.tabs.savedStoriesTab.refresh();
},


/**
 * Remove a story from session storage
 */
removeStoryFromSession: function(uuid)
{
    sessionStorage.removeItem(uuid);
},

/**
 * Remove a story from local storage
 */
removeStoryFromStorage: function(uuid)
{
    localStorage.removeItem(uuid);
},

/**
 * Save a story to session storage.
 */
saveStoryToSession: function(json)
{
    if (!json || !json.uuid)
        return false;

    console.log("saving story "+json.uuid+" to session storage");
    return sessionStorage.setItem(json.uuid, JSON.stringify(json));
},

/**
 * Save a story to local storage.
 */
saveStoryToStorage: function(json)
{
    if (!json || !json.uuid)
        return false;

    console.log("saving story "+json.uuid+" to local storage");
    return localStorage.setItem(json.uuid, JSON.stringify(json));
},


/**
 * Return an Ext.data.Store to power the latest stories list
 * the data could come from local storage or remote
 */
getStoryListStoreForLatest: function()
{
    var sstored = localStorage.getItem("list-latest");
    var stimestamp = localStorage.getItem("timestamp-latest");

    // offline override
    if (!window.navigator.onLine)
        stimestamp = +new Date();

    if (sstored && sstored!='undefined' && stimestamp > (+new Date() - (Coho.config.latestListCacheTime*60*1000))) {
        console.log("latest stories for cached from session ("+Math.round((+new Date() - +stimestamp)/1000/60)+" mins old of "+Math.round(Coho.config.latestListCacheTime)+" mins allowed)");
        return new Ext.data.Store({
            model: "story",
            getGroupString: function(r) {
                return r.get("group");
            },
            data: JSON.parse(sstored),
            autoLoad: true
        });
    } else {
        console.log("latest stories loading from remote");
        return new Ext.data.Store({
            model: "story",
            getGroupString: function(r) {
                return r.get("group");
            },
            proxy: {
                type: "scripttag",
                extraParams: {filters: []},
                url: Coho.config.apiURL+"/latest/grouped",
                reader: {
                    type: "json",
                    root: "hits.hits"
                }
            },
            autoLoad: true,
            listeners: { load: function(st, records, success) {
                if (!success || !st || !st.getCount()) return;

                var tostorage = [];
                st.each(function(rec) { tostorage.push(rec.data); });

                localStorage.setItem("list-latest", JSON.stringify(tostorage));
                localStorage.setItem("timestamp-latest", +new Date());
                console.log("latest story list finished loading and saved to local storage");
            } }
        });
    }

},


/**
 * Return an Ext.data.Store to power a story list for a topic.
 * the data could come from session storage or remote
 */
getStoryListStoreForTopic: function(topickey)
{
    var sstored = sessionStorage.getItem("list-"+topickey);
    var stimestamp = sessionStorage.getItem("timestamp-"+topickey);
    if (sstored && sstored!='undefined' && stimestamp > (+new Date() - (Coho.config.topicListCacheTime*60*1000))) {
        console.log("stories for topic "+topickey+" cached from session ("+Math.round((+new Date() - +stimestamp)/1000/60)+" mins old of "+Math.round(Coho.config.topicListCacheTime)+" mins allowed)");
        return new Ext.data.Store({
            model: "story",
            data: JSON.parse(sstored),
            autoLoad: true
        });
    } else {
        console.log("stories for topic "+topickey+" loading from remote");
        return new Ext.data.Store({
            model: "story",
            autoLoad: true,
            proxy: {
                type: "scripttag",
                extraParams: {filters: []},
                url: Coho.config.apiURL+"/topic/"+topickey,
                reader: {
                    type: "json",
                    root: "hits.hits"
                }
            },
            listeners: { load: function(st, records, success) {
                if (!success || !st || !st.getCount()) return;

                var tostorage = [];
                st.each(function(rec) { tostorage.push(rec.data); });

                sessionStorage.setItem("list-"+topickey, JSON.stringify(tostorage));
                sessionStorage.setItem("timestamp-"+topickey, +new Date());
                console.log("story list for topic "+topickey+" finished loading and saved to session");
            } }
        });
    }

},


/**
 * Definition for a generic panel for a single story.
 */
genericStoryPanel: {
    hidden: true,
    items: [{xtype:"panel",tpl:Coho.Templates.storyDetail,layout:"auto",id:"thestory"}],
    layout: {
        type: "vbox"
    },
    scroll: "vertical"
},


};

