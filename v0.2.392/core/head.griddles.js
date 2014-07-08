var griddles = griddles || {};
var scrollbar_width = 16;
var appbar_height = 52;

/* カードの互換性確保
 * griddles.layout.cardsに追加するときにコール */
griddles.card = function(a) {
   if(a.dataset == undefined) {
      a.dataset = [["cardtype", "normal"]];
   }
   if(a.type == undefined) {
      a.type = "default-text";
   }
   if((a.type).search(/^user\-/) != -1) {
      a.type = (a.type).replace(/^user\-/, "default-");
   }
   if(a.type == "default-caption-img" && a.caption == undefined) {
      a.caption = "";
   }
   if(a.type == "default-caption-img" && a.caption_height_px == undefined) {
      a.caption_height_px  = 30;
   }
   if(a.id == undefined) {
      a.id = griddles.layout.page_title + "_" + griddles.auto_id_index;
      griddles.auto_id_index++;
   }
   if(a.init == undefined) {
      a.init = "";
   }
   if(a.pushStyle == undefined) {
      a.pushStyle = "append";
   }
   return a;
}


/* カード１枚あたりの使用可能最大横幅を取得する */
griddles.getFullWidth = function() {
   var w_px = window.innerWidth - scrollbar_width;
   return w_px;
}

/* カード１枚あたりの使用可能最大縦幅を取得する */
griddles.getFullHeight = function(n) {
   var h_px;
   if(n == undefined) {
      n = 0;
   }
   if(window.innerHeight > window.innerWidth) {
      // 画面の縦幅の方が長い場合の処理
      if(n == 0) {
         h_px = window.innerHeight - appbar_height;
      }else if(n > 0){
         // 横幅の1/nを縦幅とする(int)
         h_px = Math.floor((window.innerWidth - scrollbar_width)/n);
      }
   }else {
      h_px = window.innerHeight - appbar_height;
   }
   return h_px;
}