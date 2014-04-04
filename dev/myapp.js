// This is a sample.

var myApp = myApp || {};

myApp.load = function(e) {
   myApp.settingSelectBox(["fixed", "auto"]);
   var arr = arr || [];
   arr.push(griddles.card({"wide": true, "id": "msg0", "type": "default-text", "init": "Hello Griddles!", card: "#EEEE22", paddings: [26, 26, 26, 26]}));
   arr.push(griddles.card({"type": "default-caption-img", "dataset": [["hoge","hoge"],["cho","co"]], "init": "https://identicons.github.com/40b2bcc96299804ade6b438e85a0bb0e.png", "card": "#fff", "caption": "By daiz.", "caption_height_px": 30}));
   arr.push(griddles.card({"wide": true, "id": "author1", "type": "user-caption-img", "dataset": [["hoge","hoge"]], "init": "https://identicons.github.com/40b2bcc96299804ade6b438e85a0bb0e.png", "card": "#fff", "caption": "Hello!", "caption_height_px": 30}));
   arr.push(griddles.card({"id": "a0", "type": "default-caption-img", "dataset": [["hoge","hoge"]], "init": "sample-images/1.png", "card": false, "caption": "キャプション1（台紙なし）", "caption_height_px": 30, paddings: [0, 0, 0, 0]}));
   arr.push(griddles.card({"id": "a1", "type": "default-img", "dataset": [["hoge","hoge"]], "init": "sample-images/2.png"}));
   arr.push(griddles.card({"id": "a2", "type": "default-img", "dataset": [["hoge","hoge"]], "init": "sample-images/3.png"}));
   arr.push(griddles.card({"id": "a3", "type": "default-img", "dataset": [["hoge","hoge"]], "init": "sample-images/4.png"}));
   arr.push(griddles.card({"id": "a4", "type": "default-img", "dataset": [["hoge","hoge"]], "init": "sample-images/5.png"}));
   arr.push(griddles.card({"id": "msg1", "type": "default-text", "dataset": [["hoge","hoge"]], "init": "<b>Javascript!</b>", card: "#FFBB22", paddings: [36, 36, 36, 36], "color": "#fff"}));
   arr.push(griddles.card({"id": "test", "type": "my-test", "dataset": [["hoge","hoge"]], "init": "", "reservation_height": 300}));
   arr.push(griddles.card({"wide": true, "id": "a5", "type": "default-img", "dataset": [["hoge","hoge"]], "init": "sample-images/6.png"}));
   arr.push(griddles.card({"id": "a6", "type": "default-img", "dataset": [["hoge","hoge"]], "init": "sample-images/7.png"}));
   arr.push(griddles.card({"id": "a7", "type": "default-img", "dataset": [["hoge","hoge"]], "init": "sample-images/8.png", "reservation_height": 300}));
   arr.push(griddles.card({"id": "msg2", "type": "default-text", "dataset": [["hoge","hoge"]], "init": "つくりたいものをつくる", card: "#BBEE33"}));
   arr.push(griddles.card({"id": "a8", "type": "default-caption-img", "dataset": [["hoge","hoge"]], "init": "sample-images/9.png", "caption": "キャプション9", "caption_height_px": 30, "card": true}));
   arr.push(griddles.card({"id": "a9", "type": "default-img", "dataset": [["hoge","hoge"]], "init": "sample-images/10.png"}));
   arr.push(griddles.card({"wide": true, "id": "a10", "type": "default-img", "dataset": [["hoge","hoge"]], "init": "sample-images/11.png"}));
   arr.push(griddles.card({"id": "a11", "type": "default-img", "dataset": [["hoge","hoge"]], "init": "sample-images/12.png"}));
   arr.push(griddles.card({"id": "a12", "type": "default-img", "dataset": [["hoge","hoge"]], "init": "sample-images/13.png"}));
   arr.push(griddles.card({"id": "a13", "type": "default-img", "dataset": [["hoge","hoge"]], "init": "sample-images/13.png"}));
   arr.push(griddles.card({"wide": true, "id": "msg3", "type": "default-text", "dataset": [["hoge","hoge"]], "init": "<a href='https://github.com/daiz713/griddles' target='_blank'>View on GitHub</a>"}));
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
    * cards == [{"id": "i0", "type": "default-img", "dataset": ["name", "A"], "init": "a.png"},
    *           {"id": "i1", "type": "default-img", "dataset": ["name", "B"], "init": "b.png"},
    *           {"id": "i2", "type": "default-img", "dataset": ["name", "C"], "init": "c.png"}]
    */
   griddles.layout.cards = cards;
   griddles.render = true;  /* important! */
   griddles.load();
}

window.addEventListener("load", myApp.load, false);
