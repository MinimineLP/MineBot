/*
 *
 *  MineBot Main file
 *  Licensed under MIT, see LICENSE file
 *  Copyright (c) Minimine 2017-2018
 *
 */

 //Run external pre-inits
 require("./fixPrototypes");                                  // Fix the object Prototypes
 require("./ConfigurationCreator.js");                        // Run the ConfigurationCreator

//Imports
const discord = require("discord.js");                        // Import the discord.js library
const commands = require("./commands.js");                    // Import the command manager
const yaml = require("./YAML.js");                            // Import the YAML interface
const MoneySystem = require("./moneySystem/MoneySystem.js");  // Import the MoneySystem
const LevelSystem = require("./levelSystem/LevelSystem.js");  // Import the LevelSystem
const filesystem = require("./filesystem");                   // Import the filesystem Creator

//Create configs
const config = yaml.createConfig("config.yml");     // Call yaml to create the global config
const messages = yaml.createConfig("messages.yml"); // Call yaml to create the global messages config

//Get Start arguments
var db = false;                                     // Set the temporary var db to false
process.argv.forEach(function (val, index, array) { // Run this function for every start argument
  if(val == "debug")db = true;                      // If the argument is "debug" set db to true
});
const debug = db;                                   // Give the constant var debug the value of db

//Create discord Client
var client = new discord.Client();                  // Create Client

client = MoneySystem.install(client);               // Install the MoneySystem on the Client
client = LevelSystem.install(client);               // Install the LevelSystem on the Client

//Register events
client.on("ready", function() {                     // Ready event. Will be executed when bot is online
  client.user.setStatus("online");                  // Set online Status
  filesystem.create(client.guilds);                 // Create the folder system that every guild has own configuration possibilitys and saves
  console.log(messages.get("onReady"));             // Log, that the bot is online
});

client.on("message", function(msg) {                // Message event. Here it is used to parse commands
    commands.onMessage(msg);                        // Execute "src/commands.js" the "onMessage()" function.
});

client.login(config.get("TOKEN"));                  // Login bot with the token that is defined in the config
