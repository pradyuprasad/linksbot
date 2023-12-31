import { Snowflake } from "@theinternetfolks/snowflake";
import {checkUrl} from './UrlChecker.js'
import getTitle from './GetTitle.js'
import NormalizeUrl from './NormalizeUrl.js'
import GetReplacement from './GetReplacement.js'
import CommandHandler from "./CommandHandler.js";




async function SaveText(ctx, client){


    const UserExists = await CheckUserExists(ctx, client)
    if (!UserExists === true){
        ctx.reply("You have not been added yet. Please type /start to start")
    }

    const input = ctx.update.message.text
    const split_input = input.split(' ')
    let link = split_input[0]
    const tags = split_input.slice(1)

    // we start input validation on the link
    const valid_link = await checkUrl(link)
    // link validation for tags
    const LinksInTags = await CheckForLinks(tags)
    if (input[0] ==="/"){
        return CommandHandler(ctx, client, input);
    }

     // debug statement
    else if (!valid_link === true){
        ctx.reply("that link is not valid") // permanent reply
        
    }

    else if (LinksInTags){
        
    ctx.reply("this link has already been inserted") // permanent reply 
    }


    else {
        console.log("the link validity is", valid_link)

        try {

        const Normalized_link = await NormalizeUrl(link)
        if (await LinkAlreadyInserted(ctx, client, Normalized_link) === true){
            const error_reply = await GetReplacement(ctx, client, Normalized_link)
            ctx.reply(error_reply)
            return
            
        }
        //('The normalized URL is', Normalized_link)
        const title = await getTitle(Normalized_link)
        if (title == null || title == undefined){
            console.log("no title lmfao")
            ctx.reply("Unable to get title")
            return 
        }
        console.log("title is", title)
        ctx.reply(title)
        //("\nthat is a valid link\n") // debug statement

        const link_id = Snowflake.generate()
        const link_url = Normalized_link
        const link_title = title
        const telegram_id = ctx.update.message.from.id
        const timestamp = Date.now()
        try {


            //("\ninserting\n")

            const result = await client.execute({
                sql:'INSERT INTO links(link_id, link_url, link_title, telegram_id, timestamp) values(:link_id, :link_url, :link_title, :telegram_id, :timestamp)',
                
                args : {link_id: link_id, link_url: link_url, link_title: link_title, telegram_id: telegram_id,  timestamp:timestamp}})

            //("\nlink insert is", result)
        }

        catch(e) {
            console.log(e)
            console.log("error at link insertion")
            
            //("\nerror\n") // permanent reply

            if (e.cause.message === "SQLite error: UNIQUE constraint failed: links.link_url") {


                const error_reply = await GetReplacement(ctx, client, Normalized_link)
               // console.log((error_reply)

                ctx.reply(error_reply)
                //("Unique constraint violated for", Normalized_link)
                 

            }

            ctx.reply("error at link insertion") // permanent reply
            //(e) // permanent
             
        }

        if (tags.length > 0) {

            try {
                const search = await client.execute({
                    sql: "select * from tags where telegram_id = ?", 
                    args: [telegram_id]
                })
                const result = search.rows

                if (result.length === 0) {
                    for (let i = 0; i < tags.length; i += 1) {
                        //("\nthis is run ", i, "\n")
                        const tag_id = Snowflake.generate()
                        const tag_name = tags[i]

                        try {

                            const tag_insert = await client.execute({
                                sql: 'insert into tags (tag_id, tag_name, telegram_id) values(:tag_id, :tag_name, :telegram_id)',
                                args: {tag_id: tag_id, tag_name: tag_name, telegram_id: telegram_id}
                            })
                            //(tag_insert)

                        }

                        catch(e) {
                            console.log("error at tag insertion")
                            //("tags insert error")
                            ctx.reply("tags insert error")
                            //(e)
                        }


                        try {
                            

                            const link_tags_insert = await client.execute({
                                sql: 'insert into link_tags (link_id, tag_id, telegram_id) values(:link_id, :tag_id, :telegram_id)',
                                args: {link_id: link_id, tag_id: tag_id, telegram_id:telegram_id}
                            })

                            //("\nlink tags insert result is", link_tags_insert)

                            

                        }


                    catch(e) {

                        console.log("error at link-tag insertion")

                        //("Link_tags insert error")
                        ctx.reply("error")
                        //(e)
                        


                    }

                    }
                    ctx.reply("The link and tags have been inserted")

                }

                else {

                    for (let i = 0; i < tags.length; i += 1) {
                        //("this is run with non-zero results", i)
                        const search_tag = get_id(tags[i], result)
                        const tag_id = search_tag == null ? Snowflake.generate() : search_tag
                        const tag_name = tags[i]

                        if (search_tag === null) {
                            // if the tag does not exist before
                            try {
                                //("this tag did not exist before", tag_name)
                                const tag_insert = await client.execute({
                                    sql: 'insert into tags (tag_id, tag_name, telegram_id) values(:tag_id, :tag_name, :telegram_id)',
                                    args: {tag_id: tag_id, tag_name: tag_name, telegram_id:telegram_id}
                                })
    
                                //("tags insert is", tag_insert)
                            }

                            catch(e) {
                                console.log("error at tag insertion")
                                //("tags insert error")
                                ctx.reply("tags insert error")
                                //(e)

                            }
                        
                    }

                        else {
                            //("this tag did exist before", tag_name)
                            // do nothing because the tag is already inside the tags database
                        }

                        try {

                            //("link_id is", link_id)
                            //("tag_id is", tag_id)
                            //("telegram_id is", telegram_id)
                            const link_tags_insert = await client.execute({
                                sql: 'insert into link_tags (link_id, tag_id, telegram_id) values(:link_id, :tag_id, :telegram_id)',
                                args: {link_id: link_id, tag_id: tag_id, telegram_id:telegram_id}
                            })

                            //("link tags insert is", link_tags_insert)




                        }

                        catch(e) {
                            console.log("error at link tag insertion")
                            //("link tags error")
                            if (e.cause.message === "SQLite error: UNIQUE constraint failed: link_tags.link_id, link_tags.tag_id") {
                                ctx.reply("You can't insert the same tag repeatedly")
                            }
                            ctx.reply("link tags error")
                            //(e)
                            return
                        }
                }

                ctx.reply("The link and tags have been inserted")
            } 
        }

        catch(e){
            console.log("error at link-tag isnertion #3")

            ctx.reply("error")
            //(e)

        }   
            
        }

        else {
            ctx.reply("The link has been inserted")
            //("DONE")
        }

        } 
        catch(e) {
            console.log("general error")
            console.log(e)
            ctx.reply("error")
        }
    }

}    

    
export default SaveText

async function CheckForLinks(tags){

    const linkcheck = await Promise.all(tags.map(tag => checkUrl(tag)))
    //("linkcheck is ", linkcheck)
    const linkexists = linkcheck.reduce((a, b) => (a || b), false)
    //("link exists is", linkexists)

    return linkexists
}

async function LinkAlreadyInserted(ctx, client, link){
    const telegram_id = ctx.update.message.from.id
    const result = await client.execute({
        sql : "select * from links where link_url = ? and telegram_id = ?",
        args : [link, telegram_id]
    })

   // console.log((result.rows.length)



    if (result.rows.length > 0) {
       // console.log(("result.rows.length > 0")
        return true
    }
    else {
        return false
    }

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

async function CheckUserExists(ctx, client) {
    const telegram_id = ctx.update.message.from.id
    const res = await client.execute("select * from users")
    const data = res.rows
    const found = data.find(item => item.telegram_id == telegram_id)
    if (found === undefined) {
        return false
    }
    else {
        return true
    }
}
