//Imports
const { RichEmbed } = require("discord.js")
const embeds = require("../embed.js");
const yaml = require("../YAML.js");
const PermissionSystem = require("../PermissionSystem.js");

module.exports = {
  help: "",
  execute(label, args, msg) {
    var messages = yaml.createConfig(`servers/${msg.guild.id}/messages.yml`);

    var permuser = PermissionSystem.permissionUser(msg.member);
    if(!permuser.hasPermission("usefulcommands.say")){
      embeds.error(msg.channel, msgs.get("no_permission").replaceAll("%user%", msg.member));;
      return;
    }

    if(args.length>0){
      var emb = new RichEmbed()
        .setAuthor(msg.member.displayName, msg.member.user.avatarURL)
        .setColor(0x304FFE)
        .setDescription(args.join(" "))
        .setFooter(embeds.getFooter());
      msg.channel.send(emb);
    }
    else embeds.error(msg.channel,messages.get("message_argument_1_must_be_number"))
  }
}
