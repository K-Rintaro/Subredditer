require('dotenv').config()

const fetch = require('node-fetch')
const moment = require('moment')
const Discord = require('discord.js');
const client = new Discord.Client();

const sethour = moment().add(-2, 'hours').unix()

async function asyncCall() {
    fetch('https://www.reddit.com/r/newsokuexp/new.json?sort=new')
    .then(res => res.json())
    .then(json => {
        console.log(json.data.children.length)
        for (let i = 0; i < json.data.children.length; i++){
            if (json.data.children[i].data.created_utc > sethour){
                if(json.data.children[i].data.over_18 == false){
                if(Number(json.data.children[i].data.score) >= 6){
                var titledesu = json.data.children[i].data.title;
                var authordesu = json.data.children[i].data.author;
                var point = json.data.children[i].data.score;
                var thumbnaildesu = json.data.children[i].data.thumbnail;
                var iddesu = json.data.children[i].data.id;
                var commentdesu = json.data.children[i].data.num_comments;

                client.channels.cache.get('840199658025648188').send({
                    embed: {
                        color: 16757683,
                        author: {
                            name: "Reddit"
                        },
                        title: titledesu,
                        url: `https://redd.it/${iddesu}`,
                        color: 16757683,
                        footer: {
                            text: "r/newsokuexp",
                        },
                        image: {
                            url: thumbnaildesu
                        },
                        fields: [
                            {
                                name: "スレ主",
                                value: authordesu,
                                inline: true
                            },
                            {
                                name: "ポイント",
                                value: point,
                                inline: true
                            },
                            {
                                name: "コメント数",
                                value: commentdesu,
                                inline: true
                            }
                        ]
                    }
                })
            }
        }}}
    })
}

setInterval(asyncCall, 7200000);

client.login(process.env.TOKEN);