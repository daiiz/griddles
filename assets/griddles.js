 /**
 * Griddles v0.0.17
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
griddles.keepIdSrc = [];
griddles.imageIndexR = 0;
griddles.keepContentsNo_y = 0 - 1;
griddles.max_stream_nums = 0;

griddles.manifest_compatibility = function() {
   if(griddles.layout.load_limit == undefined) {
      griddles.layout.load_limit = false;
   }
}

griddles.load = function() {
    /* 初期化 */
    d.getElementsByTagName("body")[0].style.backgroundColor = griddles.layout.background_color;
    d.getElementById("app_icon").src = griddles.layout.app_icon;
    d.getElementById("app_name").innerHTML = griddles.layout.app_name;
    griddles.keepIdSrc = [];
    griddles.imageIndexR = 0;
    /* マニフェストの互換性確保 */
    griddles.manifest_compatibility();
    
    var aw = griddles.layout.available_width_percent / 100;
    var ww = window.innerWidth;
    if (ww != griddles.pre_width || griddles.render == true) {
        console.log("resized!");
        griddles.keepContentsNo_y = 0 - 1;
        griddles.keepShowLength = 0;
        griddles.keppWorkingFlag = 0;

        //window.clearTimeout(griddles.mainTimer);
        var n = document.getElementsByClassName("Stream").length;
        for (g = 0; g < n; g++) {
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
            griddles.max_stream_nums = max_stream_nums;
            document.getElementById("main").style.width = aw * 100 + "%";
            document.getElementById("stage").style.marginLeft = (margin_left) + "px"; /* -sl*/
            griddles.renderStream(max_stream_nums, sw, [griddles.layout.stream_margin_left_px + "px", griddles.layout.stream_margin_right_px + "px"]);
        } else {
            griddles.max_stream_nums = 1;
            var lr = (ww - scrollbar_width) - sw;
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
    if (lg > 0) {
        var doms = [];
        var streamHeights = [];
        streamHeights = griddles.setStreamHeights(n);
        d.getElementsByTagName("title")[0].innerHTML = griddles.msgLoading;
        //griddles.renderTime(0, lg, cards, n);
        griddles.renderTime(griddles.keepContentsNo_y + 1, lg, cards, n);
    }
}

griddles.renderTime = function(y, lg, cards, n) {
    streamHeights = griddles.setStreamHeights(n);
    intMinStream = griddles.getMinStream(streamHeights);
    if (y == 0) {
        for (g = 0; g < n; g++) {
            d.getElementById("stream_" + g).innerHTML = "";
        }
    }
    
    griddles.lg = lg;
    griddles.createContent(cards, y, n);
}

griddles.setStreamHeights = function(n) {
    var res = [];
    for (var x = 0; x < n; x++) {
        res.push(document.getElementById("stream_" + x).offsetHeight);
    }
    //console.log(res);
    return res;
}

griddles.getMinStream = function(a) {
    var min_index = 0;
    var min_value = a[min_index];
    for (var e = 0; e < a.length; e++) {
        if (a[e] < min_value) {
            min_index = e;
            min_value = a[e];
        }
    }
    //console.log(min_index);
    return min_index;
}

/* 最も大きな長さを持つストリームの番号を返す */
griddles.getMaxStream_value = function(a) {
    var max_index = 0;
    var max_value = a[max_index];
    for (var e = 0; e < a.length; e++) {
        if (a[e] > max_value) {
            max_index = e;
            max_value = a[e];
        }
    }
    return max_value;
}

/* ウィンドウの使用可能な高さを返す */
griddles.getWindowHeight_value = function() {
    return window.innerHeight;
}

griddles.imageIndexR = 0;
griddles.appearContent = function(card_id, v, b, w, hg, tit, type, vv, id, dsr, init, intMinStream, cards, y, n) {

    /* 台紙カラー */
    var cardhidden = "";
    var bgColorStyle = "";
    if ((cards[y]).card != undefined && (cards[y]).card == false) {
        bgColorStyle = "background-color: " + griddles.layout.background_color + "!important;";
        cardhidden = " CardHidden";
    } else if ((cards[y]).card == undefined || (cards[y]).card == true) {
        bgColorStyle = "background-color: #fff!important;";
    } else {
        bgColorStyle = "background-color: " + (cards[y]).card + "!important;";
    }
    
    content = '<div class="Card ' + cardhidden + '" ' + card_id + 'style="display:block; ' + bgColorStyle + v + 'margin-bottom:' + b + 'px; width:' + w + 'px;' + hg + tit + '">' + 
    '<div class="' + type + '" ' + vv + tit + id + dsr + '>' + init + '</div>' + 
    '</div>';
    $(d.getElementById("stream_" + intMinStream)).append(content);
    lg = griddles.lg;
    if (type == "user-img" || type == "user-caption-img") {
        griddles.showImages(griddles.imageIndexR);
    }
    if (y + 1 < lg) {
        /* 再帰 */
        griddles.createContent(cards, y + 1, n);
    } else {
        d.getElementsByTagName("title")[0].innerHTML = griddles.layout.page_title;
    }
}

griddles.keepIdSrc = [];

griddles.showImages = function(r) {
    //if (r < griddles.keepIdSrc.length) {
    griddles.imageIndexR++;
    var target = griddles.keepIdSrc[r];
    //console.log(target);
    var targetImg = document.getElementById(target[0]);
    if (targetImg != undefined) {
        targetImg.src = target[1];
        
        targetImg.onload = function() { // Operaでは動作しない（理由？）
            if (griddles.phonegap == true) {
                d.getElementById(target[0]).style.display = "block";
            } else {
                var imgid = "#" + target[0];
                $(imgid).slideDown();
            }
        }
        targetImg.onerror = function() {
        
        }
        // Opera 応急処置
        if (navigator.userAgent.indexOf('Opera') >= 0) {
            var imgid = "#" + target[0];
            $(imgid).slideDown();
        }
    }
//}

}

griddles.keepShowLength = 0; //これまでに表示した分の長さ
griddles.keppWorkingFlag = 0;
griddles.createContent = function(cards, y, n) {
    griddles.keppWorkingFlag = 1;
    streamHeights = griddles.setStreamHeights(n);
    intMinStream = griddles.getMinStream(streamHeights);
    
    intMaxStream_value = griddles.getMaxStream_value(streamHeights);
    winHeight_value = griddles.getWindowHeight_value();
    var t = 2;
    var st = intMaxStream_value - griddles.keepShowLength; //新たに表示した分の長さ
    var ll = griddles.layout.load_limit;
    if (st < winHeight_value * ll || ll == false) { // $0
        /* 新たな表示分の長さがウィンドウの２倍未満の長さである場合 */
        //console.info("y: "+y);
        griddles.keepContentsNo_y = y;
        
        if (y == 0) {
            for (g = 0; g < n; g++) {
                d.getElementById("stream_" + g).innerHTML = "";
            }
        }
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
            dsr = dsr + "data-" + ds[q][0] + "='" + ds[q][1] + "'";
        }
        if (griddles.layout.tooltip == "yes" && (init.search(/^http/i) == -1)) {
            var tit = "title='" + init + "';";
        } else {
            var tit = "";
        }

        /* キャプション対応 */
        var capheight = 0;
        var initCaption = "";
        if (type == "user-caption-img" && griddles.layout.card_height_px == "auto") {
            capheight = (cards[y]).caption_height_px;
            var caph = "height: " + (capheight - 5) + "px;";
            initCaption = "<div class='user-caption' id='caption_" + id + "' style='" + caph + "'>" + (cards[y]).caption + "</div>";
        }
        
        if (griddles.layout.card_height_px != "auto") {
            var hh = "height: " + (griddles.layout.card_height_px - 6) + "px!important;";
            var hg = "height: " + (griddles.layout.card_height_px + capheight) + "px!important;";
        
        } else {
            var h = "";
            var hh = "";
            var hg = "";
        }
        var v = "";
        var vv = "";
        var ww = griddles.layout.card_width_px - 6;
        
        if (type == "user-img" || type == "user-caption-img") {
            var imgSrc = init;
            var imgId = id;
            init = "<img src='#' style='display:none;width:" + ww + "px!important;" + hh + "' class='img' id='" + id + "' " + dsr + ">" + initCaption;
            id = "";
            card_id = 'id="card_' + y + '"';
            dsr = "";
            var img = document.getElementById("IMAGE");
            /* xhrが不要な場合*/
            if (griddles.webPage == true || griddles.phonegap == true) {
                img.src = "#";
                img.src = imgSrc;
                img.width = ww;
                img.onload = function(e) {
                    console.log('読み込み完了: ' + imgSrc);
                    griddles.keepIdSrc.push([imgId, imgSrc]);
                    //console.log(document.getElementById("IMAGE").height);
                    
                    if (hg == "") {
                        hg = "height: " + (document.getElementById("IMAGE").offsetHeight + 6 + capheight) + "px;";
                    }
                    griddles.appearContent(card_id, v, b, w, hg, tit, type, vv, id, dsr, init, intMinStream, cards, y, n);
                }
                img.onerror = function() {
                    console.error('読み込めない画像がありました： ' + imgSrc);
                    init = "";
                    griddles.appearContent(card_id, v, b, w, hg, tit, type + ":err", vv, id, dsr, init, intMinStream, cards, y, n);
                }
            }

            /* xhrが必要な場合（chrome apps）*/
            if (griddles.chromeApp == true) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', imgSrc, true);
                xhr.responseType = 'blob';
                xhr.onload = function(e) {
                    griddles.keepIdSrc.push([imgId, window.webkitURL.createObjectURL(this.response)]);
                    //img.src = "#";
                    img.width = ww;
                    img.src = window.webkitURL.createObjectURL(this.response);
                    img.onload = function(e) {
                        console.log('読み込み完了: ' + imgSrc);
                        console.log(document.getElementById("IMAGE").height);
                        if (hg == "") {
                            hfc = document.getElementById("IMAGE").offsetHeight + 6 + capheight;
                            hg = "height: " + hfc + "px;";
                        }
                        griddles.appearContent(card_id, v, b, w, hg, tit, type, vv, id, dsr, init, intMinStream, cards, y, n);
                    }
                    img.onerror = function() {
                        console.error('読み込めない画像がありました： ' + imgSrc);
                        init = "";
                        griddles.appearContent(card_id, v, b, w, hg, tit, type, vv, id, dsr, init, intMinStream, cards, y, n);
                    }
                }
                xhr.send();
            }
        
        } else if (type == "user-text") {
            v = "padding: 15px; font-size:11pt; font-family: 'Open Sans',Meiryo;";
            vv = 'style="width:100%; height: 100%;"';
            id = 'id="' + id + '"';
            card_id = 'id="card_' + y + '"';
            griddles.appearContent(card_id, v, b, w, hg, tit, type, vv, id, dsr, init, intMinStream, cards, y, n);
        
        } else if (type == "user-free") {
            v = "font-family: 'Open Sans' ,Meiryo;";
            vv = 'style="width:100%; height: 100%;"';
            id = 'id="' + id + '"';
            card_id = 'id="card_' + y + '"';
            griddles.appearContent(card_id, v, b, w, hg, tit, type, vv, id, dsr, init, intMinStream, cards, y, n);
        
        } else {
            vv = 'style="width:100%; height: 100%;"';
            id = 'id="' + id + '"';
            card_id = 'id="card_' + y + '"';
            griddles.appearContent(card_id, v, b, w, hg, tit, type, vv, id, dsr, init, intMinStream, cards, y, n);
        }
    } else {
        griddles.keepShowLength = intMaxStream_value;
        griddles.keppWorkingFlag = 0;
        console.info(":: $0 END");
    } // [E]$0
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
        if (griddles.phonegap == true) {
            // phonegapアプリに対応
            // タブレット用のおすすめデザインに書き換え
            d.getElementsByClassName("AppBar")[0].style.height = "58px";
            d.getElementsByClassName("AppIconArea")[0].style.marginTop = "5px";
            d.getElementsByClassName("AppIconArea")[0].style.marginLeft = "15px";
            d.getElementsByClassName("Icon")[0].style.cursor = "default";
            d.getElementById("stage").style.marginTop = "-8px";
        }
    } else {
        console.log("PC");
        if (navigator.userAgent.indexOf('MSIE') >= 0 || navigator.userAgent.indexOf('Opera') >= 0) {
            // IE と Opera の不具合に対応
            d.getElementsByClassName("AppBar")[0].style.marginTop = "0px";
        }
        if (griddles.chromeApp == true) {
            // Chrome Apps に対応
            d.getElementsByClassName("AppBar")[0].style.marginTop = "0px";
            d.getElementsByTagName("html")[0].style.overflowY = "scroll";
        } else if (griddles.phonegap == false && griddles.webPage == true) {
            d.getElementsByTagName("body")[0].style.overflowY = "scroll";
        }
    }

}();
window.addEventListener("load", griddles.load, false);

