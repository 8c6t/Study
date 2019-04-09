Multer
========

- **multipart/form-data** 형식으로 올라온 데이터를 쉽게 처리하기 위한 모듈
- multipart 데이터를 업로드하는 라우터에 붙는 미들웨어 역할
- ≒ Spring MultipartResolver

## 1. 설치

```bash
npm i multer
```

## 2. 처리 과정

이미지를 어떻게 저장할 것인지는 서비스의 특성에 따라 달라짐

1. 이미지를 선택할 때 먼저 업로드를 진행
2. 업로드된 사진 주소를 다시 클라이언트에게 전송
3. 게시글 저장 시에는 이미지 데이터 대신 이미지 주소를 저장

>  스케줄러를 이용하여 주기적으로 게시글과 연결되어 있지 않은 이미지를 삭제

## 3. multer 미들웨어 생성 메소드

| 메소드 | 사용 시점 | 처리 결과 |
|-|-|-|
| single | 하나의 이미지를 업로드할 때 | 이미지 하나는 req.file<br>나머지 정보는 req.body |
| array<br>fields | 여러 개의 이미지를 업로드할 때 | 이미지들은 req.files<br>나머지 정보는 req.body |
| none | 데이터만 multipart 형식으로 전송할 때 | 모든 정보를 req.body |

### array와 fields의 차이

- 속성 하나에 이미지를 여러 개 업로드했다면 array
- 여러 개의 속승에 이미지를 하나씩 업로드 했다면 fields

## 4. 설정

### 뷰 설정(views/main.pug)

```js
form#twit-form(action='/post' method='post' enctype='multipart/form-data')
  .input-group
    textarea#twit(name='content' maxlength=140)
  .img-preview
    img#img-preview(src='' style='display: none;' width='250' alt='미리보기')
    input#img-url(type='hidden' name='url')
  div
    label#img-label(for='img') 사진 업로드
    input#img(type='file' accept='image/*')
    button#twit-btn.btn(type='submit') 짹짹

script.
if (document.getElementById('img')) {
  document.getElementById('img').addEventListener('change', function (e) {
    var formData = new FormData();
    console.log(this, this.files);
    formData.append('img', this.files[0]);
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (xhr.status === 200) {
        var url = JSON.parse(xhr.responseText).url;
        document.getElementById('img-url').value = url;
        document.getElementById('img-preview').src = url;
        document.getElementById('img-preview').style.display = 'inline';
      } else {
        console.error(xhr.responseText);
      }
    };
    xhr.open('POST', '/post/img');
    xhr.send(formData);
  });
}
```
- 업로드 가능한 파일을 이미지로만 제한
  - [w3c input accept attr](https://www.w3schools.com/tags/att_input_accept.asp)
- 이미지 파일이 추가되면 이벤트 핸들링을 통해 ajax 통신으로 **POST /post/img**로 이미지 폼 데이터 전송. 게시글 업로드 전에 이미지를 먼저 서버에 업로드
- 이미지 업로드가 완료되면 서버로부터 받은 파일 경로를 hidden input 태그(name='url')에 삽입
- 실제 게시글 폼 데이터를 전송하는 시점에는 파일의 데이터가 아닌, 파일의 경로만을 전송하게 됨. DB에는 파일 경로만을 저장

### 라우터 설정(routes/post.js)

#### 1) 폴더 생성

```js
fs.readdir('uploads', (err) => {
  if(err) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다');
    fs.mkdirSync('uploads');
  }
});
```
- fs 모듈을 이용하여 업로드할 uploads 폴더가 없을 때 uploads 폴더 생성


#### 2) 이미지 업로드 처리 라우터

```js
// multer 모듈에 옵션을 설정하여 사용
const upload = multer({
  // 저장 방식, 경로 및 파일 이름 설정
  // diskStorage: 서버 디스크에 저장
  storage: multer.diskStorage({
    destination(req, file, cb) {
      // 콜백 함수를 통해 전송된 파일의 저장 경로 설정
      cb(null, 'uploads/');  
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      // 콜백 함수를 통해 저장될 파일명을 설정
      cb(null, new Date().valueOf() + '_' + path.basename(file.originalname, ext) + ext);
    },
  }),
  // 최대 이미지 파일 용량 제한
  limits: { fileSize: 5 * 1024 * 1024 },
});
```
- storage: 파일 저장 방식, 경로 및 파일 이름 설정
  - diskStorage: 이미지를 서버 디스크에 저장하기 위한 엔진(DiskStorage)
    - destination: 콜백 함수를 통해 전송된 파일의 저장 경로 설정
  - filename: 콜백 함수를 통해 저장될 파일명을 설정. 중복이 되지 않도록 파일명 앞에 날짜값을 붙였음
- limits: 파일 용량 제한(바이트 단위)


```js
// single(속성명): 하나의 이미지 업로드 시 사용하는 미들웨어. req.file 객체를 생성
router.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
  console.log(req.file);
  res.json({ url: `/img/${req.file.filename}` });
});
```

- single 메소드에 이미지가 담긴 req.body 속성의 이름을 적음
- upload.single 미들웨어가 이미지 업로드를 처리하고 req.file 객체에 결과를 저장  


#### 3) 게시글 업로드 처리 라우터

```js
// 게시글 업로드를 처리하는 라우터
const upload2 = multer();
// none(): 이미지 없이 데이터만 multipart 형식으로 전송 시 사용하는 미들웨어
router.post('/', isLoggedIn, upload2.none(), async(req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      img: req.body.url,
      userId: req.user.id,
    });
    // 정규표현식. # + 공백 제외([^\s]) + 모든 문자(*)
    const hashtags = req.body.content.match(/#[^\s]*/g);
    if(hashtags) {
      const result = await Promise.all(hashtags.map(tag => Hashtag.findOrCreate({
        where: { title: tag.slice(1).toLowerCase() },
      })));
      await post.addHashtags(result.map(r => r[0]));
    }

    res.redirect('/');
  } catch (error) {
    console.error(error);
    next(error);
  }
});
```
- 이미지를 업로드했다면 **이미지 주소**도 req.body.url로 전송됨
  - 실제 데이터가 오는것이 아니라 이미지 주소만 오는 것
- 데이터 형식을 multipart로 보내지만, 실제로 데이터는 들어있지 않기 때문에 none() 메소드 사용
- 이후 해시태그들을 정규표현식으로 추출해내고, DB에 저장한 뒤(Promise.all, Hashtag.findOrCreate) post.addHashTags 메소드로 게시글과 해시태그의 관계를 PostHashtag 테이블에 넣음
