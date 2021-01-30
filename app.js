const { prefix, token } = require("./config.json");
const fs = require("fs");
const fileContents = fs.readFileSync("./ASL.json", "utf8");
const Discord = require("discord.js");
const client = new Discord.Client();
const request = require("request");

const TextToGifSign = require("./commands/gif-spell");
const TextToFingerSign = require("./commands/finger-spell");

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

  if (
    message.content.startsWith(prefix + "translate") ||
    message.content.startsWith(prefix + "letter") ||
    message.channel.id === "805169855396446249"
  ) {
    let letterOnly = false;
    msg_split = message.content.split(" "); // splits the sentence into different parts
    let firstItem = msg_split[0];

    if (firstItem === "/translate" || firstItem === "/letter") {
      msg_split.shift();
      letterOnly = firstItem === "/letter";
    } else if (firstItem.startsWith(prefix)) return;

    for (let i = 0; i < msg_split.length; i++) {
      let is_valid = await IsValidLink(msg_split[i].toLowerCase());
      if (is_valid && !letterOnly) {
        TextToGifSign.execute(msg_split[i], message); // If there is a gif for a specific word send it
      } else {
        TextToFingerSign.execute(msg_split[i], message, data); // If there is no gif send a word letter by letter
      }
    }
  }
});

async function IsValidLink(link) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      request(
        "https://www.handspeak.com/word/" + link[0] + "/" + link + ".mp4",
        async function (error, response, body) {
          // we request a webpage so we know if a link exists
          if (response.statusCode == 200) {
            resolve(true);
          } else resolve(false);
        }
      );
    }, 1500);
  });
}

client.login(token);
