const embeds = require("../embed.js");
const yaml = require("../YAML.js");
const MoneySystem = require("../moneySystem/MoneySystem.js");
const PermissionSystem = require("../PermissionSystem.js");

module.exports = {
  help: "",
  execute(label, args, msg) {
    var permuser = PermissionSystem.permissionUser(msg.member);
    if(!permuser.hasPermission("money.money")){
      embeds.error(msg.channel, msgs.get("no_permission").replaceAll("%user%", msg.member));;
      return;
    }
    var messages = yaml.createConfig(`servers/${msg.guild.id}/messages.yml`);
    embeds.info(msg.channel, `Your balance are ${MoneySystem.getCoins(msg.member,msg.guild)} coins!`);
  }
}
