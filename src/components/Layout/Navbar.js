import { connect } from "react-redux";
import { doLogout } from "../../redux/auth/ActionCreators";
import { NavLink, Link } from "react-router-dom";

function Navbar({ doLogout }) {
  return (
    <nav className="navbar ">
      <div className="container">
        <ul className="p-0 m-0 list-unstyled">
          <li className="logo mr-auto font-weight-bold">
            <Link to="/dashboard">Quiz.</Link>
          </li>
          <li>
            <NavLink className="nav-link" to="/dashboard/test" exact>
              <span>Add Test</span>
              <i className="fa fa-plus-square ml-2" />
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/dashboard" exact>
              <span>Dashboard</span>
              <i className="fa fa-compass ml-2" />
            </NavLink>
          </li>
          <li className="nav-item dropdown">
            <a
              className="dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fa fa-cogs" />
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="#" onClick={doLogout}>
                <i className="fa fa-fa-sign-out" /> Logout
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    doLogout: () => {
      dispatch(doLogout());
    },
  };
};

export default connect(null, mapDispatchToProps)(Navbar);
