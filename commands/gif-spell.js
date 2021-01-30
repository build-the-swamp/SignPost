function TextToGifSign(msg, message)
{
    message.channel.send(msg);
    message.channel.send("https://www.handspeak.com/word/" + msg[0] + "/" + msg + ".mp4");
}