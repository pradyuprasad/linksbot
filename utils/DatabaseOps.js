
async function create_table_users(){
    const res = await client.execute("CREATE TABLE users (id TEXT PRIMARY KEY, telegram_id INTEGER UNIQUE, timestamp INTEGER);")
    console.log(res)
}

async function drop_table(table){
    const res = await client.execute(`drop table ${table};`)
}


async function clearTable(tableName){ 
    let res = await client.execute(`DELETE FROM ${tableName}`)
    console.log(res)
}

async function create_table_links(){
    const res = await client.execute("CREATE TABLE links (link_id TEXT PRIMARY KEY, link_url TEXT, link_title TEXT, telegram_id INTEGER REFERENCES users(telegram_id), timestamp INTEGER);")
    console.log(res)
}

async function create_table_tags(){
    const res = await client.execute("CREATE TABLE tags (tag_id TEXT PRIMARY KEY, tag_name TEXT UNIQUE);")
    console.log(res)
}

async function create_table_linktags(){
    const res = await client.execute("CREATE TABLE link_tags (link_id TEXT, tag_id TEXT, PRIMARY KEY(link_id, tag_id), FOREIGN KEY (link_id) REFERENCES links(link_id), FOREIGN KEY (tag_id) REFERENCES tags(tag_id));")
    console.log(res)
}
