const { prefix, token } = require("./config.json");
const fs = require("fs");
const fileContents = fs.readFileSync("./ASL.json", "utf8");
const Discord = require("discord.js");
const client = new Discord.Client();
const request = require("request");
//const axios = require("axios");

let data = {};

try {
  data = JSON.parse(fileContents);
} catch (err) {
  console.log(err);
}

client.once("ready", () => {
  console.log("RUNNING!");
});

client.on("message", async (message) => {
  if (message.author.bot) return;

  const command = "translate";
  if (
    message.content.startsWith(prefix + command) ||
    message.channel.id === "805169855396446249"
  ) {
    let msg = "";
    if (message.content.startsWith(prefix + command))
      msg = message.content.slice(command.length + 2).toLowerCase();
    else msg = message.content;

    msg_split = msg.split(" "); // splits the sentence into different parts

    console.log(msg_split);
    for (let i = 0; i < msg_split.length; i++) {
        let is_valid = await IsValidLink(msg_split[i].toLowerCase())
        console.log(is_valid)
        if(is_valid)
        {
            TextToGifSign(msg_split[i])                                                         // If there is a gif for a specific word send it
        }
        else
        {
            TextToFingerSign(msg_split[i], message)                                             // If there is no gif send a word letter by letter
        }
        
    }
  }
});


function TextToGifSign(msg, message)
{
    message.channel.send(msg);
    message.channel.send("https://www.handspeak.com/word/" + msg[0] + "/" + msg + ".mp4");
}


function TextToFingerSign(msg, message)
{
    let fin_message = ""
    for (let j = 0; j < msg.length; j++) {
        if (data[msg[j]])
            fin_message = fin_message + " " + data[msg[j]];
    }
    message.channel.send(msg);
    message.channel.send(fin_message); // sends the final message
    fin_message = ""; // resets the message so there are no repetition
}

async function IsValidLink(link)
{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            request("https://www.handspeak.com/word/" + link[0] + "/" + link +".mp4", async function (error, response, body) { // we request a webpage so we know if a link exists
                if (response.statusCode == 200) {
                    resolve(true)
                }
                else
                    resolve(false)
            });
        }, 1500)
    })
}

client.login(token);

/*

For each word we see if we have a gif for it?

If we do then we give it

If we dont we sign it andddddd we ask if they have a gif for it?

*/
