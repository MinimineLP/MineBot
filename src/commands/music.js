const filesystem = require("fs");
const embeds = require("../embed.js");
const ytdl = require('ytdl-core');
const request = require('sync-request');
const yaml = require("../YAML.js");
const PermissionSystem = require("../PermissionSystem.js");

const config = yaml.createConfig("config.yml");

const streamOptions = { seek: 0, volume: 1 };
var playing = null;
var toplay = new Array();
var pos = 0;

function play(user, url) {

  if(url.includes('&list=')) {
    var playlistid = "";
    var parts = url.split("&");
    for( let part of parts ){
      if(part.startsWith("list=")){
        playlistid = part.replace("list=", "");
      }
    }
    for( let item of getPlaylistContent(playlistid) ){
      toplay[toplay.length] = new music(user,item.snippet.resourceId.videoId);
    }
  } else {
    toplay[toplay.length] = new music(user,url);
  }


  if(playing == null)next();
}

function next() {
  if(playing != null) playing.end();
  if(toplay[pos]){
    var stream = ytdl(toplay[pos].url, { filter : 'audioonly' });
    toplay[pos].member.voiceChannel.join().then(function(connection) {
      var dispatcher = connection.playStream(stream, streamOptions).on("end", function(reason){
        connection.disconnect();
        playing = null;
        next();
      });
      playing = dispatcher;
    });
    var posi = pos;
    posi++;
    pos = posi;
  } else {
    playing = null;
  }
}

module.exports = {
  help: "",
  execute(label, args, msg) {
    var messages = yaml.createConfig(`servers/${msg.guild.id}/messages.yml`);

    if(!(args.length>1)){
      embeds.error(msg.channel, messages.get("music_command_needs_min_2_args"), "Error:").then(message => setTimeout(function() {
        message.delete();
      }, 5000));
      return;
    }
    switch(args[0]) {
      case "play":
        var permuser = PermissionSystem.permissionUser(msg.member);
        if(!permuser.hasPermission("stuff.music.play")){
          embeds.error(msg.channel, msgs.get("no_permission").replaceAll("%user%", msg.member));;
          return;
        }
        if(!msg.member.voiceChannel) {
          embeds.error(msg.channel, messages.get("must_be_in_voice_cannel"), "Error:").then(message => setTimeout(function() {
            message.delete();
          }, 5000));
          return;
        }

        play(msg.member, args[1])

        break;
      default:
        embeds.error(msg.channel, messages.get("this_subcommand_for_the_music_command_does_not_exists"), "Error:");
        break;
    }
  }
}
class music {
  constructor(member, url) {
    this.url=url;
    this.member = member;
  }
}
function getPlaylistContent(PLAYLIST_ID) {
  var API_KEY = config.get("youtube_apikey");
  var url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&key=${API_KEY}&maxResults=50`;
  var res = JSON.parse(request('GET', url).getBody('utf8'));
  return res.items;
}
