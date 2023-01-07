import { Routes, Route } from "react-router-dom";
import Detail from "./components/Detail";
import Header from "./components/Header";
import Hello from "./components/Hello";
import Main from "./components/Main";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/*" element={<Main />}>
          {/* 중첩라우팅 */}
          <Route path="1" element={<button>1</button>} />
          <Route path="2" element={<button>2</button>} />
        </Route>
        <Route path="hello" element={<Hello />} />
        <Route path="hello/:userId" element={<Detail />} />
      </Routes>
    </>
  );
}

export default App;
