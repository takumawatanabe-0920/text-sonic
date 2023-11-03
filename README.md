# text-sonic

server 側のセットアップ

server ディレクトリ配下に.env を用意する必要があります。

```
$ cd server

$ pip install --no-cache-dir --upgrade -r /code/requirements.txt

$ uvicorn app.main:app --host 0.0.0.0 --port 8082 --reload
```

frontend 側セットアップ

frontend ディレクトリ配下に.env を用意必要があります。

```
$ cd frontend

$ npm install

$ npm run dev
```

http://localhost:3016 にアクセスすると立ち上がっていることが確認できるはずです！
