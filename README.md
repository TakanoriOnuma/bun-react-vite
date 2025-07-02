# Bun で React Vite 環境を試す

## メモ

### bun のバージョン管理

bun のバージョン管理は中々情報が見つからなかったが、 mise を使うと良さそう。

[mise ではじめる開発環境構築](https://zenn.dev/takamura/articles/dev-started-with-mise)

brew でインストールした場合の activate は多分こっち？

`echo 'eval "$(mise activate bash)"' >> ~/.bashrc`

#### GitHub Actions 上でのバージョン指定

GitHub Actions でも version-file を指定できるが、それは`.tool-versions`のみだった。せっかく mise.toml を用意したが、そっちは使わないかもしれない。。

https://github.com/oven-sh/setup-bun/tree/v2/?tab=readme-ov-file#inputs

### bun の使い方

大体 npm と使い方が一緒で、npm → bun に変えるだけで良さそう

- `npm install` → `bun install`
- `npm run dev` → `bun run dev`

ただしパッケージのインストールは yarn に近い。

https://bun.sh/docs/cli/add

テストは `bun test` と bun 専用のテストコマンドを実行する必要がある（package.json に test を用意すると、おそらく通常のタスク実行として動いてしまう）

### bun test の設定

2023 年頃の記事だと `toBeInTheDocument` などのメソッドが使えないとか見かけたが、今は普通にセットアップ方法が公式に載っていた。

[Using Testing Library with Bun](https://bun.sh/guides/test/testing-library)

ただエラーした際の挙動が変になっていたので、もうちょっと待った方が良いかも。

https://github.com/oven-sh/bun/issues/18500

#### VSCode 上での実行

現状だとここで会話されている VSCode 拡張を入れると動きそうだが、まだ出たばかりでかなり不安定だった。

https://github.com/oven-sh/bun/issues/4824#issuecomment-2855010428

まず bun は mise でローカルにだけ実行パスがある状態だと動かず、`bunTestExplorer.pathToBun`に`mise which bun`で取得した絶対パスを指定する必要がある。できればこのプロジェクトで使用できる bun を自動で読み取って欲しい・・・。
また、pass する場合は jest と同じようにファイル上に実行ボタンがついていて良かったのだが、fail するコードが入るとなぜか実行できなくなった。

こっち使えばテスト実行はできた。ただテスト用のパネルが出るのではなく、単純にターミナルに`bun test`を実行する感じっぽい。こっちだといい感じに bun の実行パスを拾えていた。

[Bun for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=oven.bun-vscode)

#### bun と他のテストツールとの棲み分け

bun はテストファイルの拡張子を変えることができないので、基本的には Vitest 側を`.vitest.(ts|tsx)`とするのが楽だが、bun のテストファイルを`.bun.test.(ts|tsx)`とすると以下のようにフィルタすることで bun のテストファイルのみ実行することはできるかも。

```sh
bun test **/*.bun.test.(ts|tsx)
```

https://bun.sh/docs/cli/test

ただしその運用をすると VSCode でどちらのテストツールを出すべきか判断に迷いそうなので、やはり jest や vitest 側が拡張子を変える方が確実そうではある。

ちなみに`*_test.tsx`がそもそもサポートされているので、そっちの表記にするのはアリかと思ったが、なぜか VSCode 拡張の方が反応してくれなかった orz

[bun test が速いので vitest から置き換えたらめちゃ高速化された](https://zenn.dev/studio/articles/c5207260e90e8c)

### biome の設定

以下の記事を参考に設定。VSCode の設定で `"quickfix.biome": true` とすると安全ではない unsafe fix で実行されてエグいので、 `"source.fixAll.biome": "explicit"` で安全な fix のみ変換されるようにした。

[フォーマッターとリンターを兼ね備えた「Biome」を触ってみる](https://zenn.dev/ako/articles/b8a686843f6b83)

lint の除外ファイルは指定できなそうな感じだったので、一旦 src ディレクトリだけやった。（ESLint みたく.gitignore で指定しているファイルを除外できると嬉しい・・・）

ファイルを除外する場合は `linter.includes` のところで`!node_modules/**`のように除外ケースとして指定するといけた。

https://biomejs.dev/reference/configuration/#linterincludes

biome で lint するとエラーにはなるが、ESLint のように GitHub の PR コード上にエラーコメントで表示されないのは惜しかった。むしろ ESLint が凄い？
