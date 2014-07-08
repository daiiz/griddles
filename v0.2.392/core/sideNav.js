
$('#page_icon').click(
    function(){
      if(griddles.layout.side_nav == true) {
         if(document.getElementById("sideNavigation").dataset.vh == 'h') {
         	 openSideNav();
         }else {
            closeSideNav({"callback": null, "args": null});
         }
      }
    }
);


function openSideNav() {
  if(griddles.layout.app_bar == "auto") {
    griddles.layout.app_bar = "fixed";
  }
  document.getElementById("mask").className = "mask_on";
  document.getElementById("sideNavigation").dataset.vh = 'v';
  $("#sideNavigation").animate({'marginLeft':'0px'}, 300);
}

function closeSideNav(cbobj) {
  if(griddles.layout.app_bar == "fixed") {
      griddles.layout.app_bar = griddles.user.app_bar;
  }
  document.getElementById("sideNavigation").dataset.vh = 'h';
  document.getElementById("mask").className = "mask_off";
  $("#sideNavigation").animate({'marginLeft':'-261px'}, 300, null, function() {
      //document.getElementById("mask").style.visibility = "hidden";
      document.getElementById("mask").className = "mask_off_after";
      if(cbobj.callback != null) {
        cbobj.callback(cbobj.arg);
      }
  });
}

function createSideNavList() {
  var lists = griddles.layout.nav_items;
  var n;
  for(n = 0; n < lists.length; n++) {
     var list = '<div class="sideMenuItem" id="side_nav_'+ n +'" data-value="'+ lists[n].value +'">'+ lists[n].label +'</div>';
     $("#navLists").append(list);
  }
}

window.addEventListener("click", function(e) {
    if(e.target.id.search(/side_nav/) != -1) {
       var vl = e.target.dataset.value;
       var lb = document.getElementById(e.target.id).innerHTML;
       closeSideNav({"callback": griddles.layout.navOnClick, "arg": {"value": vl, "label": lb}});
   }
}, false);

createSideNavList();