import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

async function get_title(url) {

    let response = await fetch(url)

    const text = await response.text()

    const dom = new JSDOM(text);

    const title = dom.window.document.querySelector('title').textContent;
    
    return title;




}

const url = 'https://phet-dev.colorado.edu/html/build-an-atom/0.0.0-3/simple-text-only-test-page.html'

async function TitleGet(url) {
    const result = await get_title(url)
    return result
}

export default TitleGet