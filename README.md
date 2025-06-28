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

### biome の設定

以下の記事を参考に設定。VSCode の設定で `"quickfix.biome": true` とすると安全ではない unsafe fix で実行されてエグいので、 `"source.fixAll.biome": "explicit"` で安全な fix のみ変換されるようにした。

[フォーマッターとリンターを兼ね備えた「Biome」を触ってみる](https://zenn.dev/ako/articles/b8a686843f6b83)

lint の除外ファイルは指定できなそうな感じだったので、一旦 src ディレクトリだけやった。（ESLint みたく.gitignore で指定しているファイルを除外できると嬉しい・・・）

ファイルを除外する場合は `linter.includes` のところで`!node_modules/**`のように除外ケースとして指定するといけた。

https://biomejs.dev/reference/configuration/#linterincludes
