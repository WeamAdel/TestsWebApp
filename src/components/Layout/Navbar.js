import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar ">
      <div className="container">
        <ul className="p-0 m-0 list-unstyled">
          <li className="logo mr-auto font-weight-bold">
            <Link to="/dashboard">Quiz.</Link>
          </li>
          <li>
            <NavLink to="/dashboard/test" exact>
              <span>Add Test</span>
              <i className="fa fa-plus-square ml-2" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard" exact>
              <span>Dashboard</span>
              <i className="fa fa-compass ml-2" />
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
