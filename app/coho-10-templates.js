// templates

Coho.Templates = {

storyList: new Ext.Template(
  '<tpl for=".">',
  '<div id="{uuid}" class="article">',
  '<tpl if="html_override">{html_override}</tpl>',
  '<tpl if="!html_override">',
  ' <tpl for="related_media[0].thumbnails">',
  '     <tpl if="width <= 90">',
  '     <img src="{uri}" width="{width}" height="{height}" class="thumbnail">',
  '     </tpl>',
  ' </tpl>',
  '<h2>{title}</h2>',
  '<p>{abstract:ellipsis("140",1)} <span class="meta">',
  '<span class="byline">By {byline}</span>, ',
  '<span class="published">{publish_date_short}</span>, ',
  '<spn class="organization">{organization}</span>',
  '</span></p>',
  '<div id="delete-button-{uuid}" class="action delete-button x-button">Delete</div>',
  '</tpl>',
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
    '<div class="meta"><span class="byline">By {byline}</span>, ',
    '<span class="published">{publish_date_long}</span>, ', 
    '<span class="organization">{organization}</span></div>',
    ' <tpl for="related_media[0].thumbnails">',
    '   <tpl if="width == 300">',
    //'       <img src="http://i.tinysrc.mobi/300/{uri}" class="thumbnail" width="300" height="200" />', // Trying out tinysrc
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
    '<dl class="x-list">',
    '<dt class="x-list-header">Related stories:</dt>',
    '<tpl for="."><dd class="x-list-item"><div class="x-list-item-body"><a href="#" id="rel_{uuid}" onclick="Coho.View.pushPanelStackByUUID(\'{uuid}\');return false;">{title}</a></div></dd></tpl>',
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

// note: savedHelpHTML and searchHelpHTML are straight text,
// NOT Ext.Template objects!
savedHelpHTML: 'Tap the arrow at the top right of a story to save it to this page.<br />Swipe a story to delete it from this page.',

searchHelpHTML: 'Tap the search box and type to find any Tyee story.',

};

