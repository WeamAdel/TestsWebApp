import { Link } from "react-router-dom";

export default function Navbar(params) {
  return (
    <nav className="navbar ">
      <div className="container">
        <ul className="p-0 m-0 list-unstyled">
          <li>
            <Link to="/sign-in" exact>
              Sign In
            </Link>
          </li>
          <li>
            <Link to="/sign-up" exact>
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}