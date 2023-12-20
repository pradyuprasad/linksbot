# Users Table
CREATE TABLE users (id TEXT PRIMARY KEY, telegram_id INTEGER UNIQUE, timestamp INTEGER);

# Links table
CREATE TABLE links (
    link_id TEXT PRIMARY KEY 
    link_url TEXT UNIQUE // strip out all the useless stuff from the url
    link_title TEXT // find how to retrieve title from URL
    telegram_id INTEGER REFERENCES users(telegram_id) // from ctx
    timestamp INTEGER
    

);

# Tags table
CREATE TABLE tags (
    tag_id TEXT PRIMARY KEY
    tag_name TEXT UNIQUE
)

# link_tags table

CREATE TABLE link_tags (
    link_id TEXT
    tag_id TEXT
    PRIMARY KEY (link_id, tag_id)
    FOREIGN KEY (link_id) REFERENCES links(link_id)
    FOREIGN KEY (tag_id) REFERENCES tags(tag_id)
)