// The main project Coho super-object

var Coho = {
// Default configuration values
// If there are server-specific values (i.e. integration vs. production)
// please override these defaults in coho-configuration.js
config: {
    // base URL for the proxy. No trailing slash, please!
    apiURL: "http://api.thetyee.ca/v1",

    // short date, used on story lists
    shortDateFormat: "j M, Y",

    // long date, used on story display
    longDateFormat: "j M, Y",

    // time (in minutes) before cached topic story lists are expired
    topicListCacheTime: 60,

    // time (in minutes) before the cached latest story list is expired
    latestListCacheTime: 15,
},

// quasi-globals
currentTab: null,
dyingPanel: null,

tabs: {}

};

