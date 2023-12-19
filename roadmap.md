1. strip text into links and tags
2. perform input validation 
2a. first word should be a link (how to check?) DONE
2b. 2nd word onwards should not be a link  
2c. strip out useless stuff from links 
3. insert link 
3a. (check if link is already in that user's links). if already there, return that link. otherwise continue
3b. get snowflake generated id
3c. make variable link_url
3d. get title DONE
4. insert tags 
4a. loop through tags
4b. check if tag is in tags table already (using select)
4c. if tag is in tags table, retrieve tag_id and make mapping in links-tag table
4d. if tag not in table, insert and make mapping in links-tag table

helper functions to write
1. check if string is url - DONE
2. strip out useless stuff from links
3. get title from url DONE
