API call for INSERT_TOPIC_HERE (50 articles, url and title)

  https://gateway-a.watsonplatform.net/calls/data/GetNews
    ?outputMode=json&start=now-1d&end=now&count=50
    &q.enriched.url.concepts.concept.text=INSERT_TOPIC_HERE
    &return=enriched.url.url,enriched.url.title
    &apikey=YOUR_API_KEY

API call for raw text from a requested url

  http://gateway-a.watsonplatform.net/calls/url/URLGetText
    ?url=REQUESTED_URL_HERE
    &apikey=YOUR_API_KEY
    &outputMode=json

