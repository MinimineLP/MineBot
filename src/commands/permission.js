//Imports
const embeds = require("../embed.js");
const yaml = require("../YAML.js");
const PermissionSystem = require("../PermissionSystem");

module.exports = {
  help: "",
  execute: execute
}

function execute(label, args, msg) {
  var messages = yaml.createConfig(`servers/${msg.guild.id}/messages.yml`); // Read Messages Configudation

  if(!(args.length > 3)) {                                                  // If the command has less than 3 arguments
    embeds.error(msg.channel, messages.get("message_wrong_synthax")
      +"\n\n  permission (user/role) (add/remove/test) <id> <permission>"); // Send error
    return;                                                                 // and cancel
  }

  switch (args[0]) {
    case "user":
      user(msg, args[1],args[2],args[3]);
      break;
    case "role":
      role(msg, args[1],args[2],args[3]);
      break;
    default:

  }


}
function user(msg, action, userid, permission) {
  var messages = yaml.createConfig(`servers/${msg.guild.id}/messages.yml`);   // Read Messages Configudation

  var sender = PermissionSystem.permissionUser(msg.member);                   // Create PermissionUser from the sender

  userid = userid                                                             // Fix @Metion
    .replaceAll('@','')
    .replaceAll('<','')
    .replaceAll('>','')
    .replaceAll(' ','')
    .replaceAll('&','');

  switch (action) {                                                           // If the first argument is one of the following strings, do its functions
    case "add":                                                               // permission user add <user> <permission>  |  Gives a permission to an user

      if(!sender.hasPermission("management.permission.user.add")){            // Test if the user is permitted to do that
        embeds.error(msg.channel, messages.get("no_permission")               // If not send an error
          .replaceAll("%user%", msg.member));
        return;                                                               // and cancel
      }

      msg.guild.client.fetchUser(userid).then(function(user) {                // Get user from id
        msg.guild.fetchMember(user).then(function(member) {                   // Get Member from user

          var target = PermissionSystem.permissionUser(member);               // Save Target in target
          target.addPermission(permission);                                   // Give Permission to target
          embeds.success(msg.channel, messages.get("permission_added"));      // Give Feedback

        }).catch(function(err) {                                              // Catch error
          embeds.error(msg.channel, msg.member+"\n"
            +messages.get("error_occured"));                                  // Send Message to user, that error occured
        });
      }).catch(function(err) {                                                // Catch error
        embeds.error(msg.channel, msg.member+"\n"
          +messages.get("error_occured"));                                    // Send Message to user, that error occured
      });


      break;
    case "remove":                                                            // permission user remove <user> <permission>  |  Removes a permission from an user
      if(!sender.hasPermission("management.permission.user.remove")){         // Test if the user is permitted to do that
        embeds.error(msg.channel, messages.get("no_permission")               // If not send an error
          .replaceAll("%user%", msg.member));
        return;                                                               // and cancel
      }

      msg.guild.client.fetchUser(userid).then(function(user) {                // Get user from id
        msg.guild.fetchMember(user).then(function(member) {                   // Get member from user

          var target = PermissionSystem.permissionUser(member);               // Save target in target
          target.removePermission(permission);                                // Give target permission
          embeds.success(msg.channel, messages.get("permission_removed"));    // Give Feedback

        }).catch(function(err) {                                              // Catch error
          embeds.error(msg.channel, msg.member+"\n"
            +messages.get("error_occured"));                                  // Send Message to user, that error occured
        });
      }).catch(function(err) {                                                // Catch error
        embeds.error(msg.channel, msg.member+"\n"
          +messages.get("error_occured"));                                    // Send Message to user, that error occured
      });
      break;
    case "test":                                                              // permission user test <user> <permission>  |  Tests if an user has an permission
      if(!sender.hasPermission("management.permission.user.test")){           // Test if the user is permitted to do that
        embeds.error(msg.channel, messages.get("no_permission")               // If not send an error
          .replaceAll("%user%", msg.member));
        return;                                                               // and cancel
      }

      msg.guild.client.fetchUser(userid).then(function(user) {                // Get User from id
        msg.guild.fetchMember(user).then(function(member) {                   // Get Member from User

          var target = PermissionSystem.permissionUser(member);               // Save the Target in the var Target
          embeds.info(msg.channel,messages.get("answer")                      // Give The anwer
            .replaceAll('%user%', msg.member)
            .replaceAll('%answer%', target.hasPermission(permission)));

        }).catch(function(err) {                                              // Catch error
          embeds.error(msg.channel, msg.member+"\n"
            +messages.get("error_occured"));                                  // Send Message to user, that error occured
        });
      }).catch(function(err) {                                                // Catch error
        embeds.error(msg.channel, msg.member+"\n"
          +messages.get("error_occured"));                                    // Send Message to user, that error occured
      });
      break;
    default:                                                                  // On wron synthax
      embeds.error(msg.channel, messages.get("message_wrong_synthax")
        +"\n\n  permission (user/role) (add/remove/test) <id> <permission>"); // Send wrong synthax error error
  }
}

