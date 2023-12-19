import { createClient } from "@libsql/client/web"; 
import { Snowflake } from "@theinternetfolks/snowflake";
import checkUrl from './UrlChecker.js'
import getTitle from './GetTitle.js'

const client = createClient({
    url: "libsql://links-pradyuprasad.turso.io",
    authToken: process.env.TURSO_TOKEN 
})


async function SaveText(ctx){


    const input = ctx.update.message.text
    const split_input = input.split(' ')
    const link = split_input[0]
    const tags = split_input.slice(1)
    console.log(tags)

    // we start input validation on the link


    const valid_link = await checkUrl(link)

    console.log("the link validity is", valid_link)

    if (!valid_link){

        ctx.reply("that link is not valid")
        return

        
    }

    else {
        ctx.reply("that is a valid link")

        if (tags.length == 0) {
            console.log("zero tags")
        }
    
        else {
            console.log("tags exist")
            const linkcheck = tags.map(await checkUrl)
            Promise.all(linkcheck)
            console.log(linkcheck)
            /*const linkexists = linkcheck.reduce((a || b), true)
            console.log(linkexists)*/
        }

    }


    

   

}    

    
export default SaveText