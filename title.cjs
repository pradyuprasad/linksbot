const https = require('https');
const cheerio = require('cheerio');

https.get('https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/resources/elimination-with-matrices/', (res) => {
  let html = '';

  // Receive data in chunks and append it to the html variable
  res.on('data', (chunk) => {
    html += chunk;
  });

  // Once all the data has been received
  res.on('end', () => {
    if (res.statusCode === 200) {
      try {
        // Load the received HTML into cheerio
        const $ = cheerio.load(html);
        // Extract the title text
        const title = $('title').text();
        console.log('Title of the page:', title);
      } catch (error) {
        console.error('Error parsing HTML:', error);
      }
    } else {
      console.log('Request failed with status code:', res.statusCode);
    }
  });

}).on('error', (e) => {
  console.error('Error with the request:', e.message);
});
