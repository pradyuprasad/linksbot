import GetByTag from "./GetByTag.js";
import GetAll from "./GetAll.js";


async function CommandHandler(ctx, client, input){
    const help = `You can get all your links with the /get_all command. \n
You can get all links for a specific tag with the /get_tag command and the specific tag. \n
For example, '/get_tag health' gives you all your links about health. \n`

    const split_input = input.split(' ')
    let command = split_input[0]
    //("the link is", link)
    const others = split_input.slice(1)
    //(tags) // debug statement

    if (command === "/help") {
        ctx.reply(help)
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

    else {
        ctx.reply("That wasn't right. Type /help for a list of commands")
    }



}

export default CommandHandler