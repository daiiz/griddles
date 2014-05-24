// This is a minimum sample.

var myApp = myApp || {};

myApp.load = function(e) {
   document.getElementById("select_menu").innerHTML = "<option value=''>Hello, world!</option>";
   griddles.layout.cards.push(griddles.card({"init": "<span style='font-size: 38px'>Hello, world!</span>"}));
   griddles.layout.cards.push(griddles.card({"init": "<span style='font-size: 38px'>stable 0.0.36</span>"}));
   griddles.render = true;  /* important! */
   griddles.load();
}

window.addEventListener("load", myApp.load, false);
