const fs = require(`fs`);
const yaml = require(`./YAML.js`);

module.exports = {
  create(guilds) {
    if(!fs.existsSync(`servers`))fs.mkdirSync(`servers`);
    for ( let g of guilds ) {

      var gid = g[0];
      if(!fs.existsSync(`servers/`+gid))fs.mkdirSync(`servers/`+gid);
      if(!fs.existsSync(`servers/${gid}/saves`))fs.mkdirSync(`servers/${gid}/saves`);
      if(!fs.existsSync(`servers/${gid}/saves`))fs.mkdirSync(`servers/${gid}/saves`);
      if(!fs.existsSync(`servers/${gid}/config.yml`))fs.writeFileSync(`servers/${gid}/config.yml`, `{}`, 'utf-8');

      var config = yaml.createConfig(`servers/${gid}/config.yml`);

      config.setStandart(`command_prefix`, `-`);
      config.setStandart(`delete_commands`, true);
      config.setStandart(`min_coin_message_length`, 10);
      config.setStandart(`find_coin_chance`, 10);
      config.setStandart(`max_coin_find`, 5);
      config.setStandart(`min_coin_find`, 1);
      config.setStandart(`min_level_message_length`, 10);
      config.save();

      var messages = yaml.createConfig(`servers/${gid}/messages.yml`);
      messages.setStandart(`message_command_not_found`, `That command couldn't be found!`);
      messages.setStandart(`message_deleted_messages`, `Successfully deleated %number% messages`);
      messages.setStandart(`message_argument_1_must_be_number`, `Argument 1 must be a number`);
      messages.setStandart(`must_be_in_voice_cannel`, `Sorry, but you mst be in a voice channel to execute this command`);
      messages.setStandart(`music_command_needs_min_2_args`, `Sorry, but the music command needs min two arguments`);
      messages.setStandart(`message_wrong_synthax`, `Sorry, you are using a wrong syntax! The Synthax is like this: `);
      messages.setStandart(`this_subcommand_for_the_music_command_does_not_exists`, `Sorry, but the music command needs min one argument`);
      messages.setStandart(`mail_sent`, `An email with a activation code has been sent. It can take a few minutes to arive!`);
      messages.setStandart(`cant_confirm_this_code`, `Sorry, but you can't confirm this code!`);
      messages.setStandart(`code_not_exists`, `Sorry, but this code does not exists!`);
      messages.setStandart(`mail_linked_to_account`, `The email address has been linked to the account!`);
      messages.setStandart(`mail_already_linked_with_account`, `This mail address is already linked with your account!`);
      messages.setStandart(`command_needs_min_one_argument`, `This command needs min one Argument!`);
      messages.setStandart(`found_coin_while_writing_message`, `Oh... %user% found %number% coin(s) under his Keyboard while writing a message!`);
      messages.setStandart(`levelup`, `Wow, %user%, you are already on level %level%!`);
      messages.setStandart(`no_permission`, `Sorry, %user% but you aren't permitted to use this command!`);
      messages.setStandart(`error_occured`, `Oh no, an error occured! Are you sure that you done everything correctly?`);
      messages.setStandart(`answer`, `%user%, here is your anwer: %answer%`);
      messages.setStandart(`permission_added`, `The permission has been added!`);
      messages.setStandart(`permission_removed`, `The permission has been removed!`);
      messages.setStandart(`train_starting`, `Starting train...!`);
      messages.setStandart(`train_delayed`, `%minutes% minutes delayed!`);
      messages.setStandart(`help_for`, `Help for command %command%`);
      messages.save();

      var help = yaml.createConfig(`servers/${gid}/help.yml`);
      help.setStandart(`bahn_help`, `type %prefix%bahn. This is a joke command.`);
      help.setStandart(`bahn_description`, `Shows a joke. Type %prefix%help bahn for more information`);
      help.setStandart(`clear_help`, `type %prefix%clear, to delete the last 100 messages in the chat.\n type -clear <number> to clear a specific number of messages!`);
      help.setStandart(`clear_description`, `Clears messages. Type %prefix%help clear for more information`);
      help.setStandart(`confirm_help`, `That commands confirms an email link Type %prefix%confirm <code>. You get your confirm code per email with the linkmail command!`);
      help.setStandart(`confirm_description`, `Confirms email link. Type %prefix%confirm for more information`);
      help.setStandart(`help_help`, `type %prefix%help for a list of all commands,\ntype %prefix%help <command> to get specific help for a command`);
      help.setStandart(`help_description`, `Shows help. Type %prefix%help help for more information`);
      help.setStandart(`linkmail_help`, `type %prefix%linkmail <mail>, to link an email with your account. You will get your confirmationcode by Email. This can take a few minutes`);
      help.setStandart(`linkmail_description`, `Links a Mail. Type %prefix%help linkmail for more information`);
      help.setStandart(`money_help`, `Type %prefix%money to see your balance.`);
      help.setStandart(`money_description`, `Money management-command. Type %prefix%help money for more information`);
      help.setStandart(`music_help`, `Type %prefix%music play <youtube-link> to add your favourite song to the bots playlist. You must be in a voice channel to do that.`);
      help.setStandart(`music_description`, `Plays music.  Type %prefix%help music for more information`);
      help.setStandart(`mute_help`, `Type %prefix%mute <tomute> <time(in sec)> <reason> to mute somebody.`);
      help.setStandart(`mute_description`, `Mutes a user. Type %prefix%help mute for more information`);
      help.setStandart(`permission_help`,
          `Type %prefix%permission user add <user> <permission> to give a user a permission. \n`
        + `Type %prefix%permission user remove <user> <permission> to take a permission from a user. \n`
        + `Type %prefix%permission user test <user> <permission> to test if a user has a permission. \n`
        + `Type %prefix%permission role add <user> <permission> to give a role a permission. \n`
        + `Type %prefix%permission role remove <user> <permission> to take a permission from a role. \n`
        + `Type %prefix%permission role test <user> <permission> to test if a role has a permission. \n`);
      help.setStandart(`permission_description`, `Manages server Permissions. Type %prefix%help permission for more information`);
      help.setStandart(`rip_help`, `Type %prefix%rip <name> to get a gravestone with the name and a random reason.\nType %prefix%rip <name>;<reason> to also define the reason. The name can bel longer than one word. The reason starts with the ";"! This is a joke command.`);
      help.setStandart(`rip_description`, `Shows a rip message. This is a joke command! Type %prefix%help mute for more information`);
      help.setStandart(`say_help`, `Type %prefix%say <message> to say something with the bot. The message can be longer than one word.`);
      help.setStandart(`say_description`, `Says something with the bot. This is a joke command! Type %prefix%help mute for more information`);
      help.setStandart(`stop_help`, `Type %prefix%stop stops the bot. The permission can't be given from guilds, just from the bot owner.`);
      help.setStandart(`stop_description`, `Stops the bot.Type %prefix%stop mute for more information`);
      help.save();

      if(!fs.existsSync(`servers/${gid}/rip_msgs.json`))fs.writeFileSync(`servers/${gid}/rip_msgs.json`, "{}", 'utf-8');;
      var rip = JSON.parse(fs.readFileSync(`servers/${gid}/rip_msgs.json`, "utf8"));
      if(!rip["rip_msgs"])rip["rip_msgs"] = [
        "Ruhe in Friede",
        "Liebte die Ruhe",
        "Wir vermissen dich",
        "Einen zu viel getrunken"
      ];
      fs.writeFileSync(`servers/${gid}/rip_msgs.json`, JSON.stringify(rip), 'utf-8');
    }
  }
}
