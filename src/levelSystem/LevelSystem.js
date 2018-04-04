//Imports
const filesystem = require("fs");
const embeds = require("../embed.js");
const yaml = require("../YAML.js");

module.exports = {
  install(client) {
    client.on("message", onMessage);
    return client;
  },
  onMessage: onMessage,
  setXP: setXP,
  getXP: getXP,
  addXP: addXP,
  removeXP: removeXP,
  setLevel: setLevel,
  getLevel: getLevel,
  addLevel: addLevel,
  removeLevel: removeLevel
}

function onMessage(msg) {
  if(msg.channel.type == "dm" || msg.channel.type == "group" )return;

  var messages = yaml.createConfig(`servers/${msg.guild.id}/messages.yml`);
  var config = yaml.createConfig(`servers/${msg.guild.id}/config.yml`);

  if(msg.member.user.bot) return;
  if(config.get("min_level_message_length")>msg.content.length)return;

  addXP(msg.member, 1, msg.guild);
  checkLevelUp(msg.member, msg.guild, msg.channel);
}

function checkLevelUp(user, guild, channel) {
  var messages = yaml.createConfig(`servers/${guild.id}/messages.yml`);
  var xp = getXP(user, guild);
  var level = getLevel(user, guild);

  var needxp = Math.floor(level * Math.sqrt(Math.sqrt(Math.sqrt(level)))*10);

  if(xp>=needxp) {
    removeXP(user,needxp,guild);
    addLevel(user,1,guild);
    embeds.info(channel, messages.get("levelup").replaceAll("%user%", user).replaceAll('%level%', getLevel(user, guild)), "Levelup!");
    checkLevelUp(user, guild);
  }
}

function setXP(user, number, guild) {
  if(!filesystem.existsSync(`servers/${guild.id}/saves/level.json`))filesystem.writeFileSync(`servers/${guild.id}/saves/level.json`, "{}", 'utf-8');;
  var level = JSON.parse(filesystem.readFileSync(`servers/${guild.id}/saves/level.json`, "utf8"));

  if(!level.user)level.user={};
  if(!level.user.xp)level.user.xp={};
  level.user.xp[user.id]=number;

  filesystem.writeFileSync(`servers/${guild.id}/saves/level.json`, JSON.stringify(level), 'utf-8');
}
function getXP(user, guild) {
  if(!filesystem.existsSync(`servers/${guild.id}/saves/level.json`))filesystem.writeFileSync(`servers/${guild.id}/saves/level.json`, "{}", 'utf-8');;
  var level = JSON.parse(filesystem.readFileSync(`servers/${guild.id}/saves/level.json`, "utf8"));

  if(level.user)if(level.user.xp)if(level.user.xp[user.id])return level.user.xp[user.id];
  return 0;
}
function addXP(user, number, guild) {
  setXP(user, getXP(user,guild)+number, guild);
}
function removeXP(user, number, guild) {
  setXP(user, getXP(user,guild)-number, guild);
}

function setLevel(user, number, guild) {
  if(!filesystem.existsSync(`servers/${guild.id}/saves/level.json`))filesystem.writeFileSync(`servers/${guild.id}/saves/level.json`, "{}", 'utf-8');;
  var level = JSON.parse(filesystem.readFileSync(`servers/${guild.id}/saves/level.json`, "utf8"));

  if(!level.user)level.user={};
  if(!level.user.level)level.user.level={};
  level.user.level[user.id]=number;

  filesystem.writeFileSync(`servers/${guild.id}/saves/level.json`, JSON.stringify(level), 'utf-8');
}
function getLevel(user, guild) {
  if(!filesystem.existsSync(`servers/${guild.id}/saves/level.json`))filesystem.writeFileSync(`servers/${guild.id}/saves/level.json`, "{}", 'utf-8');;
  var level = JSON.parse(filesystem.readFileSync(`servers/${guild.id}/saves/level.json`, "utf8"));

  if(level.user)if(level.user.level)if(level.user.level[user.id])return level.user.level[user.id];
  return 1;
}
function addLevel(user, number, guild) {
  setLevel(user, getLevel(user,guild)+number, guild);
}
function removeLevel(user, number, guild) {
  setLevel(user, getLevel(user,guild)-number, guild);
}
