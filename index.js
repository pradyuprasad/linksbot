import pkg from 'telegraf';
const {Telegraf} = pkg;
import 'dotenv/config'
const bot = new Telegraf(process.env.BOT_TOKEN)
import { createClient } from "@libsql/client/web"; 
import SaveText from './utils/SaveText.js';
import CreateUser from './utils/CreateUser.js';
import express from "express"

const client = createClient({
    url: "libsql://links-pradyuprasad.turso.io",
    authToken: process.env.TURSO_TOKEN 
})

bot.start((ctx) => CreateUser(ctx, client))
bot.on('text', (ctx) => SaveText(ctx, client))
bot.launch()


const app = express()
const port = 8080

app.get('/', (req, res) => {
    res.send("My express app!")
} )

app.listen(port, () => {
    console.log("Express is working")

})