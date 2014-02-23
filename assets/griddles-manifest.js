/**
 * Griddles v0.0.12
 * (c) 2013-2014 daiz. https://github.com/daiz713/griddles
 * License: MIT
 */

var griddles = griddles || {};

 /* User settings */
griddles.msgLoading = "...griddles";

/* ３つのうちどれか一つをtrueにする */
griddles.chromeApp = false;
griddles.phonegap = false;
griddles.webPage = true;

griddles.layout = {
    "page_title": "griddles",
    "app_name": "Griddles",
    "app_icon": "icon.png",
    "background_color": "#eee",
    "card_width_px": 250,
    "card_height_px": 250,//"auto",
    "card_margin_bottom": 14,
    "stream_margin_left_px": 7,
    "stream_margin_right_px": 7,
    "available_width_percent": 95,
    "tooltip": "no",
    "cards": [
    ]
};

griddles.layout.cardOnClick = function(j) {
    console.log(j);
}