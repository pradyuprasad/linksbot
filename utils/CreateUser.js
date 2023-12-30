
async function CreateUser(ctx, client) { 
    
    const telegram_id = ctx.update.message.from.id

    try {
        const timestamp = Date.now()
        
        const result = await client.execute({
            sql: "INSERT INTO users (telegram_id, timestamp) values (:telegram_id, :timestamp)",
            args: {
                telegram_id: telegram_id,
                timestamp: timestamp,
            },
        });
        //(result)
        const output = 
        ctx.reply("Welcome to Nutmeg Linksbot. Press /help to see all commands. \n To insert a link just paste it")
    }

    catch(e){
        if (e.message == "SQLITE_CONSTRAINT: SQLite error: UNIQUE constraint failed: users.telegram_id") {
            ctx.reply("User has already been added. Press /help for any more commands")
            return 
        }
            ctx.reply(`${e} happened, please try again!`);
    }
}

export default CreateUser 