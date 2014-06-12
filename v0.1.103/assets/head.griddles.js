var griddles = griddles || {};

/* カードの互換性確保
 * griddles.layout.cardsに追加するときにコール */
griddles.card = function(a) {
   if(a.dataset == undefined) {
      a.dataset = [["auto","auto"]];
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