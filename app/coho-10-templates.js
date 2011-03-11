// templates

Coho.Templates = {

storyList: new Ext.Template(
  '<tpl for=".">',
  '<div id="{uuid}" class="article">',
  '<tpl if="html_override">{html_override}</tpl>',
  '<tpl if="!html_override">',
  ' <tpl for="related_media[0].thumbnails">',
  '     <tpl if="width == 90">',
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
    '<tpl if="story_type == story"><h2>{abstract}</h2></tpl>',
    '<div class="meta"><span class="byline">By {byline}</span>, ',
    '<span class="published">{publish_date_long}</span>, ', 
    '<span class="organization">{organization}</span></div>',
    '{top_image_html}',
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
    '<tpl for="fact_box">',
    '<dl class="fact_box">',
    '<dt>{title}</dt>',
    '<dd><div>{content}</div></dd>',
    '</dl>',
    '</tpl>',   '<div class="authorinfo">{authorinfo}</div>',
    '</div>',
    '<tpl for="related_documents">',
    '<dl class="x-list">',
    '<dt class="x-list-header">{heading}</dt>',
    '<tpl for="documents">',
    '<a href="{uri}" title="{description}"><dd class="x-list-item"><div class="x-list-item-body">{title}</div></dd></a>',
    '</tpl>',
    '</dl>  ',
    '</tpl>',
    {
        // member functions:
    }
),

relatedStory: new Ext.XTemplate(
    '<dl class="x-list">',
    '<dt class="x-list-header">Related stories:</dt>',
    '<tpl for="."><a href="#" id="rel_{uuid}" onclick="Coho.View.pushPanelStackByUUID(\'{uuid}\');return false;"><dd class="x-list-item"><div class="x-list-item-body">{title}</div></dd></a></tpl>',
    '</dl>'
),

topicList: new Ext.Template(
    '{topic}'
),

slideshowSlide: new Ext.Template(
    '<p><img src="{uri}"></p>',
    '<p>{caption:ellipsis("100",1)}</p>'
),

storyTopImageSingle: new Ext.Template(
    '<div class="storyTopSingle">',
    '<img src="{uri}" width="{width}" height="{height}" class="thumbnail">',
    '</div>'),

storyTopImageSlideshow: new Ext.Template(
    '<div class="storyTopSlideshow">',
    '<a href="#" onclick="Coho.currentTab.storyPanel.slideshowOverlay.show();return false;">',
    '<img src="{uri}" width="{width}" height="{height}" class="thumbnail">',
    '</a>',
    '<img class="button" src="http://thetyee.cachefly.net/ui/img/badge-photoessay.png" />',
    '</div>'),

// note: some of these are HTML text strings, NOT Ext.Template objects!
savedHelpHTML: 'Save tool is at the top-right corner of story screens. Swipe stories to delete from this list.',

searchHelpHTML: 'Type search words above. Tap "Return" to start search.',

morePanel: new Ext.Template(
    '<div class="storyDetail" id="more-page">',
    '<div class="storyContent">',
    '<h1>Application Help</h1>',
    '<p>This is version 1.0 of the Tyee mobile app.</p>',
    '<ul>',
    '   <li><p><a href="#save">Save app to phone home screen</a></p></li>',
    '   <li><p><a href="#about">About this app</a></p></li>',
    '   <li><p>Go to <a href="http://thetyee.ca">the full version of TheTyee.ca</a></p></li>',
    '   <li><p>Find out more <a href="http://thetyee.ca/About/Intro/">about The Tyee</a></p></li>',
    '   <li><p><a href="mailto:info@thetyee.ca?subject=Mobile%20App%20Feedback">Send feedback on this app</a></p></li>',
    '   <li><p><a href="http://subscribe.thetyee.ca/" target="_blank">Sign up for our FREE newsletter!</a></p></li>',
    '<h1 id="save">Add this app to your phone</h1>',
    '<ol>',
    '<li>Open a web browser and go to <strong><a href="http://app.thetyee.ca">http://app.thetyee.ca</a></strong>.',
    '<p><img width="150" height="255" src="img/step1.jpg"></p></li>',
    '<li>Tap arrow at the bottom of screen.',
    '<p><img width="150" height="255" src="img/step2.jpg"></p></li>',
    '<li>Tap <strong>Save to Home Screen</strong>.',
    '<p><img width="150" height="255" src="img/step3.jpg"></p></li>',
    '<li>Tap <strong>Add</strong>.',
    '<p><img width="150" height="255" src="img/step4.jpg"></p></li>',
    '<li>Enjoy!',
    '<p><img width="150" height="255" src="img/step5.jpg"></p>',
    '</li></ol>',
    '<h1 id="about">About The Tyee News App</h1>',
    '<p>The Tyee news app was produced by Phillip Smith and Greg Heo using ',
    '<a href="http://http://www.sencha.com/products/touch/">Sencha Touch</a>, a HTML5 mobile JavaScript framework</p>',
    '<p>The source code for this application is open source and can be found on ',
    '<a href="https://github.com/phillipadsmith/A-Slippery-Fish">Github</a></p>',
    '<p>It\'s available for most devices with a touch-screen interface. ',
    'If you\'re using a Blackberry, you must also be using OS 6.0 or later.</p>',
    '<p>Instructions on how to add this app to your phone are <a href="#save">provided above</a>.</p>',
    '<p>The content of this app updates each time you open it (and are connected to a network).',
    'To save a story for later reading, go to a story, tap the arrow in the top-right corner, and choose save.',
    'This adds the story to the Saved screen. To remove the story, simply swipe your finger across it.</p>',
    '<p>To search for any story on TheTyee.ca, go to the Search screen and type the search terms in the box',
    'at the top of the screen. This searches the entire Tyee archive (and requires an Internet connection).</p>',  
    '<p>To see The Tyee team, go <a href="http://www.youtube.com/watch?v=32UGD0fV45g" target="_blank">here</a>.</p>',
    '</div>',
    '</div>'
),

};
