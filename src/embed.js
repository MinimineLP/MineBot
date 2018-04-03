//Imports
const { RichEmbed } = require("discord.js");
const yaml = require("./YAML.js");


//Create public Configs
const config = yaml.createConfig("config.yml");

const keepVars = {};

const colors = {
  red: 0xd50000,
  green: 0x64DD17,
  blue: 0x304FFE
}

module.exports = {
  error (channel, text, title="Error", textBefore="") {

    var emb = new RichEmbed()
      .setColor(colors.red)
      .setDescription(text)
      .setFooter(getFooter());

    if(title)emb.setTitle(title);

    var ret;

    if(textBefore)ret = channel.send(textBefore, emb);
    else ret = channel.send(emb);

    ret.then(message =>
        setTimeout(function() {
        message.delete();
      }, 5000));
    return ret;
  },
  success (channel, text, title="Success", textBefore="") {
    var emb = new RichEmbed()
      .setColor(colors.green)
      .setDescription(text)
      .setFooter(getFooter());

    if(title)emb.setTitle(title);

    var ret;

    if(textBefore)ret = channel.send(textBefore, emb);
    else ret = channel.send(emb);

    ret.then(message =>
        setTimeout(function() {
        message.delete();
      }, 5000));
    return ret;
  },
  info (channel, text, title="Info", textBefore="") {
    var emb = new RichEmbed()
      .setColor(colors.blue)
      .setDescription(text)
      .setFooter(getFooter());

    if(title)emb.setTitle(title);

    var ret;

    if(textBefore)ret = channel.send(textBefore, emb);
    else ret = channel.send(emb);

    ret.then(message =>
        setTimeout(function() {
        message.delete();
      }, 5000));
    return ret;
  },
  getFooter: getFooter

}
function getFooter() {
  return `MineBot, © Minimine 2017 - 2018  |  Need Support? https://discord.gg/bdJcejA`;
}
