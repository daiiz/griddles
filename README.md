griddles
========

カードUIを自動生成するJavaScriptフレームワーク

### 簡単な使い方
#### ¶ packageフォルダをダウンロードする
必要なコードは全てpackageフォルダに入っています。パッケージ内の template.html には griddles で必要なJSファイルやCSSファイルの読み込みコードが埋め込まれています。
+ ``stable-package-*``: 安定版です。``*``は、「パッケージバージョン」を表します。``*``のアルファベットが大きいものほど最新です。たとえば、``-A``と``-B``では、``-B``の方がより新しいものであることが分かります。
+ ``dev-package-*``: 開発版であり不安定です。試験的に新機能を含んでいることがあります。次期stableパッケージの準備の段階にあるコード群です。

#### ¶ griddles-manifest.js を編集する （使用シーンの選択）
griddlesの用途を指定するために、``assets/griddles-manifest.js`` を編集します。
用途に応じて、どれかひとつの値を``true``にしてください。

|  |用途    |
|------|--------|
|griddles.chromeApp|Chrome Apps でのUI|
|griddles.phonegap|PhoneGapを用いたモバイルアプリのUI|
|griddles.webPage|PC、モバイル（タブレット含む）での表示を想定したウェブページ（ウェブアプリ）|

デフォルトでは griddles.webPage が選択されています。

#### ¶ griddles-manifest.js を編集する （レイアウトの編集）
カードの表示スタイルを変更したい場合も ``assets/griddles-manifest.js`` を編集します。``griddles.layout`` のプロパティに関しては下表を参照してください。
既に初期値が設定されているため、このステップは飛ばしても構いません。

| プロパティ名 |  取り得る値  | 説明 |
|------|--------|------|
| page_title | ``文字列`` | ブラウザのタブに表示される文字列 |
| app_name | ``文字列`` | ページ上部の固定バーに表示されるアプリ名 |
| app_icon | ``文字列`` | ページ上部の固定バーに表示されるアプリアイコンファイルのパス |
| background_color | ``カラーコード`` | ページ背景色のカラーコード（例：``"#eee"``）|
| card_width_px | ``整数値`` | カードの横幅|
| card_height_px | ``整数値`` または ``"auto"`` | カードの縦幅 |
| card_margin_bottom | ``整数値`` | カードの下マージン  |
| stream_margin_left_px | ``整数値`` | カードの左マージン  |
| stream_margin_right_px | ``整数値`` | カードの右マージン  |
| available_width_percent | ``整数値`` | ウィンドウの横幅の使用領域（％）|
| tooltip | ``"yes"`` または ``"no"`` | ツールチップ |
| cards | ``配列`` | 表示するカードアイテム(JSON)の配列 |
| cardOnClick | ``関数`` | カードがクリックされたときの動作 |

以上は全て必須の設定項目です。

#### ¶ カードを表示してみる
実際にカードを表示するためのコードは、別に用意した任意のJSファイル（例：myApp.js）に記述します。このファイルはtemplate.htmlのbody要素の最後でscriptタグを用いて読み込んでください。
+ まずは、カードアイテムを用意します。カードアイテムとは、JSONオブジェクトであり下表のようなプロパティを持ちます。

| プロパティ名 |  取り得る値  | 説明 |
|------|--------|------|
| type | ``"user-text"``, ``"user-img"``, ``"user-caption-img"``, ``文字列`` のうちいずれか一つ | カードの表示タイプ（カードHTML要素のclassNameになります） |
| id | ``文字列`` | ユニークなid（カードHTML要素のidになります） |
| dataset | ``keyとvalueの組の配列`` | （カードHTML要素のdatasetになります） |
| card | ``true``, ``false``, ``カラーコード``のうちいずれか一つ | カードの台紙の色。台紙を表示しない場合はfalse |
| caption | ``文字列`` | 画像とともに表示される文字列 |
| caption_height_px | ``整数値`` | captionを表示する領域の高さ |
| init | ``文字列`` | 画像ファイルのパス（typeが``"user-img"``, ``"user-caption-img"``の場合）、または、HTMLテキスト |

+ 以上のようなプロパティをもつJSONオブジェクト（カードアイテム）を griddles.layout.cards に追加します。カードアイテムは一度に複数追加できます。
+ 次に、griddles.render を``true``にします。
+ griddles.load() を実行すればカードが表示されます。


