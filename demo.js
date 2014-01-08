var demo = {
   menu: ["ようこそ！", "ふせん"],
   load: function() {
      var e = 0;
      var opt = "";
      for(e = 0; e < demo.menu.length; e++) {
         opt = opt + '<option value="'+ demo.menu[e] +'">'+ demo.menu[e] +'</option>';
      }
      d.getElementById("select_menu").innerHTML = opt;
      d.getElementById("select_menu").addEventListener("change", demo.change, false);
   },
   change: function(e) {
      console.log(e.target.value);
      griddles.render = true;
      switch(e.target.value) {
         case "ようこそ！" : 
            layout.card_height_px = 250;
            layout.card_width_px = 250;
            layout.cards = [
               {"id": "c0", "type": "user-img", "dataset": [], "init": "icon.png"},
               {"id": "c1", "type": "user-text", "dataset": [], "init": "Hello, griddles!"},
               {"id": "c2", "type": "user-free", "dataset": [], "init": "画面の大きさに合わせて<br>カードがセンタリングされます！"}
            ];
            griddles.load();
            break;
         case "ふせん" : 
            layout.card_height_px = "auto";
            layout.card_width_px = 250;
            layout.cards = [
               {"id": "c0", "type": "my-husen-blue", "dataset": [], "init": "<div class=c>ふせん</div>"},
               {"id": "c1", "type": "my-husen-yellow", "dataset": [], "init": "<div class=c>ふ<br>せ<br>ん</div>"},
               {"id": "c6", "type": "my-husen-gray", "dataset": [], "init": "<div class='c y'>￥ 0 </div>"},
               {"id": "c4", "type": "my-husen-gray", "dataset": [], "init": "<div class=c><img src='daiz.png' style='width:150px'></div>"},
               {"id": "c2", "type": "my-husen-red", "dataset": [], "init": "<div class=c>いろいろな<br>サイズが<br>あっても<br>大丈夫！</div>"},
               {"id": "c3", "type": "my-husen-green", "dataset": [], "init": "<div class=c>ふせん</div>"},
               {"id": "c5", "type": "my-husen-yellow", "dataset": [], "init": "<div class=c>スマートフォンにも対応</div>"}
            ];
            griddles.load();
            break;
      }
   }
};

demo.load();

