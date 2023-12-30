async function GetByTag(ctx, client, tag){
    const telegram_id = ctx.update.message.from.id;

    console.log("tag is", tag)

    const sql = `SELECT L.link_url 
    FROM links L
    JOIN link_tags LT ON L.link_id = LT.link_id
    JOIN tags T ON LT.tag_id = T.tag_id
    WHERE T.tag_name = ? AND T.telegram_id = ?
    `
    const args = [tag, telegram_id]

    try {

        const result = await client.execute({sql, args})
        const links = result.rows.map(row => row.link_url)
        console.log(links)
        const output = `The links associated with ${tag} are:`
        for (let i = 0; i < links.length; i ++){
            output += i.toString() + ". " + links[i]
        }

        console.log(output)
        return output

    }

    catch(e){
        console.log(e)
        return e

    }

}

export default GetByTag