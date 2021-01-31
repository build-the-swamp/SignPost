const fs = require("fs");
const gif_add = fs.readFileSync("./commands/gifs-confirm.json", "utf8");
const gifs = fs.readFileSync("./commands/gifs.json", "utf8");


try {
    data = JSON.parse(gif_add);
} catch (err) {
    console.log(err);
}

try {
    gif_data = JSON.parse(gifs);
} catch (err) {
    console.log(err);
}


module.exports = {
  name: "Gif Spell",
  description: "Sends gif",
  execute(msg, message) {
    if (msg[0] === ".confirm") 
    {
        let confirmed = gif_data
        confirmed[msg[1]] = gif_add_data[msg[1]]

        fs.writeFileSync("./commands/gifs.json", JSON.stringify(confirmed));

        message.channel.send(
            confirmed[msg[1]] + " is now confirmed"
        );
    }
    else if(msg[0] == ".deny")
    {
        let denied = gif_add_data
        delete denied[msg[1]]

        fs.writeFileSync("./commands/gifs-confirm.json", JSON.stringify(denied));

        message.channel.send(
            confirmed[msg[1]] + " is denied and deleted"
        );
    }
  },
};
