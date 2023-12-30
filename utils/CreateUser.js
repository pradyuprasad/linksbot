
async function CreateUser(ctx, client) { 
    
    const telegram_id = ctx.update.message.from.id

    try {
        const timestamp = Date.now()
        
        const result = await client.execute({
            sql: "INSERT INTO users (id, telegram_id, timestamp) values (:id, :telegram_id, :timestamp)",
            args: {
                telegram_id: telegram_id,
                timestamp: timestamp,
            },
        });
        console.log(result)
        ctx.reply("User has been added")
    }

    catch(e){
            ctx.reply(`${e} happened, please try again!`);
    }
}

export default CreateUser 