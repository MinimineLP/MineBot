const filesystem = require("fs");
const yaml = require("../YAML.js");
const gmail = require("../Gmail/gmail.js")
const embeds = require("../embed.js");
const PermissionSystem = require("../PermissionSystem.js");

const config = yaml.createConfig("config.yml");

module.exports = {
  help: "",
  execute(label, args, msg) {
    var messages = yaml.createConfig(`servers/${msg.guild.id}/messages.yml`);

    var permuser = PermissionSystem.permissionUser(msg.member);
    if(!permuser.hasPermission("stuff.confirmmail")){
      embeds.error(msg.channel, msgs.get("no_permission").replaceAll("%user%", msg.member));;
      return;
    }

    if(!filesystem.existsSync(`servers/${msg.guild.id}/saves/mails.json`))filesystem.writeFileSync(`servers/${msg.guild.id}/saves/mails.json`, "{}", 'utf-8');;
    var mails = JSON.parse(filesystem.readFileSync(`servers/${msg.guild.id}/saves/mails.json`, "utf8"));

    if(!(args[0])){
      embeds.error(msg.channel, messages.get("message_wrong_synthax")+"\n\n  confirm <code>",messages.get("message_wrong_synthax"));
      return;
    }

    if(!mails.confirmcodes)mails.confirmcodes = {};
    if(!mails.user)mails.user = {};

    if(!mails.confirmcodes[args[0]]) {
      embeds.error(msg.channel,messages.get("code_not_exists"),"Error");
      return;
    }

    if(mails.confirmcodes[args[0]].user!=msg.member.id){
      embeds.error(msg.channel,messages.get("cant_confirm_this_code"),"Error");
      return;
    }

    var user = mails.confirmcodes[args[0]].user;
    var mail = mails.confirmcodes[args[0]].mail;

    delete mails.confirmcodes[args[0]];

    if(!mails.user[user])mails.user[user] = {};
    if(!mails.user[user].mails)mails.user[user].mails = [];

    mails.user[user].mails[mails.user[user].mails.length] = mail;

    filesystem.writeFileSync(`servers/${msg.guild.id}/saves/mails.json`, JSON.stringify(mails), 'utf-8');

    embeds.success(msg.channel, messages.get("mail_linked_to_account"),"Success");
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
