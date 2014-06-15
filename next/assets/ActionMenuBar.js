var nowp = 0;
var how_many_scroll = 0;
var appbar = document.getElementById("app_bar");
var basebar = document.getElementById("base_bar");
var last_move = "minus";//plus or minus
var start_scroll_top = 0;

var closing_step = 0;
var opening_step = 0;

function scrollLog(n) {
   how_many_scroll = how_many_scroll + n;
}

function getScrollLog() {
   return how_many_scroll;
}


function crd(i, r, a) {
// class: remove & add
  var reg = new RegExp(r, "gi");
  //console.log(document.getElementById(i).className.search(reg));
  if(document.getElementById(i).className.search(reg) != -1) {
     $("#" + i).removeClass(r);
  }
  $("#" + i).addClass(a);
}

$(function() {
    $(window).scroll(function(){
       diffp = nowp - $(window).scrollTop();
       nowp = $(window).scrollTop();
       scrollLog(diffp);
       var cn = document.getElementById("menus").className;
       if(cn == "menus_close") {
         if(diffp > 0){
            // 下にスクロール(+)
            //console.log("下に移動");
            // console.log(getScrollLog());
            
            crd("app_bar", "close_appbar", "open_appbar");
            crd("app_icon_area", "close_icon", "open_icon");
            crd("menu_box", "close_app_name", "open_app_name");
          
            crd("base_bar_text", "close_text", "open_text");
            crd("base_bar", "close", "open_basebar");
          
         }else{
            // 上にスクロール(-)
            if(getScrollLog() <= -100) {
              crd("base_bar_text", "open_text", "close_text");
              crd("base_bar", "open_basebar", "close");
            
              crd("app_icon_area", "open_icon", "close_icon");
              crd("menu_box", "open_app_name", "close_app_name");
              crd("app_bar", "open_appbar", "close_appbar");
            }
         }
       }
    });
});

basebar.addEventListener("click", function(e) {
   var cn = document.getElementById("menus").className;
   var opa = (document.getElementById("app_bar").className.search(/open_appbar/gi) != -1) ? true : false;
   if(opa == true) {
      if(cn == "menus_close") {
         crd("menus", "menus_close", "menus_open");
         when_menus_open();
      }else {
         crd("menus", "menus_open", "menus_close");
         var stage = document.getElementById("menus");
         stage.innerHTML = "";
      }
   }
},false);


function when_menus_open() {
　　　test_menu_list = griddles.layout.menu_items;
   var stage = document.getElementById("menus");
   $(stage).append("<div style='height: 114px;'></div>");
   for(var i = 0; i < test_menu_list.length; i++) {
      var new_menu = "<div id='menu_'"+i+" class='list_menu $"+test_menu_list[i]+"' data-label='"+test_menu_list[i]+"'>" + test_menu_list[i] + "</div>";
      $(stage).append(new_menu);
   }
}

var isIE = (navigator.userAgent.toLowerCase().indexOf('msie') != -1) ? true : false;
document.getElementById("menus").addEventListener("click", function(e) {
   if(e.target.id.search(/^menu\_/) != -1) {
       var lb;
       /* 応急処置 */
       var cln = e.target.className;
       if(isIE == true) {
          var cln = e.target.className.split(" ");
          for(var t = 0; t < cln.length; t++) {
              if(cln[t][0] == "$") {
                  lb = (cln[t][0]).replace(/^\$/, "");
              }
          }
       }else { 
          lb = e.target.dataset.label;
       }
       crd("menus", "menus_open", "menus_close");
       var stage = document.getElementById("menus");
       stage.innerHTML = "";
       var fg = (document.getElementById("base_bar_text").innerHTML != lb);
       document.getElementById("base_bar_text").innerHTML = lb;
       window.setTimeout(function() {
          if(fg) {
             griddles.layout.menuOnChange(lb);
          }
       }, 250);
   }
}, false);

window.addEventListener("click", function(e) {
    if(e.target.id.search(/plusbtn/) != -1) {
       griddles.hideLeftBottomBtn();
       myApp.addCard();
   }
}, false);

