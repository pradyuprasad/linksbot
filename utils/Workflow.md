What do we want the workflow to be?

# Start
1. inserted into users
    a. snowflake generated userid
    b. telegram id
    c. time at which user was created


# Save text 
user sends some text

## Split text
split text into 
- first item (link)
- and second items (tags)

## validate link and tags
using checkUrl from UrlChecker.js
check if there are links in tags CheckForLinks function

if the link is not valid, ctx.reply not a valid link
else if there are tags in links ctx.reply One link at a time please
else: 

## Text handling

### Normalize URL
1. if url works by itself (already had https or http) then it works
2. else add https to url and if that works return it
3. else add http to url and if that works return it
4. else if it doesn't work return null (shouldn't happen as we validated URL in the first part already)

### Inserting the link
        const link_id = Snowflake.generate()
        const link_url = Normalized_link
        const link_title = title
        const telegram_id = ctx.update.message.from.id
        const timestamp = Date.now()


insert this
but error handling: if the link has been inserted, return an error. (TBD in roadmap, return the link and its tags)

### Insering the tags