const filesystem = require("fs");
const embeds = require("./embed.js");
const yaml = require("./YAML.js");

const commands = {
  bahn: require("./commands/bahn.js"),
  clear: require("./commands/clear.js"),
  confirm: require("./commands/confirm.js"),
  help: require("./commands/help.js"),
  linkmail: require("./commands/linkEmail.js"),
  money: require("./commands/money.js"),
  music: require("./commands/music.js"),
  mute: require("./commands/mute.js"),
  permission: require("./commands/permission.js"),
  rip: require("./commands/rip.js"),
  say: require("./commands/say.js")
};

//Setup help
commands.help.setup(commands);

module.exports = {
  execute(label, args, msg) {
    var messages = yaml.createConfig(`servers/${msg.guild.id}/messages.yml`);
    var guildconfig = yaml.createConfig(`servers/${msg.guild.id}/config.yml`);

    if(label in commands){
      commands[label].execute(label, args, msg);
    }else{
      embeds.error(msg.channel,msg.member+"\n"+messages.get("message_command_not_found"));
    }
    if(guildconfig.get("delete_commands") == true)msg.delete();
  },
  register(cmd, value, help) {
    commands[cmd] = value;
  },
  getCommand(name) {
    if(name in commands){
      return commands[name];
    }else{
      return null;
    }
  },
  onMessage(msg) {
    var messages = yaml.createConfig(`servers/${msg.guild.id}/messages.yml`);
    var guildconfig = yaml.createConfig(`servers/${msg.guild.id}/config.yml`);

    var content = msg.content;
    var author = msg.member;
    var channel = msg.channel;
    var guild = msg.guild;

    if(content.startsWith(guildconfig.get("command_prefix"))) {
      var cmd = content.replace(guildconfig.get("command_prefix"), "");
      var parts = cmd.split(" ");
      var command = parts[0];
      var args = [];
      for(var i=1;i<parts.length;i++) {
        args[i-1]=parts[i];
      }

      module.exports.execute(command,args,msg);

    } else if(commands["mute"].isMuted(msg.author,msg.guild) == true){
      //msg.author.send("Sorry, but you are muted!");
      msg.delete();
    }
  },
  commands: "a"
}
