-- Users Table
CREATE TABLE users (
    telegram_id INTEGER PRIMARY KEY,
    timestamp INTEGER
);

-- Links Table
CREATE TABLE links (
    link_id TEXT PRIMARY KEY,
    link_url TEXT UNIQUE,
    link_title TEXT,
    telegram_id INTEGER REFERENCES users(telegram_id),
    timestamp INTEGER
);

-- Tags Table
CREATE TABLE tags (
    tag_id TEXT,
    tag_name TEXT,
    telegram_id INTEGER,
    PRIMARY KEY (tag_name, telegram_id),
    FOREIGN KEY (telegram_id) REFERENCES users(telegram_id)
);

-- link_tags Table
CREATE TABLE link_tags (
    link_id TEXT,
    tag_id TEXT,
    telegram_id INTEGER,
    PRIMARY KEY (link_id, tag_id, telegram_id),
    FOREIGN KEY (link_id) REFERENCES links(link_id),
    FOREIGN KEY (tag_id, telegram_id) REFERENCES tags(tag_id, telegram_id),
    FOREIGN KEY (telegram_id) REFERENCES users(telegram_id)
);
