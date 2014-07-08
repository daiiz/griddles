// chrome apps として発行する場合、
// アプリから外部のウェブサイト または パッケージ内のHTMLファイルを開くさいに
// chrome app の shellウィンドウを使用するためには
// griddles.cashell の値は true にしてください。
// ここで指定した値は chrome apps 以外では無視されます。
// griddles.cashell = false;


(function() {
   griddles.xhrimg = false;
   griddles.cca = false;
   isAndroid = (navigator.userAgent.indexOf('Android') != -1) ? true : false;
   isChromApp = (chrome.app.window != undefined) ? true : false;
   if(isChromApp || isAndroid) {
      // chrome apps または mobile chrome apps である
      griddles.xhrimg = true;
      griddles.cca = true;
      console.info("Launched as CHROME APPS IN DESKTOP OR MOBILE MODE.(CADM mode)");
   }else {
      console.info("Launched as WEB PAGE IN DESKTOP OR MOBILE MODE.(WPDM mode)");
   }
})();