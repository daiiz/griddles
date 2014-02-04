/**
 * Griddles v0.0.2
 * (c) 2013-2014 daiz. https://github.com/daiz713/griddles
 * License: MIT
 */
 
var griddles = griddles || {};
 
/* Renderer */
var d = document;
var scrollbar_width = 15;

griddles.stream_num = 0;
griddles.pre_width = 0;
griddles.render = false;

griddles.load = function() {
    d.getElementById("app_icon").src = griddles.layout.app_icon;
    d.getElementById("app_name").innerHTML = griddles.layout.app_name;
    
    var aw = griddles.layout.available_width_percent / 100;
    var ww = window.innerWidth;
    if (ww != griddles.pre_width || griddles.render == true) {
        console.log("resized!");
        
        window.clearTimeout(griddles.mainTimer);
        var n = document.getElementsByClassName("Stream").length;
        for(g = 0; g < n; g++) {
          d.getElementById("stream_" + g).innerHTML = "";
        }
        console.log("stream cleared");
        
        
        griddles.pre_width = ww;
        griddles.render = false;
        
        var si = "stage";
        var w85pc = Math.floor(ww * aw - scrollbar_width);
        var sw = griddles.layout.card_width_px;
        var sl = griddles.layout.stream_margin_left_px;
        var sr = griddles.layout.stream_margin_right_px
        var max_stream_nums = Math.floor((w85pc) / (sl + sw + sr));
        
        var left = (w85pc) - (max_stream_nums * (sl + sw + sr));
        var margin_left = Math.floor(left / 2);
        console.log("stream: " + max_stream_nums);

        if (max_stream_nums > 0) {
            document.getElementById("main").style.width = aw * 100 + "%";
            document.getElementById("stage").style.marginLeft = (margin_left) + "px";  /* -sl*/
            griddles.renderStream(max_stream_nums, sw, [griddles.layout.stream_margin_left_px + "px", griddles.layout.stream_margin_right_px+ "px"]);
        } else {
            var lr = (ww - scrollbar_width) -sw;
            if (lr > 0) {
                lf = lr / 2;
            } else {
                lf = 0;
            }
            document.getElementById("main").style.width = 100 + "%";
            document.getElementById("stage").style.marginLeft = 0 + "px";
            griddles.renderStream(1, sw, [lf + "px", lf + "px"]);
        }
    }
}
griddles.renderStream = function(n, w, a) {
    var y;
    w = w + "px";
    var dom = "";
    for (y = 0; y < n; y++) {
        dom = dom + '<div id="stream_' + y + '" class="Stream" style="width:' + w + ';margin-left:' + a[0] + ';margin-right:' + a[1] + ';"></div>';
    }
    d.getElementById("stage").innerHTML = dom;
    griddles.stream_num = n;
    //griddles.renderCards(n);
    griddles.renderCardsAuto(n);
}

griddles.renderCardsAuto = function(n) {
    var stream_num = n;
    var cards = griddles.layout.cards;
    var lg = cards.length;
    if(lg > 0) { 
        var doms = [];
        var streamHeights = [];
        streamHeights = griddles.setStreamHeights(n);
        d.getElementsByTagName("title")[0].innerHTML = griddles.msgLoading;
        griddles.renderTime(0, lg, cards, n);
    }
}

griddles.renderTime = function(y, lg, cards, n) {
     streamHeights = griddles.setStreamHeights(n);
     intMinStream = griddles.getMinStream(streamHeights);
     if(y == 0) {
        for(g = 0; g < n; g++) {
          d.getElementById("stream_" + g).innerHTML = "";
        }
     }
     var content = griddles.createContent(cards, y);
     $(d.getElementById("stream_" + intMinStream)).append(content);
     
     griddles.mainTimer = window.setTimeout(function() {
        if(y+1 < lg) {
           griddles.renderTime(y+1, lg, cards, n);
        }else {
           d.getElementsByTagName("title")[0].innerHTML = griddles.layout.page_title;
        }
     }, 100);
}

griddles.setStreamHeights = function(n) {
    var res = [];
    for (var x = 0; x < n; x++) {
        res.push(document.getElementById("stream_"+x).offsetHeight);
    }
    console.log(res);
    return res;
}

