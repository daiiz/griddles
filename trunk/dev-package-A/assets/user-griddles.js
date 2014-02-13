/**
 * Griddles v0.0.7
 * (c) 2013-2014 daiz. https://github.com/daiz713/griddles
 * License: MIT
 */

var griddles = griddles || {};
griddles.msgLoading = "...griddles";

 /* User settings */
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