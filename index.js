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

 app.get('/url/:url_id', async (req, res) => {
    
    res.sendFile(path.join(__dirname, 'static/table.html'))

});

app.get('/get_links/:url_id', async (req, res) => {
    console.log("get links is called!")
    const urlId = req.params.url_id;
    try {
        const result = await client.execute({
            sql: "SELECT link_url, link_title, link_id FROM links JOIN users ON links.telegram_id = users.telegram_id WHERE users.url_id = ?",
            args: [urlId]
        });

        //console.log(result)
	res.json(result);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

app.get("/delete_link/:link_id", async (req, res) => {
	console.log("web delete is called!")
	const link_id = req.params.link_id
	try {
		const result = await client.execute({
			sql: "DELETE FROM link_tags WHERE link_id = ?",
			args: [link_id]
		})
		console.log("link has been deleted!")

		res.send(true)
	}

	catch(e){
		console.log(e)
		res.status(500).send('Server Error!')
	}
	try {
		const result = await client.execute({
				sql: "DELETE FROM links WHERE link_id = ?",
				args: [link_id]
			})
		}

	catch(e){
		console.log(e)
		res.status(500).send('Server Error!')
	}
})

app.get("/get_tags/:link_id", async (req, res) => {
	console.log("get tags is called")
	const link_id = req.params.link_id
	try {
		const result = await client.execute({
			sql: "SELECT tag_name FROM tags join link_tags ON tags.tag_id = link_tags.tag_id WHERE link_tags.link_id = ?",
			args: [link_id]
		})

		console.log(result)
		res.json(result)
	}

	catch(e){
		console.log(e)
		res.status(500).send('Sever Error!')
	}
})

app.listen(port, () => {
    console.log("Express is working")

})
