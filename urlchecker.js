import https from "https"

/*function urlcheck(input){
    if (!(input.slice(0, 7) == "https://") && !(input.slice(0, 7) == "http://") ) {

    input = "https://" + input
    

    }
    try {
        new URL(input)
        console.log(input)
        return true
    }

    catch(e){
        console.log("not a valid url")
        console.log(input)
        return false
    }
    
}
const hello = "htwww.google.com"
console.log(urlcheck(hello))*/

function urlcheck(input){
    if (input.slice(0, 8) != "https://" || input.slice(0, 7) != "http://") {
        input = "https://" + input
    }

    try {
        const res = https.get(input, (output) => console.log(output.statusCode))
        //console.log(res) 
         
        return true

    }

    catch(e) {

        return false
        
    }
}

(urlcheck("www.google.com"))