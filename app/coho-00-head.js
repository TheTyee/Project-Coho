// The main project Coho super-object

var Coho = {
// Default configuration values
// If there are server-specific values (i.e. integration vs. production)
// please override these defaults in coho-configuration.js
config: {
    apiURL: "http://preview.app.thetyee.ca/proxy/v1",
    shortDateFormat: "j M, Y",
    longDateFormat: "l F j, Y",
},

// quasi-globals
currentTab: null,
dyingPanel: null,

tabs: {}

};