d.getElementById("main").addEventListener("click", griddles.clicked, false);

document.getElementById("select_menu").addEventListener("change", function() {
    if (griddles.phonegap == true) {
    // 何もしない
    } else {
        window.clearTimeout(griddles.mainTimer);
        griddles.keepContentsNo_y = 0 - 1;
        griddles.keepShowLength = 0;
        var n = document.getElementsByClassName("Stream").length;
        for (g = 0; g < n; g++) {
            d.getElementById("stream_" + g).innerHTML = "";
        }
        console.log("stream cleared");
    }
}, false);

griddles.timer = false;
$(window).resize("resize", function() {
    if (griddles.timer !== false) {
        clearTimeout(griddles.timer);
    }
    griddles.timer = setTimeout(function() {
        console.log('resized?');
        griddles.load();
    }, 200);
});


$(window).on("scroll", function() {
    var sh = $(document).height();
    var sp = $(window).height() + $(window).scrollTop();
    if (((sh - sp) / sh) === 0) {
        // スクロールによってページの下部に到達した場合
        // console.log(griddles.keepContentsNo_y);
        if ((griddles.keepContentsNo_y + 1) < griddles.layout.cards.length) {
            if (griddles.keppWorkingFlag == 0) {
                console.info(":: 新しく読み込みます。");
                griddles.renderCardsAuto(griddles.max_stream_nums);
            }
        } else {
            console.info(":: 読み込むものはありません。");
        }
    }
});



