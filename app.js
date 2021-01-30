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
    if (!message.content.startsWith(prefix + "ra") ) return;

    msg = message.content.slice(4).toLowerCase()
    msg_split = msg.split(" ") // splits the sentence into different parts

    let fin_message = ""
    
    for(let i = 0; i < msg_split.length; i++)
    {
        for(let j = 0;j < msg_split[i].length; j++){
            if(data[msg_split[i][j]])
                fin_message = fin_message + " " + data[msg_split[i][j]]
        }
        message.channel.send(msg_split[i])
        if(fin_message == " ") // checks if the message is empty
            message.channel.send(fin_message) // sends the final message
        fin_message = "" // resets the message so there are no repetition
    }
})

client.login(token);