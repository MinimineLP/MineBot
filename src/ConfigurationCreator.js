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
messages.setStandart(`no_permission`, `Sorry, %user% but you aren't permitted to use this command!`);
messages.setStandart(`shutdown`, `Shutting down...`);
messages.setStandart(`not_programmed_for_answering_private_messages`, `Sorry, but I am not programmed for answering private Messages. You can just type a few commands in private channels to me, for example -stop. But this command is just for global Admins!`);
messages.save();
