# tweet-analyzer-deprecated

## とりあえずで作ってみて -改善案-

- ちゃんと動く（ように見える）が、アーキテクチャーがイマイチなので最初から作り直す。
- フロントエンドサーバーとバックエンドサーバー（API）のコードを分離して、別々のレポジトリで管理できるような感じにして、今の密結合な作りをやめる。
- フロントエンドサーバーを立てるのには、Next.js か Express.js を使い、API を書くに当たっては R の Plumber を使えば良さそう（Shiny は使わないでやる）。
- フロントエンドを作るとき、コンポーネントをプレゼンテーションとコンテナに分ける。
- TypeScript を使うようにする。
- 取得したツイートデータを DB で管理するようにすることを検討する。
- 画面サイズに依らないレスポンシブな UI を実現する。
- API 側でもエラーハンドリングする。
- テストをちゃんと書く（特に画面側）。

## 概要

特定のユーザーのツイートを取得し、テキストアナリティクス・自然言語処理の手法で分析し、ダッシュボードに表示するアプリケーション。\
画面は JavaScript + React で、バックエンドは Shiny（R）を用いて実装。

## 目的

あるユーザーがどのように Twitter を利用しているのかをいろいろな側面から可視化すること。\
自分が普段どのように Twitter を使っているのかを振り返るためのツールを試しに作ってみようと思い作り始めた。

## なぜ React と Shiny を組み合わせて使うのか

リッチな機能を備えたダッシュボードを簡単に作るため。\
React のデータ可視化ライブラリ（Recharts.js など）を用いることで、美しく自由度の高いデータビジュアライゼーションが可能となる。\
一方、R はテキストマイニング・NLP・時系列解析などの統計処理が得意な言語で、R でそれらを解説した書籍・技術ブログが多くある。\
（補足：R と同様にテキストマイニング・NLP・時系列解析によく用いられる言語として Python があるが、個人的にテキストマイニングをするときに R をよく用いていたので、R を用いることにした。）\
以上の理由により、React と Shiny を組み合わせてやってみようと思った。

## 注意事項

Twitter API と AWS SDK 用のシークレットを環境変数に設定しておかないと動かない。

## Development

1. Shiny アプリを起動

```zsh
$ npm start --silent # もしくは npm start -s
```

2. webpack-dev-server を立ち上げる

```zsh
$ npm run dev
```

