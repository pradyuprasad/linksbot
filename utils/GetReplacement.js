async function GetReplacement(ctx, client, link) {
    const telegram_id = ctx.update.message.from.id;
    const sql = `
        SELECT t.tag_name
        FROM links l
        JOIN link_tags lt ON l.link_id = lt.link_id
        JOIN tags t ON lt.tag_id = t.tag_id
        WHERE l.link_url = ? AND l.telegram_id = ?
    `;
    const args = [link, telegram_id];
    
    try {
        const result = await client.execute({ sql, args });

        if (result.rows.length === 0) {
            return "The link has been previously inserted with no tags";
        } else {
            let output = "The link has been inserted with the below tags: \n"
            const tags = result.rows.map(row => row.tag_name);
            for(let i = 0; i < tags.length; i++){
                output += i.toString() + ". " + tags[i] + "\n"
            }
            //console.log(output)
            return output;
        }
    } catch (error) {
        console.error("Error fetching tags:", error);
        return "An error occurred while fetching tags";
    }
}

export default GetReplacement