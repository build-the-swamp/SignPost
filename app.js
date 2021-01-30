const { prefix, token } = require("./config.json");
const fs = require("fs");
const fileContents = fs.readFileSync("./ASL.json", "utf8");
const Discord = require("discord.js");
const client = new Discord.Client();
const request = require("request");
const bodyParser = require("body-parser");
const axios = require("axios");

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
    message.channel.id === "805145031547420703"
  ) {
    let msg = "";
    if (message.content.startsWith(prefix + command))
      msg = message.content.slice(command.length + 2).toLowerCase();
    else msg = message.content;

    msg_split = msg.split(" "); // splits the sentence into different parts

    let fin_message = "";
    console.log(msg_split);
    for (let i = 0; i < msg_split.length; i++) {
      await request(
        "https://www.handspeak.com/word/" +
          msg_split[i][0] +
          "/" +
          msg_split[i] +
          ".mp4",
        async function (error, response, body) {
          console.log("statusCode:", response && response.statusCode);
          if (response.statusCode == 200) {
            message.channel.send(msg_split[i]);
            message.channel.send(
              "https://www.handspeak.com/word/" +
                msg_split[i][0] +
                "/" +
                msg_split[i] +
                ".mp4"
            );
          } else {
            for (let j = 0; j < msg_split[i].length; j++) {
              if (data[msg_split[i][j]])
                fin_message = fin_message + " " + data[msg_split[i][j]];
            }
            message.channel.send(msg_split[i]);
            amessage.channel.send(fin_message); // sends the final message
            fin_message = ""; // resets the message so there are no repetition
          }
        }
      );
    }
  }
});

client.login(token);

/*

For each word we see if we have a gif for it?

If we do then we give it

If we dont we sign it andddddd we ask if they have a gif for it?

*/
