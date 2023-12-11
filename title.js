import https from 'https'
import cheerio from 'cheerio'


function getTitle(url, callback) {
  https.get(url, (res) => {
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
          callback(null, title);
        } catch (error) {
          callback(error);
        }
      } else {
        callback(new Error('Request failed with status code: ' + res.statusCode));
      }
    });

  }).on('error', (e) => {
    callback(e);
  });
}

export default getTitle