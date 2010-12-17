// templates

var storyListTpl = new Ext.Template(
  '<tpl for="."><div id="{uuid}" class="article">',
  '<tpl for="thumbnail">',
  '<tpl for="metadata"><img src="{uri}"></tpl>',
  '</tpl>',
  '<h2>{title}</h2>',
  '<p>{abstract} <span class="published">{publish_date}</span></p>',
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

