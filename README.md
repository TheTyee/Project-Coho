## Running locally

You should be able to run this by cloning the repository and running the files
through a local webserver (this part is important!). You'll also need to view
the files in a Webkit browser. That's it. 

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
      "uuid": "05DC4008-ED25-11DF-A407-F809B6501B05",
      "url": "http:\/\/thetyee.ca\/News\/2010\/11\/11\/PackedWithOpportunities\/",
      "section": "News",
      "series": "Growing the Local Bounty: Reports from Farmlands in Flux, Ontario and BC",
      "byline": "By Colleen Kimmett",
      "title": "Packed With Opportunities",
      "abstract": "How small farmers are turning their crops into tasty products without relying on the big global processors.",
      "published_date": "2010-10-11",
      "source": "TheTyee.ca",
      "media": [
        {
          "type": "image",
          "subtype": "Thumbnail",
          "caption": "",
          "copyright": "",
          "media-metadata": [
            {
              "url": "http:\/\/thetyee.ca\/News\/2010\/11\/10\/jenn-pfenning_thumb.jpg",
              "format": "Thumbnail",
              "height": 69,
              "width": 90
            }
          ]
        }
      ]
     } 

