# Subredditer
A Discord bot that can post Subreddit threads that is going viral.

## Set up

1. Create .env file

1. Set Subreddit name, Discord channel id and Discord bot token at .env file as written in .env.example

1. (Option) This code gets threads that earn 10 points within 2 hours. You can change this condition in app.js

## A Note About the version of Discord.js

Latest version of Discord.js may cause error at 
```js
client.channels.cache.get().send
```
Please install old version of Discord.js (Recommend: @12.5.1)

## LICESE

This software is released under the MIT license.
