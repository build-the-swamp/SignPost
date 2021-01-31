const request = require("request");
const fs = require("fs");
const fileContents = fs.readFileSync("./commands/gifs-confirm.json", "utf8");

let data = {};
try {
  data = JSON.parse(fileContents);
} catch (err) {
  console.log(err);
}

module.exports = {
  name: "Letter Spell",
  description: "Convert text to direct letters",
  async execute(msg, message, client) {
    let link = msg[1];
    let is_valid = await IsValidLink(link.toLowerCase());
    if (is_valid) {
      client.users.fetch("100087218361606144").then((user) => {
        let add_link = data;
        add_link[msg[0]] = link;

        fs.writeFileSync(
          "./commands/gifs-confirm.json",
          JSON.stringify(add_link)
        );
        user.send("User wants to add: " + msg[0] + " and the gif is " + link);
      }); // If there is a gif for a specific word send it
      message.channel.send("Link is valid! Sending to admin for review!");
    } else {
      message.channel.send("Link is not attainable! Try Again!");
    }
  },
};

async function IsValidLink(link) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      request(link, async function (error, response, body) {
        // we request a webpage so we know if a link exists
        if (response.statusCode == 200) {
          resolve(true);
        } else resolve(false);
      });
    }, 1500);
  });
}
