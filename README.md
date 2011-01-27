## Running locally

You should be able to run this by cloning the repository and running the files
through a local webserver (this part is important!). You'll also need to view
the files in a Webkit browser. That's it. 

Important change to the build procedure: running "make" now overwrites index.html and cache.manifest. If you need to edit them, the real files are stored in the targets/ directory tree.

"make" will build the development integration version (with debugging, console logging, etc.) "make prod" will build the production version (minified, cached, etc.)

## Application outline

### Home Screen
* Show a list of the latest stories: thumb, title, and summary
* Clicking the story will open the story detail page/card
* Tabs: Latest, Popular, Saved, Topics, More...

### Latest
* Same as home, default screen

### Popular
* Pending on Alan, but basically the same as above

### Topics
* List of site sections by title
* Clicking on a section takes you to a list of stories in that section (same
  as "Latest")
* Clicking on a story takes you to the story detail page

## Models
* Article
* Section
* Author
* ... 

## JSON structure (in progress)

{
     "_index":"tyee",
     "_type":"story",
     "_id":"2EC01A6A-F281-11DF-B89E-9F86512870FB",
   "_source":{
      "textWithHtml":"<h2>Header on page one</h2><p>Paragraph one on page one</p><ol><li><p>One-one</p><p>List paragraph</p><ul><li><p>Two-one</p></li><li><p>Two-two</p></li></ul></li><li><p>One-two</p></li></ol><img src=\"http://thetyee.ca/2004/11/12/grahamsmith.jpg\" width=\"230\" alt=\"Page Image Caption\" /><h2>Page two header</h2><p>Page two paragraph</p>",
      "book_profile":[
         {
            "buy_link":"http://amazon.com",
            "date":"2010-01-01 00:00:00",
            "title":"Book Title",
            "author":"Book Author",
            "isbn":"isbn number",
            "publisher":"Book Publisher",
            "num_pages":"Num pages"
         },
         {
            "date":"2010-01-01 00:00:00",
            "title":"Book profile Two title",
            "author":"Book profile Two author",
            "publisher":"Book profile Two publisher"
         }
      ],
      "section":"Testing",
      "series":"Currently not set",
      "keywords":[
         "Reclaimed Water",
         "Water"
      ],
      "storyDate":"2010-11-17T11:30:00Z",
      "story_type":"story",
      "primary_video":[
         {
            "caption":"Primary video caption",
            "uri":"http://www.youtube.com/v/5DxeCK5Ne_Q?fs=1&amp;hl=en_US"
         }
      ],
      "slug":"phillips-test",
      "related_podcast_audio":[
         {
            "boxTitle":"Listen to this:",
            "summary":"Alternate summary for story only",
            "title":"Alternate podcast link title",
            "uri":"http://thetyee.ca/Opinion/2010/03/25/Green-Patrick-Moore.mp3"
         }
      ],
      "organization":"",
      "related_media":[
         {
            "width":"600",
            "caption":"Caption",
            "name":"Solar farmer Dave Ferguson",
            "thumbnails":[
               {
                  "width":"90",
                  "name":"Thumb for Solar farmer Dave Ferguson",
                  "height":"69",
                  "uri":"http://thetyee.ca/News/2010/12/01/dave-ferguson_thumb.jpg"
               },
               {
                  "width":"300",
                  "name":"Large Thumb for Solar farmer Dave Ferguson",
                  "height":"115",
                  "uri":"http://thetyee.ca/News/2010/12/01/dave-ferguson_large_thumb.jpg"
               },
               {
                  "width":"195",
                  "name":"Wide Thumb for Solar farmer Dave Ferguson",
                  "height":"73",
                  "uri":"http://thetyee.ca/News/2010/12/01/dave-ferguson_wide_thumb.jpg"
               }
            ],
            "height":"400",
            "uri":"http://thetyee.ca/News/2010/12/01/dave-ferguson.jpg"
         },
         {
            "width":"300",
            "caption":"",
            "name":"Holland Marsh farmer Doug Van Luyk",
            "thumbnails":[
               {
                  "width":"90",
                  "name":"Thumb for Holland Marsh farmer Doug Van Luyk",
                  "height":"69",
                  "uri":"http://thetyee.ca/News/2010/12/02/doug-van-luyk_thumb.jpg"
               },
               {
                  "width":"300",
                  "name":"Large Thumb for Holland Marsh farmer Doug Van Luyk",
                  "height":"115",
                  "uri":"http://thetyee.ca/News/2010/12/02/doug-van-luyk_large_thumb.jpg"
               },
               {
                  "width":"195",
                  "name":"Wide Thumb for Holland Marsh farmer Doug Van Luyk",
                  "height":"73",
                  "uri":"http://thetyee.ca/News/2010/12/02/doug-van-luyk_wide_thumb.jpg"
               }
            ],
            "height":"400",
            "uri":"http://thetyee.ca/News/2010/12/02/doug-van-luyk.jpg"
         }
      ],
      "teaser":"Deck",
      "author_info":[
         "<p>Author info</p><p>Author info 2</p>"
      ],
      "byline":"Joy  Kim, Colleen Kimmett and Sarah Kim",
      "uri":"http://thetyee.ca/Testing/2010/11/17/phillips-test/",
      "topics":[
         "Testing"
      ],
      "related_stories":[
         {
            "title":"'Old Farmer's Almanac' still spots cold in Web age",
            "abstract":null,
            "uuid":"DB47E768-9E09-11DE-96FA-9F645EE1939C",
            "uri":"http://thetyee.ca/CanadianPress/2009/09/10/US-Old/"
         },
         {
            "title":"'Zero Mile Diet' Blooms in BC",
            "abstract":"'Dramatic' rise in food gardens, say seed vendors.",
            "uuid":"FBAF2864-1A4C-11DD-8BE1-D98AF8FFA4FD",
            "uri":"http://thetyee.ca/News/2008/05/05/ZeroMileDiet/"
         },
         {
            "title":"BC farmers consider manure for power",
            "abstract":null,
            "uuid":"D7FD634A-BA60-11DD-BA67-DFECB815E510",
            "uri":"http://thetyee.ca/Blogs/TheHook/Environment/2008/11/24/Manure/"
         }
      ],
      "title":"Phillip's mobile test story"
   }


