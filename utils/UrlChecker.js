import https from "https"

function urlcheck(input) {
    return new Promise(resolve => {
        if (input.slice(0, 8) != "https://" || input.slice(0, 7) != "http://") {
            input = "https://" + input
        }
        
        https.get(input, (response) => {
            if (response.statusCode === 200) {
                resolve(true)
            }

            else {
                resolve(false)
            }
        }).on('error', () => resolve(false))
    })
}

async function checkUrl(input) {
    const result = await urlcheck(input)
    return result
}

export default checkUrl