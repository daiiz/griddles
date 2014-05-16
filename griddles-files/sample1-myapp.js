// This is a sample.

var myApp = myApp || {};

myApp.load = function(e) {
   myApp.settingSelectBox(["ストリーム数: 制限なし", "ストリーム数： 2"]);
   griddles.layout.card_width_px = Math.floor(Math.random()*250);
   var arr = arr || [];
   arr.push(griddles.card({"type": "default-img", "init": "icon.png", "id": "myImg"}));
   for(var i = 0; i < 300; i++) {
       arr.push(griddles.card({"reservation_height": Math.floor(Math.random()*200), "card": "#"+Math.floor(Math.random()*0xFFFFFF).toString(16)}));
   }
   myApp.renderingCards(arr);
}

myApp.changedSelectBox = function(e) {
   var val = e.target.value;
   switch(val) {
     case "ストリーム数： 2": griddles.layout.max_streams_limit = 2;griddles.render = true;griddles.load();break;
     case "ストリーム数: 制限なし": griddles.layout.max_streams_limit = false;griddles.render = true;griddles.load();break;
   }
}

myApp.settingSelectBox = function(options) {
    /* e.g. options == ["a", "b", "c"] */
    var optionTags = "";
    for(var i = 0; i < options.length; i++) {
       var opt = options[i];
       optionTags = optionTags + '<option value="'+ opt +'">'+ opt +'</option>';
    }
    document.getElementById("select_menu").innerHTML = optionTags;
    document.getElementById("select_menu").addEventListener("change", myApp.changedSelectBox, false);
}

myApp.renderingCards = function(cards) {
   /* e.g
    * cards == [{"id": "i0", "type": "default-img", "dataset": ["name", "A"], "init": "a.png"},
    *           {"id": "i1", "type": "default-img", "dataset": ["name", "B"], "init": "b.png"},
    *           {"id": "i2", "type": "default-img", "dataset": ["name", "C"], "init": "c.png"}]
    */
   griddles.layout.cards = cards;
   griddles.render = true;  /* important! */
   griddles.load();
}

window.addEventListener("load", myApp.load, false);
