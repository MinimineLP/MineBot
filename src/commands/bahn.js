//Imports
const embeds = require("../embed.js");
const yaml = require("../YAML.js");
const fs = require('fs');
const { RichEmbed } = require("discord.js");
const PermissionSystem = require("../PermissionSystem.js");

module.exports = {
  execute: execute
}
function execute(label, args, msg) {

  var messages = yaml.createConfig(`servers/${msg.guild.id}/messages.yml`);

  var permuser = PermissionSystem.permissionUser(msg.member);
  if(!permuser.hasPermission("funny.bahn")){
    embeds.error(msg.channel, msgs.get("no_permission").replaceAll("%user%", msg.member));;
    return;
  }

  var embed = new RichEmbed()
    .setColor(0x64DD17)
    .setDescription(messages.get("train_starting"))
    .setFooter(embeds.getFooter())
    .setTitle("Success")
    .setImage("attachment://bahn.png");
  var ret = msg.channel.send({ embed, files: [{ attachment: 'image/bahn.png', name: 'bahn.png' }] });
  ret.then(function(message) {
    setTimeout(function() {
      message.delete();
    }, 9000);
  });

  setTimeout(function() {
    embeds.info(msg.channel, messages.get("train_delayed")
      .replaceAll("%minutes%",random(1,6)*10));
  }, 5000);
}
function random(min,max) {
  return Math.floor((Math.random() * (max-min)) + min);
}
