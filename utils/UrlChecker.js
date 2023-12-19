import https from "https"

function urlcheck(input) {
    return new Promise(resolve => {
        if (input.slice(0, 8) != 'https://' && input.slice(0, 7) != "http://") {
            console.log("adding to input")
            input = "https://" + input
        }
        
        https.get(input, (response) => {
            if (response.statusCode === 200) {
                resolve(true)
            }

            else {
                console.log("status other than 200")
                resolve(false)
            }
        }).on('error', () => resolve(false))
    })
}

async function checkUrl(input) {
    const result = await urlcheck(input)
    return result
}

const url = 'https://phet-dev.colorado.edu/html/build-an-atom/0.0.0-3/simple-text-only-test-page.html'


export default checkUrl