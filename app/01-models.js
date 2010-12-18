/* models */

// the canonical model for a single story
Ext.regModel('story', { fields: ['title','teaser','uuid','textWithHtml','uri','storyDate','related_stories','related_media'] });

// a single story as it is wrapped in a search result
// fields are mapped so this model looks and feels like a regular "story"
Ext.regModel('searchResultStory', {
    fields: [
        {name:"index", mapping: "_index"},
        {name:"type", mapping: "_type"},
        {name:"score", mapping: "_score"},
        {name:"title", mapping: "_source.title"},
        {name:"abstract", mapping: "_source.teaser"},
        {name:"uuid", mapping: "_id"},
        {name:"content", mapping: "_source.textWithHtml"},
        {name:"uri", mapping: "_source.uri"},
        {name:"related_stories", mapping: "_source.related_stories"},
        {name:"related_media", mapping: "_source.related_media"},
        {name:"publish_date", mapping: "_source.storyDate"}
    ]
});

