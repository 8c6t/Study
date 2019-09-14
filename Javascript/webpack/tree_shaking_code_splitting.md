트리 쉐이킹 & 코드 스플리팅
========

## 1. 트리 쉐이킹

- 불필요한 코드를 제거하는 기능
- 웹팩에서는 기본적으로 트리 쉐이킹을 지원하지만, 직접 설정이 필요한 경우가 있다
  - 외부 패키지는 ESM 모듈 시스템을 사용하는 패키지를 사용하거나, 별도의 설정이 필요한 경우가 있다

### 트리 쉐이킹이 동작하지 않는 경우

- 사용되는 모듈이 ESM이 아닌 경우
- 사용하는 쪽에서 ESM이 아닌 다른 모듈 시스템을 이용하는 경우
- 동적 임포트를 사용하는 경우

사용되는 쪽과 사용하는 쪽 모두 ESM 모듈 문법을 사용해야 동작


### 바벨 사용 시 주의점

- 바벨로 컴파일한 이후에도 ESM 문법으로 남아있어야 한다
- `@babel/preset-env` 플러그인 사용 시 `modules` 속성을 false로 변경


## 2. 코드 스플리팅

- 하나의 파일로 번들링 될 경우, 불필요한 코드까지 전송되어 페이지 렌더링에 걸리는 시간이 오래 걸릴 수 있기 때문에 응답 시간을 최소화하기 위해 코드를 분할하는 기법
- Entry Point 설정을 이용한 수동 분할, 중복 종속성 제거를 위한 SplitChunksPlugin, import 함수를 사용하여 동적으로 모듈을  호출하는 동적 임포트가 있음

### 가. Entry Point 설정

- entry 설정에 분할하고자 하는 페이지별로 파일을 입력하여 코드를 분할
- 각 파일이 동일한 모듈을 사용하는 경우, 내용이 각 파일별로 존재하게 되어 비효율적

```js
module.exports = {
  entry: {
    page1: './src/index1.js',
    page2: './src/index2.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

### 나. SplitChunksPlugin

- 코드 분할을 위해 웹팩에서 내장하고 있는 플러그인
  - CommonsChunkPlugin이 optimize 속성의 splitChunks로 내장됨
- optimization.splitChunks 옵션을 이용하여 코드를 분할
- 정규식, 파일 사이즈, 비동기 요청 횟수 등 다양한 기준으로 분리 가능

#### splitChunks 속성의 기본값

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 30,
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};
```
#### 주요 속성

- chunks: `async` 옵션. **동적 임포트만 코드를 분할하도록 설정**되어 있음
  - `all`: test 정규식 조건을 만족하는 모든 파일이 대상
  - `initial`: 초기 로딩에 필요한 경우
- minSize: 파일 크기가 30kb 이상인 모듈만 분할 대상
- minChunks: 한 개 이상의 chunk에 포함되어 있어야 함
- cacheGroups: 파일 분할 그룹 설정. 기본적으로 외부 모듈(vendors)과 내부 모듈(default) 두 그룹으로 설정되어 있음
  - 외부 모듈은 변화가 드물기에 브라우저에 오래 캐싱될 수 있음
  - 내부 모듈은 두 개 이상의 번들 파일에 포함되어야 함


#### 리액트 패키지 코드 스플리팅 예시

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: 1,
          name: 'vendors',
        },
        reactBundle: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          priority: 2,
          name: 'react.bundle',
          minSize: 100,
        },
      },
    },
  }
};
```
- vendors 그룹에 포함되지 않도록 우선순위를 높게 설정해야 한다

### 다. Dynamic Import

- 웹팩에서 동적 임포트(`import()`)를 사용하면 해당 모듈의 코드는 자동으로 분할됨

#### 예시

```js
// index.js
const userid = process.env.LOCAL_STORAGE_USERID;
const password = process.env.LOCAL_STORAGE_PASSWORD;

function dynamicImport() {
  import('./common').then(({ auth }) =>
    import('lodash').then(({ default: _ }) => 
      console.log('value', _.fill(Array(3), auth(userid, password));
    ),
  );
}

dynamicImport();
```

```js
// webpack.config.js
module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(__dirname, 'dist),
  },
}
```

- `chunkFilename` 속성을 이용해서 동적 임포트로 만들어지는 번들 파일의 이름을 설정
- index.js 파일을 불러오면 동적으로 생성된 common, lodash 모듈의 번들 파일들을 불러오게 됨
  - prefetch, preload 기능을 사용하지 않았다면 지연 로딩

#### preload, prefetch 설정

```js
const [{ auth }, { default: _ }] = await Promise.all([
  import(/* webpackPreload: true */, './common'),
  import(/* webpackPrefetch: true */, 'lodash'),
]);
```
- Preload: 당장 필요한 파일. 첫 페이지 로딩 시 즉시 다운로드
- Prefetch: 조만간 필요한 파일. 브라우저에 여유가 있을 때 미리 다운로드
