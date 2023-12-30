async function GetAll(ctx, client){
    console.log("GET ALL is called!")
    const telegram_id = ctx.update.message.from.id;


    const sql = `SELECT L.link_url
    FROM links L
    WHERE L.telegram_id = ?`
    const args = [telegram_id]

    try {

        const res = await client.execute({sql, args})
        let output = "Your links are: \n"
        if (res.rows.length == 0 ){

            output = "You have no links at the moment"
        }

        else {

            const links = res.rows.map(row => row.link_url)
            for (let i = 0; i < links.length; i += 1){
                output += (i+1).toString() + ". " + links[i] + "\n"
            }

        }

        return output

    }

    catch(e){
        console.log(e)
        return "some error has occurred"
    }

}

export default GetAll