/*import fetch from 'node-fetch';
//import checkUrl from './UrlChecker.js'
import { JSDOM } from 'jsdom';

async function get_title(url) { 

    let response = await fetch(url)

    const text = await response.text()

    const dom = new JSDOM(text);

    const title = dom.window.document.querySelector('title').textContent;
    
    return title;
}



async function TitleGet(url) {
    //const valid 
    const result = await get_title(url)
    return result
}

const url = 'www.google.com'

console.log(await TitleGet(url))

export default TitleGet*/