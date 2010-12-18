// templates

var storyListTpl = new Ext.Template(
  '<tpl for="."><div id="{uuid}" class="article">',
  ' <tpl for="related_media[0].thumbnails">',
  '     <tpl if="width == 90">',
  '     <img src="{uri}" class="thumnail" />',
  '     </tpl>',
  ' </tpl>',
  '<h2>{title}</h2>',
  '<p>{abstract:ellipsis("256",1)} <span class="published">{publish_date}</span></p>',
  '</div>',
  '</tpl>'
);

var storyDetailTpl = new Ext.Template(
    '<div id="{uuid}" class="storyDetail">',
    '<h1>{title}</h1>',
    '<h2>{abstract}</h2>',
    '<div class="storyContent">{content}</div>',
    '</div></tpl>'
);

var relatedStoryTpl = new Ext.Template(
    '{title}'
);

