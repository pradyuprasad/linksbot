async function get_replacement(link, client){
    //(link)

    const linkid = await client.execute('SELECT * from links where link_url = ?', [link])

    //(linkid)

}
