
import status from './UrlChecker.js'

async function NormalizeUrl(input) {

    let input1 = 'https://' + input
    let input2 = 'http://' + input

    const input_status = await status(input)

    if (input_status) {
        return input
    }

    else {
        const input1_status = await status(input1)

        if (input1_status){
            return input1
        }

        else {
            const input2_status = await status(input2)
            if (input2_status) {
                return input2
            }

            else {
                return null
            }
        }
    }

}

export default NormalizeUrl