griddles.getMinStream = function(a) {
    var min_index = 0;
    var min_value = a[min_index];
    for(var e = 0; e < a.length; e++) {
       if(a[e] < min_value) {
          min_index = e;
          min_value = a[e];
       }
    }
    console.log(min_index);
    return min_index;
}


griddles.createContent = function(cards, y) {
             var content = "";
             var w = griddles.layout.card_width_px;
             var h = "height:" + griddles.layout.card_height_px + "px";
             var b = griddles.layout.card_margin_bottom;
             var init = (cards[y]).init;
             var type = (cards[y]).type;
             var id = (cards[y]).id;
             var ds = (cards[y]).dataset;
             var dsr = "";
             /* datasetを生成 */
             for (var q = 0; q < ds.length; q++) {
                dsr = dsr + "data-" + ds[q][0] + "='" + ds[q][1] + "';";
             }
             if (griddles.layout.tooltip == "yes" && (init.search(/^http/i) == -1)) {
                var tit = "title='" + init + "';";
             } else {
                var tit = "";
             }
             
             if (griddles.layout.card_height_px != "auto") {
                var hh = "height: " + (griddles.layout.card_height_px - 6) + "px!important;";
             } else {
                var h = "";
                var hh = "";
             }
             var v = "";
             var vv = "";
             var ww = griddles.layout.card_width_px - 6;
             switch (type) {
                case "user-img":
                    init = "<img src='" + init + "' style='width:" + ww + "px!important;"+hh+"' class='img' id='" + id + "' " + dsr + ">"; 
                    id = "";
                    card_id = 'id="card_' + y + '"';
                    dsr = "";
                    break;
                case "user-text":
                    v = "padding: 15px; font-size:11pt; font-family: 'Open Sans',Meiryo;";
                    vv = 'style="width:100%; height: 100%;"';
                    id = 'id="' + id + '"';
                    card_id = 'id="card_' + y + '"';
                    break;
                case "user-free":
                    v = "font-family: 'Open Sans' ,Meiryo;";
                    vv = 'style="width:100%; height: 100%;"';
                    id = 'id="' + id + '"';
                    card_id = 'id="card_' + y + '"';
                    break;
                default:
                    vv = 'style="width:100%; height: 100%;"';
                    id = 'id="' + id + '"';
                    card_id = 'id="card_' + y + '"';
                    break;
             }
             content = '<div class="Card" ' + card_id + 'style="display:block; ' + v + 'margin-bottom:' + b + 'px; width:' + w + 'px;' + h +  tit + '">' + 
                       '<div class="' + type + '" ' + vv + tit + id + dsr + '>' + init + '</div>' + 
                       '</div>';
             return content;
}

griddles.clicked = function(e) {
    var id = e.target.id;
    //var i = id.search(/^init/i);
    var t = id.search(/^stage/i);
    var s = id.search(/^stream/i);
    var j = {};
    j.original = e;
    j.target = e.target;
    j.id = id;
    j.dataset = e.target.dataset;
    j.className = e.target.className;
    
    if (t != -1 || s != -1) {
    } else {
        griddles.layout.cardOnClick(j);
    }
}


!function() {
    if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) 
    || navigator.userAgent.indexOf('iPod') > 0 
    || navigator.userAgent.indexOf('Android') > 0) {
        scrollbar_width = 1;
        console.log("not PC");
    } else {
        console.log("PC");
        if(navigator.userAgent.indexOf('MSIE') >= 0 || navigator.userAgent.indexOf('Opera') >= 0) {
           // IE と Opera の不具合に対応
           d.getElementsByClassName("AppBar")[0].style.marginTop = "0px";
        }
    }

}();
window.addEventListener("load", griddles.load, false);

d.getElementById("main").addEventListener("click", griddles.clicked, false);
document.getElementById("select_menu").addEventListener("change", function() {
   window.clearTimeout(griddles.mainTimer);
   var n = document.getElementsByClassName("Stream").length;
   for(g = 0; g < n; g++) {
     d.getElementById("stream_" + g).innerHTML = "";
   }
   console.log("stream cleared");
}, false);
var timer = false;
$(window).resize("resize", function() {
    if (timer !== false) {
        clearTimeout(timer);
    }
    timer = setTimeout(function() {
        console.log('resized?');
        griddles.load();
    }, 200);
});

