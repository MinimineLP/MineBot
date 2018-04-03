//Imports
const filesystem = require("fs");
const embeds = require("../embed.js");
const yaml = require("../YAML.js");

module.exports = {
  install(client) {
    client.on("message", onMessage);

    for ( let g of client.guilds ) {
      var guild = g[1];
      for( let c of guild.channels){
        channel = c[1];
        if(channel.type == voice){
          channel.on("")
        }
      }
    }

    return client;
  },
  setCoins: setCoins,
  getCoins: getCoins,
  addCoins: addCoins,
  removeCoins: removeCoins
}

function onMessage(msg) {
  var messages = yaml.createConfig(`servers/${msg.guild.id}/messages.yml`);
  var config = yaml.createConfig(`servers/${msg.guild.id}/config.yml`);

  if(msg.member.user.bot) return;
  if(config.get("min_coin_message_length")>msg.content.length)return;
  if(random(1,100/config.get("find_coin_chance"))!=1)return;

  var coins = random(config.get("min_coin_find"),config.get("max_coin_find"));

  addCoins(msg.member, coins, msg.guild);
  embeds.info(msg.channel, messages.get("found_coin_while_writing_message").replaceAll("%user%", msg.member).replaceAll('%number%', coins), "Found Coins");
}

function random(min,max) {
  return Math.floor((Math.random() * (max-min)) + min);
}


function setCoins(user, number, guild) {
  if(!filesystem.existsSync(`servers/${guild.id}/saves/money.json`))filesystem.writeFileSync(`servers/${guild.id}/saves/money.json`, "{}", 'utf-8');;
  var money = JSON.parse(filesystem.readFileSync(`servers/${guild.id}/saves/money.json`, "utf8"));

  if(!money.user)money.user={};
  money.user[user.id]=number;

  filesystem.writeFileSync(`servers/${guild.id}/saves/money.json`, JSON.stringify(money), 'utf-8');
}
function getCoins(user, guild) {
  if(!filesystem.existsSync(`servers/${guild.id}/saves/money.json`))filesystem.writeFileSync(`servers/${guild.id}/saves/money.json`, "{}", 'utf-8');;
  var money = JSON.parse(filesystem.readFileSync(`servers/${guild.id}/saves/money.json`, "utf8"));

  if(money.user)if(money.user[user.id])return money.user[user.id];
  return 0;
}
function addCoins(user, number, guild) {
  setCoins(user, getCoins(user,guild)+number, guild);
}

function removeCoins(user, number, guild) {
  setCoins(user, getCoins(user,guild)-number, guild);
}
