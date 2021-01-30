const {prefix, token} = require('./config.json');
const fs = require('fs')
const fileContents = fs.readFileSync('./ASL.json', 'utf8')
const Discord = require('discord.js');
const client = new Discord.Client();
const request = require("request")

let data = {};

try{
    data = JSON.parse(fileContents)
} catch(err){console.log(err)}

client.once('ready', () => {
    console.log('RUNNING!');
});


client.on('message', async message => {
    if (!message.content.startsWith(prefix + "ra") ) return;

    msg = message.content.slice(4).toLowerCase()
    msg_split = msg.split(" ") // splits the sentence into different parts

    let fin_message = ""
    console.log(msg_split)
    for(let i = 0; i < msg_split.length; i++)
    {
        await request("https://www.handspeak.com/word/" + msg_split[i][0] + "/" + msg_split[i] + ".mp4", async function(error, response, body){
            console.error('error:', error);
            console.log('statusCode:', response && response.statusCode);
            if(response.statusCode == 200){
                await message.channel.send(msg_split[i])
                await message.channel.send("https://www.handspeak.com/word/" +  msg_split[i][0] + "/" + msg_split[i] + ".mp4");
            }
            else{
                for(let j = 0;j < msg_split[i].length; j++){
                    if(data[msg_split[i][j]])
                        fin_message = fin_message + " " + data[msg_split[i][j]]
                }
                await message.channel.send(msg_split[i])
                await message.channel.send(fin_message) // sends the final message
                fin_message = "" // resets the message so there are no repetition
            }
        });
    }
})


client.login(token);

/*

For each word we see if we have a gif for it?

If we do then we give it

If we dont we sign it andddddd we ask if they have a gif for it?

*/