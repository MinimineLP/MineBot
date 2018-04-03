/*
 * This file will be executed on programm-start.
 * It will add features to some of the Prototypes of objects
 */


String.prototype.replaceAll = function(search, replacement) {     // add String.replaceAll function.
    var target = this;                                            // save the target String in the var target
    return target.replace(new RegExp(search, 'g'), replacement);  //returm the result string
};

String.prototype.contains = function(search) {                    // String contains function. This function is the same as includes, but i like contains more
  return this.includes(search);                                   // Return if the String contains the search
};

Object.prototype.keys = function() {                              // JS-Object keys function returns the keys
  return Object.keys(this);                                       // Return Keys
};

Object.prototype.contains = function(key) {                       // Object contains function. This function is the same as includes, but i like contains more
  return key in this;                                             // Return if the Object contains the search
};

Object.prototype.foreach = function(f) {                          // Object contains function. This function is the same as includes, but i like contains more
  for(let key of this.keys()) {
    f(key, this[key]);
  }
};

Array.prototype.contains = function(search) {                     // Array contains function. This function is the same as includes, but i like contains more
  return this.includes(search);                                   // Return if the Array contains the search
};
