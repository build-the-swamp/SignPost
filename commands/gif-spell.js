module.exports = {
  name: "Gif Spell",
  description: "Sends gif",
  execute(msg, message) {
    message.channel.send(
      "https://www.handspeak.com/word/" + msg[0] + "/" + msg + ".mp4"
    );
  },
};
