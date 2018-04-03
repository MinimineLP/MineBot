const fs = require("fs");
const yaml = require("./YAML.js");
const readlineSync = require('readline-sync');

const config = yaml.createConfig("config.yml");

if(!config.contains("TOKEN"))config.setStandart("TOKEN", readlineSync.question('Please enter the Bots Token: '));
if(!config.contains("owner"))config.setStandart("owner", readlineSync.question('Please enter the Bots Owner id: '));
if(!config.contains("email"))config.setStandart("email", readlineSync.question('Please enter the Bots Email account adress: '));
if(!config.contains("youtube_apikey"))config.setStandart("youtube_apikey", readlineSync.question('Please enter a youtube-api-key: '));
config.save();


var messages = yaml.createConfig(`messages.yml`);
messages.setStandart(`onReady`, `Connected!`);
messages.save();
