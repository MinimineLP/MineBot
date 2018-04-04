/*
 *
 * This command is not available with guild permissions
 * It will must given per hand in a extra-file: global-permissions.json
 * Copyright Minimine 2018, Licensed under MIT
 *
 */

// Imports
const embeds = require("../embed.js");                        // Import Embeder
const yaml = require("../YAML.js");                           // Import YAML
const {permissionUser} = require("../PermissionSystem.js");   // Import permissionUser from PermissionSystem

const messages = yaml.createConfig("messages.yml");           // Call yaml to create the global messages config

module.exports = {                                            // Modules, that can called from othe classes
  execute: execute                                            // Export execute
}

function execute(label, args, msg) {                                                            // This function will be executed on run stop command
  if(!permissionUser(msg.author).hasGlobalPermission("system.stop")) {                          // Test if user has permissions for this
    embeds.error(msg.channel, messages.get("no_permission").replaceAll("%user%", msg.member));  // send error if not
    return;                                                                                     // and cancel
  }


  msg.channel.send(messages.get("shutdown"));                                                   // Send shutdown message

  console.log(`Shutdown by command by ${msg.author.tag} (${msg.author.id})`);                   // Log shutdown in console

  msg.client.user.setStatus("invisible").then(function() {                                      // Set online state to invisible
    setTimeout(function() {                                                                     // Then wait 100ms
      process.exit(0);                                                                          // Exit
    },100);
  });
}
