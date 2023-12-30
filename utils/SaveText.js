import { Snowflake } from "@theinternetfolks/snowflake";
import checkUrl from './UrlChecker.js'
import getTitle from './GetTitle.js'
import NormalizeUrl from './NormalizeUrl.js'




async function CheckForLinks(tags){

    const linkcheck = await Promise.all(tags.map(tag => checkUrl(tag)))
    //console.log("linkcheck is ", linkcheck)
    const linkexists = linkcheck.reduce((a, b) => (a || b), false)
    //console.log("link exists is", linkexists)

    return linkexists
}

function get_id(tag, result) {
    const found = result.find(element => element.tag_name == tag)
    if (found) {

        return found.tag_id

    }

    else {
        return null
    }
}

async function SaveText(ctx, client){

    const input = ctx.update.message.text
    const split_input = input.split(' ')
    let link = split_input[0]
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
    return 
    }

    else {

        try {

        const Normalized_link = await NormalizeUrl(link)
        console.log('The normalized URL is', Normalized_link)
        const title = await getTitle(Normalized_link)
        console.log("\nthat is a valid link\n") // debug statement

        const link_id = Snowflake.generate()
        const link_url = Normalized_link
        const link_title = title
        const telegram_id = ctx.update.message.from.id
        const timestamp = Date.now()
        try {

            console.log("\ninserting\n")

            const result = await client.execute({
                sql:'INSERT INTO links(link_id, link_url, link_title, telegram_id, timestamp) values(:link_id, :link_url, :link_title, :telegram_id, :timestamp)',
                
                args : {link_id: link_id, link_url: link_url, link_title: link_title, telegram_id: telegram_id,  timestamp:timestamp}})

            console.log("\nlink insert is", result)
        }

        catch(e) {
            console.log("\nerror\n") // permanent reply

            if (e.cause.message == "SQLite error: UNIQUE constraint failed: links.link_url") {

                const error_reply = link + " has already been inserted"

                ctx.reply(error_reply)
                console.log("Unique constraint violated for", link)
                return 

            }

            ctx.reply("error") // permanent reply
            console.log(e) // permanent
            return 
        }

        if (tags.length > 0) {

            try {
                const search = await client.execute("select * from tags")
                const result = search.rows

                if (result.length == 0) {
                    for (let i = 0; i < tags.length; i += 1) {
                        console.log("\nthis is run ", i, "\n")
                        const tag_id = Snowflake.generate()
                        const tag_name = tags[i]

                        try {

                            const tag_insert = await client.execute({
                                sql: 'insert into tags (tag_id, tag_name) values(:tag_id, :tag_name)',
                                args: {tag_id: tag_id, tag_name: tag_name}
                            })

                            console.log(tag_insert)

                            const link_tags_insert = await client.execute({
                                sql: 'insert into link_tags (link_id, tag_id) values(:link_id, :tag_id)',
                                args: {link_id: link_id, tag_id: tag_id}
                            })

                            console.log("\nlink tags insert result is", link_tags_insert)

                            ctx.reply("The link and tags have been inserted")

                        }

                        catch(e) {
                            console.log("error")
                            ctx.reply(e)
                            console.log(e)
                        }
                    }

                }

                else {

                    for (let i = 0; i < tags.length; i += 1) {
                        console.log("this is run with non-zero results", i)
                        const search_tag = get_id(tags[i], result)
                        const tag_id = search_tag == null ? Snowflake.generate() : search_tag
                        const tag_name = tags[i]

                        if (search_tag == null) {
                            // if the tag does not exist before
                            try {
                                console.log("this tag did not exist before", tag_name)
                                const tag_insert = await client.execute({
                                    sql: 'insert into tags (tag_id, tag_name) values(:tag_id, :tag_name)',
                                    args: {tag_id: tag_id, tag_name: tag_name}
                                })
    
                                console.log("tags insert is", tag_insert)
                            }

                            catch(e) {
                                console.log("error")
                                ctx.reply(e)
                                console.log(e)

                            }
                        
                    }

                        else {
                            console.log("this tag did exist before", tag_name)
                            // do nothing because the tag is already inside the tags database
                        }

                        try {
                            
                            const link_tags_insert = await client.execute({
                                sql: 'insert into link_tags (link_id, tag_id) values(:link_id, :tag_id)',
                                args: {link_id: link_id, tag_id: tag_id}
                            })

                            console.log("link tags insert is", link_tags_insert)




                        }

                        catch(e) {
                            console.log("error")
                            if (e.cause.message == "SQLite error: UNIQUE constraint failed: link_tags.link_id, link_tags.tag_id") {
                                ctx.reply("You can't insert the same tag repeatedly")
                            }
                            ctx.reply(e.cause.message)
                            console.log(e.cause.message)
                            return
                        }
                }

                ctx.reply("The link and tags have been inserted")
            } 
        }

        catch(e){

            ctx.reply(e)
            console.log(e)

        }   
            
        }

        else {
            ctx.reply("The link has been inserted")
            console.log("DONE")
        }

        } 
        catch(e) {
            console.log(e)
            ctx.reply(e)
        }
    }

}    

    
export default SaveText