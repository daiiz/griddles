// This is a minimum sample.

var myApp = myApp || {};

myApp.load = function(e) {
  window.setTimeout(myApp.addInfoCard, 500);
}

myApp.addInfoCard = function() {
   griddles.layout.cards = [];
   // "<span style='font-size: 38px'>Hello, world!</span>"
   griddles.layout.cards.push(griddles.card({"init": griddles.getTemplate("hello")}));
   griddles.layout.cards.push(griddles.card({"color": "#52A2C5", "init": "<span style='font-size: 38px'>Ver 0.2.392<br></span>Code Name: nileblue<b></b><br>"}));
   griddles.layout.cards.push(griddles.card({"type": "default-caption-img", "caption": "GitHubページを開く", "dataset": [["url", "https://github.com/daiz713/griddles"]], "init": "imgs/GitHub_Logo.png"}));
   griddles.layout.cards.push(griddles.card({"type": "default-caption-img", "caption": "griddlesJSの記事を読む", "dataset": [["url", "http://daiiz.hatenablog.com/archive/category/griddles"]], "init": "imgs/hatena_blog.png"}));
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
    console.log(j.dataset);
    if(j.dataset.url != undefined) {
       griddles.openBrowserTab(j.dataset.url);
    }
    if(j.dataset.cardtype == "float") {
       var h;
       var f = document.getElementsByClassName("FloatCard");
       for(h = 0; h < f.length; h++) {
           griddles.removeFloatCard(f[h].id);
       }
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


myApp.navOnClick = function(j) {
  switch(j.value) {
    case "about": 
         if(document.getElementById("test") == null) {
            griddles.showFloatCard({height:100, marginTop: 0, id: "test"}, "<div data-cardtype='float'><img src='icon.png'>タップして閉じる</div>");
         }
         break;
    break;
  }  
}
document.getElementById("base_bar_text").innerHTML = griddles.layout.menu_items[0];
document.getElementById("page_icon").addEventListener("click", myApp.iconClicked, false);
window.addEventListener("load", myApp.load, false);
