

import pkg from 'telegraf';
const {Telegraf} = pkg;
import 'dotenv/config'
const bot = new Telegraf(process.env.BOT_TOKEN)
import { createClient } from "@libsql/client/web"; 
import { Snowflake } from "@theinternetfolks/snowflake";
import checkUrl from './utils/UrlChecker.js'
import getTitle from './utils/GetTitle.js'
import CreateUser from './utils/CreateUser.js'



const client = createClient({
    url: "libsql://links-pradyuprasad.turso.io",
    authToken: process.env.TURSO_TOKEN 
})

bot.start((ctx) => CreateUser(ctx))
bot.on('text', (ctx) => savetext(ctx))
bot.launch()

   
async function savetext(ctx){
    const input = ctx.update.message.text
    const split_input = input.split(' ')
    const link = split_input[0]
    const tags = split_input.slice(1)
    if (tags.length === 0) {
        try {

            ctx.reply(getTitle(link))

        }

        catch(e) {
            ctx.reply(e)

        } 
    }

    else {

    }

}    

    




