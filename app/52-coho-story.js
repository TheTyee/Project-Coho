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
    var c = Coho.Story.getStoryFromSession(uuid);
    if (c) {
        console.log("story "+uuid+" retrieved from session");
        return callback(c);
    }

    c = Coho.Story.getStoryFromStorage(uuid);
    if (c) {
        console.log("story "+uuid+" retrieved from local storage");
        return callback(c);
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

    config.model = "searchResultStory";
    config.proxy = {
        type: "scripttag",
        extraParams: {filters: []},
        url: Coho.apiURL+"/story/"+uuid,
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
addSaved: function(story)
{
    if ((typeof story != 'object') || (typeof story == 'object' && !story.uuid)) {
        return false;
    }

    var savedStories = [];
    var aString = localStorage.getItem('savedStories');

    if (aString) {
        savedStories = JSON.parse(aString);
    }

    // try to add the story first in case we're out of room
    stat = Coho.Story.saveStoryToStorage(story);

    savedStories.push(story.uuid);
    return localStorage.setItem('savedStories', JSON.stringify(savedStories));
},

/**
 * Remove a story from the list of saved stories.
 */
removeSaved: function(story)
{
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


};

