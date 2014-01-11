/**
 * Griddles v0.0.1
 * (c) 2013-2014 daiz. https://github.com/daiz713/griddles
 * License: MIT
 */
 
 var griddles = griddles || {};
 
 /* User settings */
griddles.layout = {
    "page_title": "sample",
    "app_name": "Sample",
    "app_icon": "icon.png",
    "card_width_px": 250,
    "card_height_px": 250, /* "auto" */
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
        console.log("!");
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

        //if(ww > (sl + sw) + left) {
        if (max_stream_nums > 0) {
            document.getElementById("main").style.width = aw * 100 + "%";
            document.getElementById("stage").style.marginLeft = (margin_left) + "px";  /* -sl*/
            griddles.renderStream(max_stream_nums, sw, [griddles.layout.stream_margin_left_px, griddles.layout.stream_margin_right_px]);
        } else {
            var lr = (ww - scrollbar_width) - sw;
            if (lr > 0) {
                lf = lr / 2;
            } else {
                lf = 0;
            }
            griddles.renderStream(1, sw, [lf, lf]);
        }
    }
}
griddles.renderStream = function(n, w, a) {
    var y;
    w = w + "px";
    var dom = "";
    for (y = 0; y < n; y++) {
        dom = dom + '<div id="stream_' + y + '" class="Stream" style="width:' + w + ';margin-left:' + a[0] + 'px;margin-right:' + a[1] + 'px;"></div>';
    }
    d.getElementById("stage").innerHTML = dom;
    griddles.stream_num = n;
    griddles.renderCards(n);
}
griddles.renderCards = function(n) {
    //var n = griddles.stream_num;
    var cards = griddles.layout.cards;
    var lg = cards.length;
    var doms = [];
    for (var x = 0; x < n; x++) {
        doms.push([]);
    }
    
    var index = 0;
    for (x = 0; x < lg; x++) {
        if (index < n) {
            doms[index].push(cards[x]);
            index++;
        } else {
            index = 0;
            doms[index].push(cards[x]);
            index++;
        }
    }
    console.log(doms);
    var w = griddles.layout.card_width_px;
    if (griddles.layout.card_height_px != "auto") {
        var h = "height: " + griddles.layout.card_height_px + "px;";
    } else {
        var h = "";
    }
    var b = griddles.layout.card_margin_bottom;
    for (x = 0; x < n; x++) {
        var stream = d.getElementById("stream_" + x);
        var contents = "";
        
        for (var y = 0; y < doms[x].length; y++) {
            var init = (doms[x][y]).init;
            var type = (doms[x][y]).type;
            var id = (doms[x][y]).id;
            //var id = "init_" + x;
            var ds = (doms[x][y]).dataset;
            var dsr = "";
            
            for (var q = 0; q < ds.length; q++) {
                dsr = dsr + "data-" + ds[q][0] + "='" + ds[q][1] + "';";
            }
            
            if (griddles.layout.tooltip == "yes" && (init.search(/^http/i) == -1)) {
                var tit = "title='" + init + "';";
            } else {
                var tit = "";
            }
            var v = "";
            var vv = "";
            var ww = griddles.layout.card_width_px - 6;
            var hh = griddles.layout.card_width_px - 6;
            switch (type) {
                case "user-img":
                    init = "<img src='" + init + "' style='width:" + ww + "px!important;height:" + hh + "px!important;' class='img' id='" + id + "' " + dsr + ">";
                    id = "";
                    card_id = 'id="card_' + x + '"';
                    dsr = "";
                    break;
                case "user-text":
                    v = 'padding: 15px; font-size:11pt; font-family: osl,Meiryo;';
                    vv = 'style="width:100%; height: 100%;"';
                    id = 'id="' + id + '"';
                    card_id = 'id="card_' + x + '"';
                    break;
                case "user-free":
                    v = "font-family: osl,Meiryo;";
                    vv = 'style="width:100%; height: 100%;"';
                    id = 'id="' + id + '"';
                    card_id = 'id="card_' + x + '"';
                    break;
                default:
                    vv = 'style="width:100%; height: 100%;"';
                    id = 'id="' + id + '"';
                    card_id = 'id="card_' + y + '"';
                    break;
            }
            contents = contents + '<div class="Card" ' + card_id + 'style="' + v + 'margin-bottom:' + b + 'px; width:' + w + 'px;' + h + tit + '">' + 
            '<div class="' + type + '" ' + vv + tit + id + dsr + '>' + init + '</div>' + 
            '</div>'
        }
        stream.innerHTML = contents;
    }
    d.getElementsByTagName("title")[0].innerHTML = griddles.layout.page_title;
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
    }

}();
window.addEventListener("load", griddles.load, false);
window.addEventListener("resize", griddles.load, false);
d.getElementById("main").addEventListener("click", griddles.clicked, false);


