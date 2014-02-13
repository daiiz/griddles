// This is a sample.

var myApp = myApp || {};

myApp.load = function(e) {
   myApp.settingSelectBox(["fixed", "auto"]);
   var arr = arr || [];
   arr.push({"id": "msg0", "type": "user-text", "dataset": [["hoge","hoge"]], "init": "Hello Griddles!", card: "#EEEE22"});
   arr.push({"id": "author", "type": "user-caption-img", "dataset": [["hoge","hoge"]], "init": "https://identicons.github.com/40b2bcc96299804ade6b438e85a0bb0e.png", "card": "#fff", "caption": "By daiz.", "caption_height_px": 30});
   arr.push({"id": "a0", "type": "user-caption-img", "dataset": [["hoge","hoge"]], "init": "sample-images/1.png", "card": false, "caption": "キャプション1（台紙なし）", "caption_height_px": 30});
   arr.push({"id": "a1", "type": "user-img", "dataset": [["hoge","hoge"]], "init": "sample-images/2.png"});
   arr.push({"id": "a2", "type": "user-img", "dataset": [["hoge","hoge"]], "init": "sample-images/3.png"});
   arr.push({"id": "a3", "type": "user-img", "dataset": [["hoge","hoge"]], "init": "sample-images/4.png"});
   arr.push({"id": "a4", "type": "user-img", "dataset": [["hoge","hoge"]], "init": "sample-images/5.png"});
   arr.push({"id": "msg1", "type": "user-text", "dataset": [["hoge","hoge"]], "init": "<b>Javascript!</b>", card: "#FFBB22"});
   arr.push({"id": "a5", "type": "user-img", "dataset": [["hoge","hoge"]], "init": "sample-images/6.png"});
   arr.push({"id": "a6", "type": "user-img", "dataset": [["hoge","hoge"]], "init": "sample-images/7.png"});
   arr.push({"id": "a7", "type": "user-img", "dataset": [["hoge","hoge"]], "init": "sample-images/8.png"});
   arr.push({"id": "msg2", "type": "user-text", "dataset": [["hoge","hoge"]], "init": "<b>HTML5</b>", card: "#BBE535"});
   arr.push({"id": "a8", "type": "user-caption-img", "dataset": [["hoge","hoge"]], "init": "sample-images/9.png", "caption": "キャプション9", "caption_height_px": 30, "card": true});
   arr.push({"id": "a9", "type": "user-img", "dataset": [["hoge","hoge"]], "init": "sample-images/10.png"});
   arr.push({"id": "a10", "type": "user-img", "dataset": [["hoge","hoge"]], "init": "sample-images/11.png"});
   arr.push({"id": "a11", "type": "user-img", "dataset": [["hoge","hoge"]], "init": "sample-images/12.png"});
   arr.push({"id": "a12", "type": "user-img", "dataset": [["hoge","hoge"]], "init": "sample-images/13.png"});
   arr.push({"id": "msg3", "type": "user-text", "dataset": [["hoge","hoge"]], "init": "<a href='https://github.com/daiz713/griddles' target='_blank'>View on GitHub</a>"});
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
