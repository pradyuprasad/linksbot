import https from "https"

function urlcheck(input) {
    return new Promise(resolve => {
        if (input.slice(0, 8) != 'https://' && input.slice(0, 7) != "http://") {
            console.log("adding to input")
            input = "https://" + input
            console.log(input)
        }

        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0' // so we don't get blocked from scraping
            }
        }; 
        
        https.get(input, options, (response) => {
            console.log("input")

            if (response.statusCode > 300 && response.statusCode < 400) {

                resolve(urlcheck(response.headers.location))

            }
            else if (response.statusCode === 200) {
                resolve(true)
            }

            else {
                console.log("status code is", response.statusCode)
                console.log("status other than 404")
                resolve(false)
            }
        }).on('error', () => resolve(false))
    })
}

async function checkUrl(input) {
    const result = await urlcheck(input)
    return result
}

const url = 'bfrij;ke '

//console.log(await checkUrl(url))

export default checkUrl