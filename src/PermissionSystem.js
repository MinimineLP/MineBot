const filesystem = require("fs");

module.exports = {
  permissionUser: permissionUser,
  permissionRole: permissionRole
}
function permissionUser(user) {
  return new PermissionUser(user);
}
function permissionRole(role) {
  return new PermissionRole(role);
}

class PermissionUser {
  constructor(user) {
    this.user = user;
    this.guild = user.guild;
  }
  hasPermission(permission) {
    if(this.user.id == this.guild.ownerID)return true;
    if(!filesystem.existsSync(`servers/${this.guild.id}/permissions.json`))filesystem.writeFileSync(`servers/${this.guild.id}/permissions.json`, "{}", 'utf-8');;
    var permissions = JSON.parse(filesystem.readFileSync(`servers/${this.guild.id}/permissions.json`, "utf8"));

    if(!permissions.user) return false;
    if(!permissions.user[this.user.id])return false;

    if(permissions.user[this.user.id].includes("*"))return true;

    var parts = permission.split(".");
    for(var i=0;i<parts.length;i++) {
      var perm = "";
      for(var c=0;c<i;c++) {
        perm += parts[c]+".";
      }
      perm+="*";
      if(permissions.user[this.user.id].includes(perm))return true;
    }
    if(permissions.user[this.user.id].includes(permission))return true;

    var roles = this.user.roles;
    for(let entry of roles) {
      var role = entry[1];
      if(permissionRole(role).hasPermission(permission))return true;
    }


    return false;
  }
  addPermission(permission) {
    if(!filesystem.existsSync(`servers/${this.guild.id}/permissions.json`))filesystem.writeFileSync(`servers/${this.guild.id}/permissions.json`, "{}", 'utf-8');;
    var permissions = JSON.parse(filesystem.readFileSync(`servers/${this.guild.id}/permissions.json`, "utf8"));

    if(!permissions.user)permissions.user={};
    if(!permissions.user[this.user.id])permissions.user[this.user.id]=[];

    var perms = permissions.user[this.user.id];
    if(!perms.includes(permission))perms[perms.length] = permission;
    permissions.user[this.user.id] = perms;

    filesystem.writeFileSync(`servers/${this.guild.id}/permissions.json`, JSON.stringify(permissions), 'utf-8');
  }
  removePermission(permission) {
    if(!filesystem.existsSync(`servers/${this.guild.id}/permissions.json`))filesystem.writeFileSync(`servers/${this.guild.id}/permissions.json`, "{}", 'utf-8');;
    var permissions = JSON.parse(filesystem.readFileSync(`servers/${this.guild.id}/permissions.json`, "utf8"));

    if(!permissions.user)return false;
    if(!permissions.user[this.user.id])return false;

    if(permissions.user[this.user.id].includes(permission)){
      permissions.user[this.user.id].splice(permissions.groups[this.user.id].indexOf(permission),1);
      filesystem.writeFileSync(`servers/${this.guild.id}/permissions.json`, JSON.stringify(permissions), 'utf-8');
      return true;
    }

    return false;
  }
}
class PermissionRole {
  constructor(role) {
    this.role = role;
    this.guild = role.guild;
  }
  hasPermission(permission) {
    if(!filesystem.existsSync(`servers/${this.guild.id}/permissions.json`))filesystem.writeFileSync(`servers/${this.guild.id}/permissions.json`, "{}", 'utf-8');;
    var permissions = JSON.parse(filesystem.readFileSync(`servers/${this.guild.id}/permissions.json`, "utf8"));

    if(!permissions.groups) return false;
    if(!permissions.groups[this.role.id])return false;

    if(permissions.groups[this.role.id].includes("*"))return true;

    var parts = permission.split(".");
    for(var i=0;i<parts.length;i++) {
      var perm = "";
      for(var c=0;c<i;c++) {
        perm += parts[c]+".";
      }
      perm+="*";
      if(permissions.groups[this.role.id].includes(perm))return true;
    }
    if(permissions.groups[this.role.id].includes(permission))return true;

    return false;
  }
  addPermission(permission) {
    if(!filesystem.existsSync(`servers/${this.guild.id}/permissions.json`))filesystem.writeFileSync(`servers/${this.guild.id}/permissions.json`, "{}", 'utf-8');;
    var permissions = JSON.parse(filesystem.readFileSync(`servers/${this.guild.id}/permissions.json`, "utf8"));

    if(!permissions.groups)permissions.groups={};
    if(!permissions.groups[this.role.id])permissions.groups[this.role.id]=[];

    var perms = permissions.groups[this.role.id];
    if(!perms.includes(permission))perms[perms.length] = permission;
    permissions.groups[this.role.id] = perms;

    filesystem.writeFileSync(`servers/${this.guild.id}/permissions.json`, JSON.stringify(permissions), 'utf-8');
  }
  removePermission(permission) {
    if(!filesystem.existsSync(`servers/${this.guild.id}/permissions.json`))filesystem.writeFileSync(`servers/${this.guild.id}/permissions.json`, "{}", 'utf-8');;
    var permissions = JSON.parse(filesystem.readFileSync(`servers/${this.guild.id}/permissions.json`, "utf8"));

    if(!permissions.groups)return false;
    if(!permissions.groups[this.role.id])return false;

    if(permissions.groups[this.role.id].includes(permission)){
      permissions.groups[this.role.id].splice(permissions.groups[this.role.id].indexOf(permission),1);
      filesystem.writeFileSync(`servers/${this.guild.id}/permissions.json`, JSON.stringify(permissions), 'utf-8');
      return true;
    }

    return false;
  }
}
