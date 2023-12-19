import fetch from 'node-fetch';

function get_status(url) {
    return new Promise((resolve, reject) => {
        fetch(url).then(response => {
            if (response.ok) {
                resolve(true);
            } else {
                console.log("Response not ok:", response.status);
                reject(false);
            }
        }).catch((error) => {
            console.log("Fetch error:", error.message);
            reject(false);
        });
    });
}

async function status(url) {
    try {
        return await get_status(url);
    } catch (e) {
        return false;
    }
}

async function checkUrl(input) {
    if (!input.startsWith('http://') && !input.startsWith('https://')) {
        input = 'https://' + input;
    }
    console.log("Checking URL:", input);
    return await status(input);
}

//const url = 'gmail.com';
//console.log(await checkUrl(url));
