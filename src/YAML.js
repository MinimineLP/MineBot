/*
 *  This is an easier way to parse YAML.
 *  It uses the js-yaml library
 *  If you want to use this part of the source code in your programm don't forget to add a replaceAll function
 *  To the prototype of String. One possibility to do tht can be found on src/fixPrototypes.js
 */

const YAML = require('js-yaml');  // Import the js-yaml library
const fs = require("fs");         // Import the fileystem

module.exports = {                // Vars and functions from in here are executable from other files
  createConfig: createConfig     // Bring the createConfig method in here
}
function createConfig(file) {     // With this function a config can be created
  return new config(file);        // Return a new config
}

// This is the config class. Its an configurable YAML file
class config {                                      // This is the config class
  constructor(file) {                               // The constructor function needs the file where the config will be. Its a String
    this.file=file;                                 // Copy the file variable into an inner var called file
    if(!fs.existsSync(file)){                       // This if clause will be executed if the file don't exists. It will create the file and his parrent directorys
      file = file.replace("\\", "/");               // In the file var all "\" will be replaced to "/"
      var parts = file.split("/");                  // Split the var in to parts on every "/"
      for(var i=1;i<parts.length;i++){              // For every part this will be executed
        var path = "";                              // Set the var path to ""
        for(var c=0;c<i;c++)                        // For the parts under the actual selected one this will be executed
          path += parts[c]+"/";                     // Add the selected part to the path
        if(!fs.existsSync(path))fs.mkdirSync(path); // Create the directory
      }
      fs.writeFileSync(file, "");                   // In the file will be written ""
    }
    this.load();                                    // The inner load function will be executed
  }

  // Load function. It expects nothing, but you can give a file (String) to it, so it will load the contents from this file
  load(file=this.file) {                                        // Load function. It expects nothing, but you can give a file (String) to it, so it will load the contents from this file
    this.content = YAML.safeLoad(fs.readFileSync(file,'utf8')); // Load the contents of the file into the inner var content
    if(this.content==null)this.content = {};                    // If the inner var content is null set it to "{}"
  }

  // Save function. It expects nothing, but you can give a file (String) to it, so it will save its contents into this file
  save(file=this.file) {                                        // Save function. It expects nothing, but you can give a file (String) to it, so it will save its contents into this file
    fs.writeFileSync(file, YAML.safeDump (this.content));       // Write the contents into te file
  }

  // Contains function. It will check if the YAML contains a key. It needs a path variable, that is the key. And you can give a Object to it, but you needn't.
  contains(path, obj=this.content) {                                                              // Contains function. It will check if the YAML contains a key. It needs a path variable, that is the key. And you can give a Object to it, but you needn't.
    var parts = path.split("\\.");                                                                // Split the path at every "." into a var called parts
    var subparts = new Array();                                                                   // Create a empty array called subparts
    if(obj.hasOwnProperty(parts[0])){                                                             // Check if the object contains parts index 0
      if(obj[parts[0]] instanceof Object)return this.contains(subparts.join("."), obj[parts[0]]); // If the var is an insance of an Object, return the result of the contains function.
      return true;                                                                                // Else return true
    }
    return false;                                                                                 // return false
  }

  // Get function. This function will you return content of the yaml
  get(path) {                                                                                     // Get function. This function will you return content of the yaml
    if(this.contains(path)) {                                                                     // Check if the YAML contents the path
      var parts = path.split("\\.");                                                              // Split the path at every "."
      var obj = this.content;                                                                     // set obj to the content of the YAML
      for(var i=0;i<parts.length;i++){                                                            // This will be runned for every part
        obj = obj[parts[i]];                                                                      // Set obj to a subpart of the obj
      }
      return obj;                                                                                 // Return the object
    } else {
      console.log(`Ooups... Trying to get empty path from YAML: "${path}" Returning null!`);      // If the object do not contains the key, log an error into the console
      return null;                                                                                // And return null
    }
  }

  // Set function. This Function sets a value of the YAML. It needs to values. The path and the value
  set(path, val) {                                                            // Set function. This Function sets a value of the YAML. It needs to values. The path and the value

    var parts = path.split(".");                                              // Split the path at every "."
    var obj = this.content;                                                   // Set the obj to the YAML content

    for(var i=0;i<parts.length-1;i++){                                        // Execute this for every part, but not the last
      if(!obj[parts[i]]||!(obj[parts[i]] instanceof Object))obj[parts[i]]={}; // If the subpart is not an object ore undefined set it to an empty object
      obj = obj[parts[i]];                                                    // Set the var obj to its subpart with index the actual part
    }

    var cmd = 'this.content["'+path.replaceAll('\\.', '"]["')+'"] = val;';    // Create a CMD String that contains JavaScript and sets the content
    eval(cmd);                                                                // Evecute the String as JavaScript. Dirty, but it works

  }

  // SetStandart function. This function works like set, but sets the value yust, when not already contained!
  setStandart(path, val) {                                                    // SetStandart function. This function works like set, but sets the value yust, when not already contained!
    if(!this.contains(path))this.set(path,val);                               // If the YAML not already contains  the path set it to the value.
  }
}
