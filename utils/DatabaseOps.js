

async function clearTable(tableName){ 
    let res = await client.execute(`DELETE FROM ${tableName}`)
    //(res)
}

async function drop_table(table){
    const res = await client.execute(`drop table ${table};`)
    console.log(res)
}

async function create_table_users(){
    const res = await client.execute("CREATE TABLE users ( telegram_id INTEGER PRIMARY KEY, timestamp INTEGER, url_id TEXT UNIQUE );")
    console.log(res)
}

async function create_table_links(){
    const res = await client.execute("CREATE TABLE links ( link_id TEXT PRIMARY KEY, link_url TEXT, link_title TEXT, telegram_id INTEGER REFERENCES users(telegram_id), timestamp INTEGER );")
    console.log(res)
}

async function create_table_tags(){
    const res = await client.execute("CREATE TABLE tags ( tag_id TEXT UNIQUE, tag_name TEXT, telegram_id INTEGER, PRIMARY KEY (tag_name, telegram_id), FOREIGN KEY (telegram_id) REFERENCES users(telegram_id) );")
    console.log(res)
}

async function create_table_linktags(){
    const res = await client.execute("CREATE TABLE link_tags ( link_id TEXT, tag_id TEXT, telegram_id INTEGER, PRIMARY KEY (link_id, tag_id, telegram_id), FOREIGN KEY (link_id) REFERENCES links(link_id), FOREIGN KEY (tag_id) REFERENCES tags(tag_id), FOREIGN KEY (telegram_id) REFERENCES users(telegram_id) );")
    console.log(res)
}


async function see_all_tables(){
    const res = client.execute("SELECT name FROM sqlite_master WHERE type='table';")
    console.log(res)
}
