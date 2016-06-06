module.exports = {
  KEY: 'YOUR_ALCHEMY_API_KEY',
  getNewsURL: (topic) => {
    //can change number of articles returned by changing count=10 

    //below EP will return url and snippet text of articles

    return `https://gateway-a.watsonplatform.net/calls/data/GetNews?outputMode=json&start=now-1d&end=now&count=10&apikey=${this.KEY}&return=enriched.url.url,enriched.url.text&q.enriched.url.concepts.concept.text=${topic}`
  }

  getTextURL: (link) => {
    //this EP is not currently being hit
    
    /* --- FOR FULL URL TEXT USE BELOW ----

    return `http://gateway-a.watsonplatform.net/calls/url/URLGetText?apikey=${this.KEY}&outputMode=json&url=${link}`;
    */
  }
};

