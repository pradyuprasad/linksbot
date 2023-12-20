async function get_replacement(link, client){

    const linkid = await client.execute('SELECT link_id from links where link_url = ?', link)

    console.log(linkid.rows)

}
