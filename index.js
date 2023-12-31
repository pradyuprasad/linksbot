import pkg from 'telegraf';
const {Telegraf} = pkg;
import 'dotenv/config'
const bot = new Telegraf(process.env.BOT_TOKEN)
import { createClient } from "@libsql/client/web"; 
import SaveText from './utils/SaveText.js';
import CreateUser from './utils/CreateUser.js';
import express from "express"
import path from "path"
const app = express()
const port = 8080
const __dirname = path.resolve();


const client = createClient({
    url: "libsql://links-pradyuprasad.turso.io",
    authToken: process.env.TURSO_TOKEN 
})


bot.start((ctx) => CreateUser(ctx, client))
bot.on('text', (ctx) => SaveText(ctx, client))
bot.launch()



app.get('/', (req, res) => {
    
    res.sendFile(path.join(__dirname, 'static/index.html'));
} )


app.listen(port, () => {
    console.log("Express is working")

})