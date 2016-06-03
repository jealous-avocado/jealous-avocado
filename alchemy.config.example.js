module.exports = {
  API_KEY: 'YOUR_ALCHEMY_API_KEY',
  getNewsURL: (topic) => {
    return `https://gateway-a.watsonplatform.net/calls/data/GetNews?outputMode=json&start=now-1d&end=now&count=50
    &apikey=${this[API_KEY]}&return=enriched.url.url&q.enriched.url.concepts.concept.text=${topic}`
  }

  getTextURL: (link) => {
    return `http://gateway-a.watsonplatform.net/calls/url/URLGetText
    ?apikey=${this[API_KEY]}
    &outputMode=json
    &url=${link}`
  }
};

