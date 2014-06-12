// This is a minimum sample.

var myApp = myApp || {};

myApp.load = function(e) {
  window.setTimeout(myApp.addInfoCard, 500);
}

myApp.addInfoCard = function() {
   griddles.layout.cards = [];
   griddles.layout.cards.push(griddles.card({"init": "<span style='font-size: 38px'>Hello, world!</span>"}));
   griddles.layout.cards.push(griddles.card({"init": "<span style='font-size: 38px'>Ver 0.1.103<br></span>Code Name: <b>クロムイエロー</b><br>"}));
   griddles.layout.cards.push(griddles.card({"type": "default-caption-img", "caption": "GitHubページを開く", "dataset": [["url", "https://github.com/daiz713/griddles"]], "init": "imgs/GitHub_Logo.png"}));
   griddles.layout.cards.push(griddles.card({"type": "default-caption-img", "caption": "griddlesJSの記事を開く", "dataset": [["url", "http://daiiz.hatenablog.com/archive/category/griddles"]], "init": "imgs/hatena_blog.png"}));
   griddles.render = true;  /* important! */
   griddles.load();
}

myApp.addCard = function() {
   griddles.layout.cards.push(griddles.card({"pushStyle": "prepend", "card": "#F3D51A", "init": "<span style='font-size: 38px'>カラーカード</span>"}));
   griddles.layout.cards.push(griddles.card({"pushStyle": "prepend", "card": false, "init": "<span style='font-size: 38px'>台紙なしカード</span>"}));
   griddles.update();
}

myApp.cardOnClick = function(j) {
    griddles.showLeftBottomBtn();
    if(j.dataset.url != undefined) {
       griddles.openBrowserTab(j.dataset.url);
    }
}

myApp.menuOnChange = function(j) {
   if(j == griddles.layout.menu_items[1]) {
        griddles.layout.cards = [];
        var arr = griddles.layout.cards;
        for(var i = 0; i < 100; i++) {
           arr.push(griddles.card({"init": "", "reservation_height": Math.floor(Math.random()*200), "card": "#fff"}));
        }
        griddles.render = true;
        griddles.load();
    }
    if(j == griddles.layout.menu_items[2]) {
        griddles.layout.cards = [];
        var arr = griddles.layout.cards;
        for(var i = 0; i < 100; i++) {
           arr.push(griddles.card({"init": i, "reservation_height": Math.floor(Math.random()*200), "card": "#"+Math.floor(Math.random()*0xFFFFFF).toString(16)}));
        }
        griddles.render = true;
        griddles.load();
    }
    if(j == griddles.layout.menu_items[0]) {
        griddles.layout.cards = [];
        myApp.addInfoCard();
    }
}

myApp.scrollEnd = function() {
   var arr = griddles.layout.cards;
   for(var i = 0; i < 100; i++) {
       arr.push(griddles.card({"init": i, "reservation_height": Math.floor(Math.random()*200), "card": "#"+Math.floor(Math.random()*0xFFFFFF).toString(16)}));
   }
   return true;
}


document.getElementById("base_bar_text").innerHTML = griddles.layout.menu_items[0];
window.addEventListener("load", myApp.load, false);
