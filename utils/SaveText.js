import { Snowflake } from "@theinternetfolks/snowflake";
import checkUrl from './UrlChecker.js'
import getTitle from './GetTitle.js'

async function CheckForLinks(tags){

    const linkcheck = await Promise.all(tags.map(tag => checkUrl(tag)))
    //console.log("linkcheck is ", linkcheck)
    const linkexists = linkcheck.reduce((a, b) => (a || b), false)
    //console.log("link exists is", linkexists)

    return linkexists
}

async function SaveText(ctx, client){

    const input = ctx.update.message.text
    const split_input = input.split(' ')
    const link = split_input[0]
    const tags = split_input.slice(1)
    console.log(tags) // debug statement

    // we start input validation on the link
    const valid_link = await checkUrl(link)
    // link validation for tags
    const LinksInTags = await CheckForLinks(tags)

    console.log("the link validity is", valid_link) // debug statement
    if (!valid_link){
        ctx.reply("that link is not valid") // permanent reply
        return
    }

    else if (LinksInTags){
        
    ctx.reply("One link at a time please") // permanent reply


    }

    else {
        const title = await getTitle(link)
        console.log("that is a valid link") // debug statement

        const link_id = Snowflake.generate()
        const link_url = link
        const link_title = title
        const telegram_id = ctx.update.message.from.id
        const timestamp = Date.now()
        try {

            console.log("inserting")

            const result = await client.execute({
                sql:'INSERT INTO links(link_id, link_url, link_title, telegram_id, timestamp) values(:link_id, :link_url, :link_title, :telegram_id, :timestamp)',
                
                args : {link_id: link_id, link_url: link_url, link_title: link_title, telegram_id: telegram_id,  timestamp:timestamp}})

            console.log(result)
        }

        catch(e) {
            console.log("error") // permanent reply
            ctx.reply(e) // permanent reply
            console.log(e) // permanent
        }

        if (tags.length > 0) {

            try {
                const search = await client.execute("select * from tags")
                const result = search.rows

                if (result.length == 0) {

                    tag_id = Snowflake.generate()


                }

                else {

                }
            }
            catch(e){

                ctx.reply(e)
                console.log(e)

            }

            
            
        }

        else {
            ctx.reply("The link has been inserted")
        }
        
    
    

    }


    

   

}    

    
export default SaveText