// templates

Coho.Templates = {

storyList: new Ext.Template(
  '<tpl for="."><div id="{uuid}" class="article">',
  ' <tpl for="related_media[0].thumbnails[0]">',
  '     <tpl if="width == 90">',
  '     <img src="{uri}" class="thumbnail">',
  '     </tpl>',
  ' </tpl>',
  '<h2>{title}</h2>',
  '<p>{abstract:ellipsis("140",1)} <span class="byline">By {byline}.</span> <span class="published">{publish_date}</span></p>',
  '<div id="delete-button-{uuid}" class="action delete-button x-button">Delete</div>',
  '</div>',
  '</tpl>'
),

storyDetail: new Ext.XTemplate(
    '<div id="{uuid}" class="storyDetail">',
    '<div id="debug">{debug}</div>',
    '<h1>{title}</h1>',
    '<h2>{abstract}</h2>',
    '<div class="meta"><span class="byline">By {byline}.</span> <span class="published">{storyDate}</span></div>',
    ' <tpl for="related_media[0]">',
    //'   <tpl if="width == 300">',
    //'       <img src="http://i.tinysrc.mobi/{uri}" class="thumbnail">', // Trying out tinysrc
    //'   </tpl>',
    ' </tpl>',
    '<div class="storyContent">{content}</div>',
    '</div>'
),

relatedStory: new Ext.XTemplate(
    '<p>Related stories:</p>',
    '<ul>',
    '<tpl for="."><li><a href="#" id="rel_{uuid}" onclick="Coho.View.pushPanelStackByUUID(\'{uuid}\');return false;">{title}</a></li></tpl>',
    '</ul>'
),

topicList: new Ext.Template(
    '{topic}'
),

slideshowSlide: new Ext.Template(
    '<p><img src="{uri}"></p>',
    '<p>{caption:ellipsis("140",1)}</p>'
),

};
