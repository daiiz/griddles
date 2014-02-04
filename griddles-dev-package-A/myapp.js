var myApp = myApp || {};

myApp.load = function(e) {
   myApp.settingSelectBox(["fixed", "auto"]);
   for(var u = 0; u < 13; u++) {
      var arr = arr || [];
      arr.push({"id": "a"+u, "type": "user-img", "dataset": [["url", "hey"]], "init": "sample-images/"+(u+1)+".png"});
   }
   for(var u = 0; u < 13; u++) {
      var arr = arr || [];
      arr.push({"id": "i"+u, "type": "user-img", "dataset": [["url", "hey"]], "init": "sample-images/"+(u+1)+".png"});
   }
   for(var u = 0; u < 13; u++) {
      var arr = arr || [];
      arr.push({"id": "u"+u, "type": "user-img", "dataset": [["url", "hey"]], "init": "sample-images/"+(u+1)+".png"});
   }
   for(var u = 0; u < 13; u++) {
      var arr = arr || [];
      arr.push({"id": "e"+u, "type": "user-img", "dataset": [["url", "hey"]], "init": "sample-images/"+(u+1)+".png"});
   }
   for(var u = 0; u < 13; u++) {
      var arr = arr || [];
      arr.push({"id": "o"+u, "type": "user-img", "dataset": [["url", "hey"]], "init": "sample-images/"+(u+1)+".png"});
   }
   myApp.renderingCards(arr);
}

myApp.changedSelectBox = function(e) {
   var val = e.target.value;
   switch(val) {
     case "fixed": griddles.layout.card_height_px = 250;griddles.render = true;griddles.load();break;
     case "auto": griddles.layout.card_height_px = "auto";griddles.render = true;griddles.load();break;
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
    * cards == [{"id": "i0", "type": "user-img", "dataset": ["name", "A"], "init": "a.png"},
    *           {"id": "i1", "type": "user-img", "dataset": ["name", "B"], "init": "b.png"},
    *           {"id": "i2", "type": "user-img", "dataset": ["name", "C"], "init": "c.png"}]
    */
   griddles.layout.cards = cards;
   griddles.render = true;  /* important! */
   griddles.load();
}

window.addEventListener("load", myApp.load, false);
