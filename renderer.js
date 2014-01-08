var d = document;
var scrollbar_width = 14;
var griddles = {
   "stream_num": 0,
   "pre_width": 0,
   "render": false,
   "load": function() {
      d.getElementById("app_icon").src = layout.app_icon;
      d.getElementById("app_name").innerHTML = layout.app_name;

      var aw = layout.available_width_percent / 100;
      var ww = window.innerWidth;
     if(ww != griddles.pre_width || griddles.render == true) {
      console.log("!");
      griddles.pre_width = ww;
      griddles.render = false;
      
      var si = "stage";
      var w85pc = Math.floor(ww * aw - scrollbar_width);
      var sw = layout.card_width_px;
      var sl = layout.stream_margin_left_px;
      var sr = layout.stream_margin_right_px
      var max_stream_nums = Math.floor(w85pc/ (sl + sw));
      
      var left = w85pc - (max_stream_nums * (sl + sw));
      var margin_left = left / 2;
      //console.log(margin_left);
      console.log("stream: " +  max_stream_nums);
      
      //if(ww > (sl + sw) + left) {
      if(max_stream_nums > 0) {
         document.getElementById("main").style.width = aw*100 + "%";
         document.getElementById("stage").style.marginLeft = (margin_left - sl) + "px";
         //console.log("!" + margin_left);
         griddles.renderStream(max_stream_nums, sw, [layout.stream_margin_left_px, layout.stream_margin_right_px]);
      }else {
         var lr = (ww - scrollbar_width) - sw;
         if(lr > 0) {
            lf = lr / 2;
         }else {
            lf = 0;
         }
         griddles.renderStream(1, sw, [lf, lf]);
      }
     }
   },
   
   renderStream: function(n, w, a) {
      var y;
      w = w + "px";
      var dom = "";
      for(y = 0; y < n; y++) {
         dom = dom + '<div id="stream_' + y + '" class="Stream" style="width:' + w + ';margin-left:'+ a[0] +'px;margin-right:'+ a[1] +'px;"></div>';
      }
      d.getElementById("stage").innerHTML = dom;
      griddles.stream_num = n;
     griddles.renderCards(n);
   },
   
   renderCards: function(n) {
      //var n = griddles.stream_num;
      var cards = layout.cards;
      var lg = cards.length;
      var doms = [];
      for(var x = 0; x < n; x++) {
        doms.push([]);
      }
      
      var index = 0;
      for(x = 0; x < lg; x++) {
         if(index < n) {
           doms[index].push(cards[x]);
           index++;
         }else {
           index = 0;
           doms[index].push(cards[x]);
           index++;
         }
      }
      console.log(doms);
      var w = layout.card_width_px;
      if(layout.card_height_px != "auto") {
         var h = "height: " + layout.card_height_px + "px;";
      }else {
         var h = "";
      }
      var b = layout.card_margin_bottom;
      for(x = 0; x < n; x++) {
         var stream = d.getElementById("stream_" + x);
         var contents = "";
      
         for(var y = 0; y < doms[x].length; y++) {
            var init = (doms[x][y]).init;
            var type = (doms[x][y]).type;
            var id = (doms[x][y]).id;
            var ds = (doms[x][y]).dataset;
            var dsr = "";
            /*
            for(var q = 0; q < ds.length; q++) {
               dsr = dsr + "data-"+ds[q][0]+"='"+ds[q][1]+"';";
            }
            */
            if(layout.tooltip == "yes" && (init.search(/^http/i) == -1)) {
               var tit = "title='" + init + "';";
            }else {
               var tit = "";
            }
            var v = "";
            var vv = "";
            var ww = layout.card_width_px - 6;
            var hh = layout.card_width_px - 6;
              switch(type) {
                 case "user-img": init = "<img src='"+init+"' style='width:"+ww+"px!important;height:"+hh+"px!important;' class='img' id='"+ id +"'>";break;
                 case "user-text": v = 'padding: 15px; font-size:11pt; font-family: osl,Meiryo;';vv = 'style="width:100%; height: 100%;"';break;
                 case "user-free": v = "font-family: osl,Meiryo;";vv = 'style="width:100%; height: 100%;"';break;
                 default: vv = 'style="width:100%; height: 100%;"';break;
              }
            contents = contents + '<div class="Card" style="'+ v +'margin-bottom:'+ b +'px; width:'+ w +'px;'+ h + dsr + tit+'">' +
            '<div class="'+ type +'" '+ vv + tit +'>' + init +'</div>'+
            '</div>'
         }
         stream.innerHTML = contents;
      }
      d.getElementsByTagName("title")[0].innerHTML = layout.page_title;
   }
};

!function() {
if (( navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) 
     || navigator.userAgent.indexOf('iPod') > 0 
     || navigator.userAgent.indexOf('Android') > 0) {
    scrollbar_width = 1;
    console.log("not PC");
}else {
    console.log("PC");
}

}();
window.addEventListener("load", griddles.load, false);
window.addEventListener("resize", griddles.load, false);
