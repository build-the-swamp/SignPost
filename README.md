
# ASL Translation
This open source discord bot takes in audio or text and converts it to ASL either through gifs or hand-signed letters.
We apporoached this project with one goal in mind, to make Discord more accessible to those that are hard of hearing.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Installing Packages
```
npm install
```

### Installing

Setting up Google Cloud Speech-to-Text
```
Register for Google Cloud's Speech-to-Text API
Download private key as JSON
Set environment variable GOOGLE_APPLICATION_CREDENTIALS to JSON path (do every time you open your shell)
    Linux or macOS
        -> export GOOGLE_APPLICATION_CREDENTIALS="[PATH]"
    Windows
        -> $env:GOOGLE_APPLICATION_CREDENTIALS="[PATH]"
```

Setup Server Emojis
Change ASL.json to emoji ID's

## Running the tests

---Discord commands---
```
1. Type `/translate {sentence}` if you want gifs along with hand-signed letters. 
2. Type `/letter {sentence}` if you want only hand-signed letters without any gifs. 
3. Type `/add {word name} {gif link}` if you want to add a gif that may not be here you are welcome to use this command and our admins will look over the command to see if its valid. 
4. Type `/talk` If you would like to talk and have everything you say be converted into sign language, wherever you type `/talk` will be the channel where the bot sends the message. You must be in a voice channel for bot to work with you.
```


## Deployment

This bot can be deployed by inviting our current iteration of the bot.
If you don't want to personally set the bot up, contact one of the team members and we will help get the bot to your server.

## Built With

* [DiscordJS](https://discord.js.org/#/) - node.js module to interact with Discord API
* [Google Cloud](https://cloud.google.com/speech-to-text) - Speech to text API

## Contributing

This code is open source and anyone is free to expand upon it.

## Versioning

Version 1.0 - 1/31/2021

## License

Open Source

## Acknowledgments

Thanks to CSUN's SS12 CECS Accessibility Coding Competition Team and Sponsors!

