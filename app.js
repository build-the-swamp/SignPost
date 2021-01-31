const { prefix, token, admin } = require("./config.json");
const fs = require("fs");
const gif_db_file = fs.readFileSync("./commands/gifs-confirm.json", "utf8");
const fileContents = fs.readFileSync("./ASL.json", "utf8");
const Discord = require("discord.js");
const client = new Discord.Client();
const request = require("request");
const speech = require("@google-cloud/speech");

const { Transform, Readable } = require("stream");
const SILENCE = Buffer.from([0xf8, 0xff, 0xfe]);

class Silence extends Readable {
  _read() {
    this.push(SILENCE);
    this.destroy();
  }
}

function convertBufferTo1Channel(buffer) {
  const convertedBuffer = Buffer.alloc(buffer.length / 2);

  for (let i = 0; i < convertedBuffer.length / 2; i++) {
    const uint16 = buffer.readUInt16LE(i * 4);
    convertedBuffer.writeUInt16LE(uint16, i * 2);
  }

  return convertedBuffer;
}

class ConvertTo1ChannelStream extends Transform {
  constructor(source, options) {
    super(options);
  }

  _transform(data, encoding, next) {
    next(null, convertBufferTo1Channel(data));
  }
}

const TextToGifSign = require("./commands/gif-spell");
const TextToFingerSign = require("./commands/finger-spell");
const Add = require("./commands/add");

let data = {};
let gif_db = {};

try {
  gif_db = JSON.parse(gif_db_file);
} catch (err) {
  console.log(err);
}

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
    message.content.startsWith(prefix + "talk") &&
    message.member.voice.channel
  ) {
    const google_client = new speech.SpeechClient();
    const connection = await message.member.voice.channel.join();
    const receiver = connection.createReciever;
    connection.play(new Silence(), { type: "opus" }); // plays silent audio in the background

    connection.on("speaking", async (user, speaking) => {
      if (!speaking) {
        return;
      }
      //create 16-bit, stereo, 48Khz audio stream
      const audioStream = connection.receiver.createStream(user, {
        mode: "pcm",
      });
      const requestConfig = {
        encoding: "LINEAR16",
        sampleRateHertz: 48000,
        languageCode: "en-US",
      };
      const request = {
        config: requestConfig,
      };
      const recognizeStream = google_client
        .streamingRecognize(request)
        .on("error", console.error)
        .on("data", async (response) => {
          const transcription = response.results
            .map((result) => result.alternatives[0].transcript)
            .join("\n")
            .toLowerCase();

          let trans_message = "";
          trans_message = transcription;

          let msg_split = trans_message.split(" ");
          console.log("msg_split = ", msg_split);
          if (msg_split == "") return;
          for (let i = 0; i < msg_split.length; i++) {
            let is_valid = await IsValidLink(g_split[i].toLowerCase()); // goes and checks if the link were guessing is valid

            if (is_valid) {
              TextToGifSign.execute(msg_split, message); // If there is a gif for a specific word send it
            } else if (!is_valid) {
              if (gif_db[msg_split[i]] != undefined) {
                // checking if we have a gif in our database
                message.channel.send(gif_db[msg_split[i]]);
              } else TextToFingerSign.execute(msg_split[i], message, data); // If there is no gif in both our data base and our gif repo then send a word letter by letter
            } else {
              TextToFingerSign.execute(msg_split[i], message, data); // If the user wants letter by letter instead of gifs
            }
          }

          console.log(`Transcription: ${transcription}`);
        });

      //console.log(recognizeStream);

      const convertTo1ChannelStream = new ConvertTo1ChannelStream();

      audioStream.pipe(convertTo1ChannelStream).pipe(recognizeStream);
    }); //end connection.on()
    console.log(message.member.user.id);
  }

  if (message.content.startsWith(prefix + "add")) {
    msg_split = message.content.split(" "); // splits the sentence into different parts
    msg_split.shift();

    Add.execute(msg_split, message, client);
  }

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
      let is_valid = await IsValidLink(msg_split[i].toLowerCase()); // goes and checks if the link were guessing is valid

      if (is_valid && !letterOnly) {
        TextToGifSign.execute(msg_split[i], message); // If there is a gif for a specific word send it
      } else if (!is_valid && !letterOnly) {
        if (gif_db[msg_split[i]] != undefined)
          message.channel.send(gif_db[msg_split[i]]);
        // checking if we have a gif in our database
        else TextToFingerSign.execute(msg_split[i], message, data); // If there is no gif in both our data base and our gif repo then send a word letter by letter
      } else {
        TextToFingerSign.execute(msg_split[i], message, data); // If the user wants letter by letter instead of gifs
      }
    }
  }
});

client.login(token);
