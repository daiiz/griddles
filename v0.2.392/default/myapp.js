/* GriddlesJS
 * default design
 */
// This is a basic sample.

var myApp = myApp || {};

myApp.load = function(e) {
  window.setTimeout(myApp.addInfoCard, 500);
}

myApp.addInfoCard = function() {
   griddles.layout.cards = [];
   /* 表示したいカードを追加します。 */
   griddles.layout.cards.push(griddles.card({"card": "#FFF", "pushStyle": "append", "init": griddles.getTemplate("hello")}));
   griddles.render = true;
   griddles.load();
}

myApp.addCard = function() {
   griddles.layout.cards.push(griddles.card({"pushStyle": "prepend", "card": "#fff", "init": "Added card"}));
   griddles.update();
}

myApp.cardOnClick = function(j) {
   griddles.showToast();
}

myApp.menuOnChange = function(j) {
   if(j == griddles.layout.menu_items[0]) {
        griddles.layout.cards = [];
        myApp.addInfoCard();
   }
}

myApp.scrollEnd = function() {
   return true;
}

myApp.navOnClick = function(j) {
}

window.addEventListener("load", myApp.load, false);