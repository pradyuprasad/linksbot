async function get_replacement(link, client){
    console.log(link)

    const linkid = await client.execute('SELECT * from links where link_url = ?', [link])

    console.log(linkid)

}
