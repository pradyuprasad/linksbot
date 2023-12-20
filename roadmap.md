1. strip text into links and tags
2. perform input validation 
2a. first word should be a link (how to check?) DONE
2b. 2nd word onwards should not be a link  DONE
2c. strip out useless stuff from links 
3. insert link DONE
3a. (check if link is already in that user's links). if already there, return that link. otherwise continue. DONE
3d. get title DONE
4. insert tags DONE
4a. loop through tags DPME
5. 
helper functions to write
1. check if string is url - DONE
3. get title from url DONE

things to do after trip
0. REWRITE link_tags database. Link tags at the moment does not map a certain link, tag with a specific user. so if user A and user B give out the same link and tag mapping there would be a unique error. What is the fix? 

Write a new database with all 3 as primary key (link_id, tag_id and user_id). Perhaps also consider making the tags user_specific? that is changing the tags database also such that tags are strong along with the user. no global tags, each tag is stored with the user id so we can ensure no leakeage. the primary key will be tag_id but user A cannot store the same tag twice

1. write get_replacement(link, client) function //
What does it do? If the user sends a link that has already been inserted, get_replacement takes in the link and the client object  and sends a string out with the link and all the tags associated with that link. //
Current guess is to get link id from link, find all tags associated with that link id, wrap all of those in a string and return string

2. write general get function. user should input a tag and get all links associated with that tag (with THEIR username!!)
3. write random function? to be deicded
4. write remove function? remove a link and all associated link_tags with that link 
