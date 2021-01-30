module.exports = {
  name: "Letter Spell",
  description: "Convert text to direct letters",
  execute(msg, message, data) {
    let fin_message = "";
    for (let j = 0; j < msg.length; j++) {
      if (data[msg[j]]) fin_message = fin_message + " " + data[msg[j]];
    }
    message.channel.send(msg);
    message.channel.send(fin_message); // sends the final message
    fin_message = ""; // resets the message so there are no repetition
  },
};
