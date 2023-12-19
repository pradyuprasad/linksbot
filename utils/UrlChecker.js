import https from "https"
import http from "http"

function urlcheck_https(input) {
    return new Promise(resolve => {
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0' // so we don't get blocked from scraping
            }
        }; 
        
        https.get(input, options, (response) => {

            ////console.log("starting https checking!!")

            if (response.statusCode > 300 && response.statusCode < 400) {

                
                
                //console.log("redirect")

                resolve(urlcheck_https(response.headers.location))

            }
            else if (response.statusCode === 200) {
                resolve(true)
            }

            else {
                //console.log("status code is", response.statusCode)
                resolve(false)
            }
        }).on('error', (error) => { 
            //console.log("error in http request", error.message)
            resolve(false)})
    })
}

function urlcheck_http(input) {
    return new Promise(resolve => {

        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0' // so we don't get blocked from scraping
            }
        }; 
        
        http.get(input, options, (response) => {
            //console.log("starting http checking!!")
            if (response.statusCode > 300 && response.statusCode < 400) {

                //console.log("redirect")

                resolve(urlcheck_http(response.headers.location))

            }
            else if (response.statusCode === 200) {
                resolve(true)
            }

            else {
                //console.log("status code is", response.statusCode)
                resolve(false)
            }
        }).on('error', (error) => { 
            //console.log("error in http request", error.message)
            resolve(false)})
    })
}

async function checkUrl(input) {
    //console.log("starting function")
    

    if (input.slice(0, 8) == 'https://') {
        //console.log("it is a https link")
        const result_https = await urlcheck_https(input)
        return result_https

    }

    else if (input.slice(0, 7) == "http://") {
        //console.log(input.slice(0, 7))
        //console.log("it is a http link")
        const result_http = await urlcheck_http(input)
        return result_http

    }

    else {
        //console.log("adding to input")
        const https_input = "https://" + input
        const http_input = "http://" + input
        const result_https = await urlcheck_https(https_input)
        const result_http = await urlcheck_http(http_input)
        return result_https || result_http
    
    }

}

const url = 'goole.com'

//console.log(await checkUrl(url))

export default checkUrl