3. [http://localhost:4000](http://localhost:4000)をブラウザで開く（自動で開かれない場合）

## Production

1. React アプリをビルド

```zsh
$ npm run build
```

2. Shiny アプリを起動

```zsh
$ npm start --silent # もしくは npm start -s
```

3. [http://localhost:3000](http://localhost:3000)をブラウザで開く

## 開発環境

R と JavaScript を書いたり動かしたりするのに適した IDE を用いる。\
R のコードをいじるときは RStudio を使い、JavaScript（React）のコードをいじるときは VSCode を使うのが良さそう。\
いれておくと良い VSCode 拡張機能に関しては .vscode/README.md 参照。\
RStudio に関して、ローカルの PC にインストールしても良いし、Docker コンテナ上で起動しても良い。\
下記には Docker を用いて RStudio をインストールする方法を記す。

### Docker コンテナ上で RStudio を使う

1. Docker イメージ取得・コンテナ起動（怒られるのでとりあえずパスワードは設定しておく）

```zsh
$ docker run -p 8787:8787 -e PASSWORD=yourpasswordhere rocker/rstudio
```

2. [http://localhost:8787/](http://localhost:8787/)をブラウザで開く
3. `2.`を実行後、サインインの画面が表示されるので、下記のように入力しサインイン

```
Username: rstudio
Password: yourpasswordhere
```

4. RStudio が立ち上がるので、プロジェクトをクローンしてくる

```zsh
$ git clone https://github.com/kota-tozawa/tweet-analyzer.git
$ cd tweet-analyzer
```

5. 「環境構築後にやること」を行う

### 実行中のコンテナの状態を保存し、次作業するときに以前の状態からはじめる方法

```zsh
hogehoge@fugafuga ~$ docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED              STATUS              PORTS                    NAMES
da13575a8a55        rocker/rstudio      "/init"             About a minute ago   Up About a minute   0.0.0.0:8787->8787/tcp   interesting_williams
hogehoge@fugafuga ~$ docker commit da13575a8a55 foobar
sha256:4f49a8f25a428bc54b1c4902b1e2ffd559d276bdf734a674819046aaeb700cc4
hogehoge@fugafuga ~$ docker images
REPOSITORY                TAG                 IMAGE ID            CREATED              SIZE
foobar                    latest              4f49a8f25a42        About a minute ago   1.9GB
rocker/verse              latest              acb9adf64bd9        8 days ago           3.62GB
rocker/rstudio            latest              f6cf30c3483b        8 days ago           1.9GB
hogehoge@fugafuga ~$ docker run -p 8787:8787 -e PASSWORD=yourpasswordhere foobar
[s6-init] making user provided files available at /var/run/s6/etc...exited 0.
[s6-init] ensuring user provided files have correct perms...exited 0.
[fix-attrs.d] applying ownership & permissions fixes...
[fix-attrs.d] done.
[cont-init.d] executing container initialization scripts...
[cont-init.d] userconf: executing...
[cont-init.d] userconf: exited 0.
[cont-init.d] done.
[services.d] starting services
[services.d] done.
```

## 環境構築後にやること

### 環境変数設定

プロジェクトのルートディレクトリに、ファイル `.Renviron` を作成し、Twitter API と AWS SDK 用のシークレットを環境変数として設定する。\
（アスタリスクで表記されている箇所を自分のシークレットに置き換える）

```
# AWS SDK
AWS_ACCESS_KEY_ID="****************"
AWS_SECRET_ACCESS_KEY="****************"
AWS_REGION="ap-northeast-1"

# Twitter API
APP="****************"
CONSUMER_KEY="****************"
CONSUMER_SECRET="****************"
ACCESS_TOKEN="****************"
ACCESS_SECRET="****************"
```

### 開発に必要なパッケージをインストール

#### R のパッケージをインストールする

下記コマンドを実行する前に、まず [MeCab（形態素解析器）](https://taku910.github.io/mecab/) と mecab-ipadic（わかち書き辞書）をインストールする。\
これがないと RMeCab パッケージのインストールに失敗する。

##### もしお手元のマシンのメモリに余裕があれば START

MeCab、mecab-ipadic のインストールと同時に[mecab-ipadic-NEologd](https://github.com/neologd/mecab-ipadic-neologd) というわかち書き辞書もインストールしておく。\
（**Note**：通常の日本語テキストの形態素解析には mecab-ipadic があれば十分だが、分析対象がツイートということもあり、\
新語・固有表現に強い mecab-ipadic-NEologd のような辞書を使用することが、手元のマシンのメモリに余裕があるのなら望ましい。）

これらツール（mecab、mecab-ipadic、mecab-ipadic-NEologd）のインストール手順は、下記を参考に実施。（**Note**：下記手順は macOS 用）：\
https://qiita.com/berry-clione/items/b3a537962c84244a2a09

簡単な手順（打ち込むコマンド）を下記に示す。

```zsh
$ brew install mecab mecab-ipadic
$ git clone --depth 1 https://github.com/neologd/mecab-ipadic-neologd.git
$ cd mecab-ipadic-neologd
$ ./bin/install-mecab-ipadic-neologd -n -a # 「-a」オプションで全ての辞書をインストール。
$ sudo vi /usr/local/etc/mecabrc # /usr/local/etc/mecabrc を加える変更内容は上記手順を参照のこと。もしメモリがたりなく分析が上手くいかないようなら、ここに加えた変更を戻す。
```

##### もしお手元のマシンのメモリに余裕があれば END

MeCab 関連のツールをインストール完了後、下記を実行。

```R
> install.packages("renv")
> renv::restore()
```

#### JavaScript のパッケージをインストールする

```zsh
$ npm install
```

## 開発していくなかで適宜行うべきこと

### パッケージ管理

#### R

新しくパッケージをインストールしたときやパッケージを削除したときに下記コマンドを実行する。\
できる限り CRAN からパッケージをインストールする。（`install.packages("package-name")` でインストールすることが望ましい）

```R
> renv::snapshot()
```

#### JavaScript

`npm install <package-name>`実行時に package.json と package-lock.json が自動で生成されるため、特に何もしなくて良い。\
dev 環境のみで使用するパッケージをインストールするときは、`--save-dev`オプションをつける。

### コードと文章の静的解析・整形

#### R のコードを静的解析する

下記を実行して得られる解析結果を見て、手で整形する。

```R
> lintr::lint_dir(path = "ingestion")
> lintr::lint_dir(path = "tests")
> lintr::lint("app.R")
```

#### JavaScript のコードを静的解析及び自動整形する

```zsh
$ npm run lint-fix
```

#### README.md の日本語の文章を校正及び（部分的に）自動修正する

1. 下記を実行し、機械的に直せるところは直してもらう。

```zsh
$ npm run text-fix
```

2. 残った問題点については下記を実行して確認し、手で修正する。

```zsh
$ npm run lint-text
```

### テスト

#### R

- ユニットテスト \
  `{testthat}`パッケージを用いて行う。

```R
> testthat::test_dir("./tests/testthat")
```

#### JavaScript（React）

Jest など使ってそのうち書く予定。
