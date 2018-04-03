const filesystem = require("fs");
const yaml = require("../YAML.js");
const gmail = require("../Gmail/gmail.js")
const embeds = require("../embed.js");
const PermissionSystem = require("../PermissionSystem.js");

module.exports = {
  help: "",
  execute(label, args, msg) {
    var messages = yaml.createConfig(`servers/${msg.guild.id}/messages.yml`);
    var config = yaml.createConfig(`servers/${msg.guild.id}/config.yml`);

    var permuser = PermissionSystem.permissionUser(msg.member);
    if(!permuser.hasPermission("stuff.linkmail")){
      embeds.error(msg.channel, msgs.get("no_permission").replaceAll("%user%", msg.member));;
      return;
    }

    if(!filesystem.existsSync(`servers/${msg.guild.id}/saves/mails.json`))filesystem.writeFileSync(`servers/${msg.guild.id}/saves/mails.json`, "{}", 'utf-8');;
    var mails = JSON.parse(filesystem.readFileSync(`servers/${msg.guild.id}/saves/mails.json`, "utf8"));

    if(!(args[0])){
      embeds.error(msg.channel, messages.get("message_wrong_synthax")+"\n\n  linkmail <mail>",messages.get("message_wrong_synthax"));
      return;
    }
    if(!args[0].includes("@")){
      embeds.error(msg.channel, messages.get("message_wrong_synthax")+"\n\n  linkmail <mail>",messages.get("message_wrong_synthax"));
      return;
    }
    console.log(msg.member.id);
    if(mails.user)
      if(mails.user[msg.member.id])
        if(mails.user[msg.member.id].mails)
          if(mails.user[msg.member.id].mails.includes(args[0])) {
      embeds.error(msg.channel, messages.get("mail_already_linked_with_account"));
      return;
    }

    var confirmcode = guid();

    if(!mails.confirmcodes)mails.confirmcodes = {};
    mails.confirmcodes[confirmcode] = {};
    mails.confirmcodes[confirmcode].user = msg.member.id;
    mails.confirmcodes[confirmcode].mail = args[0];

    filesystem.writeFileSync(`servers/${msg.guild.id}/saves/mails.json`, JSON.stringify(mails), 'utf-8');

    gmail.writeMail(args[0],"",'Email confirmation',`Here is your confirmation-code: ${confirmcode}<br>type "${config.get("command_prefix")}confirm ${confirmcode}" to activate the account!`,`Here is your confirmation-code: ${confirmcode}type "${config.get("command_prefix")}activate ${confirmcode}" to activate the account!`);

    embeds.success(msg.channel, messages.get("mail_sent"),"Success");
  }
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
