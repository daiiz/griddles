var demo = {
    menu: ["アイコン", "正方形", "ふせん"],
    load: function() {
        var e = 0;
        var opt = "";
        //griddles.layout.cards = def;
        for (e = 0; e < demo.menu.length; e++) {
            opt = opt + '<option value="' + demo.menu[e] + '">' + demo.menu[e] + '</option>';
        }
        d.getElementById("select_menu").innerHTML = opt;
        d.getElementById("select_menu").addEventListener("change", demo.change, false);
        demo.change({"target": {"value": "アイコン"}});
    },
    change: function(e) {
        console.log(e.target.value);
        griddles.render = true;
        switch (e.target.value) {
            case "正方形":
                griddles.layout.card_height_px = 250;
                griddles.layout.card_width_px = 250;
                griddles.layout.cards = [
                    {"id": "i0","type": "user-img","dataset": [["hash", "IMG"]],"init": "icon_l.png"}, 
                    {"id": "i1","type": "user-text","dataset": [["hash", "TEXT"]],"init": "Hello, griddles!"}, 
                    {"id": "i2","type": "user-free","dataset": [["hash", "FREE"]],"init": "画面の大きさに合わせて<br>カードがセンタリングされます！"}
                ];
                griddles.load();
                break;
            case "ふせん":
                griddles.layout.card_height_px = "auto";
                griddles.layout.card_width_px = 250;
                griddles.layout.cards = [
                    {"id": "i0","type": "my-husen-blue","dataset": [],"init": "<div class=c>ふせん</div>"}, 
                    {"id": "i1","type": "my-husen-yellow","dataset": [],"init": "<div class=c>ふ<br>せ<br>ん</div>"}, 
                    {"id": "i2","type": "my-husen-gray","dataset": [],"init": "<div class='c y'>￥ 0 </div>"}, 
                    {"id": "i3","type": "my-husen-gray","dataset": [],"init": "<div class=c><img src='daiz.png' style='width:150px' class='gi'></div>"}, 
                    {"id": "i4","type": "my-husen-red","dataset": [],"init": "<div class=c>いろいろな<br>サイズが<br>あっても<br>大丈夫！</div>"}, 
                    {"id": "i5","type": "my-husen-green","dataset": [],"init": "<div class=c>ふせん</div>"}, 
                    {"id": "i6","type": "my-husen-yellow","dataset": [],"init": "<div class=c>スマートフォンにも対応</div>"}
                ];
                griddles.load();
                break;
            case "アイコン":
                griddles.layout.card_height_px = 65;
                griddles.layout.card_width_px = 65;
                griddles.layout.cards = [
                    {"id": "i0","type": "user-free", "dataset": [], "init": "<div class='i ye'>G</div>"},
                    {"id": "i1","type": "user-free", "dataset": [], "init": "<div class='i ye'>r</div>"},
                    {"id": "i2","type": "user-free", "dataset": [], "init": "<div class='i ye'>i</div>"},
                    {"id": "i3","type": "user-free", "dataset": [], "init": "<div class='i ye'>d</div>"},
                    {"id": "i4","type": "user-free", "dataset": [], "init": "<div class='i ye'>d</div>"},
                    {"id": "e1","type": "user-free", "dataset": [], "init": "<div class='i ye'>l</div>"},
                    {"id": "e2","type": "user-free", "dataset": [], "init": "<div class='i ye'>e</div>"},
                    {"id": "e3","type": "user-free", "dataset": [], "init": "<div class='i ye'>s</div>"},
                    {"id": "e4","type": "user-free", "dataset": [], "init": "<div class='i'>v</div>"},
                    {"id": "e5","type": "user-free", "dataset": [], "init": "<div class='i'>0</div>"},
                    {"id": "e6","type": "user-free", "dataset": [], "init": "<div class='i'>.</div>"},
                    {"id": "e7","type": "user-free", "dataset": [], "init": "<div class='i'>0</div>"},
                    {"id": "e8","type": "user-free", "dataset": [], "init": "<div class='i'>.</div>"},
                    {"id": "e9","type": "user-free", "dataset": [], "init": "<div class='i ye'>1</div>"}
                ];
                griddles.load();
                break;
        }
    }
};

demo.load();

