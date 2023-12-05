import pkg from 'telegraf';
const {Telegraf} = pkg;
import 'dotenv/config'
const bot = new Telegraf(process.env.BOT_TOKEN)
import { createClient } from "@libsql/client/web"; 
import { Snowflake } from "@theinternetfolks/snowflake";


const client = createClient({
    url: "libsql://links-pradyuprasad.turso.io",
    authToken: process.env.TURSO_TOKEN // added turso token
})

bot.start((ctx) => createUser(ctx))
bot.launch()

async function createUser(ctx) { // create user
    
    const telegram_id = ctx.update.message.from.id

  

    try {

        const id = Snowflake.generate()

        const timestamp = Date.now()
        
        const result = await client.execute({
            sql: "INSERT INTO users (id, telegram_id, timestamp) values (:id, :telegram_id, :timestamp)",
            args: {
                id: id,
                telegram_id: telegram_id,
                timestamp: timestamp,
            },
        });
    
        console.log(result)
        ctx.reply("User has been added")


    }

    catch(e){
        if((e.cause.message) === "SQLite error: UNIQUE constraint failed: users.telegram_id"){
            ctx.reply("User has already been added")
        }
        else {
            ctx.reply(`${e} happened, please try again!`);

        }
          
    }
        
    

}


async function create_table_users(){
    const res = await client.execute("CREATE TABLE users (id TEXT PRIMARY KEY, telegram_id INTEGER UNIQUE, timestamp INTEGER);")
    console.log(res)
}

async function drop_table(table){
    const res = await client.execute(`drop table ${table};`)
}


async function clearTable(tableName){ // clear table
    let res = await client.execute(`DELETE FROM ${tableName}`)
    console.log(res)
}

