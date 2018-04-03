const fs = require("fs");
const embeds = require("../embed.js");
const yaml = require("../YAML.js");
const PermissionSystem = require("../PermissionSystem.js");

module.exports = {
  help: "",
  execute(label, args, msg) {

    var messages = yaml.createConfig(`servers/${msg.guild.id}/messages.yml`);

    var permuser = PermissionSystem.permissionUser(msg.member);
    if(!permuser.hasPermission("funny.rip")){
      embeds.error(msg.channel, msgs.get("no_permission").replaceAll("%user%", msg.member));;
      return;
    }

    if(!(args.length>0)){
      embeds.error(msg.channel,messages.get("command_needs_min_one_argument"));
      return;
    }



    if(!fs.existsSync(`servers/${msg.guild.id}/rip_msgs.json`))fs.writeFileSync(`servers/${msg.guild.id}/rip_msgs.json`, '{"rip_msgs":["Ruhe in Friede","Liebte die Ruhe","Wir vermissen dich","Einen zu viel getrunken"]}', 'utf-8');
    var rip = JSON.parse(fs.readFileSync(`servers/${msg.guild.id}/rip_msgs.json`, "utf8"));

    var raw = args.join(" ");
    var splits = new Array();
    splits[0] = raw.replaceAll(' ', '+');
    splits[1] = randomElement(rip.rip_msgs)
      .replaceAll(' ', '+');

    if(raw.includes(";")){
      var index = raw.indexOf(";");
      splits = [raw.slice(0,index).replaceAll(' ', '+'), raw.slice(index+1)
        .replaceAll(' ', '+')];
    }

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    }
    if(mm<10){
        mm='0'+mm;
    }
    today = dd+'.'+mm+'.'+yyyy;

    msg.channel.send(`http://www.tombstonebuilder.com/generate.php?top1=R.I.P.&top2=${splits[0]}&top3=${splits[1]}&top4=${today}&sp=`);
  }
}

function randomElement(array) {
  return array[random(0,array.length)];
}

function random(min,max) {
  return Math.floor((Math.random() * (max-min)) + min);
}
