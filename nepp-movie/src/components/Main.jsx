import { Outlet } from "react-router-dom";
function Main() {
  return (
    <div>
      <h1>Main</h1>
      <p>main page</p>
      <Outlet />
    </div>
  );
}

export default Main;
