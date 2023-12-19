import https from "https"
import fetch from 'node-fetch';
import { DOMParser } from 'xmldom';

async function get_data(url) {

    let response = await fetch(url)

    const text = await response.text()

    const doc = new DOMParser().parseFromString(text, "text/html");
    const title = doc.querySelectorAll('title')[0];
    return title.innerText;



}

const url = 'https://phet-dev.colorado.edu/html/build-an-atom/0.0.0-3/simple-text-only-test-page.html'

console.log(await get_data(url))