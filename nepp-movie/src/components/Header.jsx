import { Link } from "react-router-dom";

function Header() {
  return (
    <ul>
      <li>
        <Link to="/">Main</Link>
      </li>
      <li>
        <Link to="/hello">Hello</Link>
      </li>
    </ul>
  );
}

export default Header;
