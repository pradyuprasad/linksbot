import GetByTag from "./GetByTag.js";
import GetAll from "./GetAll.js";
import NormalizeUrl from "./NormalizeUrl.js";


async function CommandHandler(ctx, client, input){
    const help = `You can add links by sending them with the tags after it. For example 'website.com tag1 tag2' adds website.com to  with two tags called tag1 and tag2. \n
Do note that tags are single word only. So for example 'randomwebsite.com machine learning' will add randomwebsite.com with 2 tags: machine and learning. 
You can get all your links with the /get_all command. \n
You can get all links for a specific tag with the /get_tag command and the specific tag. \n
For example, '/get_tag health' gives you all your links about health. \n
To delete a link reply to it with the the /delete message.`

    const split_input = input.split(' ')
    let command = split_input[0]
    //("the link is", link)
    const others = split_input.slice(1)
    //(tags) // debug statement
    const telegram_id = ctx.update.message.from.id;

    if (command === "/help") {
        ctx.reply(help)
    }

    else if (command === "/url_id"){

        const res1 = await client.execute({
            sql: "SELECT url_id FROM users where telegram_id = ?",
            args: [telegram_id]
        })

        const url_id = res1.rows[0].url_id

        ctx.reply(`url id is: ${url_id}`)
        console.log(`url id is: ${url_id}`)
        
    }

    else if (command === "/get_tag"){
        if (others.length != 1){
            ctx.reply('Please insert only 1 tag!')
            return 
        }

        else {
            const output = await GetByTag(ctx, client, others[0])
            ctx.reply(output)
            return 

        }

    }

    else if (command === "/get_all") {
        const output = await GetAll(ctx, client)
        ctx.reply(output)
        return
    }

    else if (command == "/delete"){
        if (ctx.update.message.reply_to_message == undefined){
            ctx.reply("The delete command should be used as a reply to the link and tags you want to delete")
            return 
        }

        else {
            const old_message = ctx.update.message.reply_to_message
            const old_text = old_message.text
            const split_input = old_text.split(' ')
            let link = await NormalizeUrl(split_input[0])
            if (link == null){
                ctx.reply("You aren't deleting a link. Please reply to a message with a link")
                return
            }

            else {

                

                try {

                    const res = await client.execute({
                        sql: "SELECT link_id FROM links WHERE telegram_id = ? AND link_url = ?",
                        args: [telegram_id, link]
                    })

                    const link_id_to_delete = res.rows[0].link_id

                    const del = await client.execute({
                        sql: "DELETE FROM link_tags WHERE link_id = ?",
                        args: [link_id_to_delete]
                    })

                    const del_link = await client.execute({
                        sql: "DELETE FROM links WHERE link_id = ?",
                        args: [link_id_to_delete]
                    })

                    ctx.reply("It has been deleted")
    

                }

                catch(e){
                    console.log(e)
                    ctx.reply("Error in deleting")
                }

            }
            
        }
    }

    else {
        ctx.reply("That wasn't right. Type /help for a list of commands")
    }

}

export default CommandHandler