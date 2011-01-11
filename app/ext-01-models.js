/* models */

// a single story from ES
Ext.regModel('story', {
    fields: [
        {name:"index", mapping: "_index"},
        {name:"type", mapping: "_type"},
        {name:"score", mapping: "_score"},
        {name:"title", mapping: "_source.title"},
        {name:"abstract", mapping: "_source.teaser"},
        {name:"uuid", mapping: "_id"},
        {name:"content", mapping: "_source.textWithHtml"},
        {name:"uri", mapping: "_source.uri"},
        {name:"topics", mapping: "_source.topics"},
        {name:"group", mapping: "_source.group"},
        {name:"related_stories", mapping: "_source.related_stories"},
        {name:"related_media", mapping: "_source.related_media"},
        {name:"publish_date", mapping: "_source.storyDate"},
        {name:"byline", mapping: "_source.byline"}
    ]
});

// list of topics
Ext.regModel("topic", { fields: ["key", "topic"] });

