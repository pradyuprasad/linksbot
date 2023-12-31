import fetch from 'node-fetch';

export function get_status(url) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            }
        }).then(response => {
            if (response.ok) {
                //console.log(response)
                resolve(true);
            } else {
                //console.log("Response not ok:", response.status);
                reject(false);
            }
        }).catch((error) => {
            //console.log(error)
            //("Fetch error:", error.message);
            reject(false);
        });
    });
}

export async function status(url) {
    try {
        return await get_status(url);
    } catch (e) {
        console.log("Error in status function:", e);
        return false;
    }
}

export async function checkUrl(input) {

    let input1 = 'https://' + input
    let input2 = 'http://' + input

    const input_status = await status(input)

    if (input.startsWith("twitter.com") ||input.startsWith("x.com") || input.startsWith("https://twitter.com") || input.startsWith("https://x.com")){
        return true
    }

    else if (input_status) {
        return true
    }

    else {
        const input1_status = await status(input1)

        if (input1_status){
            return true
        }

        else {
            const input2_status = await status(input2)
            return input2_status
        }
    }
    
}

const url = 'twitter.com';
//console.log(await checkUrl(url))

export default {checkUrl, status, get_status}