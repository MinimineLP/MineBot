//Imports
const embeds = require("../embed.js");
const yaml = require("../YAML.js");
const PermissionSystem = require("../PermissionSystem.js");

commands = new Array();
module.exports = {
  execute(label, args, msg) {

    var messages = yaml.createConfig(`servers/${msg.guild.id}/messages.yml`);
    var config = yaml.createConfig(`servers/${msg.guild.id}/config.yml`);
    var help = yaml.createConfig(`servers/${msg.guild.id}/help.yml`);

    if(!(args.length>0)){
      var message = "";
      commands.foreach(function(index, cmd) {
        message += config.get("command_prefix")+cmd+" - "+help.get(cmd+"_description")+"\n";
      });
      embeds.info(msg.channel,message.replaceAll('%prefix%', config.get("command_prefix")));
      return;
    }

    if(!commands.contains(args[0])) {
      embeds.error(msg.channel,msg.member+"\n"+messages.get("message_command_not_found"));
      return;
    }

    embeds.info(msg.channel, help.get(args[0]+"_help").replaceAll('%prefix%', config.get("command_prefix")), messages.get("help_for").replaceAll('%command%', args[0]));
  },
  setup(cmds) {
    cmds.foreach(function(key, value) {
      commands[commands.length] = key;
    });
  }
}
