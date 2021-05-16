require('dotenv').config()

const fetch = require('node-fetch')
const moment = require('moment')
const Discord = require('discord.js');
const client = new Discord.Client();
const cron = require('node-cron');

var kakunouko = []

async function asyncCall() {
    const sethour = moment().add(-2, 'hours').unix() //please change from -2 to time interval that you want to set (ex. every three hours → -3)
    fetch(`https://www.reddit.com/r/${process.env.SUBREDDIT_NAME}/new.json?sort=new`)
    .then(res => res.json())
    .then(json => {
        console.log(json.data.children.length)
        for (let i = 0; i < json.data.children.length; i++){
            if (json.data.children[i].data.created_utc > sethour){
                if(json.data.children[i].data.over_18 == false){
                if(Number(json.data.children[i].data.score) >= 10){//please change from 10 to the point that you want to set
                var titledesu = json.data.children[i].data.title;
                var authordesu = json.data.children[i].data.author;
                var point = json.data.children[i].data.score;
                var thumbnaildesu = json.data.children[i].data.thumbnail;
                var iddesu = json.data.children[i].data.id;
                var commentdesu = json.data.children[i].data.num_comments;
                if (kakunouko.includes(iddesu) == false){
                client.channels.cache.get(`${process.env.CHANNEL_ID}`).send({
                    embed: {
                        color: 16757683,
                        author: {
                            name: "Reddit"
                        },
                        title: titledesu,
                        url: `https://redd.it/${iddesu}`,
                        color: 16757683,
                        footer: {
                            text: `r/${process.env.SUBREDDIT_NAME}`,
                        },
                        image: {
                            url: thumbnaildesu
                        },
                        fields: [
                            {
                                name: "Author",
                                value: authordesu,
                                inline: true
                            },
                            {
                                name: "Point",
                                value: point,
                                inline: true
                            },
                            {
                                name: "Comments",
                                value: commentdesu,
                                inline: true
                            }
                        ]
                    }
                })
                kakunouko.push(iddesu)
                }
            }   
        }}}
    })
}

cron.schedule('0 0 */2 * * *', () => {//please change from */2 to time interval that you want to set (ex. every three hours → */3)
    asyncCall()
});

client.login(process.env.TOKEN);