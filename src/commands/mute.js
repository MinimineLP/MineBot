const filesystem = require("fs");
const embeds = require("../embed.js");
const yaml = require("../YAML.js");
const PermissionSystem = require("../PermissionSystem.js");

module.exports = {
  help: "",
  execute(label, args, msg) {
    var messages = yaml.createConfig(`servers/${msg.guild.id}/messages.yml`);

    var permuser = PermissionSystem.permissionUser(msg.member);
    if(!permuser.hasPermission("moderation.mute")){
      embeds.error(msg.channel, msgs.get("no_permission").replaceAll("%user%", msg.member));;
      return;
    }

    if(!filesystem.existsSync(`servers/${msg.guild.id}/saves/mutes.json`))filesystem.writeFileSync(`servers/${msg.guild.id}/saves/mutes.json`, "{}", 'utf-8');;
    var mutes = JSON.parse(filesystem.readFileSync(`servers/${msg.guild.id}/saves/mutes.json`, "utf8"));

    if(args.length>2) {

      var time = new Date().getTime();
      var user = args[0]                                                            // Fix @Metion
        .replaceAll('@','')
        .replaceAll('<','')
        .replaceAll('>','')
        .replaceAll(' ','')
        .replaceAll('&','');
      var muter = msg.author.id;
      var reason = "";

      if(args[1]=="LIFETIME")mutedfor = -1;
      else try {
        mutedfor = parseInt(args[1]);
      } catch (e) {
        embeds.error(msg.channel, messages.get("message_argument_1_must_be_number"), "Error:").then(message => setTimeout(function() {
          message.delete();
        }, 5000));
        return;
      }

      for(var i = 2; i<args.length; i++)reason += " "+args[i];
      reason = reason.replace(" ", "");

      mutes[user] = {}
      mutes[user].by = muter;
      mutes[user].for = mutedfor;
      mutes[user].at = time;
      mutes[user].reason = reason;

      filesystem.writeFileSync(`servers/${msg.guild.id}/saves/mutes.json`, JSON.stringify(mutes), 'utf-8');

    } else {
      embeds.error(msg.channel, messages.get("message_wrong_synthax")+"\n\n  mute <id> <time> <reason>",messages.get("message_wrong_synthax"));
    }
  },
  isMuted(user,guild) {
    if(!filesystem.existsSync(`servers/${guild.id}/saves/mutes.json`))filesystem.writeFileSync(`servers/${guild.id}/saves/mutes.json`, "{}", 'utf-8');;
    var mutes = JSON.parse(filesystem.readFileSync(`servers/${guild.id}/saves/mutes.json`, "utf8"));

    var id = user.id;
    if(id in mutes) {

      if(mutes[id].for == -1)return true;
      else {
        if((mutes[id].at + (mutes[id].for * 1000) < new Date().getTime()))return true;
        else return false;
      }

    } else {
      return false;
    }
  }
}
