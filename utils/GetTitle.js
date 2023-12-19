import fetch from 'node-fetch';
//import checkUrl from './UrlChecker.js'
import { JSDOM } from 'jsdom';

async function get_title(url) { 

    try {

    let response = await fetch(url)

    const text = await response.text()

    const dom = new JSDOM(text);

    const title = dom.window.document.querySelector('title').textContent;
    
    return title;}

    catch(e) {

       //console.log(e)

    }

    try {

        let modifiedURL = "https://"+url

        let response = await fetch(modifiedURL)

        const text = await response.text()

        const dom = new JSDOM(text);

        const title = dom.window.document.querySelector('title').textContent;
        
        return title;

    }

    catch(e) {

        //console.log(e)

    }

    try{

        let modifiedURL = "http://"+url

        let response = await fetch(modifiedURL)

        const text = await response.text()

        const dom = new JSDOM(text);

        const title = dom.window.document.querySelector('title').textContent;
        
        return title;

    }

    catch(e){
        //console.log(e)
    }
}



async function TitleGet(url) {
    
    const result = await get_title(url)
    return result
}

const url = 'www.goole.com'

console.log(await TitleGet(url))

export default TitleGet