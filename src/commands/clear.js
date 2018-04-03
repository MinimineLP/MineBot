const filesystem = require("fs");
const yaml = require("../YAML.js");
const embeds = require("../embed.js");
const PermissionSystem = require("../PermissionSystem");

module.exports = {
  help: "",
  execute(label, args, msg) {
    var msgs = yaml.createConfig(`servers/${msg.guild.id}/messages.yml`);

    var permuser = PermissionSystem.permissionUser(msg.member);
    if(!permuser.hasPermission("usefulcommands.clear")){
      embeds.error(msg.channel, msgs.get("no_permission").replaceAll("%user%", msg.member));;
      return;
    }


    var number = 100;
    if(args[0])
      try {
        var number = parseInt(args[0]);
      } catch (e) {
        embeds.error(msg.channel, msgs.get("message_argument_1_must_be_number"), "Error:");
        return;
      }
    msg.channel.fetchMessages({ limit: number }).then(function(messages) {

      var currentdate = new Date();
      var deletable = 0;
      var MAX_AGE = 2 * 7 * 24 * 60 * 60 * 1000;


      for ( let entry of messages ) {
        if(entry[1].deletable && (((new Date) - entry[1].createdAt) < MAX_AGE ))deletable++;
      }
      if(deletable<0)deletable = 0;
      if(deletable>0)msg.channel.bulkDelete(deletable);
      setTimeout(function(){
        embeds.success(msg.channel, msgs.get("message_deleted_messages").replaceAll("%number%", deletable), "Success:");
      }, 10);
    });
  }
}
