

import pkg from 'telegraf';
const {Telegraf} = pkg;
import 'dotenv/config'
const bot = new Telegraf(process.env.BOT_TOKEN)
import { createClient } from "@libsql/client/web"; 


const client = createClient({
    url: "libsql://links-pradyuprasad.turso.io",
    authToken: process.env.TURSO_TOKEN 
})

async function drop_table(table){
    const res = await client.execute(`drop table ${table};`)
}

const res = await drop_table('link_tags')
console.log(res)
const res1 = await drop_table('tags')
console.log(res1)
const res2 = await drop_table('links')
console.log(res2)
const res3 = await drop_table('users')
console.log(res3)

//const a = await get_replacement('https://www.google.com', client)

/*bot.start((ctx) => CreateUser(ctx, client))
bot.on('text', (ctx) => SaveText(ctx, client))
bot.launch()*/

   




