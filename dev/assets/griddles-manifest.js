/**
 * Griddles v0.0.23b
 * (c) 2013-2014 daiz. https://github.com/daiz713/griddles
 * License: MIT
 */

var griddles = griddles || {};

 /* User settings */
griddles.msgLoading = "+griddles";

/* ３つのうちどれか一つをtrueにする */
griddles.chromeApp = false;
griddles.phonegap = false;
griddles.webPage = true;

griddles.layout = {
    "page_title": "griddles",
    "page_icon": "icon.png",
    "page_bar_color": "#000",       //New!
    "page_bar_bg_color": "#fff",    //New!
    "background_color": "#E5E5E5",
    "card_width_px": 250, //360
    "card_height_px": 250,/* OR "auto" */
    "card_paddings": [6, 6, 6, 6],    //New!
    "card_margin_bottom": 18,
    "stream_margin_left_px": 9,
    "stream_margin_right_px": 9,
    "available_width_percent": 95,
    "max_streams_limit": 2,   //New!
    "card_tooltip": false,          //Changed! true OR false
    "load_limit": 2,
    "cards": [
    ]
};

griddles.layout.cardOnClick = function(j) {
    console.log(j);
}

griddles.layout.scrollEnd = function() {
   return false;
}