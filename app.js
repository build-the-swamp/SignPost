const {prefix, token} = require('./config.json');
const fs = require('fs')
const fileContents = fs.readFileSync('./ASL.json', 'utf8')
const Discord = require('discord.js');
const client = new Discord.Client();

let data = {};

try{
    data = JSON.parse(fileContents)
} catch(err){console.log(err)}

client.once('ready', () => {
    console.log('RUNNING!');
});


client.on('message', message => {
    if (message.content === `${prefix}translate`) {
      message.channel.send(Object.values(data));
    }
})

client.login(token);