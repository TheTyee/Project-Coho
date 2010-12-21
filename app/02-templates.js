// templates

var storyListTpl = new Ext.Template(
  '<tpl for="."><div id="{uuid}" class="article">',
  ' <tpl for="related_media[0].thumbnails[0]">',
  '     <tpl if="width == 90">',
  '     <img src="{uri}" class="thumnail" />',
  '     </tpl>',
  ' </tpl>',
  '<h2>{title}</h2>',
  '<p>{abstract:ellipsis("140",1)} <span class="byline">By {byline}.</span> <span class="published">{publish_date}</span></p>',
  '</div>',
  '</tpl>'
);

var storyDetailTpl = new Ext.XTemplate(
    '<div id="{uuid}" class="storyDetail">',
    '<h1>{title}</h1>',
    '<h2>{abstract}</h2>',
    '<div class="meta"><span class="byline">By {byline}.</span> <span class="published">{storyDate}</span></div>',
    ' <tpl for="related_media[0]">',
    //'   <tpl if="width == 300">',
    '       <img src="http://i.tinysrc.mobi/{uri}" class="thumnail" />', // Trying out tinysrc
    //'   </tpl>',
    ' </tpl>',
    '<div class="storyContent">{content}</div>',
    '</div>'
);

var relatedStoryTpl = new Ext.Template(
    '{title}'
);

var topicListTpl = new Ext.Template(
    '{topic}'
);

