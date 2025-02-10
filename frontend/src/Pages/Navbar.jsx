import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Add Card</Link>
        </li>
        <li>
          <Link to="/calendar">View Calendar</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
