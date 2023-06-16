"use strict";

//This is a ES6 function
var greetings = function greetings(name) {
  return "hello ".concat(name);
};
var newdiv = document.createElement('div');
newdiv.innerHTML = greetings("world");
document.body.appendChild(newdiv);
