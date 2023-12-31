import pkg from 'telegraf';
const {Telegraf} = pkg;
import 'dotenv/config'
const bot = new Telegraf(process.env.BOT_TOKEN)
import { createClient } from "@libsql/client/web"; 
import SaveText from './utils/SaveText.js';
import CreateUser from './utils/CreateUser.js';
import http from "http"

const client = createClient({
    url: "libsql://links-pradyuprasad.turso.io",
    authToken: process.env.TURSO_TOKEN 
})

bot.start((ctx) => CreateUser(ctx, client))
bot.on('text', (ctx) => SaveText(ctx, client))
bot.launch()



const server = http.createServer((req, res) => { 
    // Sending the response 
    res.write("This is the response from the server") 
    res.end(); 
}) 


server.listen(8080, () => console.log("Server is working!"))
