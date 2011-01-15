// templates

Coho.Templates = {

storyList: new Ext.Template(
  '<tpl for="."><div id="{uuid}" class="article">',
  ' <tpl for="related_media[0].thumbnails[0]">',
  '     <tpl if="width == 90">',
  '     <img src="{uri}" width="{width}" height="{height}" class="thumbnail">',
  '     </tpl>',
  ' </tpl>',
  '<h2>{title}</h2>',
  '<p>{abstract:ellipsis("140",1)} <span class="meta"><span class="byline">By {byline}</span>, <span class="published">{publish_date:date("'+Coho.config.shortDateFormat+'")}</span></span></p>',
  '<div id="delete-button-{uuid}" class="action delete-button x-button">Delete</div>',
  '</div>',
  '</tpl>',
  {
      // member functions
  }
),

storyDetail: new Ext.XTemplate(
    '<div id="{uuid}" class="storyDetail">',
    '<div id="debug">{debug}</div>',
    '<h1>{title}</h1>',
    '<h2>{abstract}</h2>',
    '<div class="meta"><span class="byline">By {byline}</span>, <span class="published">{publish_date:date("'+Coho.config.shortDateFormat+'")}</span></div>',
    ' <tpl for="related_media[0]">',
    '   <tpl if="width == 300">',
    //'       <img src="http://i.tinysrc.mobi/{uri}" class="thumbnail">', // Trying out tinysrc
    '     <img src="{uri}" width="{width}" height="{height}" class="thumbnail" />',
    '   </tpl>',
    ' </tpl>',
    ' <tpl if="video">',
    '   <tpl for="video">',
    '     <dl class="video"><dt>{caption}</dt>',
    '       <dd class="video"><a href="{uri}">Watch video</a></dd>',
    '     </dl>',
    '   </tpl>',
    ' </tpl>',   
    ' <tpl if="book_profile">',
    '   <dl class="book_pofile">',
    '     <tpl for="book_profile">',
    '       <dt>{title}</dt>',
    '         <dd class="author">By {author}</dd>',
    '         <dd class="publisher">{publisher} ({date})</dd>',
    '         <dd>{num_pages}</dd>',
    '         <dd>ISBN: {isbn}</dd>',
    '         <dd><a href="{buy_link}">Buy this book</a></dd>',
    '     </tpl>',
    '   </dl>',
    ' </tpl>',
    ' <tpl if="podcast">',
    '   <tpl for="podcast">',
    '     <dl class="podcast"><dt>{title}</dt>',
    '       <dd class="summary">{summary}</dd>',
    '       <dd class="audio"><audio hidden="false" src="{uri}" preload="auto" controls="controls" loop="loop"></audio></dd>',
    '     </dl>',
    '   </tpl>',
    ' </tpl>',
    '<div class="storyContent">{content}</div>',
    ' <tpl if="factbox">',
    '   <tpl for="factbox">',
    '    <p>I have a fact box!</p>',
    '   </tpl>',
    ' </tpl>',
    '</div>',
    {
        // member functions:
    }
),

relatedStory: new Ext.XTemplate(
    '<dl>',
    '<dt>Related stories:</dt>',
    '<tpl for="."><dd><a href="#" id="rel_{uuid}" onclick="Coho.View.pushPanelStackByUUID(\'{uuid}\');return false;">{title}</a></dd></tpl>',
    '</dl>'
),

topicList: new Ext.Template(
    '{topic}'
),

slideshowSlide: new Ext.Template(
    '<p><img src="{uri}"></p>',
    '<p>{caption:ellipsis("140",1)}</p>'
),

morePanel: new Ext.Template(
    '<p>This is the MORE panel!</p>'
),

};

