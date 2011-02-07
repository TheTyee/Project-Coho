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
        {name:"byline", mapping: "_source.byline"},
        {name:"book_profile", mapping: "_source.book_profile"},
        {name:"podcast", mapping: "_source.related_podcast_audio"},
        {name:"video", mapping: "_source.primary_video"},
        {name:"organization", mapping: "_source.organization"},
        // see Coho.Templates.storyTopImageSingle and storyTopImageSlideshow; either an image or slideshow link
        {name:"top_image_html"},
        // for dummy list items
        {name:"html_override"},
        // these two are fictional and are created on the fly
        {name:"publish_date_short", convert: function(v,r) {if (!r.get('publish_date')) return ""; return Date.parseDate(r.get('publish_date'),'c').format(Coho.config.shortDateFormat); } },
        {name:"publish_date_long", convert: function(v,r) {if (!r.get('publish_date')) return ""; return Date.parseDate(r.get('publish_date'),'c').format(Coho.config.longDateFormat); } },
    ]
});

// list of topics
Ext.regModel("topic", { fields: ["key", "topic"] });

