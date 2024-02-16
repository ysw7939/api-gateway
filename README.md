## API server

This is a simple API server

### How to run

1. Install the dependencies

```bash
$ npm install
```

2. Run the server

```bash
$ npm start
```

3. The server will be running on port 3000

---

## Docker

```bash
$ cd docker
```

```bash
$ docker-compose -f docker-compose-mysql.yml up
```

## 📌 commit, merge 규칙

1. commit - [imoji] [tag] : [yy.mm.dd] [name] [description]
2. merge - 🔀 merge : [yy.mm.dd] [name] [description]

## 😀 이모지 및 태그

- 이모지는 선택에 따라 활용한다.

| 이모지 | 태그     | 설명            |
| ------ | -------- | --------------- |
| ✨     | feat     | 기능 추가       |
| 🐛     | fix      | 버그 수정       |
| ♻️     | refactor | 리팩토링        |
| ✏️     | comment  | 주석 추가       |
| 📝     | docs     | docs 수정       |
| 🔀     | merge    | merge           |
| 🚚     | rename   | 이름 수정, 이동 |
| 🧪     | test     | 일시적 테스트   |