function role(msg, action, roleid, permission) {
  var messages = yaml.createConfig(`servers/${msg.guild.id}/messages.yml`);   // Read Messages Configudation

  var sender = PermissionSystem.permissionUser(msg.member);                   // Create PermissionUser from the sender

  roleid = roleid                                                             // Fix @Metion
    .replaceAll('@','')
    .replaceAll('<','')
    .replaceAll('>','')
    .replaceAll(' ','')
    .replaceAll('&','');

  switch (action) {                                                           // If the first argument is one of the following strings, do its functions
    case "add":                                                               // permission user add <user> <permission>  |  Gives a permission to an user

      if(!sender.hasPermission("management.permission.role.add")){            // Test if the user is permitted to do that
        embeds.error(msg.channel, messages.get("no_permission")               // If not send an error
          .replaceAll("%user%", msg.member));
        return;                                                               // and cancel
      }


      var roles = msg.guild.roles;                                            // get Guild roles
      for(let entry of roles) {                                               // do for all roles
        if(entry[0]==roleid) {                                                // test if the role id is the same as the actual selected role
          PermissionSystem.permissionRole(entry[1])                           // Add permissions to the role
            .addPermission(permission);
          embeds.success(msg.channel, messages.get("permission_added"));      // Send success message
          return;                                                             // Cancel error
        }
      }
      embeds.error(msg.channel, msg.member+"\n"                               // If not canceled send error
        +messages.get("error_occured"));

      break;
    case "remove":                                                            // permission user remove <user> <permission>  |  Removes a permission from an user

      if(!sender.hasPermission("management.permission.role.remove")){         // Test if the user is permitted to do that
        embeds.error(msg.channel, messages.get("no_permission")               // If not send an error
          .replaceAll("%user%", msg.member));
        return;                                                               // and cancel
      }


      var roles = msg.guild.roles;                                            // get Guild roles
      for(let entry of roles) {                                               // do for all roles
        if(entry[0]==roleid) {                                                // test if the role id is the same as the actual selected role
          PermissionSystem.permissionRole(entry[1])                           // Add permissions to the role
            .removePermission(permission);
          embeds.success(msg.channel, messages.get("permission_removed"));      // Send success message
          return;                                                             // Cancel error
        }
      }
      embeds.error(msg.channel, msg.member+"\n"                               // If not canceled send error
        +messages.get("error_occured"));

      break;
    case "test":                                                              // permission user test <user> <permission>  |  Tests if an user has an permission
      if(!sender.hasPermission("management.permission.test")){                // Test if the user is permitted to do that
        embeds.error(msg.channel, messages.get("no_permission")               // If not send an error
          .replaceAll("%user%", msg.member));
        return;                                                               // and cancel
      }

      msg.guild.client.fetchUser(userid).then(function(user) {                // Get User from id
        msg.guild.fetchMember(user).then(function(member) {                   // Get Member from User

          var target = PermissionSystem.permissionUser(member);               // Save the Target in the var Target
          target.hasPermission(permission);                                   // And Give the Permission to the target


        }).catch(function(err) {                                              // Catch error
          embeds.error(msg.channel, msg.member+"\n"
            +messages.get("error_occured"));                                  // Send Message to user, that error occured
        });
      }).catch(function(err) {                                                // Catch error
        embeds.error(msg.channel, msg.member+"\n"
          +messages.get("error_occured"));                                    // Send Message to user, that error occured
      });
      break;
    default:                                                                  // On wron synthax
      embeds.error(msg.channel, messages.get("message_wrong_synthax")
        +"\n\n  permission (user/role) (add/remove/test) <id> <permission>"); // Send wrong synthax error error
  }
}
