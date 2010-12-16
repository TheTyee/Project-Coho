/* models */

// the canonical model for a single story
Ext.regModel('story', { fields: ['title','abstract','uuid','content','uri','publish_date','related_stories','related_media'] });

// a single story as it is wrapped in a search result
// fields are mapped so this model looks and feels like a regular "story"
Ext.regModel('searchResultStory', {
    fields: [
        {name:"index", mapping: "_index"},
        {name:"type", mapping: "_type"},
        {name:"score", mapping: "_score"},
        {name:"title", mapping: "_source.title"},
        {name:"abstract", mapping: "_source.abstract"},
        {name:"uuid", mapping: "_source.uuid"},
        {name:"content", mapping: "_source.content"},
        {name:"uri", mapping: "_source.uri"},
        {name:"related_stories", mapping: "_source.related_stories"},
        {name:"related_media", mapping: "_source.related_media"},
        {name:"publish_date", mapping: "_source.publish_date"}
    ]
});

