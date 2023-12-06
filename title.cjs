const axios = require("axios");
const cheerio = require("cheerio");

// Function to get the title from an external URL
async function getTitleFromURL(url) {
  try {
    // Make an HTTP GET request to the external URL
    const response = await axios.get(url);

    // Parse the HTML content using cheerio
    const $ = cheerio.load(response.data);

    // Extract the title from the HTML
    const title = $("title").text();

    return title;
  } catch (error) {
    // Handle errors, e.g., if the URL is invalid or the request fails
    console.error("Error:", error.message);
    return null;
  }
}

// Example usage:
const externalURL = "https://jalammar.github.io/visual-numpy/";
getTitleFromURL(externalURL)
  .then((title) => {
    if (title) {
      console.log(`Title of ${externalURL}: ${title}`);
    } else {
      console.log(`Unable to retrieve the title from ${externalURL}`);
    }
  })
  .catch((err) => {
    console.error("Error:", err);
  });
