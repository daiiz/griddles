var myApp = myApp || {};

myApp.load = function(e) {
   myApp.settingSelectBox(["a", "b", "c"]);
   for(var u = 0; u <=4; u++) {
      var arr = arr || [];
      arr.push({"id": "i"+u, "type": "user-text", "dataset": [], "init": "myApp"+u});
   }
   myApp.renderingCards(arr);
}

myApp.changedSelectBox = function(e) {
   var val = e.target.value;
   alert(val);
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
