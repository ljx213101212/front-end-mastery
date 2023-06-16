//This is a ES6 function
const greetings = name => `hello ${name}`;

const newdiv = document.createElement('div');
newdiv.innerHTML = greetings("world");
document.body.appendChild(newdiv);
