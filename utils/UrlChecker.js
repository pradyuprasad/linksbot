import fetch from 'node-fetch';

export function get_status(url) {
    return new Promise((resolve, reject) => {
        fetch(url).then(response => {
            if (response.ok) {
                resolve(true);
            } else {
                //("Response not ok:", response.status);
                reject(false);
            }
        }).catch((error) => {
            //("Fetch error:", error.message);
            reject(false);
        });
    });
}

export async function status(url) {
    try {
        return await get_status(url);
    } catch (e) {
        return false;
    }
}

export async function checkUrl(input) {
    let input1 = 'https://' + input
    let input2 = 'http://' + input

    const input_status = await status(input)

    if (input_status) {
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

const url = 'gmail.com';
////(await checkUrl(url));


export default {checkUrl, status, get_status}