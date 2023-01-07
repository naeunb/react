# React Router

**url에 따라 컴포넌트를 선택적으로 렌더링할 수 있다. 새로고침이 일어나지 않고 부분적으로 렌더링이 일어나기 때문에 SPA(Single Page Application)을 개발할 수 있다.**

## 설치방법

    npm install react-router-dom

---

### BrowserRouter

React Router를 사용하고자 하는 컴포넌트를 BrowserRouter로 감싼다

```javascript
<BrowserRouter>
  <App />
</BrowserRouter>
```

---

### Routes, Route

라우팅을 할 때는 Routes안에 Route를 통해서 url에 따라 렌더링 될 컴포넌트를 작성한다

```javascript
<Routes>
  <Route path="경로" element={<컴포넌트 />} />
</Routes>
```

---

### 중첩 라우팅

라우팅된 컴포넌트 안에서 다시 라우팅을 할 수 있다

```javascript
<Routes>
  <Route path="/hello/*" element={<Hello />}>
    <Route path="1" element={<div>1번 컴포넌트</div>} />
    <Route path="2" element={<div>2번 컴포넌트</div>} />
  </Route>
</Routes>
```

Route안에 중첩해서 Route를 작성할 수 있다
상위 라우팅된 컴포넌트에서 Outlet을 렌더링하면 된다

```javascript
function Hello() {
  return (
    <div>
      <h1>hello component</h1>
      <Outlet />
    </div>
  );
}
```

url이 /hello인 경우에는 Outlet이 렌더링되지 않고
/hello/1 일 경우, 1번 컴포넌트
/hello/2 일 경우, 2번 컴포넌트 가 렌더링 된다

---

### useParams

url에서 파라미터를 받아올 수 있다
ex) hello/:id => id라는 이름으로 파라미터를 받을 수 있다

```javascript
<Routes>
  <Route path="/users" element={<UserList />} />
  <Route path="/users/:id" element={<Detail />}>
</Routes>
```

url이 /users 면 UserList 컴포넌트,
뒤에 다른값이 오면 Detail 컴포넌트가 렌더링된다

그리고 Detail컴포넌트에서 파라미터(id)값을 useParmas를 통해 읽어올 수 있다.
파라미터의 이름은 path에 기입된 **:파라미터 이름**에 따라 달라진다.
useParams의 리턴값은 객체이다.

---

### useSearchParams

쿼리스트링을 간편하게 변환하여 사용할 수 있다
useSearchParams를 사용하면 배열을 리턴하는데, 첫번째 값이 객체이다.
그 객체의 get메서드를 통해 쿼리값들을 읽어올 수 있다.
쿼리값은 key=value, key2=value2... 의 형태로 전달된다.
파라미터보다 복잡하고 여러개의 값을 전달해야할 때 쿼리스트링을 사용한다.

```javascript
function Detail() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const age = searchParams.get("age");
  return (
    <div>
      <h1>{email}</h1>
      <h2>{age}</h2>
    </div>
  );
}
```

---

### useNavigate

Link 컴포넌트가 아닌 다른 방법으로 url을 변경할 때 사용.
useNavigate()의 반환값은 함수로, 인자로 url을 전달하면 변경된다.
주의사항으로 앞에 /가 붙었을때와 아닐때 다르게 동작한다. /를 붙이면 base url의 끝에 문자열을 붙이지만, /를 생략하면 현재 url주소 끝에 붙인다.

```javascript
function Hello() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>hello component</h1>
      <p onClick={() => navigate("/users")}>유저목록보기</p>
    </div>
  );
}
```

---

## REST API

API : Application Programming Interface
어플리케이션 간의 통신 방법

REST API(Representational State Transfer API) : 자원의 상태를 자원에 대한 표현으로 주고받는 모든 것
자원(Resource), 메서드(Method), 표현(Representation)
ex) GET https://www.api-com/todos
ex) GET https://www.api-com/todos/1

메서드의 종류 : GET, POST, PUT(전체), PATCH(일부분), DELETE

---

## json-server

json-server : json파일에 저장된 정보를 주고받는 가상의 REST API를 만들어주는 라이브러리
설치 : npm install -g json-server
실행 : json-server [파일경로] --port [포트번호]

## Axios

JS에서 http통신을 도와주는 라이브러리
별도의 설치가 필요함
