// const { json } = require("body-parser");
// let gif_add = fs.readFileSync("./commands/gifs-confirm.json", "utf8");
// let gifs = fs.readFileSync("./commands/gifs.json", "utf8");

// let data = {};
// try {
//   data = JSON.parse(gifs);
// } catch (err) {
//   console.log(err);
// }

// let gif_data = {};
// try {
//   gif_data = JSON.parse(gif_add);
// } catch (err) {
//   console.log(err);
// }

// module.exports = {
//   name: "Gif Spell",
//   description: "Sends gif",
//   execute(msg, message) {
//       console.log(msg)
//     if (msg[0] === ".confirm") {
//         let confirmed = data;
//         confirmed[msg[1]] = gif_data[msg[1]];
//         console.log("Data: ", gif_data[msg[1]]);
//
//         console.log("Confirmed: ", confirmed);
//         fs.writeFileSync("./commands/gifs.json", JSON.stringify(confirmed));

//         console.log("Gif data", gif_data);
//         message.channel.send(confirmed[msg[1]] + " is now confirmed");

//         let denied = gif_data;
//         delete denied[msg[1]];
//         fs.writeFileSync("./commands/gifs-confirm.json", JSON.stringify(denied));
//         gif_add = fs.readFileSync("./commands/gifs-confirm.json", "utf8");

//         gifs = fs.readFileSync("./commands/gifs.json", "utf8");

//         gif_data = JSON.parse(gif_add); // reparse the file since now it has become changed
//         data = JSON.parse(gifs);

//     } else if (msg[0] == ".deny") {
//         let denied = gif_data;
//         delete denied[msg[1]];

//         fs.writeFileSync("./commands/gifs-confirm.json", JSON.stringify(denied));

//         gifs = fs.readFileSync("./commands/gifs.json", "utf8");

//         data = JSON.parse(gifs);

//         message.channel.send(confirmed[msg[1]] + " is denied and deleted");
//     }
//   },
// };
