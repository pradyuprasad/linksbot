

import pkg from 'telegraf';
const {Telegraf} = pkg;
import 'dotenv/config'
const bot = new Telegraf(process.env.BOT_TOKEN)
import { createClient } from "@libsql/client/web"; 
import { Snowflake } from "@theinternetfolks/snowflake";
import CreateUser from './utils/CreateUser.js'
import SaveText from './utils/SaveText.js'



const client = createClient({
    url: "libsql://links-pradyuprasad.turso.io",
    authToken: process.env.TURSO_TOKEN 
})


bot.start((ctx) => CreateUser(ctx, client))
bot.on('text', (ctx) => SaveText(ctx))
bot.launch()

   




