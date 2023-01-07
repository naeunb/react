import { Route, Routes } from "react-router-dom";
import Main from "./Main";
import Header from "./Header";
import Detail from "./Detail";
function Movies() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies/:id" element={<Detail />} />
      </Routes>
    </>
  );
}

export default Movies;
