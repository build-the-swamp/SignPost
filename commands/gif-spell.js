const fs = require("fs");

let student = {
  name: "Mike",
  age: 23,
  gender: "Male",
  department: "English",
  car: "Honda",
};

let data = JSON.stringify(student);
fs.writeFileSync("file.json", data);

module.exports = {
  name: "Gif Spell",
  description: "Sends gif",
  execute(msg, message) {
    msg = msg.toString().toLowerCase();
    message.channel.send(
      msg + " \nhttps://www.handspeak.com/word/" + msg[0] + "/" + msg + ".mp4"
    );
  },
};
